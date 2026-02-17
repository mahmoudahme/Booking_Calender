import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {

    private readonly branches = [
        { id: 1, name: 'Al Khobar Branch', nameAr: 'فرع الخبر' },
        { id: 2, name: 'Al Aziziyah Branch', nameAr: 'فرع العزيزية' },
        { id: 3, name: 'Makkah Branch', nameAr: 'فرع مكة' },
    ];

    private readonly doctors = [
        { id: 1, name: 'Dr. Fahad Al-Qahtani', specialty: 'Plastic Surgery', branch: 1 },
        { id: 2, name: 'Dr. Noura Al-Dosari', specialty: 'Dermatology', branch: 1 },
        { id: 3, name: 'Dr. Sultan Al-Otaibi', specialty: 'Cosmetic Surgery', branch: 2 },
        { id: 4, name: 'Dr. Reem Al-Harbi', specialty: 'Laser Specialist', branch: 2 },
        { id: 5, name: 'Dr. Abdulaziz Al-Shehri', specialty: 'Hair Transplant', branch: 3 },
        { id: 6, name: 'Dr. Hanan Al-Zahrani', specialty: 'Aesthetic Medicine', branch: 3 },
        { id: 7, name: 'Dr. Khalid Al-Ghamdi', specialty: 'Body Contouring', branch: 1 },
        { id: 8, name: 'Dr. Lama Al-Mutairi', specialty: 'Skin Care Specialist', branch: 3 },
    ];

    private readonly services = [
        { id: 1, name: 'Botox Injection', category: 'Injectables', basePrice: 1800 },
        { id: 2, name: 'Dermal Fillers', category: 'Injectables', basePrice: 2500 },
        { id: 3, name: 'Rhinoplasty', category: 'Plastic Surgery', basePrice: 25000 },
        { id: 4, name: 'Liposuction', category: 'Body Contouring', basePrice: 18000 },
        { id: 5, name: 'Laser Hair Removal', category: 'Laser Treatments', basePrice: 1200 },
        { id: 6, name: 'Chemical Peel', category: 'Skin Care', basePrice: 800 },
        { id: 7, name: 'Hair Transplant (FUE)', category: 'Hair Restoration', basePrice: 15000 },
        { id: 8, name: 'PRP Therapy', category: 'Regenerative', basePrice: 1500 },
        { id: 9, name: 'Facelift Surgery', category: 'Plastic Surgery', basePrice: 35000 },
        { id: 10, name: 'Hydrafacial', category: 'Skin Care', basePrice: 600 },
        { id: 11, name: 'Tummy Tuck', category: 'Body Contouring', basePrice: 22000 },
        { id: 12, name: 'Laser Skin Resurfacing', category: 'Laser Treatments', basePrice: 3500 },
    ];

    private readonly consumables = [
        { id: 1, name: 'Hyaluronic Acid Filler', unit: 'syringe', unitCost: 450 },
        { id: 2, name: 'Botulinum Toxin', unit: 'vial', unitCost: 380 },
        { id: 3, name: 'Surgical Gloves (Sterile)', unit: 'box', unitCost: 120 },
        { id: 4, name: 'PRP Kits', unit: 'kit', unitCost: 280 },
        { id: 5, name: 'Laser Protective Gel', unit: 'bottle', unitCost: 150 },
        { id: 6, name: 'Surgical Sutures', unit: 'pack', unitCost: 200 },
        { id: 7, name: 'Anesthetic Cream (EMLA)', unit: 'tube', unitCost: 95 },
        { id: 8, name: 'Collagen Mask Sheets', unit: 'pack', unitCost: 180 },
        { id: 9, name: 'Sterile Gauze Pads', unit: 'bag', unitCost: 45 },
        { id: 10, name: 'Chemical Peel Solution', unit: 'bottle', unitCost: 320 },
        { id: 11, name: 'Mesotherapy Serum', unit: 'vial', unitCost: 260 },
        { id: 12, name: 'Skin Disinfectant', unit: 'liter', unitCost: 75 },
    ];

    // Helper to generate random number in range
    private rand(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Helper to get last N days
    private getLastNDays(n: number): string[] {
        const days: string[] = [];
        const today = new Date();
        for (let i = n - 1; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            days.push(d.toISOString().split('T')[0]);
        }
        return days;
    }

    // Helper to get last N weeks as labels
    private getLastNWeeks(n: number): { label: string; startDate: string; endDate: string }[] {
        const weeks: { label: string; startDate: string; endDate: string }[] = [];
        const today = new Date();
        for (let i = n - 1; i >= 0; i--) {
            const weekEnd = new Date(today);
            weekEnd.setDate(weekEnd.getDate() - i * 7);
            const weekStart = new Date(weekEnd);
            weekStart.setDate(weekStart.getDate() - 6);
            weeks.push({
                label: `Week ${n - i}`,
                startDate: weekStart.toISOString().split('T')[0],
                endDate: weekEnd.toISOString().split('T')[0],
            });
        }
        return weeks;
    }

    /**
     * Financial & Branch Comparison
     */
    async getFinancialOverview(period: string = 'monthly') {
        const multiplier = period === 'daily' ? 1 : period === 'weekly' ? 7 : 30;

        const branchRevenue = this.branches.map(branch => {
            const baseDaily = this.rand(8000, 25000);
            const totalRevenue = baseDaily * multiplier;
            const paidInvoices = Math.round(totalRevenue * (this.rand(70, 92) / 100));
            const pendingInvoices = totalRevenue - paidInvoices;
            const appointmentCount = this.rand(15, 45) * multiplier;

            return {
                branchId: branch.id,
                branchName: branch.name,
                totalRevenue,
                paidInvoices,
                pendingInvoices,
                collectionRate: Math.round((paidInvoices / totalRevenue) * 100),
                appointmentCount,
                revenuePerAppointment: Math.round(totalRevenue / appointmentCount),
            };
        });

        // Sort for ranking
        const ranked = [...branchRevenue].sort((a, b) => b.totalRevenue - a.totalRevenue);

        // Daily revenue trend (last 30 days)
        const days = this.getLastNDays(30);
        const dailyTrend = days.map(date => ({
            date,
            branches: this.branches.map(b => ({
                branchId: b.id,
                branchName: b.name,
                revenue: this.rand(5000, 30000),
                appointments: this.rand(12, 50),
            })),
        }));

        return {
            period,
            summary: {
                totalRevenue: branchRevenue.reduce((s, b) => s + b.totalRevenue, 0),
                totalPaid: branchRevenue.reduce((s, b) => s + b.paidInvoices, 0),
                totalPending: branchRevenue.reduce((s, b) => s + b.pendingInvoices, 0),
                overallCollectionRate: Math.round(
                    (branchRevenue.reduce((s, b) => s + b.paidInvoices, 0) /
                        branchRevenue.reduce((s, b) => s + b.totalRevenue, 0)) * 100
                ),
            },
            branchRevenue: ranked,
            topBranch: ranked[0],
            lowestBranch: ranked[ranked.length - 1],
            dailyTrend,
            branchComparison: branchRevenue.map(b => ({
                branchName: b.branchName,
                revenue: b.totalRevenue,
                appointments: b.appointmentCount,
            })),
        };
    }

    /**
     * Services & Inventory (Consumables)
     */
    async getServicesAndInventory(period: string = 'monthly') {
        const multiplier = period === 'daily' ? 1 : period === 'weekly' ? 7 : 30;

        // Top selling services
        const topServices = this.services.map(service => {
            const count = this.rand(3, 20) * multiplier;
            const revenue = count * service.basePrice * (this.rand(80, 120) / 100);
            return {
                serviceId: service.id,
                serviceName: service.name,
                category: service.category,
                procedureCount: count,
                totalRevenue: Math.round(revenue),
                averagePrice: Math.round(revenue / count),
            };
        }).sort((a, b) => b.totalRevenue - a.totalRevenue);

        // Service revenue by category
        const categoryMap: Record<string, { count: number; revenue: number }> = {};
        topServices.forEach(s => {
            if (!categoryMap[s.category]) categoryMap[s.category] = { count: 0, revenue: 0 };
            categoryMap[s.category].count += s.procedureCount;
            categoryMap[s.category].revenue += s.totalRevenue;
        });
        const servicesByCategory = Object.entries(categoryMap).map(([category, data]) => ({
            category,
            procedureCount: data.count,
            totalRevenue: data.revenue,
        })).sort((a, b) => b.totalRevenue - a.totalRevenue);

        // Consumables tracking
        const consumablesUsage = this.consumables.map(item => {
            const used = this.rand(5, 50) * (period === 'daily' ? 1 : period === 'weekly' ? 3 : 10);
            const inStock = this.rand(20, 200);
            return {
                itemId: item.id,
                itemName: item.name,
                unit: item.unit,
                quantityUsed: used,
                totalCost: used * item.unitCost,
                currentStock: inStock,
                stockStatus: inStock < 30 ? 'low' : inStock < 80 ? 'medium' : 'adequate',
                reorderNeeded: inStock < 30,
            };
        }).sort((a, b) => b.quantityUsed - a.quantityUsed);

        // Daily consumable trend (last 7 days)
        const days = this.getLastNDays(7);
        const consumableTrend = days.map(date => ({
            date,
            totalUsed: this.rand(80, 250),
            totalCost: this.rand(3000, 12000),
            topItem: this.consumables[this.rand(0, this.consumables.length - 1)].name,
        }));

        return {
            period,
            topServices,
            servicesByCategory,
            consumablesUsage,
            consumableTrend,
            alerts: consumablesUsage.filter(c => c.reorderNeeded).map(c => ({
                itemName: c.itemName,
                currentStock: c.currentStock,
                unit: c.unit,
                message: `${c.itemName} stock is low (${c.currentStock} ${c.unit}s remaining)`,
            })),
        };
    }

    /**
     * Patient Analytics & Growth
     */
    async getPatientAnalytics(period: string = 'monthly') {
        // Daily patient traffic (last 30 days)
        const days = this.getLastNDays(30);
        const dailyTraffic = days.map(date => {
            const total = this.rand(25, 80);
            const newPatients = this.rand(5, Math.floor(total * 0.4));
            return {
                date,
                total,
                newPatients,
                returningPatients: total - newPatients,
            };
        });

        // Weekly growth (last 8 weeks)
        const weeks = this.getLastNWeeks(8);
        let previousWeekVolume = this.rand(150, 250);
        const weeklyGrowth = weeks.map((week, idx) => {
            const volume = idx === 0 ? previousWeekVolume : previousWeekVolume + this.rand(-20, 40);
            const growth = idx === 0 ? 0 : Math.round(((volume - previousWeekVolume) / previousWeekVolume) * 100);
            previousWeekVolume = volume;
            return {
                week: week.label,
                startDate: week.startDate,
                endDate: week.endDate,
                patientVolume: Math.max(volume, 80),
                newPatients: this.rand(20, 60),
                growthRate: growth,
            };
        });

        // Efficiency / QA metrics per branch
        const efficiencyByBranch = this.branches.map(branch => ({
            branchId: branch.id,
            branchName: branch.name,
            averageWaitTime: this.rand(8, 35), // minutes
            noShowRate: this.rand(3, 18), // percentage
            averageServiceTime: this.rand(20, 55), // minutes
            patientSatisfaction: this.rand(75, 98), // percentage
        }));

        // Today's summary
        const todayData = dailyTraffic[dailyTraffic.length - 1];

        // Patient demographics (dummy)
        const demographics = {
            byGender: { male: this.rand(25, 38), female: this.rand(62, 75) },
            byAgeGroup: [
                { group: '0-18', count: this.rand(10, 25) },
                { group: '19-30', count: this.rand(25, 45) },
                { group: '31-45', count: this.rand(30, 50) },
                { group: '46-60', count: this.rand(15, 35) },
                { group: '60+', count: this.rand(8, 20) },
            ],
            byNationality: [
                { nationality: 'Saudi', count: this.rand(55, 75) },
                { nationality: 'Yemeni', count: this.rand(5, 15) },
                { nationality: 'Egyptian', count: this.rand(4, 12) },
                { nationality: 'Other', count: this.rand(5, 18) },
            ],
        };

        return {
            period,
            todaySummary: {
                total: todayData.total,
                newPatients: todayData.newPatients,
                returningPatients: todayData.returningPatients,
                newPatientPercentage: Math.round((todayData.newPatients / todayData.total) * 100),
            },
            dailyTraffic,
            weeklyGrowth,
            efficiencyByBranch,
            demographics,
        };
    }

    /**
     * Performance Tracking
     */
    async getPerformanceTracking() {
        // Today's status overview
        const totalProcedures = this.rand(60, 120);
        const completed = this.rand(Math.floor(totalProcedures * 0.4), Math.floor(totalProcedures * 0.7));
        const inProgress = this.rand(5, 15);
        const pending = totalProcedures - completed - inProgress;

        const statusOverview = {
            totalProcedures,
            completed,
            inProgress,
            pending,
            completionRate: Math.round((completed / totalProcedures) * 100),
            cancelled: this.rand(2, 8),
            noShows: this.rand(3, 10),
        };

        // Doctor KPIs
        const doctorKPIs = this.doctors.map(doc => {
            const total = this.rand(8, 25);
            const done = this.rand(Math.floor(total * 0.5), total);
            const avgDuration = this.rand(15, 45);
            return {
                doctorId: doc.id,
                doctorName: doc.name,
                specialty: doc.specialty,
                branchId: doc.branch,
                branchName: this.branches.find(b => b.id === doc.branch)?.name || '',
                totalAppointments: total,
                completedAppointments: done,
                completionRate: Math.round((done / total) * 100),
                averageDuration: avgDuration,
                revenue: this.rand(3000, 15000),
                patientRating: (this.rand(35, 50) / 10).toFixed(1),
                noShows: this.rand(0, 3),
            };
        }).sort((a, b) => b.completionRate - a.completionRate);

        // Hourly distribution (for today)
        const hourlyDistribution = [];
        for (let h = 9; h <= 20; h++) {
            hourlyDistribution.push({
                hour: `${h}:00`,
                appointments: this.rand(2, 12),
                completed: this.rand(1, 8),
                inProgress: this.rand(0, 3),
            });
        }

        // Branch performance comparison
        const branchPerformance = this.branches.map(branch => {
            const branchDoctors = this.doctors.filter(d => d.branch === branch.id);
            const totalAppts = branchDoctors.reduce(() => this.rand(20, 60), 0);
            const completedAppts = Math.round(totalAppts * (this.rand(65, 90) / 100));
            return {
                branchId: branch.id,
                branchName: branch.name,
                totalAppointments: totalAppts,
                completedAppointments: completedAppts,
                completionRate: Math.round((completedAppts / totalAppts) * 100),
                averageWaitTime: this.rand(10, 30),
                doctorCount: branchDoctors.length,
                revenue: this.rand(20000, 80000),
            };
        });

        return {
            statusOverview,
            doctorKPIs,
            hourlyDistribution,
            branchPerformance,
        };
    }

    /**
     * Combined endpoint - returns everything
     */
    async getFullDashboard(period: string = 'monthly') {
        const [financial, services, patients, performance] = await Promise.all([
            this.getFinancialOverview(period),
            this.getServicesAndInventory(period),
            this.getPatientAnalytics(period),
            this.getPerformanceTracking(),
        ]);

        return {
            financial,
            services,
            patients,
            performance,
        };
    }
}
