import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { AccountMove } from '../entities/entities/AccountMove.entity';
import { AccountMoveLine } from '../entities/entities/AccountMoveLine.entity';
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
import { ServiceTable } from '../entities/entities/ServiceTable.entity';
import { CrmLeadWebsiteOrderLine } from '../entities/entities/CrmLeadWebsiteOrderLine.entity';
import { MoraSmsLog } from '../entities/entities/MoraSmsLog.entity';

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
        @InjectRepository(OpdRegistrationModel)
        private readonly appointmentRepo: Repository<OpdRegistrationModel>,
        @InjectRepository(PatientModel)
        private readonly patientRepo: Repository<PatientModel>,
        @InjectRepository(StockMove)
        private readonly stockMoveRepo: Repository<StockMove>,
        @InjectRepository(StockQuant)
        private readonly stockQuantRepo: Repository<StockQuant>,
        @InjectRepository(CrmLead)
        private readonly crmLeadRepo: Repository<CrmLead>,
        @InjectRepository(DiscussChannel)
        private readonly discussChannelRepo: Repository<DiscussChannel>,
        @InjectRepository(DiscussChannelMember)
        private readonly discussChannelMemberRepo: Repository<DiscussChannelMember>,
        @InjectRepository(MailMessage)
        private readonly mailMessageRepo: Repository<MailMessage>,
        @InjectRepository(ClinicBranch)
        private readonly clinicBranchRepo: Repository<ClinicBranch>,
        @InjectRepository(ServiceTable)
        private readonly serviceTableRepo: Repository<ServiceTable>,
        @InjectRepository(CrmLeadWebsiteOrderLine)
        private readonly leadOrderLineRepo: Repository<CrmLeadWebsiteOrderLine>,
        @InjectRepository(MoraSmsLog)
        private readonly moraSmsLogRepo: Repository<MoraSmsLog>,
    ) { }

    private getDateRange(period: string, startDate?: string, endDate?: string): { start: Date, end: Date } {
        // All dates are built as UTC midnight so the DB (UTC) receives the correct day boundaries
        // regardless of the server's local timezone (e.g. UTC+3 Saudi Arabia).
        const todayUTC = new Date();
        const yyyy = todayUTC.getUTCFullYear();
        const mm   = todayUTC.getUTCMonth();
        const dd   = todayUTC.getUTCDate();

        if (period === 'custom' && startDate && endDate) {
            // startDate/endDate arrive as 'YYYY-MM-DD' strings — parse as UTC
            const [sy, sm, sd] = startDate.split('-').map(Number);
            const [ey, em, ed] = endDate.split('-').map(Number);
            return {
                start: new Date(Date.UTC(sy, sm - 1, sd, 0, 0, 0, 0)),
                end:   new Date(Date.UTC(ey, em - 1, ed, 23, 59, 59, 999)),
            };
        }

        const end = new Date(Date.UTC(yyyy, mm, dd, 23, 59, 59, 999));

        if (period === 'daily') {
            return { start: new Date(Date.UTC(yyyy, mm, dd, 0, 0, 0, 0)), end };
        } else if (period === 'weekly') {
            return { start: new Date(Date.UTC(yyyy, mm, dd - 6, 0, 0, 0, 0)), end };
        } else {
            return { start: new Date(Date.UTC(yyyy, mm, dd - 29, 0, 0, 0, 0)), end };
        }
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

        // 1a. Collection-rate basis (cash view): header amount_total/residual on invoices+receipts.
        const globalTotals = await this.accountMoveRepo.createQueryBuilder('inv')
            .select(`SUM(CASE WHEN inv.move_type IN ('out_invoice','out_receipt') THEN inv.amount_total ELSE 0 END)`, 'totalForRate')
            .addSelect(`SUM(CASE WHEN inv.move_type IN ('out_invoice','out_receipt') THEN inv.amount_total - COALESCE(inv.amount_residual, 0) ELSE 0 END)`, 'paidAmount')
            .addSelect(`SUM(CASE WHEN inv.move_type IN ('out_invoice','out_receipt') THEN COALESCE(inv.amount_residual, 0) ELSE 0 END)`, 'pendingAmount')
            .where("inv.move_type IN ('out_invoice','out_receipt') AND inv.state = 'posted'")
            .andWhere('inv.invoice_date BETWEEN :start AND :end', { start, end })
            .getRawOne();

        // 1b. Total revenue = real recognised revenue from the General Ledger income accounts
        // (net credit). This matches Odoo's P&L and is immune to invoices whose product lines were
        // booked to the wrong account type (liability/cash) — their header amount_untaxed is corrupted.
        const incomeRevenue = await this.accountMoveLineRepo.createQueryBuilder('aml')
            .select('SUM(aml.credit - aml.debit)', 'revenue')
            .innerJoin('account_move', 'am', 'am.id = aml.move_id')
            .innerJoin('account_account', 'aa', 'aa.id = aml.account_id')
            .where("am.move_type IN ('out_invoice','out_receipt','out_refund') AND am.state = 'posted'")
            .andWhere("aa.account_type IN ('income','income_other')")
            .andWhere('am.invoice_date BETWEEN :start AND :end', { start, end })
            .getRawOne();

        const gTotalRevenue  = Math.round((Number(incomeRevenue?.revenue) || 0) * 100) / 100;
        const gTotalForRate  = Number(globalTotals?.totalForRate) || 0;
        // Collection (cash) view — real money collected vs outstanding, both VAT-inclusive,
        // straight from amount_total / amount_residual. Rate = collected ÷ invoiced (same units).
        const gTotalPaid    = Math.round(Number(globalTotals?.paidAmount)    || 0);
        const gTotalPending = Math.round(Number(globalTotals?.pendingAmount) || 0);
        const collectedRatio = gTotalForRate > 0 ? gTotalPaid / gTotalForRate : 0;

        // Payment status breakdown for selected period
        const paymentStateRaw = await this.accountMoveRepo.createQueryBuilder('inv')
            .select('inv.payment_state', 'paymentState')
            .addSelect('COUNT(*)', 'cnt')
            .addSelect('SUM(inv.amount_untaxed)', 'untaxed')
            .addSelect('SUM(inv.amount_total)', 'total')
            .addSelect('SUM(inv.amount_total - COALESCE(inv.amount_residual, 0))', 'collected')
            .addSelect('SUM(COALESCE(inv.amount_residual, 0))', 'outstanding')
            .where("inv.move_type IN ('out_invoice','out_receipt') AND inv.state = 'posted'")
            .andWhere('inv.invoice_date BETWEEN :start AND :end', { start, end })
            .groupBy('inv.payment_state')
            .getRawMany();

        const stateMap: Record<string, any> = {};
        paymentStateRaw.forEach(r => { stateMap[r.paymentState] = r; });

        // Revenue per payment_state from GL income accounts — keeps the breakdown consistent
        // with the headline total (paid + inPayment + partial + notPaid = totalRevenue).
        const incomeByStateRaw = await this.accountMoveLineRepo.createQueryBuilder('aml')
            .select('am.payment_state', 'paymentState')
            .addSelect('SUM(aml.credit - aml.debit)', 'revenue')
            .innerJoin('account_move', 'am', 'am.id = aml.move_id')
            .innerJoin('account_account', 'aa', 'aa.id = aml.account_id')
            .where("am.move_type IN ('out_invoice','out_receipt') AND am.state = 'posted'")
            .andWhere("aa.account_type IN ('income','income_other')")
            .andWhere('am.invoice_date BETWEEN :start AND :end', { start, end })
            .groupBy('am.payment_state')
            .getRawMany();
        const incomeByState: Record<string, number> = {};
        incomeByStateRaw.forEach(r => { incomeByState[r.paymentState] = Number(r.revenue) || 0; });

        const mkState = (key: string) => ({
            count:       Number(stateMap[key]?.cnt        ?? 0),
            untaxed:     Math.round(incomeByState[key]    ?? 0),
            total:       Math.round(Number(stateMap[key]?.total      ?? 0)),
            collected:   Math.round(Number(stateMap[key]?.collected  ?? 0)),
            outstanding: Math.round(Number(stateMap[key]?.outstanding ?? 0)),
        });

        // All-time overdue: posted invoices with residual > 0 past their due date
        const overdueRaw = await this.accountMoveRepo.createQueryBuilder('inv')
            .select('COUNT(*)', 'cnt')
            .addSelect('SUM(COALESCE(inv.amount_residual, 0))', 'totalOutstanding')
            .addSelect('SUM(inv.amount_total)', 'totalInvoiced')
            .where("inv.move_type IN ('out_invoice','out_receipt') AND inv.state = 'posted'")
            .andWhere('inv.amount_residual > 0')
            .andWhere('(inv.invoice_date_due IS NULL OR inv.invoice_date_due < CURRENT_DATE)')
            .getRawOne();

        const overdueInvoices = await this.accountMoveRepo.createQueryBuilder('inv')
            .select('inv.name', 'name')
            .addSelect('inv.invoice_date', 'invoiceDate')
            .addSelect('inv.invoice_date_due', 'dueDate')
            .addSelect('ROUND(inv.amount_total::numeric, 2)', 'total')
            .addSelect('ROUND(COALESCE(inv.amount_residual, 0)::numeric, 2)', 'outstanding')
            .addSelect('inv.payment_state', 'paymentState')
            .where("inv.move_type IN ('out_invoice','out_receipt') AND inv.state = 'posted'")
            .andWhere('inv.amount_residual > 0')
            .andWhere('(inv.invoice_date_due IS NULL OR inv.invoice_date_due < CURRENT_DATE)')
            .orderBy('inv.invoice_date_due', 'ASC')
            .limit(20)
            .getRawMany();

        // 2. Distribute global totals by appointment share per branch
        apptByBranch.forEach(ac => {
            const bid   = Number(ac.branchId);
            const share = totalAppts > 0 ? Number(ac.count) / totalAppts : 0;
            const stats = branchStatsMap.get(bid);
            if (stats) {
                stats.totalRevenue    = Math.round(gTotalRevenue * share);
                stats.paidInvoices    = Math.round(gTotalPaid    * share);
                stats.pendingInvoices = Math.round(gTotalPending * share);
            }
        });

        // 3. Build branch revenue array (after totals are applied)
        const globalCollectionRate = gTotalForRate > 0
            ? Math.round((gTotalPaid / gTotalForRate) * 100)
            : 0;
        const branchRevenue = Array.from(branchStatsMap.values()).map(b => ({
            ...b,
            collectionRate: globalCollectionRate,
            revenuePerAppointment: b.appointmentCount > 0 ? Math.round(b.totalRevenue / b.appointmentCount) : 0,
        }));
        const ranked = [...branchRevenue].sort((a, b) => b.totalRevenue - a.totalRevenue);

        // 4. Daily trend — distribute daily revenue by that day's appointment share
        const dailyRaw = await this.appointmentRepo.createQueryBuilder('app')
            .select(`to_char(${APPT_DATE}, 'YYYY-MM-DD')`, 'date')
            .addSelect('app.branch_id', 'branchId')
            .addSelect('COUNT(*)', 'appointments')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .andWhere('app.branch_id IS NOT NULL')
            .groupBy(`to_char(${APPT_DATE}, 'YYYY-MM-DD')`).addGroupBy('app.branch_id')
            .orderBy('date', 'ASC')
            .getRawMany();

        const trendMap = new Map<string, any[]>();
        dailyRaw.forEach(row => {
            if (!trendMap.has(row.date)) trendMap.set(row.date, []);
            const bid         = Number(row.branchId);
            const branchShare = totalAppts > 0 ? Number(row.appointments) / totalAppts : 0;
            trendMap.get(row.date).push({
                branchId: bid,
                branchName: branchMap.get(bid) || `Branch ${bid}`,
                revenue: Math.round(gTotalRevenue * branchShare),
                appointments: Number(row.appointments),
            });
        });

        return {
            period,
            summary: {
                totalRevenue: gTotalRevenue,
                totalPaid:    gTotalPaid,
                totalPending: gTotalPending,
                overallCollectionRate: gTotalForRate > 0
                    ? Math.round((gTotalPaid / gTotalForRate) * 100)
                    : 0,
            },
            paymentBreakdown: {
                paid:       mkState('paid'),
                inPayment:  mkState('in_payment'),
                partial:    mkState('partial'),
                notPaid:    mkState('not_paid'),
            },
            overdue: {
                count:            Number(overdueRaw?.cnt ?? 0),
                totalOutstanding: Math.round(Number(overdueRaw?.totalOutstanding ?? 0)),
                totalInvoiced:    Math.round(Number(overdueRaw?.totalInvoiced    ?? 0)),
                invoices:         overdueInvoices.map(inv => ({
                    name:         inv.name,
                    invoiceDate:  inv.invoiceDate,
                    dueDate:      inv.dueDate,
                    total:        Number(inv.total),
                    outstanding:  Number(inv.outstanding),
                    paymentState: inv.paymentState,
                })),
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
            .innerJoin('account_move', 'am', "am.id = aml.move_id AND am.move_type IN ('out_invoice','out_receipt')")
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

        // New patients = registered (created) in this period — matches Odoo's Patients list
        const newPatientsCount = await this.patientRepo.createQueryBuilder('pm')
            .where('pm.create_date BETWEEN :start AND :end', { start, end })
            .getCount();

        // Unique patients who had appointments in this period
        const periodPatientStats = await this.appointmentRepo.createQueryBuilder('app')
            .select('COUNT(DISTINCT app.patient_id)', 'total')
            .addSelect(
                `COUNT(DISTINCT CASE WHEN pm.create_date < :start THEN app.patient_id END)`,
                'returningPatients'
            )
            .leftJoin(PatientModel, 'pm', 'pm.id = app.patient_id')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .setParameters({ start, end })
            .getRawOne();

        const totalInPeriod  = Number(periodPatientStats?.total ?? 0);
        const returningCount = Number(periodPatientStats?.returningPatients ?? 0);

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

        // Average appointment duration = end_date - appointment_date (in minutes).
        // Queried all-time (no period filter) because end_date is only set on completed
        // appointments and recent periods often have none — the clinic slot length is fixed.
        const durationStats = await this.appointmentRepo.createQueryBuilder('app')
            .select(
                `ROUND(AVG(EXTRACT(EPOCH FROM (app.end_date - app.appointment_date)) / 60))`,
                'avgDuration'
            )
            .where('app.end_date IS NOT NULL')
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
                .addSelect(`SUM(CASE WHEN app.missed_state = 'cancelled' THEN 1 ELSE 0 END)`, 'noShows')
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
                newPatientPercentage: totalInPeriod > 0 ? Math.round(((totalInPeriod - returningCount) / totalInPeriod) * 100) : 0,
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
     * Performance Tracking — based on service_table (actual procedures per appointment)
     */
    async getPerformanceTracking(period: string = 'daily', startDate?: string, endDate?: string) {
        const { start, end } = this.getDateRange(period, startDate, endDate);

        // Procedures by appointment state
        const procByState = await this.serviceTableRepo.createQueryBuilder('st')
            .select('orm.appointment_state', 'state')
            .addSelect('orm.missed_state', 'missedState')
            .addSelect('COUNT(st.id)', 'count')
            .innerJoin(OpdRegistrationModel, 'orm', 'orm.id = st.rec_id')
            .where(`${APPT_DATE.replace(/\bapp\b/g, 'orm')} BETWEEN :start AND :end`, { start, end })
            .groupBy('orm.appointment_state')
            .addGroupBy('orm.missed_state')
            .getRawMany();

        let total = 0, completed = 0, inProgress = 0, pending = 0, cancelled = 0;
        for (const row of procByState) {
            const n = Number(row.count);
            total += n;
            if (['paid', 'visit_closed'].includes(row.state))                   completed  += n;
            else if (['in_chair', 'arrived', 'in_payment'].includes(row.state)) inProgress += n;
            else if (row.state === 'confirmed')                                  pending    += n;
            if (row.missedState === 'cancelled')                                 cancelled  += n;
        }

        // Appointments with no procedures that are cancelled (no-shows) — count from appt table
        const cancelledAppts = await this.appointmentRepo.createQueryBuilder('app')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .andWhere("app.missed_state = 'cancelled'")
            .getCount();

        const statusOverview = {
            totalProcedures: total,
            completed,
            inProgress,
            pending,
            cancelled,
            noShows: cancelledAppts,
            completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        };

        // Doctor KPIs from service_table — real procedure counts + revenue per doctor
        const doctorProcStats = await this.serviceTableRepo.createQueryBuilder('st')
            .select('orm.doctor_id', 'doctorId')
            .addSelect('rp.name', 'doctorName')
            .addSelect('COUNT(st.id)', 'totalProcedures')
            .addSelect(`SUM(CASE WHEN orm.appointment_state IN ('paid','visit_closed') THEN 1 ELSE 0 END)`, 'completedProcedures')
            .addSelect('SUM(st.sale_price * st.quantity)', 'revenue')
            .addSelect(`AVG(CASE WHEN orm.end_date IS NOT NULL AND orm.appointment_date IS NOT NULL
                THEN EXTRACT(EPOCH FROM (orm.end_date - orm.appointment_date)) / 60 END)`, 'avgProcedureMinutes')
            .innerJoin(OpdRegistrationModel, 'orm', 'orm.id = st.rec_id')
            .leftJoin(DoctorModel, 'dm', 'dm.id = orm.doctor_id')
            .leftJoin(ResPartner, 'rp', 'rp.id = dm.partner_id')
            .where(`${APPT_DATE.replace(/\bapp\b/g, 'orm')} BETWEEN :start AND :end`, { start, end })
            .andWhere('orm.doctor_id IS NOT NULL')
            .groupBy('orm.doctor_id')
            .addGroupBy('rp.name')
            .orderBy('COUNT(st.id)', 'DESC')
            .getRawMany();

        const doctorKPIs = doctorProcStats.map(s => ({
            doctorName: s.doctorName || `Doctor ${s.doctorId}`,
            totalProcedures: Number(s.totalProcedures),
            completedProcedures: Number(s.completedProcedures),
            completionRate: Number(s.totalProcedures) > 0
                ? Math.round((Number(s.completedProcedures) / Number(s.totalProcedures)) * 100)
                : 0,
            revenue: Math.round(Number(s.revenue) || 0),
            avgProcedureTime: s.avgProcedureMinutes ? Math.round(Number(s.avgProcedureMinutes)) : null,
        }));

        // Hourly distribution from appointments
        const hourlyDistribution = await this.appointmentRepo.createQueryBuilder('app')
            .select(`to_char(${APPT_DATE}, 'HH24:00')`, 'hour')
            .addSelect('COUNT(*)', 'appointments')
            .addSelect(`SUM(CASE WHEN app.appointment_state IN ('paid','visit_closed') THEN 1 ELSE 0 END)`, 'completed')
            .addSelect(`SUM(CASE WHEN app.appointment_state IN ('in_chair','arrived') THEN 1 ELSE 0 END)`, 'inProgress')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .groupBy(`to_char(${APPT_DATE}, 'HH24:00')`)
            .orderBy('hour', 'ASC')
            .getRawMany();

        return {
            statusOverview,
            doctorKPIs,
            hourlyDistribution: hourlyDistribution.map(h => ({
                hour: h.hour,
                appointments: Number(h.appointments),
                completed: Number(h.completed),
                inProgress: Number(h.inProgress),
            })),
        };
    }

    /**
     * Lead Analytics
     * Leads in this system = website booking orders. Each lead has order_total
     * and order_status. Opportunities = leads that were converted by the sales team.
     */
    async getLeadAnalytics(period: string = 'monthly', startDate?: string, endDate?: string) {
        const { start, end } = this.getDateRange(period, startDate, endDate);

        // Total leads + order value in period
        const totalsRaw = await this.crmLeadRepo.createQueryBuilder('cl')
            .select('COUNT(*)', 'totalLeads')
            .addSelect(`SUM(CASE WHEN cl.type = 'opportunity' THEN 1 ELSE 0 END)`, 'opportunities')
            .addSelect(`SUM(CASE WHEN cl.active = false THEN 1 ELSE 0 END)`, 'lost')
            .addSelect('SUM(COALESCE(cl.order_total, 0))', 'totalOrderValue')
            .addSelect(`SUM(CASE WHEN cl.order_status = 'pending' THEN COALESCE(cl.order_total, 0) ELSE 0 END)`, 'pendingOrderValue')
            .where('cl.create_date BETWEEN :start AND :end', { start, end })
            .getRawOne();

        const totalLeads      = Number(totalsRaw?.totalLeads   ?? 0);
        const opportunities   = Number(totalsRaw?.opportunities ?? 0);
        const lost            = Number(totalsRaw?.lost          ?? 0);
        const newLeads        = totalLeads - opportunities - lost;
        const totalOrderValue = Math.round(Number(totalsRaw?.totalOrderValue   ?? 0));
        const pendingOrderValue = Math.round(Number(totalsRaw?.pendingOrderValue ?? 0));
        const conversionRate  = totalLeads > 0 ? Math.round((opportunities / totalLeads) * 100) : 0;

        // Status breakdown
        const byStatus = [
            { name: 'New',         value: newLeads      },
            { name: 'In Progress', value: opportunities  },
            { name: 'Lost',        value: lost           },
        ].filter(s => s.value > 0);

        // By source — UTM source → medium → lead_source field → Direct
        const bySourceRaw = await this.crmLeadRepo.createQueryBuilder('cl')
            .select(`COALESCE(us.name, um.name, cl.lead_source, 'Direct')`, 'source')
            .addSelect('COUNT(*)', 'leads')
            .addSelect(`SUM(CASE WHEN cl.type = 'opportunity' THEN 1 ELSE 0 END)`, 'converted')
            .addSelect('SUM(COALESCE(cl.order_total, 0))', 'orderValue')
            .leftJoin(UtmSource, 'us', 'us.id = cl.source_id')
            .leftJoin('utm_medium', 'um', 'um.id = cl.medium_id')
            .where('cl.create_date BETWEEN :start AND :end', { start, end })
            .groupBy(`COALESCE(us.name, um.name, cl.lead_source, 'Direct')`)
            .orderBy('leads', 'DESC')
            .getRawMany();

        // By stage
        const byStageRaw = await this.crmLeadRepo.createQueryBuilder('cl')
            .select(`cs.name->>'en_US'`, 'stage')
            .addSelect('COUNT(*)', 'count')
            .leftJoin(CrmStage, 'cs', 'cs.id = cl.stage_id')
            .where('cl.create_date BETWEEN :start AND :end', { start, end })
            .groupBy(`cs.name->>'en_US'`)
            .orderBy('count', 'DESC')
            .getRawMany();

        // Daily trend — ordered by actual date not formatted string
        const conversionTrend = await this.crmLeadRepo.createQueryBuilder('cl')
            .select(`to_char(cl.create_date, 'Mon DD')`, 'date')
            .addSelect(`to_char(cl.create_date, 'YYYY-MM-DD')`, 'fullDate')
            .addSelect('COUNT(*)', 'leads')
            .addSelect(`SUM(CASE WHEN cl.type = 'opportunity' THEN 1 ELSE 0 END)`, 'bookings')
            .addSelect('SUM(COALESCE(cl.order_total, 0))', 'orderValue')
            .where('cl.create_date BETWEEN :start AND :end', { start, end })
            .groupBy(`to_char(cl.create_date, 'Mon DD'), to_char(cl.create_date, 'YYYY-MM-DD')`)
            .orderBy(`to_char(cl.create_date, 'YYYY-MM-DD')`, 'ASC')
            .getRawMany();

        // Top booked services from website order lines linked to leads in this period
        const topServicesRaw = await this.leadOrderLineRepo.createQueryBuilder('ol')
            .select('ol.product_name', 'productName')
            .addSelect('SUM(ol.quantity)', 'totalQty')
            .addSelect('SUM(ol.total)', 'totalRevenue')
            .innerJoin(CrmLead, 'cl', 'cl.id = ol.lead_id')
            .where('cl.create_date BETWEEN :start AND :end', { start, end })
            .andWhere('ol.product_name IS NOT NULL')
            .groupBy('ol.product_name')
            .orderBy('SUM(ol.total)', 'DESC')
            .limit(10)
            .getRawMany();

        return {
            period,
            summary: {
                totalLeads,
                newLeads,
                inProgressLeads: opportunities,
                lostLeads: lost,
                conversionRate,
                totalOrderValue,
                pendingOrderValue,
            },
            byStatus,
            bySource: bySourceRaw.map(s => ({
                source: s.source,
                leads: Number(s.leads),
                converted: Number(s.converted),
                orderValue: Math.round(Number(s.orderValue ?? 0)),
            })),
            byStage: byStageRaw.map(s => ({
                stage: s.stage || 'Unknown',
                count: Number(s.count),
            })),
            conversionTrend: conversionTrend.map(t => ({
                date: t.date,
                fullDate: t.fullDate,
                leads: Number(t.leads),
                bookings: Number(t.bookings),
                orderValue: Math.round(Number(t.orderValue ?? 0)),
            })),
            topBookedServices: topServicesRaw.map(s => ({
                productName: s.productName,
                totalQty: Number(s.totalQty ?? 0),
                totalRevenue: Math.round(Number(s.totalRevenue ?? 0)),
            })),
        };
    }

    /**
     * Communication Metrics
     * Sources: discuss_channel (chats), mail_message (chatter on leads/appointments),
     *          mora_sms_log (appointment SMS reminders — all via opd.registration.model)
     */
    async getCommunicationMetrics(period: string = 'monthly', startDate?: string, endDate?: string) {
        const { start, end } = this.getDateRange(period, startDate, endDate);

        // Channels by type (all active, not period-filtered — it's a snapshot)
        const channelsByType = await this.discussChannelRepo
            .createQueryBuilder('dc')
            .select('dc.channel_type', 'type')
            .addSelect('COUNT(*)', 'count')
            .where('dc.active = true')
            .groupBy('dc.channel_type')
            .getRawMany();

        const totalChannels = channelsByType.reduce((s, c) => s + Number(c.count), 0);

        // Unanswered threads — channels with messages unseen by at least one member
        const unansweredRaw = await this.discussChannelMemberRepo
            .createQueryBuilder('dcm')
            .select('COUNT(DISTINCT dcm.channel_id)', 'count')
            .innerJoin(DiscussChannel, 'dc', 'dc.id = dcm.channel_id AND dc.active = true')
            .where(`dcm.seen_message_id IS NULL OR dcm.seen_message_id < (
                SELECT COALESCE(MAX(mm.id), 0)
                FROM mail_message mm
                WHERE mm.res_id = dcm.channel_id AND mm.model = 'discuss.channel'
            )`)
            .getRawOne();

        const unansweredThreads = Number(unansweredRaw?.count ?? 0);

        // Messages this period by relevant model
        const msgCountsRaw = await this.mailMessageRepo
            .createQueryBuilder('mm')
            .select('mm.model', 'model')
            .addSelect('COUNT(*)', 'count')
            .where('mm.date BETWEEN :start AND :end', { start, end })
            .andWhere(`mm.model IN ('crm.lead', 'opd.registration.model', 'patient.model')`)
            .groupBy('mm.model')
            .getRawMany();

        const msgByModel = Object.fromEntries(msgCountsRaw.map(r => [r.model, Number(r.count)]));
        const leadMessages        = msgByModel['crm.lead']                 ?? 0;
        const appointmentMessages = msgByModel['opd.registration.model']   ?? 0;
        const patientMessages     = msgByModel['patient.model']            ?? 0;

        // SMS sent via Mora provider (all go to appointments)
        const smsRaw = await this.moraSmsLogRepo.createQueryBuilder('sms')
            .select('COUNT(*)', 'total')
            .addSelect(`SUM(CASE WHEN sms.status = 'success' THEN 1 ELSE 0 END)`, 'success')
            .where('sms.create_date BETWEEN :start AND :end', { start, end })
            .getRawOne();

        const smsSent        = Number(smsRaw?.total   ?? 0);
        const smsDelivered   = Number(smsRaw?.success ?? 0);
        const smsSuccessRate = smsSent > 0 ? Math.round((smsDelivered / smsSent) * 100) : 0;

        // Daily trend — messages per day across leads + appointments + SMS
        const msgTrendRaw = await this.mailMessageRepo
            .createQueryBuilder('mm')
            .select(`to_char(mm.date, 'YYYY-MM-DD')`, 'fullDate')
            .addSelect(`to_char(mm.date, 'Mon DD')`, 'date')
            .addSelect(`SUM(CASE WHEN mm.model = 'crm.lead'               THEN 1 ELSE 0 END)`, 'leadMessages')
            .addSelect(`SUM(CASE WHEN mm.model = 'opd.registration.model' THEN 1 ELSE 0 END)`, 'appointmentMessages')
            .addSelect('COUNT(*)', 'total')
            .where('mm.date BETWEEN :start AND :end', { start, end })
            .andWhere(`mm.model IN ('crm.lead', 'opd.registration.model', 'patient.model')`)
            .groupBy(`to_char(mm.date, 'YYYY-MM-DD'), to_char(mm.date, 'Mon DD')`)
            .orderBy(`to_char(mm.date, 'YYYY-MM-DD')`, 'ASC')
            .getRawMany();

        // SMS by day — merge into trend
        const smsTrendRaw = await this.moraSmsLogRepo.createQueryBuilder('sms')
            .select(`to_char(sms.create_date, 'YYYY-MM-DD')`, 'fullDate')
            .addSelect('COUNT(*)', 'smsSent')
            .where('sms.create_date BETWEEN :start AND :end', { start, end })
            .groupBy(`to_char(sms.create_date, 'YYYY-MM-DD')`)
            .getRawMany();

        const smsMap = new Map(smsTrendRaw.map(r => [r.fullDate, Number(r.smsSent)]));

        return {
            period,
            summary: {
                totalChannels,
                unansweredThreads,
                leadMessages,
                appointmentMessages,
                patientMessages,
                totalMessages: leadMessages + appointmentMessages + patientMessages,
                smsSent,
                smsDelivered,
                smsSuccessRate,
            },
            byChannelType: channelsByType.map(c => ({
                type: c.type,
                count: Number(c.count),
            })),
            dailyTrend: msgTrendRaw.map(t => ({
                date: t.date,
                fullDate: t.fullDate,
                leadMessages:        Number(t.leadMessages),
                appointmentMessages: Number(t.appointmentMessages),
                totalMessages:       Number(t.total),
                smsSent:             smsMap.get(t.fullDate) ?? 0,
            })),
        };
    }

    /**
     * Booking Performance
     */
    async getBookingPerformance(period: string = 'monthly', startDate?: string, endDate?: string) {
        const { start, end } = this.getDateRange(period, startDate, endDate);

        const CONFIRMED = `('confirmed','arrived','in_chair','in_payment','paid','visit_closed')`;

        // COALESCE so appointments without a scheduled date are included via create_date
        const summary = await this.appointmentRepo
            .createQueryBuilder('o')
            .select('COUNT(*)', 'total')
            .addSelect(`SUM(CASE WHEN o.appointment_state IN ${CONFIRMED} THEN 1 ELSE 0 END)`, 'confirmed')
            .addSelect(`SUM(CASE WHEN o.missed_state = 'cancelled' THEN 1 ELSE 0 END)`, 'cancelled')
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
            .addSelect(`SUM(CASE WHEN o.missed_state = 'cancelled' THEN 1 ELSE 0 END)`, 'cancelled')
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
            .addSelect(`SUM(CASE WHEN o.missed_state = 'cancelled' THEN 1 ELSE 0 END)`, 'cancelled')
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
        // Occupancy uses distinct working days (not period_days) as denominator so it reflects
        // how busy the doctor was on the days they actually worked.
        const doctorRaw = await this.appointmentRepo.createQueryBuilder('app')
            .select('app.doctor_id', 'doctorId')
            .addSelect('rp.name', 'name')
            .addSelect('COUNT(*)', 'appointmentCount')
            .addSelect(
                `COUNT(DISTINCT DATE(${APPT_DATE}))`,
                'distinctDays'
            )
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

        const doctorStats = doctorRaw.map(d => {
            const totalMinutes  = Math.round(Number(d.totalMinutes));
            const distinctDays  = Math.max(1, Number(d.distinctDays));
            const maxMinutes    = distinctDays * 8 * 60;
            return {
                id: d.doctorId,
                name: d.name || `Doctor ${d.doctorId}`,
                appointmentCount: Number(d.appointmentCount),
                totalMinutes,
                occupancyRate: Math.min(100, Math.round((totalMinutes / maxMinutes) * 100)),
            };
        });

        // Patient stats — unique + returning from appointment data
        // returning = had appointment this period AND registered before it
        const apptPatientStats = await this.appointmentRepo.createQueryBuilder('app')
            .select('COUNT(DISTINCT app.patient_id)', 'uniquePatients')
            .addSelect(
                `COUNT(DISTINCT CASE WHEN pm.create_date < :start THEN app.patient_id END)`,
                'returningPatients'
            )
            .leftJoin(PatientModel, 'pm', 'pm.id = app.patient_id')
            .where(`${APPT_DATE} BETWEEN :start AND :end`, { start, end })
            .andWhere('app.patient_id IS NOT NULL')
            .setParameters({ start, end })
            .getRawOne();

        // new patients = registered in this period (matches Patients tab)
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

        const uniquePatients    = Number(apptPatientStats?.uniquePatients   ?? 0);
        const returningPatients = Number(apptPatientStats?.returningPatients ?? 0);
        const newPatients       = Number(newPatientsRaw?.count ?? 0);

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
                uniquePatients,
                newPatients,
                returningPatients,
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
            this.getPerformanceTracking(period, startDate, endDate),
            this.getAppointmentAnalytics(period, startDate, endDate),
            this.getLeadAnalytics(period, startDate, endDate),
            this.getCommunicationMetrics(period, startDate, endDate),
            this.getBookingPerformance(period, startDate, endDate),
        ]);
        return { financial, services, patients, performance, appointments, leads, communication, bookingPerformance };
    }
}
