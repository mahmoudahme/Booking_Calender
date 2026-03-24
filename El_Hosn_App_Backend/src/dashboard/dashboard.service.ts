import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In } from 'typeorm';
import { AccountMove } from '../entities/entities/AccountMove.entity';
import { AccountMoveLine } from '../entities/entities/AccountMoveLine.entity';
import { AccountPayment } from '../entities/entities/AccountPayment.entity';
import { ResCompany } from '../entities/entities/ResCompany.entity';
import { ProductProduct } from '../entities/entities/ProductProduct.entity';
import { ProductTemplate } from '../entities/entities/ProductTemplate.entity';
import { OpdRegistrationModel } from '../entities/entities/OpdRegistrationModel.entity';
import { DoctorModel } from '../entities/entities/DoctorModel.entity';
import { PatientModel } from '../entities/entities/PatientModel.entity';
import { SubtimeModel } from '../entities/entities/SubtimeModel.entity';
import { StockMove } from '../entities/entities/StockMove.entity';
import { UomUom } from '../entities/entities/UomUom.entity';
import { StockLocation } from '../entities/entities/StockLocation.entity';
import { StockQuant } from '../entities/entities/StockQuant.entity';
import { ResCountry } from '../entities/entities/ResCountry.entity';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(AccountMove)
        private readonly accountMoveRepo: Repository<AccountMove>,
        @InjectRepository(AccountMoveLine)
        private readonly accountMoveLineRepo: Repository<AccountMoveLine>,
        @InjectRepository(AccountPayment)
        private readonly accountPaymentRepo: Repository<AccountPayment>,
        @InjectRepository(ResCompany)
        private readonly companyRepo: Repository<ResCompany>,
        @InjectRepository(ProductProduct)
        private readonly productRepo: Repository<ProductProduct>,
        @InjectRepository(ProductTemplate)
        private readonly productTemplateRepo: Repository<ProductTemplate>,
        @InjectRepository(OpdRegistrationModel)
        private readonly appointmentRepo: Repository<OpdRegistrationModel>,
        @InjectRepository(DoctorModel)
        private readonly doctorRepo: Repository<DoctorModel>,
        @InjectRepository(PatientModel)
        private readonly patientRepo: Repository<PatientModel>,
        @InjectRepository(SubtimeModel)
        private readonly subtimeRepo: Repository<SubtimeModel>,
        @InjectRepository(StockMove)
        private readonly stockMoveRepo: Repository<StockMove>,
        @InjectRepository(UomUom)
        private readonly uomRepo: Repository<UomUom>,
        @InjectRepository(StockLocation)
        private readonly locationRepo: Repository<StockLocation>,
        @InjectRepository(StockQuant)
        private readonly stockQuantRepo: Repository<StockQuant>,
        @InjectRepository(ResCountry)
        private readonly countryRepo: Repository<ResCountry>,
    ) { }

    private getDateRange(period: string): { start: Date, end: Date } {
        const now = new Date();
        const start = new Date();
        const end = new Date();
        end.setHours(23, 59, 59, 999);

        if (period === 'daily') {
            start.setHours(0, 0, 0, 0);
        } else if (period === 'weekly') {
            start.setDate(now.getDate() - 7);
            start.setHours(0, 0, 0, 0);
        } else { // monthly
            start.setDate(now.getDate() - 30);
            start.setHours(0, 0, 0, 0);
        }
        return { start, end };
    }

    /**
     * Financial & Branch Comparison
     */
    async getFinancialOverview(period: string = 'monthly') {
        const { start, end } = this.getDateRange(period);

        const invoices = await this.accountMoveRepo.find({
            where: {
                move_type: 'out_invoice',
                state: 'posted',
                invoice_date: Between(start, end)
            }
        });

        const companies = await this.companyRepo.find();
        const companyMap = new Map(companies.map(c => [c.id, c.name]));

        const branchStatsMap = new Map<number, any>();
        companies.forEach(c => {
            branchStatsMap.set(c.id, {
                branchId: c.id, branchName: c.name,
                totalRevenue: 0, paidInvoices: 0, pendingInvoices: 0, appointmentCount: 0
            });
        });

        invoices.forEach(inv => {
            const cid = inv.company_id || (companies[0]?.id || 0);
            if (!branchStatsMap.has(cid)) {
                branchStatsMap.set(cid, {
                    branchId: cid, branchName: companyMap.get(cid) || 'Other',
                    totalRevenue: 0, paidInvoices: 0, pendingInvoices: 0, appointmentCount: 0
                });
            }
            const stats = branchStatsMap.get(cid);
            const total = Number(inv.amount_total) || 0;
            const residual = Number(inv.amount_residual) || 0;
            stats.totalRevenue += total;
            stats.paidInvoices += (total - residual);
            stats.pendingInvoices += residual;
        });

        const appCounts = await this.appointmentRepo.createQueryBuilder('app')
            .select('app.company', 'company_id')
            .addSelect('COUNT(*)', 'count')
            .where('app.appointment_date BETWEEN :start AND :end', { start, end })
            .groupBy('app.company').getRawMany();

        appCounts.forEach(ac => {
            const cid = Number(ac.company_id);
            if (branchStatsMap.has(cid)) {
                branchStatsMap.get(cid).appointmentCount = Number(ac.count);
            }
        });

        const branchRevenue = Array.from(branchStatsMap.values()).map(b => ({
            ...b,
            collectionRate: b.totalRevenue > 0 ? Math.round((b.paidInvoices / b.totalRevenue) * 100) : 0,
            revenuePerAppointment: b.appointmentCount > 0 ? Math.round(b.totalRevenue / b.appointmentCount) : 0
        }));

        const ranked = [...branchRevenue].sort((a, b) => b.totalRevenue - a.totalRevenue);

        const dailyTrendQuery = await this.accountMoveRepo.createQueryBuilder('inv')
            .select("to_char(inv.invoice_date, 'YYYY-MM-DD')", 'date')
            .addSelect('inv.company_id', 'branchId')
            .addSelect('SUM(inv.amount_total)', 'revenue')
            .addSelect('COUNT(*)', 'appointments')
            .where("inv.move_type = 'out_invoice' AND inv.state = 'posted'")
            .andWhere('inv.invoice_date BETWEEN :start AND :end', { start, end })
            .groupBy("to_char(inv.invoice_date, 'YYYY-MM-DD')").addGroupBy('inv.company_id')
            .orderBy('date', 'ASC').getRawMany();

        const trendMap = new Map<string, any[]>();
        dailyTrendQuery.forEach(row => {
            if (!trendMap.has(row.date)) trendMap.set(row.date, []);
            trendMap.get(row.date).push({
                branchId: row.branchId,
                branchName: companyMap.get(row.branchId) || 'Other',
                revenue: Number(row.revenue),
                appointments: Number(row.appointments)
            });
        });

        return {
            period,
            summary: {
                totalRevenue: branchRevenue.reduce((s, b) => s + b.totalRevenue, 0),
                totalPaid: branchRevenue.reduce((s, b) => s + b.paidInvoices, 0),
                totalPending: branchRevenue.reduce((s, b) => s + b.pendingInvoices, 0),
                overallCollectionRate: branchRevenue.reduce((s, b) => s + b.totalRevenue, 0) > 0
                    ? Math.round((branchRevenue.reduce((s, b) => s + b.paidInvoices, 0) / branchRevenue.reduce((s, b) => s + b.totalRevenue, 0)) * 100)
                    : 0,
            },
            branchRevenue: ranked,
            topBranch: ranked[0] || null,
            lowestBranch: ranked[ranked.length - 1] || null,
            dailyTrend: Array.from(trendMap.entries()).map(([date, branches]) => ({ date, branches })),
            branchComparison: branchRevenue.map(b => ({ branchName: b.branchName, revenue: b.totalRevenue, appointments: b.appointmentCount })),
        };
    }

    /**
     * Services & Inventory
     */
    async getServicesAndInventory(period: string = 'monthly') {
        const { start, end } = this.getDateRange(period);

        // Join MoveLine with Product and Template
        const serviceStats = await this.accountMoveLineRepo.createQueryBuilder('aml')
            .select('t.id', 'templateId')
            .addSelect("t.name->>'en_US'", 'serviceName')
            .addSelect('c.name', 'category')
            .addSelect('SUM(aml.quantity)', 'count')
            .addSelect('SUM(aml.price_subtotal)', 'revenue')
            .innerJoin(ProductProduct, 'p', 'p.id = aml.product_id')
            .innerJoin(ProductTemplate, 't', 't.id = p.product_tmpl_id')
            .leftJoin('product_category', 'c', 'c.id = t.categ_id')
            .where('aml.invoice_date BETWEEN :start AND :end', { start, end })
            .andWhere("aml.parent_state = 'posted' AND aml.display_type = 'product'")
            .groupBy('t.id').addGroupBy('t.name').addGroupBy('c.name')
            .orderBy('revenue', 'DESC')
            .getRawMany();

        const topServices = serviceStats.map(s => ({
            serviceId: s.templateId,
            serviceName: s.serviceName || 'Unknown Service',
            category: s.category || 'General',
            procedureCount: Number(s.count),
            totalRevenue: Number(s.revenue),
            averagePrice: Number(s.count) > 0 ? Math.round(Number(s.revenue) / Number(s.count)) : 0
        }));

        const categories = [...new Set(topServices.map(s => s.category))];
        const servicesByCategory = categories.map(cat => {
            const catServices = topServices.filter(s => s.category === cat);
            return {
                category: cat,
                procedureCount: catServices.reduce((sum, s) => sum + s.procedureCount, 0),
                totalRevenue: catServices.reduce((sum, s) => sum + s.totalRevenue, 0)
            };
        }).sort((a, b) => b.totalRevenue - a.totalRevenue);

        // Consumables usage from stock moves (internal → non-internal)
        const consumablesStats = await this.stockMoveRepo.createQueryBuilder('sm')
            .select('t.id', 'templateId')
            .addSelect("t.name->>'en_US'", 'itemName')
            .addSelect("u.name->>'en_US'", 'unit')
            .addSelect('SUM(COALESCE(sm.quantity, sm.product_uom_qty))', 'quantity_used')
            .addSelect('SUM(COALESCE(sm.value, 0))', 'total_cost')
            .addSelect('p.id', 'productId')
            .innerJoin(ProductProduct, 'p', 'p.id = sm.product_id')
            .innerJoin(ProductTemplate, 't', 't.id = p.product_tmpl_id')
            .leftJoin(UomUom, 'u', 'u.id = sm.product_uom')
            .innerJoin(StockLocation, 'sl_src', 'sl_src.id = sm.location_id')
            .innerJoin(StockLocation, 'sl_dest', 'sl_dest.id = sm.location_dest_id')
            .where('sm.date BETWEEN :start AND :end', { start, end })
            .andWhere("sm.state = 'done'")
            .andWhere("sl_src.usage = 'internal' AND sl_dest.usage != 'internal'")
            .groupBy('t.id').addGroupBy('t.name').addGroupBy('u.name').addGroupBy('p.id')
            .orderBy('quantity_used', 'DESC')
            .getRawMany();

        // Get real current stock from stock_quant for internal locations
        const productIds = consumablesStats.map(c => Number(c.productId)).filter(id => id);
        let stockMap = new Map<number, number>();
        if (productIds.length > 0) {
            const currentStockData = await this.stockQuantRepo.createQueryBuilder('sq')
                .select('sq.product_id', 'productId')
                .addSelect('SUM(sq.quantity - sq.reserved_quantity)', 'availableQty')
                .innerJoin(StockLocation, 'sl', 'sl.id = sq.location_id')
                .where("sl.usage = 'internal'")
                .andWhere('sq.product_id IN (:...productIds)', { productIds })
                .groupBy('sq.product_id')
                .getRawMany();

            stockMap = new Map(currentStockData.map(s => [
                Number(s.productId),
                Math.max(0, Number(s.availableQty) || 0)
            ]));
        }

        const consumablesUsage = consumablesStats.map(c => {
            const currentStock = stockMap.get(Number(c.productId)) ?? 0;
            const quantityUsed = Math.abs(Number(c.quantity_used));
            // Flag as low if current stock covers less than 1 week of usage (relative to period)
            const dailyUsage = quantityUsed / 30;
            const reorderNeeded = currentStock < dailyUsage * 7;
            const stockStatus = currentStock === 0 ? 'out_of_stock' : reorderNeeded ? 'low' : 'adequate';

            return {
                itemId: c.templateId,
                itemName: c.itemName || 'Unknown Item',
                unit: c.unit || 'Units',
                quantityUsed,
                totalCost: Math.abs(Number(c.total_cost)) || 0,
                currentStock,
                stockStatus,
                reorderNeeded
            };
        });

        return {
            period,
            topServices: topServices.slice(0, 10),
            servicesByCategory,
            consumablesUsage,
            alerts: consumablesUsage.filter(c => c.reorderNeeded).map(c => ({
                itemName: c.itemName,
                currentStock: c.currentStock,
                unit: c.unit,
                message: c.currentStock === 0
                    ? `${c.itemName} is out of stock`
                    : `${c.itemName} stock is low (${c.currentStock} ${c.unit} remaining)`
            }))
        };
    }

    /**
     * Patient Analytics
     */
    async getPatientAnalytics(period: string = 'monthly') {
        const { start, end } = this.getDateRange(period);

        const totalPatients = await this.patientRepo.count();
        const newPatientsCount = await this.patientRepo.count({
            where: { create_date: Between(start, end) }
        });

        const demographics = {
            byGender: {
                male: await this.patientRepo.count({ where: { gender: 'male' } }),
                female: await this.patientRepo.count({ where: { gender: 'female' } })
            },
            byAgeGroup: [
                { group: '0-18', count: await this.patientRepo.count({ where: { age: Between(0, 18) } }) },
                { group: '19-30', count: await this.patientRepo.count({ where: { age: Between(19, 30) } }) },
                { group: '31-45', count: await this.patientRepo.count({ where: { age: Between(31, 45) } }) },
                { group: '46-60', count: await this.patientRepo.count({ where: { age: Between(46, 60) } }) },
                { group: '60+', count: await this.patientRepo.count({ where: { age: Between(61, 120) } }) },
            ],
            byNationality: await this.getNationalityDistribution(),
        };

        // Real Daily Traffic
        const trafficData = await this.appointmentRepo.createQueryBuilder('app')
            .select("to_char(app.appointment_date, 'YYYY-MM-DD')", 'date')
            .addSelect('COUNT(*)', 'count')
            .where('app.appointment_date BETWEEN :start AND :end', { start, end })
            .groupBy("to_char(app.appointment_date, 'YYYY-MM-DD')")
            .orderBy('date', 'ASC')
            .getRawMany();

        // Weekly Growth (last 4 weeks)
        const weeklyGrowth = [];
        for (let i = 3; i >= 0; i--) {
            const wStart = new Date(); wStart.setDate(wStart.getDate() - (i * 7 + 7));
            const wEnd = new Date(); wEnd.setDate(wEnd.getDate() - (i * 7));
            const count = await this.patientRepo.count({ where: { create_date: Between(wStart, wEnd) } });
            weeklyGrowth.push({ week: `Week ${4 - i}`, newPatients: count });
        }

        // Efficiency by Branch (real no-show rate, wait time not available in DB)
        const branches = await this.companyRepo.find();
        const efficiencyByBranch = await Promise.all(branches.map(async b => {
            const apps = await this.appointmentRepo.find({
                where: { company: b.id, appointment_date: Between(start, end) }
            });
            const cancelled = apps.filter(a => ['cancel', 'cancelled'].includes(a.appointment_state || '')).length;
            const missed = apps.filter(a => a.missed_state === 'missed').length;
            const noShowCount = cancelled + missed;
            return {
                branchName: b.name,
                averageWaitTime: null, // Not tracked in database
                noShowRate: apps.length > 0 ? Math.round((noShowCount / apps.length) * 100) : 0,
                patientSatisfaction: null // Not tracked in database
            };
        }));

        return {
            period,
            todaySummary: {
                total: totalPatients,
                newPatients: newPatientsCount,
                returningPatients: totalPatients - newPatientsCount,
                newPatientPercentage: totalPatients > 0 ? Math.round((newPatientsCount / totalPatients) * 100) : 0,
            },
            dailyTraffic: trafficData.map(t => ({ date: t.date, count: Number(t.count) })),
            weeklyGrowth,
            efficiencyByBranch,
            demographics,
        };
    }

    private async getNationalityDistribution(): Promise<{ nationality: string; count: number }[]> {
        const results = await this.patientRepo.createQueryBuilder('p')
            .select("rc.name->>'en_US'", 'nationality')
            .addSelect('COUNT(*)', 'count')
            .leftJoin(ResCountry, 'rc', 'rc.id = p.nationality')
            .where('p.nationality IS NOT NULL')
            .groupBy("rc.name->>'en_US'")
            .orderBy('count', 'DESC')
            .limit(10)
            .getRawMany();

        return results.map(r => ({
            nationality: r.nationality || 'Unknown',
            count: Number(r.count)
        }));
    }

    /**
     * Performance Tracking
     */
    async getPerformanceTracking() {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const tonight = new Date(); tonight.setHours(23, 59, 59, 999);

        const todayApps = await this.appointmentRepo.find({
            where: { appointment_date: Between(today, tonight) }
        });

        const completedApps = todayApps.filter(a => ['paid', 'closed'].includes(a.appointment_state || ''));
        const cancelledApps = todayApps.filter(a => ['cancel', 'cancelled'].includes(a.appointment_state || ''));
        const missedApps = todayApps.filter(a => a.missed_state === 'missed');

        const statusOverview = {
            totalProcedures: todayApps.length,
            completed: completedApps.length,
            inProgress: todayApps.filter(a => ['in_chair', 'arrived'].includes(a.appointment_state || '')).length,
            pending: todayApps.filter(a => a.appointment_state === 'confirmed').length,
            completionRate: todayApps.length > 0
                ? Math.round((completedApps.length / todayApps.length) * 100)
                : 0,
            cancelled: cancelledApps.length,
            noShows: missedApps.length
        };

        // Doctor KPIs with real avg procedure time from end_date - appointment_date
        const doctorStats = await this.appointmentRepo.createQueryBuilder('app')
            .select('app.doctor_id', 'doctorId')
            .addSelect('COUNT(*)', 'total')
            .addSelect("SUM(CASE WHEN app.appointment_state IN ('paid', 'closed') THEN 1 ELSE 0 END)", 'completed')
            .addSelect('AVG(CASE WHEN app.end_date IS NOT NULL AND app.appointment_state IN (\'paid\', \'closed\') THEN EXTRACT(EPOCH FROM (app.end_date - app.appointment_date))/60 END)', 'avgProcedureMinutes')
            .where('app.appointment_date BETWEEN :start AND :end', { start: today, end: tonight })
            .groupBy('app.doctor_id')
            .getRawMany();

        const doctorKPIs = await Promise.all(doctorStats.map(async s => {
            const doctor = await this.doctorRepo.findOne({ where: { id: s.doctorId }, relations: ['partner'] });
            const avgTime = s.avgProcedureMinutes ? Math.round(Number(s.avgProcedureMinutes)) : null;
            return {
                doctorName: doctor?.partner?.name || `Doctor ${s.doctorId}`,
                completionRate: Number(s.total) > 0 ? Math.round((Number(s.completed) / Number(s.total)) * 100) : 0,
                avgProcedureTime: avgTime,
                patientSatisfaction: null // Not tracked in database
            };
        }));

        // Hourly Distribution
        const hourlyDistribution = await this.appointmentRepo.createQueryBuilder('app')
            .select("to_char(app.appointment_date, 'HH24:00')", 'hour')
            .addSelect('COUNT(*)', 'count')
            .where('app.appointment_date BETWEEN :start AND :end', { start: today, end: tonight })
            .groupBy("to_char(app.appointment_date, 'HH24:00')")
            .orderBy('hour', 'ASC')
            .getRawMany();

        // Branch Performance
        const branches = await this.companyRepo.find();
        const branchPerformance = await Promise.all(branches.map(async b => {
            const apps = todayApps.filter(a => Number(a.company) === b.id);
            const totalSlots = await this.subtimeRepo.count({ where: { doctor_id: undefined } }) || 20;
            return {
                branchName: b.name,
                utilizationRate: apps.length > 0 ? Math.min(100, Math.round((apps.length / 20) * 100)) : 0,
                avgResponseTime: null // Not tracked in database
            };
        }));

        return {
            statusOverview,
            doctorKPIs,
            hourlyDistribution: hourlyDistribution.map(h => ({ hour: h.hour, count: Number(h.count) })),
            branchPerformance,
        };
    }

    async getFullDashboard(period: string = 'monthly') {
        const [financial, services, patients, performance] = await Promise.all([
            this.getFinancialOverview(period),
            this.getServicesAndInventory(period),
            this.getPatientAnalytics(period),
            this.getPerformanceTracking(),
        ]);
        return { financial, services, patients, performance };
    }
}
