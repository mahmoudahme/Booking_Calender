import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In } from 'typeorm';
import { AccountMove } from '../entities/entities/AccountMove.entity';
import { AccountMoveLine } from '../entities/entities/AccountMoveLine.entity';
import { AccountPayment } from '../entities/entities/AccountPayment.entity';
import { ProductProduct } from '../entities/entities/ProductProduct.entity';
import { ProductTemplate } from '../entities/entities/ProductTemplate.entity';
import { OpdRegistrationModel } from '../entities/entities/OpdRegistrationModel.entity';
import { DoctorModel } from '../entities/entities/DoctorModel.entity';
import { PatientModel } from '../entities/entities/PatientModel.entity';
import { StockMove } from '../entities/entities/StockMove.entity';
import { UomUom } from '../entities/entities/UomUom.entity';
import { StockLocation } from '../entities/entities/StockLocation.entity';
import { StockQuant } from '../entities/entities/StockQuant.entity';
import { ResCountry } from '../entities/entities/ResCountry.entity';
import { ResPartner } from '../entities/entities/ResPartner.entity';
import { ProductCategory } from '../entities/entities/ProductCategory.entity';
import { CrmLead } from '../entities/entities/CrmLead.entity';
import { CrmStage } from '../entities/entities/CrmStage.entity';
import { UtmSource } from '../entities/entities/UtmSource.entity';
import { DiscussChannel } from '../entities/entities/DiscussChannel.entity';
import { DiscussChannelMember } from '../entities/entities/DiscussChannelMember.entity';
import { MailMessage } from '../entities/entities/MailMessage.entity';
import { CampaginsSources } from '../entities/entities/CampaginsSources.entity';
import { ClinicBranch } from '../entities/entities/ClinicBranch.entity';

