import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const DASHBOARD_API_BASE = 'http://72.62.16.223:3000/api/v1/dashboard';

// ─── TEMP: Set to false to use real API ───────────────────────────────────────
const USE_DUMMY_DATA = true;
// ─────────────────────────────────────────────────────────────────────────────

const generateDailyTrend = (days, multiplier) => {
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(0, 10);
        result.push({
            date: dateStr,
            branches: [
                { branchName: 'Dhahran Branch', revenue: Math.floor((18000 + Math.random() * 8000) * multiplier) },
                { branchName: 'Al Khuzama Branch (Khobar)', revenue: Math.floor((12000 + Math.random() * 6000) * multiplier) },
                { branchName: 'Al Yarmouk Branch', revenue: Math.floor((9000 + Math.random() * 5000) * multiplier) },
            ],
        });
    }
    return result;
};

const generateDailyTraffic = (days, multiplier) => {
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(0, 10);
        const newP = Math.floor((10 + Math.random() * 20) * multiplier);
        const retP = Math.floor((15 + Math.random() * 25) * multiplier);
        result.push({ date: dateStr, newPatients: newP, returningPatients: retP, total: newP + retP });
    }
    return result;
};

// multiplier: today=0.15, week=1, month=4.3
const buildDummyData = (period) => {
    const m = period === 'today' ? 0.15 : period === 'week' ? 1 : 4.3;
    const trendDays = period === 'today' ? 1 : period === 'week' ? 7 : 30;
    const trafficDays = period === 'today' ? 1 : period === 'week' ? 7 : 30;

    return {
        financial: {
            summary: {
                totalRevenue: Math.floor(1250000 * m),
                totalPaid: Math.floor(1087500 * m),
                totalPending: Math.floor(162500 * m),
                overallCollectionRate: 87,
            },
            branchRevenue: [
                { branchId: 1, branchName: 'Dhahran Branch', totalRevenue: Math.floor(580000 * m), paidInvoices: Math.floor(510000 * m), pendingInvoices: Math.floor(70000 * m), appointmentCount: Math.floor(320 * m), collectionRate: 88 },
                { branchId: 2, branchName: 'Al Khuzama Branch (Khobar)', totalRevenue: Math.floor(420000 * m), paidInvoices: Math.floor(360000 * m), pendingInvoices: Math.floor(60000 * m), appointmentCount: Math.floor(240 * m), collectionRate: 86 },
                { branchId: 3, branchName: 'Al Yarmouk Branch', totalRevenue: Math.floor(250000 * m), paidInvoices: Math.floor(210000 * m), pendingInvoices: Math.floor(40000 * m), appointmentCount: Math.floor(150 * m), collectionRate: 84 },
            ],
            branchComparison: [
                { branchName: 'Dhahran Branch', revenue: Math.floor(580000 * m), appointments: Math.floor(320 * m) },
                { branchName: 'Al Khuzama Branch (Khobar)', revenue: Math.floor(420000 * m), appointments: Math.floor(240 * m) },
                { branchName: 'Al Yarmouk Branch', revenue: Math.floor(250000 * m), appointments: Math.floor(150 * m) },
            ],
            dailyTrend: generateDailyTrend(trendDays, m),
        },

        services: {
            topServices: [
                { serviceName: 'Dental Cleaning', totalRevenue: Math.floor(95000 * m), procedureCount: Math.floor(190 * m) },
                { serviceName: 'Root Canal', totalRevenue: Math.floor(142000 * m), procedureCount: Math.floor(71 * m) },
                { serviceName: 'Teeth Whitening', totalRevenue: Math.floor(76000 * m), procedureCount: Math.floor(152 * m) },
                { serviceName: 'Orthodontics', totalRevenue: Math.floor(230000 * m), procedureCount: Math.floor(46 * m) },
                { serviceName: 'Extraction', totalRevenue: Math.floor(38000 * m), procedureCount: Math.floor(190 * m) },
                { serviceName: 'Filling', totalRevenue: Math.floor(55000 * m), procedureCount: Math.floor(220 * m) },
                { serviceName: 'Crown', totalRevenue: Math.floor(112000 * m), procedureCount: Math.floor(56 * m) },
                { serviceName: 'Implant', totalRevenue: Math.floor(195000 * m), procedureCount: Math.floor(39 * m) },
            ],
            servicesByCategory: [
                { category: 'Restorative', totalRevenue: Math.floor(380000 * m) },
                { category: 'Cosmetic', totalRevenue: Math.floor(290000 * m) },
                { category: 'Surgical', totalRevenue: Math.floor(210000 * m) },
                { category: 'Preventive', totalRevenue: Math.floor(175000 * m) },
                { category: 'Orthodontic', totalRevenue: Math.floor(195000 * m) },
            ],
            consumablesUsage: [
                { itemName: 'Gloves (Box)', quantityUsed: Math.floor(45 * m), currentStock: 120, totalCost: Math.floor(900 * m), stockStatus: 'ok' },
                { itemName: 'Masks (Box)', quantityUsed: Math.floor(30 * m), currentStock: 80, totalCost: Math.floor(600 * m), stockStatus: 'ok' },
                { itemName: 'Composite Resin', quantityUsed: Math.floor(22 * m), currentStock: 18, totalCost: Math.floor(3300 * m), stockStatus: 'medium' },
                { itemName: 'Anesthetic Cartridges', quantityUsed: Math.floor(60 * m), currentStock: 40, totalCost: Math.floor(1200 * m), stockStatus: 'medium' },
                { itemName: 'Impression Material', quantityUsed: Math.floor(15 * m), currentStock: 8, totalCost: Math.floor(2250 * m), stockStatus: 'low' },
                { itemName: 'Sutures', quantityUsed: Math.floor(20 * m), currentStock: 35, totalCost: Math.floor(800 * m), stockStatus: 'ok' },
            ],
            alerts: [
                { message: 'Impression Material stock is low (8 units remaining)' },
            ],
        },

        patients: {
            todaySummary: {
                total: Math.floor(48 * m),
                newPatients: Math.floor(18 * m),
                returningPatients: Math.floor(30 * m),
                newPatientPercentage: 38,
            },
            efficiencyByBranch: [
                { branchName: 'Dhahran Branch', averageWaitTime: 12, noShowRate: 8 },
                { branchName: 'Al Khuzama Branch (Khobar)', averageWaitTime: 18, noShowRate: 11 },
                { branchName: 'Al Yarmouk Branch', averageWaitTime: 9, noShowRate: 6 },
            ],
            dailyTraffic: generateDailyTraffic(trafficDays, m),
            weeklyGrowth: [
                { week: 'W1', newPatients: Math.floor(65 * m), total: Math.floor(120 * m) },
                { week: 'W2', newPatients: Math.floor(72 * m), total: Math.floor(138 * m) },
                { week: 'W3', newPatients: Math.floor(68 * m), total: Math.floor(132 * m) },
                { week: 'W4', newPatients: Math.floor(85 * m), total: Math.floor(155 * m) },
            ],
            demographics: {
                byGender: { male: 45, female: 55 },
                byAgeGroup: [
                    { group: '0-12', count: Math.floor(42 * m) },
                    { group: '13-25', count: Math.floor(78 * m) },
                    { group: '26-40', count: Math.floor(145 * m) },
                    { group: '41-60', count: Math.floor(198 * m) },
                    { group: '60+', count: Math.floor(87 * m) },
                ],
            },
        },

        performance: {
            statusOverview: {
                totalProcedures: Math.floor(124 * m),
                completed: Math.floor(98 * m),
                completionRate: 79,
                inProgress: Math.floor(14 * m),
                noShows: Math.floor(12 * m),
            },
            doctorKPIs: [
                { doctorName: 'Dr. Ahmed Khalil', completionRate: 92, totalAppointments: Math.floor(25 * m), completedAppointments: Math.floor(23 * m), revenue: Math.floor(48500 * m), patientRating: 4.8 },
                { doctorName: 'Dr. Sara Hassan', completionRate: 88, totalAppointments: Math.floor(22 * m), completedAppointments: Math.floor(19 * m), revenue: Math.floor(41200 * m), patientRating: 4.7 },
                { doctorName: 'Dr. Omar Nasser', completionRate: 75, totalAppointments: Math.floor(20 * m), completedAppointments: Math.floor(15 * m), revenue: Math.floor(35800 * m), patientRating: 4.5 },
                { doctorName: 'Dr. Layla Mostafa', completionRate: 95, totalAppointments: Math.floor(18 * m), completedAppointments: Math.floor(17 * m), revenue: Math.floor(52000 * m), patientRating: 4.9 },
                { doctorName: 'Dr. Yusuf Adel', completionRate: 68, totalAppointments: Math.floor(16 * m), completedAppointments: Math.floor(11 * m), revenue: Math.floor(28400 * m), patientRating: 4.3 },
            ],
            hourlyDistribution: [
                { hour: '08:00', appointments: Math.floor(8 * m), completed: Math.floor(8 * m), inProgress: 0 },
                { hour: '09:00', appointments: Math.floor(14 * m), completed: Math.floor(13 * m), inProgress: Math.floor(1 * m) },
                { hour: '10:00', appointments: Math.floor(18 * m), completed: Math.floor(16 * m), inProgress: Math.floor(2 * m) },
                { hour: '11:00', appointments: Math.floor(16 * m), completed: Math.floor(14 * m), inProgress: Math.floor(2 * m) },
                { hour: '12:00', appointments: Math.floor(10 * m), completed: Math.floor(9 * m), inProgress: Math.floor(1 * m) },
                { hour: '13:00', appointments: Math.floor(6 * m), completed: Math.floor(6 * m), inProgress: 0 },
                { hour: '14:00', appointments: Math.floor(15 * m), completed: Math.floor(12 * m), inProgress: Math.floor(3 * m) },
                { hour: '15:00', appointments: Math.floor(17 * m), completed: Math.floor(13 * m), inProgress: Math.floor(4 * m) },
                { hour: '16:00', appointments: Math.floor(12 * m), completed: Math.floor(7 * m), inProgress: Math.floor(5 * m) },
                { hour: '17:00', appointments: Math.floor(8 * m), completed: 0, inProgress: Math.floor(8 * m) },
            ],
        },
    };
};

export const useDashboardData = (period = 'monthly') => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const periodMap = {
        today: 'daily',
        week: 'weekly',
        month: 'monthly',
    };

    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            if (USE_DUMMY_DATA) {
                await new Promise(resolve => setTimeout(resolve, 300));
                setData(buildDummyData(period));
            } else {
                const apiPeriod = periodMap[period] || 'monthly';
                const response = await axios.get(`${DASHBOARD_API_BASE}/full`, {
                    params: { period: apiPeriod },
                });
                const responseData = response.data?.data || response.data;
                setData(responseData);
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [period]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return { data, loading, error, refetch: fetchDashboardData };
};

export default useDashboardData;
