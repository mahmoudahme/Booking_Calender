import { useMemo } from 'react';
import { format, startOfDay, startOfWeek, startOfMonth, endOfDay, endOfWeek, endOfMonth, isWithinInterval, parseISO, eachDayOfInterval, subDays } from 'date-fns';
import { DASHBOARD_PERIODS } from '../constants';

export const useDashboardStats = (appointments, doctors, period = DASHBOARD_PERIODS.WEEK, selectedDate = new Date()) => {
    const stats = useMemo(() => {
        if (!appointments || appointments.length === 0) {
            return {
                appointmentStats: {
                    total: 0,
                    today: 0,
                    thisWeek: 0,
                    thisMonth: 0,
                    byStatus: {},
                    byDate: [],
                    trend: [],
                    averageDuration: 0
                },
                doctorStats: [],
                patientStats: {
                    totalPatients: 0,
                    uniquePatients: 0,
                    frequentVisitors: []
                }
            };
        }

        const today = startOfDay(new Date());
        const todayStr = format(today, 'yyyy-MM-dd');

        // Calculate date ranges
        const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
        const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
        const monthStart = startOfMonth(selectedDate);
        const monthEnd = endOfMonth(selectedDate);

        // Get date range based on period
        let periodStart, periodEnd;
        switch (period) {
            case DASHBOARD_PERIODS.TODAY:
                periodStart = startOfDay(selectedDate);
                periodEnd = endOfDay(selectedDate);
                break;
            case DASHBOARD_PERIODS.MONTH:
                periodStart = monthStart;
                periodEnd = monthEnd;
                break;
            case DASHBOARD_PERIODS.WEEK:
            default:
                periodStart = weekStart;
                periodEnd = weekEnd;
                break;
        }

        // Filter appointments by period
        const periodAppointments = appointments.filter(app => {
            const appDate = parseISO(app.date);
            return isWithinInterval(appDate, { start: periodStart, end: periodEnd });
        });

        // Today's appointments
        const todayAppointments = appointments.filter(app => app.date === todayStr);

        // This week's appointments
        const weekAppointments = appointments.filter(app => {
            const appDate = parseISO(app.date);
            return isWithinInterval(appDate, { start: weekStart, end: weekEnd });
        });

        // This month's appointments
        const monthAppointments = appointments.filter(app => {
            const appDate = parseISO(app.date);
            return isWithinInterval(appDate, { start: monthStart, end: monthEnd });
        });

        // Status distribution
        const byStatus = {};
        periodAppointments.forEach(app => {
            const status = app.state || app.type || 'unknown';
            byStatus[status] = (byStatus[status] || 0) + 1;
        });

        // Appointments by date (for trend chart)
        const dateRange = eachDayOfInterval({ start: periodStart, end: periodEnd });
        const byDate = dateRange.map(date => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const count = periodAppointments.filter(app => app.date === dateStr).length;
            return {
                date: format(date, 'MMM dd'),
                fullDate: dateStr,
                count
            };
        });

        // Last 7 days trend (for comparison)
        const last7Days = eachDayOfInterval({
            start: subDays(today, 6),
            end: today
        });
        const trend = last7Days.map(date => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const count = appointments.filter(app => app.date === dateStr).length;
            return {
                date: format(date, 'EEE'),
                fullDate: dateStr,
                count
            };
        });

        // Average duration
        const totalDuration = periodAppointments.reduce((sum, app) => sum + (app.duration || 0), 0);
        const averageDuration = periodAppointments.length > 0
            ? Math.round(totalDuration / periodAppointments.length)
            : 0;

        // Doctor statistics
        const doctorStats = doctors.map(doctor => {
            const doctorAppointments = periodAppointments.filter(app => app.docId === doctor.id);
            const totalMinutes = doctorAppointments.reduce((sum, app) => sum + (app.duration || 0), 0);

            // Calculate occupancy rate (assuming 9AM-9PM = 12 hours = 720 minutes per day)
            const workingMinutesPerDay = 720;
            const daysInPeriod = dateRange.length;
            const totalAvailableMinutes = workingMinutesPerDay * daysInPeriod;
            const occupancyRate = totalAvailableMinutes > 0
                ? Math.round((totalMinutes / totalAvailableMinutes) * 100)
                : 0;

            // Status breakdown for this doctor
            const statusBreakdown = {};
            doctorAppointments.forEach(app => {
                const status = app.state || app.type || 'unknown';
                statusBreakdown[status] = (statusBreakdown[status] || 0) + 1;
            });

            return {
                id: doctor.id,
                name: doctor.name,
                appointmentCount: doctorAppointments.length,
                totalMinutes,
                occupancyRate: Math.min(occupancyRate, 100),
                statusBreakdown
            };
        }).sort((a, b) => b.appointmentCount - a.appointmentCount);

        // Patient statistics
        const patientMap = new Map();
        periodAppointments.forEach(app => {
            const patientName = app.patient_name || app.title || app.patientName || 'Unknown';
            if (patientName && patientName !== 'Unknown') {
                const normalizedName = patientName.toLowerCase().trim();
                const current = patientMap.get(normalizedName) || { name: patientName, count: 0 };
                current.count++;
                patientMap.set(normalizedName, current);
            }
        });

        const patientList = Array.from(patientMap.values());
        const frequentVisitors = patientList
            .filter(p => p.count > 1)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        const uniquePatients = patientMap.size;
        const returningPatients = patientList.filter(p => p.count > 1).length;
        const newPatients = uniquePatients - returningPatients;

        return {
            appointmentStats: {
                total: periodAppointments.length,
                today: todayAppointments.length,
                thisWeek: weekAppointments.length,
                thisMonth: monthAppointments.length,
                byStatus,
                byDate,
                trend,
                averageDuration
            },
            doctorStats,
            patientStats: {
                totalPatients: periodAppointments.length,
                uniquePatients,
                newPatients,
                returningPatients,
                frequentVisitors
            }
        };
    }, [appointments, doctors, period, selectedDate]);

    return stats;
};

export default useDashboardStats;
