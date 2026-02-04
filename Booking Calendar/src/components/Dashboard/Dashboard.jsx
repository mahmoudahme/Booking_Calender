import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Stethoscope, Clock, Activity } from 'lucide-react';
import { useDashboardStats } from '../../hooks/useDashboardStats';
import { DASHBOARD_PERIODS } from '../../constants';
import DashboardHeader from './DashboardHeader';
import StatCard from './StatCard';
import StatusDistribution from './StatusDistribution';
import DoctorStats from './DoctorStats';
import DoctorOccupancy from './DoctorOccupancy';
import TrendChart from './TrendChart';
import PatientStats from './PatientStats';

const Dashboard = ({ appointments, doctors, selectedDate }) => {
    const [period, setPeriod] = useState(DASHBOARD_PERIODS.WEEK);
    const stats = useDashboardStats(appointments, doctors, period, selectedDate);

    // Debug log
    console.log('📊 Dashboard received:', {
        appointmentsCount: appointments?.length,
        doctorsCount: doctors?.length,
        selectedDate,
        period,
        stats
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            className="dashboard-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <DashboardHeader
                period={period}
                setPeriod={setPeriod}
                title="Analytics Dashboard"
            />

            {/* Top Stats Row */}
            <div className="dashboard-grid dashboard-grid-4">
                <StatCard
                    title="Total Appointments"
                    value={stats.appointmentStats.total}
                    subtitle={`${period === DASHBOARD_PERIODS.TODAY ? 'Today' : period === DASHBOARD_PERIODS.WEEK ? 'This Week' : 'This Month'}`}
                    icon={Calendar}
                    color="primary"
                />
                <StatCard
                    title="Today"
                    value={stats.appointmentStats.today}
                    subtitle="Scheduled today"
                    icon={Activity}
                    color="blue"
                />
                <StatCard
                    title="Unique Patients"
                    value={stats.patientStats.uniquePatients}
                    subtitle="In selected period"
                    icon={Users}
                    color="green"
                />
                <StatCard
                    title="Avg Duration"
                    value={`${stats.appointmentStats.averageDuration}m`}
                    subtitle="Per appointment"
                    icon={Clock}
                    color="purple"
                />
            </div>

            {/* Charts Row */}
            <div className="dashboard-grid dashboard-grid-2">
                <StatusDistribution data={stats.appointmentStats.byStatus} />
                <DoctorStats data={stats.doctorStats} />
            </div>

            {/* Trend Chart - Full Width */}
            <div className="dashboard-grid dashboard-grid-1">
                <TrendChart
                    data={stats.appointmentStats.byDate}
                    title={`Appointments ${period === DASHBOARD_PERIODS.TODAY ? 'Today' : period === DASHBOARD_PERIODS.WEEK ? 'This Week' : 'This Month'}`}
                />
            </div>

            {/* Bottom Row */}
            <div className="dashboard-grid dashboard-grid-2">
                <DoctorOccupancy data={stats.doctorStats} />
                <PatientStats data={stats.patientStats} />
            </div>
        </motion.div>
    );
};

export default Dashboard;