// COALESCE helper: use appointment_date when set, else fall back to create_date
const APPT_DATE = `COALESCE(app.appointment_date, app.create_date)`;
const OPD_DATE  = `COALESCE(o.appointment_date, o.create_date)`;

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(AccountMove)
        private readonly accountMoveRepo: Repository<AccountMove>,
        @InjectRepository(AccountMoveLine)
        private readonly accountMoveLineRepo: Repository<AccountMoveLine>,
        @InjectRepository(AccountPayment)
        private readonly accountPaymentRepo: Repository<AccountPayment>,
        @InjectRepository(ProductProduct)
        private readonly productRepo: Repository<ProductProduct>,
        @InjectRepository(ProductTemplate)
        private readonly productTemplateRepo: Repository<ProductTemplate>,
        @InjectRepository(OpdRegistrationModel)
        private readonly appointmentRepo: Repository<OpdRegistrationModel>,
        @InjectRepository(PatientModel)
        private readonly patientRepo: Repository<PatientModel>,
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
        @InjectRepository(ResPartner)
        private readonly partnerRepo: Repository<ResPartner>,
        @InjectRepository(CrmLead)
        private readonly crmLeadRepo: Repository<CrmLead>,
        @InjectRepository(CrmStage)
        private readonly crmStageRepo: Repository<CrmStage>,
        @InjectRepository(UtmSource)
        private readonly utmSourceRepo: Repository<UtmSource>,
        @InjectRepository(DiscussChannel)
        private readonly discussChannelRepo: Repository<DiscussChannel>,
        @InjectRepository(DiscussChannelMember)
        private readonly discussChannelMemberRepo: Repository<DiscussChannelMember>,
        @InjectRepository(MailMessage)
        private readonly mailMessageRepo: Repository<MailMessage>,
        @InjectRepository(CampaginsSources)
        private readonly campaginsSourcesRepo: Repository<CampaginsSources>,
        @InjectRepository(ClinicBranch)
        private readonly clinicBranchRepo: Repository<ClinicBranch>,
    ) { }

    private getDateRange(period: string, startDate?: string, endDate?: string): { start: Date, end: Date } {
        if (period === 'custom' && startDate && endDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            return { start, end };
        }

        const now = new Date();
        const start = new Date();
        const end = new Date();
        end.setHours(23, 59, 59, 999);

        if (period === 'daily') {
            start.setHours(0, 0, 0, 0);
        } else if (period === 'weekly') {
            start.setDate(now.getDate() - 7);
            start.setHours(0, 0, 0, 0);
        } else {
            start.setDate(now.getDate() - 30);
            start.setHours(0, 0, 0, 0);
        }
        return { start, end };
    }

    /**
     * Financial & Branch Comparison
     */
    async getFinancialOverview(period: string = 'monthly', startDate?: string, endDate?: string) {
        const { start, end } = this.getDateRange(period, startDate, endDate);

        const branches = await this.clinicBranchRepo.find({ where: { active: true } });
        const branchMap = new Map(branches.map(b => [b.id, b.name]));

        const branchStatsMap = new Map<number, any>();
        branches.forEach(b => {
            branchStatsMap.set(b.id, {
                branchId: b.id, branchName: b.name,
                totalRevenue: 0, paidInvoices: 0, pendingInvoices: 0, appointmentCount: 0,
            });
        });

        // Appointment counts per branch — use COALESCE so records without appointment_date are included
        const apptByBranch = await this.appointmentRepo.createQueryBuilder('app')
            .select('app.branch_id', 'branchId')
            .addSelect('COUNT(*)', 'count')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .andWhere('app.branch_id IS NOT NULL')
            .groupBy('app.branch_id')
            .getRawMany();

        const totalAppts = apptByBranch.reduce((s, a) => s + Number(a.count), 0);
        apptByBranch.forEach(ac => {
            const bid = Number(ac.branchId);
            if (!branchStatsMap.has(bid)) {
                branchStatsMap.set(bid, {
                    branchId: bid, branchName: branchMap.get(bid) || `Branch ${bid}`,
                    totalRevenue: 0, paidInvoices: 0, pendingInvoices: 0, appointmentCount: 0,
                });
            }
            branchStatsMap.get(bid).appointmentCount = Number(ac.count);
        });

        // Try invoice→appointment→branch linkage first
        const invoiceByBranch = await this.appointmentRepo.createQueryBuilder('app')
            .select('app.branch_id', 'branchId')
            .addSelect('SUM(COALESCE(am.amount_total, 0))', 'totalRevenue')
            .addSelect('SUM(COALESCE(am.amount_total, 0) - COALESCE(am.amount_residual, 0))', 'paidAmount')
            .addSelect('SUM(COALESCE(am.amount_residual, 0))', 'pendingAmount')
            .leftJoin(AccountMove, 'am',
                "am.id = app.invoice AND am.move_type = 'out_invoice' AND am.state = 'posted'")
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .andWhere('app.branch_id IS NOT NULL')
            .groupBy('app.branch_id')
            .getRawMany();

        const hasLinkedRevenue = invoiceByBranch.some(r => Number(r.totalRevenue) > 0);

        if (hasLinkedRevenue) {
            invoiceByBranch.forEach(row => {
                const bid = Number(row.branchId);
                const stats = branchStatsMap.get(bid);
                if (stats) {
                    stats.totalRevenue = Number(row.totalRevenue) || 0;
                    stats.paidInvoices = Number(row.paidAmount) || 0;
                    stats.pendingInvoices = Number(row.pendingAmount) || 0;
                }
            });
        } else {
            // Fallback: distribute account_move totals by appointment share
            const invTotals = await this.accountMoveRepo.createQueryBuilder('inv')
                .select('SUM(inv.amount_total)', 'totalRevenue')
                .addSelect('SUM(inv.amount_total - COALESCE(inv.amount_residual, 0))', 'paidAmount')
                .addSelect('SUM(COALESCE(inv.amount_residual, 0))', 'pendingAmount')
                .where("inv.move_type = 'out_invoice' AND inv.state = 'posted'")
                .andWhere('inv.invoice_date BETWEEN :start AND :end', { start, end })
                .getRawOne();

            const totalRev = Number(invTotals?.totalRevenue) || 0;
            const totalPaid = Number(invTotals?.paidAmount) || 0;
            const totalPending = Number(invTotals?.pendingAmount) || 0;

            apptByBranch.forEach(ac => {
                const bid = Number(ac.branchId);
                const share = totalAppts > 0 ? Number(ac.count) / totalAppts : 0;
                const stats = branchStatsMap.get(bid);
                if (stats) {
                    stats.totalRevenue = Math.round(totalRev * share);
                    stats.paidInvoices = Math.round(totalPaid * share);
                    stats.pendingInvoices = Math.round(totalPending * share);
                }
            });
        }

        const branchRevenue = Array.from(branchStatsMap.values()).map(b => ({
            ...b,
            collectionRate: b.totalRevenue > 0 ? Math.round((b.paidInvoices / b.totalRevenue) * 100) : 0,
            revenuePerAppointment: b.appointmentCount > 0 ? Math.round(b.totalRevenue / b.appointmentCount) : 0,
        }));
        const ranked = [...branchRevenue].sort((a, b) => b.totalRevenue - a.totalRevenue);

        // Daily trend per branch
        const dailyRaw = await this.appointmentRepo.createQueryBuilder('app')
            .select(`to_char(${APPT_DATE}, 'YYYY-MM-DD')`, 'date')
            .addSelect('app.branch_id', 'branchId')
            .addSelect('COUNT(*)', 'appointments')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .andWhere('app.branch_id IS NOT NULL')
            .groupBy(`to_char(${APPT_DATE}, 'YYYY-MM-DD')`).addGroupBy('app.branch_id')
            .orderBy('date', 'ASC')
            .getRawMany();

        const totalRev = branchRevenue.reduce((s, b) => s + b.totalRevenue, 0);
        const trendMap = new Map<string, any[]>();
        dailyRaw.forEach(row => {
            if (!trendMap.has(row.date)) trendMap.set(row.date, []);
            const bid = Number(row.branchId);
            const branchShare = totalAppts > 0 ? Number(row.appointments) / totalAppts : 0;
            trendMap.get(row.date).push({
                branchId: bid,
                branchName: branchMap.get(bid) || `Branch ${bid}`,
                revenue: Math.round(totalRev * branchShare),
                appointments: Number(row.appointments),
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
            branchComparison: branchRevenue.map(b => ({
                branchName: b.branchName, revenue: b.totalRevenue, appointments: b.appointmentCount,
            })),
        };
    }

    /**
     * Services & Inventory
     */
    async getServicesAndInventory(period: string = 'monthly', startDate?: string, endDate?: string) {
        const { start, end } = this.getDateRange(period, startDate, endDate);

        // Use aml.date (always set) instead of aml.invoice_date (often null)
        const serviceStats = await this.accountMoveLineRepo.createQueryBuilder('aml')
            .select('t.id', 'templateId')
            .addSelect("t.name->>'en_US'", 'serviceName')
            .addSelect('c.name', 'category')
            .addSelect('SUM(aml.quantity)', 'count')
            .addSelect('SUM(aml.price_subtotal)', 'revenue')
            .innerJoin(ProductProduct, 'p', 'p.id = aml.product_id')
            .innerJoin(ProductTemplate, 't', 't.id = p.product_tmpl_id')
            .leftJoin(ProductCategory, 'c', 'c.id = t.categ_id')
            .where('aml.date BETWEEN :start AND :end', { start, end })
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
    async getPatientAnalytics(period: string = 'monthly', startDate?: string, endDate?: string) {
        const { start, end } = this.getDateRange(period, startDate, endDate);

        // Count unique patients who had appointments in this period
        const periodPatientStats = await this.appointmentRepo.createQueryBuilder('app')
            .select('COUNT(DISTINCT app.patient_id)', 'total')
            .addSelect(
                `COUNT(DISTINCT CASE WHEN pm.create_date BETWEEN :start AND :end THEN app.patient_id END)`,
                'newPatients'
            )
            .addSelect(
                `COUNT(DISTINCT CASE WHEN pm.create_date < :start THEN app.patient_id END)`,
                'returningPatients'
            )
            .leftJoin(PatientModel, 'pm', 'pm.id = app.patient_id')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .setParameters({ start, end })
            .getRawOne();

        const totalInPeriod   = Number(periodPatientStats?.total ?? 0);
        const newPatientsCount = Number(periodPatientStats?.newPatients ?? 0);
        const returningCount   = Number(periodPatientStats?.returningPatients ?? 0);

        // Gender stored as 'Male'/'Female'/'male' — compare case-insensitively
        const demographics = {
            byGender: {
                male: await this.patientRepo.createQueryBuilder('p')
                    .where("LOWER(p.gender) = 'male'").getCount(),
                female: await this.patientRepo.createQueryBuilder('p')
                    .where("LOWER(p.gender) = 'female'").getCount(),
            },
            byAgeGroup: [
                { group: '0-18',  count: await this.patientRepo.count({ where: { age: Between(0, 18) } }) },
                { group: '19-30', count: await this.patientRepo.count({ where: { age: Between(19, 30) } }) },
                { group: '31-45', count: await this.patientRepo.count({ where: { age: Between(31, 45) } }) },
                { group: '46-60', count: await this.patientRepo.count({ where: { age: Between(46, 60) } }) },
                { group: '60+',   count: await this.patientRepo.count({ where: { age: Between(61, 120) } }) },
            ],
            byNationality: await this.getNationalityDistribution(),
        };

        // Daily traffic — split new vs returning by patient create_date
        const trafficData = await this.appointmentRepo.createQueryBuilder('app')
            .select(`to_char(${APPT_DATE}, 'YYYY-MM-DD')`, 'date')
            .addSelect('COUNT(*)', 'total')
            .addSelect(`SUM(CASE WHEN pm.create_date::date = ${APPT_DATE}::date THEN 1 ELSE 0 END)`, 'newPatients')
            .addSelect(`SUM(CASE WHEN pm.create_date::date != ${APPT_DATE}::date OR pm.create_date IS NULL THEN 1 ELSE 0 END)`, 'returningPatients')
            .leftJoin(PatientModel, 'pm', 'pm.id = app.patient_id')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .groupBy(`to_char(${APPT_DATE}, 'YYYY-MM-DD')`)
            .orderBy('date', 'ASC')
            .getRawMany();

        const weeklyGrowth = [];
        for (let i = 3; i >= 0; i--) {
            const wStart = new Date(); wStart.setDate(wStart.getDate() - (i * 7 + 7));
            const wEnd = new Date(); wEnd.setDate(wEnd.getDate() - (i * 7));
            const count = await this.patientRepo.count({ where: { create_date: Between(wStart, wEnd) } });
            weeklyGrowth.push({ week: `Week ${4 - i}`, newPatients: count });
        }

        // Average appointment duration = end_date - appointment_date (in minutes)
        const durationStats = await this.appointmentRepo.createQueryBuilder('app')
            .select(
                `ROUND(AVG(EXTRACT(EPOCH FROM (app.end_date - app.appointment_date)) / 60))`,
                'avgDuration'
            )
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .andWhere('app.end_date IS NOT NULL')
            .andWhere('app.appointment_date IS NOT NULL')
            .getRawOne();
        const avgDurationMinutes = Number(durationStats?.avgDuration ?? 0);

        const clinicBranches = await this.clinicBranchRepo.find({ where: { active: true } });
        const efficiencyByBranch = await Promise.all(clinicBranches.map(async b => {
            const branchStats = await this.appointmentRepo.createQueryBuilder('app')
                .select('COUNT(*)', 'total')
                .addSelect(
                    `ROUND(AVG(CASE WHEN app.end_date IS NOT NULL AND app.appointment_date IS NOT NULL THEN EXTRACT(EPOCH FROM (app.end_date - app.appointment_date)) / 60 END))`,
                    'avgDuration'
                )
                // onthyfly = booked but never confirmed/progressed = closest proxy to no-show
                .addSelect(`SUM(CASE WHEN app.appointment_state = 'onthyfly' THEN 1 ELSE 0 END)`, 'noShows')
                .where('app.branch_id = :bid', { bid: b.id })
                .andWhere(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
                .setParameters({ bid: b.id, start, end })
                .getRawOne();

            const total       = Number(branchStats?.total ?? 0);
            const noShows     = Number(branchStats?.noShows ?? 0);
            const avgDuration = Number(branchStats?.avgDuration ?? 0);
            return {
                branchName: b.name,
                avgDuration,
                noShowRate: total > 0 ? Math.round((noShows / total) * 100) : 0,
                totalAppointments: total,
            };
        }));

        return {
            period,
            todaySummary: {
                total: totalInPeriod,
                newPatients: newPatientsCount,
                returningPatients: returningCount,
                newPatientPercentage: totalInPeriod > 0 ? Math.round((newPatientsCount / totalInPeriod) * 100) : 0,
            },
            dailyTraffic: trafficData.map(t => ({
                date: t.date,
                newPatients: Number(t.newPatients),
                returningPatients: Number(t.returningPatients),
                total: Number(t.total),
            })),
            avgDurationMinutes,
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

        // COALESCE: include appointments created today that have no scheduled appointment_date
        const todayApps = await this.appointmentRepo.createQueryBuilder('app')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start: today, end: tonight })
            .getMany();

        // 'visit_closed' is the actual completed state in this database (not 'closed')
        const completedApps = todayApps.filter(a => ['paid', 'visit_closed'].includes(a.appointment_state || ''));
        const cancelledApps = todayApps.filter(a => ['cancel', 'cancelled'].includes(a.appointment_state || ''));
        const missedApps    = todayApps.filter(a => a.missed_state === 'missed');

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

        // Doctor KPIs — same COALESCE date filter
        const doctorStats = await this.appointmentRepo.createQueryBuilder('app')
            .select('app.doctor_id', 'doctorId')
            .addSelect('COUNT(*)', 'total')
            .addSelect(`SUM(CASE WHEN app.appointment_state IN ('paid','visit_closed') THEN 1 ELSE 0 END)`, 'completed')
            .addSelect(`AVG(CASE WHEN app.end_date IS NOT NULL AND app.appointment_state IN ('paid','visit_closed')
                THEN EXTRACT(EPOCH FROM (app.end_date - app.appointment_date))/60 END)`, 'avgProcedureMinutes')
            .leftJoin(DoctorModel, 'dm', 'dm.id = app.doctor_id')
            .leftJoin(ResPartner, 'rp', 'rp.id = dm.partner_id')
            .addSelect('rp.name', 'doctorName')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start: today, end: tonight })
            .groupBy('app.doctor_id')
            .addGroupBy('rp.name')
            .getRawMany();

        const doctorKPIs = doctorStats.map(s => ({
            doctorName: s.doctorName || `Doctor ${s.doctorId}`,
            completionRate: Number(s.total) > 0 ? Math.round((Number(s.completed) / Number(s.total)) * 100) : 0,
            avgProcedureTime: s.avgProcedureMinutes ? Math.round(Number(s.avgProcedureMinutes)) : null,
            patientSatisfaction: null,
        }));

        // Hourly distribution — returns appointments/completed/inProgress per hour
        const hourlyDistribution = await this.appointmentRepo.createQueryBuilder('app')
            .select(`to_char(${APPT_DATE}, 'HH24:00')`, 'hour')
            .addSelect('COUNT(*)', 'appointments')
            .addSelect(`SUM(CASE WHEN app.appointment_state IN ('paid','visit_closed') THEN 1 ELSE 0 END)`, 'completed')
            .addSelect(`SUM(CASE WHEN app.appointment_state IN ('in_chair','arrived') THEN 1 ELSE 0 END)`, 'inProgress')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start: today, end: tonight })
            .groupBy(`to_char(${APPT_DATE}, 'HH24:00')`)
            .orderBy('hour', 'ASC')
            .getRawMany();

        const perfBranches = await this.clinicBranchRepo.find({ where: { active: true } });
        const branchPerformance = perfBranches.map(b => {
            const apps = todayApps.filter(a => Number(a.branch_id) === b.id);
            return {
                branchName: b.name,
                utilizationRate: apps.length > 0 ? Math.min(100, Math.round((apps.length / 20) * 100)) : 0,
                avgResponseTime: null,
            };
        });

        return {
            statusOverview,
            doctorKPIs,
            hourlyDistribution: hourlyDistribution.map(h => ({
                hour: h.hour,
                appointments: Number(h.appointments),
                completed: Number(h.completed),
                inProgress: Number(h.inProgress),
            })),
            branchPerformance,
        };
    }

    /**
     * Lead Analytics
     */
    async getLeadAnalytics(period: string = 'monthly', startDate?: string, endDate?: string) {
        const { start, end } = this.getDateRange(period, startDate, endDate);

        const totalLeads = await this.crmLeadRepo
            .createQueryBuilder('cl')
            .where('cl.create_date BETWEEN :start AND :end', { start, end })
            .getCount();

        const byStatusRaw = await this.crmLeadRepo
            .createQueryBuilder('cl')
            .select(`CASE
                WHEN cl.won_status = 'won'                          THEN 'Converted'
                WHEN cl.won_status = 'lost' OR cl.active = false    THEN 'Lost'
                WHEN cl.type = 'opportunity'                        THEN 'In Progress'
                ELSE 'New'
            END`, 'status')
            .addSelect('COUNT(*)', 'count')
            .where('cl.create_date BETWEEN :start AND :end', { start, end })
            .groupBy('status')
            .getRawMany();

        const converted = byStatusRaw.find(s => s.status === 'Converted');
        const conversionRate = totalLeads > 0
            ? Math.round((Number(converted?.count ?? 0) / totalLeads) * 100)
            : 0;

        const bySourceRaw = await this.crmLeadRepo
            .createQueryBuilder('cl')
            .select(`COALESCE(us.name, cl.lead_source, 'Direct')`, 'source')
            .addSelect('COUNT(*)', 'leads')
            .addSelect(`SUM(CASE WHEN cl.won_status = 'won' THEN 1 ELSE 0 END)`, 'converted')
            .leftJoin(UtmSource, 'us', 'us.id = cl.source_id')
            .where('cl.create_date BETWEEN :start AND :end', { start, end })
            .groupBy(`COALESCE(us.name, cl.lead_source, 'Direct')`)
            .orderBy('leads', 'DESC')
            .getRawMany();

        const byStageRaw = await this.crmLeadRepo
            .createQueryBuilder('cl')
            .select(`cs.name->>'en_US'`, 'stage')
            .addSelect('COUNT(*)', 'count')
            .leftJoin(CrmStage, 'cs', 'cs.id = cl.stage_id')
            .where('cl.create_date BETWEEN :start AND :end', { start, end })
            .groupBy(`cs.name->>'en_US'`)
            .getRawMany();

        const conversionTrend = await this.crmLeadRepo
            .createQueryBuilder('cl')
            .select(`to_char(cl.create_date, 'Mon DD')`, 'date')
            .addSelect('COUNT(*)', 'leads')
            .addSelect(`SUM(CASE WHEN cl.won_status = 'won' THEN 1 ELSE 0 END)`, 'bookings')
            .where('cl.create_date BETWEEN :start AND :end', { start, end })
            .groupBy(`to_char(cl.create_date, 'Mon DD')`)
            .orderBy(`to_char(cl.create_date, 'Mon DD')`, 'ASC')
            .getRawMany();

        const avgConvert = await this.crmLeadRepo
            .createQueryBuilder('cl')
            .select('AVG(cl.days_to_convert)', 'avg')
            .where(`cl.won_status = 'won'`)
            .andWhere('cl.create_date BETWEEN :start AND :end', { start, end })
            .getRawOne();

        return {
            period,
            summary: {
                totalLeads,
                conversionRate,
                avgDaysToConvert: avgConvert?.avg ? Math.round(Number(avgConvert.avg)) : 0,
            },
            byStatus: byStatusRaw.map(s => ({
                name: s.status,
                value: Number(s.count),
            })),
            bySource: bySourceRaw.map(s => ({
                source: s.source,
                leads: Number(s.leads),
                converted: Number(s.converted),
            })),
            byStage: byStageRaw.map(s => ({
                stage: s.stage || 'Unknown',
                count: Number(s.count),
            })),
            conversionTrend: conversionTrend.map(t => ({
                date: t.date,
                leads: Number(t.leads),
                bookings: Number(t.bookings),
            })),
        };
    }

    /**
     * Communication Metrics
     */
    async getCommunicationMetrics(period: string = 'monthly', startDate?: string, endDate?: string) {
        const { start, end } = this.getDateRange(period, startDate, endDate);

        const channelsByType = await this.discussChannelRepo
            .createQueryBuilder('dc')
            .select('dc.channel_type', 'type')
            .addSelect('COUNT(*)', 'count')
            .where('dc.active = true')
            .groupBy('dc.channel_type')
            .getRawMany();

        const activeChatVolume = channelsByType.reduce((s, c) => s + Number(c.count), 0);

        const unansweredRaw = await this.discussChannelMemberRepo
            .createQueryBuilder('dcm')
            .select('COUNT(DISTINCT dcm.channel_id)', 'count')
            .innerJoin(DiscussChannel, 'dc', 'dc.id = dcm.channel_id AND dc.active = true')
            .where(`dcm.seen_message_id IS NULL OR dcm.seen_message_id < (
                SELECT COALESCE(MAX(mm.id), 0)
                FROM mail_message mm
                WHERE mm.res_id = dcm.channel_id
                AND mm.model = 'discuss.channel'
            )`)
            .getRawOne();

        const unansweredThreads = Number(unansweredRaw?.count ?? 0);

        const totalLeadMessages = await this.mailMessageRepo
            .createQueryBuilder('mm')
            .where(`mm.model = 'crm.lead'`)
            .andWhere('mm.date BETWEEN :start AND :end', { start, end })
            .getCount();

        const responseTimeTrend = await this.mailMessageRepo
            .createQueryBuilder('mm')
            .select(`to_char(mm.date, 'Mon DD')`, 'date')
            .addSelect('COUNT(DISTINCT mm.res_id)', 'activeLeads')
            .addSelect('COUNT(*)', 'messages')
            .where(`mm.model = 'crm.lead'`)
            .andWhere('mm.date BETWEEN :start AND :end', { start, end })
            .groupBy(`to_char(mm.date, 'Mon DD')`)
            .orderBy(`to_char(mm.date, 'Mon DD')`, 'ASC')
            .getRawMany();

        return {
            period,
            summary: {
                activeChatVolume,
                unansweredThreads,
                totalLeadMessages,
                avgFirstResponseMinutes: null,
            },
            byChannelType: channelsByType.map(c => ({
                type: c.type,
                count: Number(c.count),
            })),
            responseTimeTrend: responseTimeTrend.map(t => ({
                date: t.date,
                activeLeads: Number(t.activeLeads),
                messages: Number(t.messages),
            })),
        };
    }

    /**
     * Booking Performance
     */
    async getBookingPerformance(period: string = 'monthly', startDate?: string, endDate?: string) {
        const { start, end } = this.getDateRange(period, startDate, endDate);

        const CONFIRMED = `('confirmed','arrived','in_chair','in_payment','paid','visit_closed')`;
        const CANCELLED = `('cancel','cancelled')`;

        // COALESCE so appointments without a scheduled date are included via create_date
        const summary = await this.appointmentRepo
            .createQueryBuilder('o')
            .select('COUNT(*)', 'total')
            .addSelect(`SUM(CASE WHEN o.appointment_state IN ${CONFIRMED} THEN 1 ELSE 0 END)`, 'confirmed')
            .addSelect(`SUM(CASE WHEN o.appointment_state IN ${CANCELLED} THEN 1 ELSE 0 END)`, 'cancelled')
            .where(`${OPD_DATE} BETWEEN :start AND :end`, { start, end })
            .getRawOne();

        const total      = Number(summary?.total ?? 0);
        const confirmed  = Number(summary?.confirmed ?? 0);
        const cancelled  = Number(summary?.cancelled ?? 0);
        const cancellationRate = total > 0 ? Math.round((cancelled / total) * 100) : 0;

        const bySource = await this.appointmentRepo
            .createQueryBuilder('o')
            .select(`COALESCE(cs.name, 'Unknown')`, 'source')
            .addSelect('COUNT(*)', 'total')
            .addSelect(`SUM(CASE WHEN o.appointment_state IN ${CONFIRMED} THEN 1 ELSE 0 END)`, 'confirmed')
            .addSelect(`SUM(CASE WHEN o.appointment_state IN ${CANCELLED} THEN 1 ELSE 0 END)`, 'cancelled')
            .leftJoin(CampaginsSources, 'cs', 'cs.id = o.patient_source')
            .where(`${OPD_DATE} BETWEEN :start AND :end`, { start, end })
            .groupBy(`COALESCE(cs.name, 'Unknown')`)
            .orderBy('total', 'DESC')
            .getRawMany();

        const byChannel = await this.appointmentRepo
            .createQueryBuilder('o')
            .select(`COALESCE(o.consultation_channel, 'unknown')`, 'channel')
            .addSelect('COUNT(*)', 'count')
            .where(`${OPD_DATE} BETWEEN :start AND :end`, { start, end })
            .groupBy(`COALESCE(o.consultation_channel, 'unknown')`)
            .orderBy('count', 'DESC')
            .getRawMany();

        const dailyTrend = await this.appointmentRepo
            .createQueryBuilder('o')
            .select(`to_char(${OPD_DATE}, 'Mon DD')`, 'date')
            .addSelect('COUNT(*)', 'total')
            .addSelect(`SUM(CASE WHEN o.appointment_state IN ${CONFIRMED} THEN 1 ELSE 0 END)`, 'confirmed')
            .addSelect(`SUM(CASE WHEN o.appointment_state IN ${CANCELLED} THEN 1 ELSE 0 END)`, 'cancelled')
            .where(`${OPD_DATE} BETWEEN :start AND :end`, { start, end })
            .groupBy(`to_char(${OPD_DATE}, 'Mon DD')`)
            .orderBy(`to_char(${OPD_DATE}, 'Mon DD')`, 'ASC')
            .getRawMany();

        return {
            period,
            summary: {
                totalAppointments: total,
                confirmedAppointments: confirmed,
                cancelledAppointments: cancelled,
                cancellationRate,
                showRate: 100 - cancellationRate,
            },
            bySource: bySource.map(s => ({
                source: s.source,
                total: Number(s.total),
                confirmed: Number(s.confirmed),
                cancelled: Number(s.cancelled),
            })),
            byChannel: byChannel.map(c => ({
                channel: c.channel,
                count: Number(c.count),
            })),
            dailyTrend: dailyTrend.map(d => ({
                date: d.date,
                total: Number(d.total),
                confirmed: Number(d.confirmed),
                cancelled: Number(d.cancelled),
            })),
        };
    }

    /**
     * Appointment Analytics (Appointments tab)
     */
    async getAppointmentAnalytics(period: string = 'monthly', startDate?: string, endDate?: string) {
        const { start, end } = this.getDateRange(period, startDate, endDate);

        // Status distribution
        const byStatusRaw = await this.appointmentRepo.createQueryBuilder('app')
            .select('app.appointment_state', 'state')
            .addSelect('COUNT(*)', 'count')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .groupBy('app.appointment_state')
            .getRawMany();

        const byStatus: Record<string, number> = {};
        byStatusRaw.forEach(s => { byStatus[s.state || 'unknown'] = Number(s.count); });

        // Daily trend
        const byDateRaw = await this.appointmentRepo.createQueryBuilder('app')
            .select(`to_char(${APPT_DATE}, 'Mon DD')`, 'date')
            .addSelect(`to_char(${APPT_DATE}, 'YYYY-MM-DD')`, 'fullDate')
            .addSelect('COUNT(*)', 'count')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .groupBy(`to_char(${APPT_DATE}, 'Mon DD'), to_char(${APPT_DATE}, 'YYYY-MM-DD')`)
            .orderBy(`to_char(${APPT_DATE}, 'YYYY-MM-DD')`, 'ASC')
            .getRawMany();

        const total = byDateRaw.reduce((s, d) => s + Number(d.count), 0);

        // Doctor stats — appointment count, total minutes, occupancy rate
        const periodDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
        const maxMinutesPerDoctor = periodDays * 8 * 60;

        const doctorRaw = await this.appointmentRepo.createQueryBuilder('app')
            .select('app.doctor_id', 'doctorId')
            .addSelect('rp.name', 'name')
            .addSelect('COUNT(*)', 'appointmentCount')
            .addSelect(`SUM(CASE
                WHEN app.end_date IS NOT NULL AND app.appointment_date IS NOT NULL
                THEN GREATEST(1, EXTRACT(EPOCH FROM (app.end_date - app.appointment_date))/60)
                ELSE 15 END)`, 'totalMinutes')
            .leftJoin(DoctorModel, 'dm', 'dm.id = app.doctor_id')
            .leftJoin(ResPartner, 'rp', 'rp.id = dm.partner_id')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .andWhere('app.doctor_id IS NOT NULL')
            .groupBy('app.doctor_id').addGroupBy('rp.name')
            .orderBy('COUNT(*)', 'DESC')
            .getRawMany();

        const doctorStats = doctorRaw.map(d => ({
            id: d.doctorId,
            name: d.name || `Doctor ${d.doctorId}`,
            appointmentCount: Number(d.appointmentCount),
            totalMinutes: Math.round(Number(d.totalMinutes)),
            occupancyRate: Math.min(100, Math.round((Number(d.totalMinutes) / maxMinutesPerDoctor) * 100)),
        }));

        // Patient stats
        const uniquePatientsRaw = await this.appointmentRepo.createQueryBuilder('app')
            .select('COUNT(DISTINCT app.patient_id)', 'count')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .andWhere('app.patient_id IS NOT NULL')
            .getRawOne();

        const newPatientsRaw = await this.patientRepo.createQueryBuilder('p')
            .select('COUNT(*)', 'count')
            .where('p.create_date BETWEEN :start AND :end', { start, end })
            .getRawOne();

        const frequentRaw = await this.appointmentRepo.createQueryBuilder('app')
            .select('app.patient_id', 'patientId')
            .addSelect(`TRIM(COALESCE(pm.first_name, '') || ' ' || COALESCE(pm.last_name, COALESCE(app.patient_name, '')))`, 'name')
            .addSelect('COUNT(*)', 'count')
            .leftJoin(PatientModel, 'pm', 'pm.id = app.patient_id')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .andWhere('app.patient_id IS NOT NULL')
            .groupBy('app.patient_id').addGroupBy('pm.first_name').addGroupBy('pm.last_name').addGroupBy('app.patient_name')
            .having('COUNT(*) > 1')
            .orderBy('count', 'DESC')
            .limit(5)
            .getRawMany();

        const uniquePatients = Number(uniquePatientsRaw?.count ?? 0);
        const newPatients    = Number(newPatientsRaw?.count ?? 0);

        return {
            period,
            appointmentStats: {
                total,
                byStatus,
                byDate: byDateRaw.map(d => ({ date: d.date, fullDate: d.fullDate, count: Number(d.count) })),
                averageDuration: 15,
            },
            doctorStats,
            patientStats: {
                totalPatients: total,
                uniquePatients,
                newPatients,
                returningPatients: Math.max(0, uniquePatients - newPatients),
                frequentVisitors: frequentRaw.map(v => ({
                    name: v.name || `Patient ${v.patientId}`,
                    count: Number(v.count),
                })),
            },
        };
    }

    async getFullDashboard(period: string = 'monthly', startDate?: string, endDate?: string) {
        const [financial, services, patients, performance, appointments, leads, communication, bookingPerformance] = await Promise.all([
            this.getFinancialOverview(period, startDate, endDate),
            this.getServicesAndInventory(period, startDate, endDate),
            this.getPatientAnalytics(period, startDate, endDate),
            this.getPerformanceTracking(),
            this.getAppointmentAnalytics(period, startDate, endDate),
            this.getLeadAnalytics(period, startDate, endDate),
            this.getCommunicationMetrics(period, startDate, endDate),
            this.getBookingPerformance(period, startDate, endDate),
        ]);
        return { financial, services, patients, performance, appointments, leads, communication, bookingPerformance };
    }
}
