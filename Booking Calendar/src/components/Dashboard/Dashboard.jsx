import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Users, Stethoscope, Clock, Activity,
    DollarSign, Award, Building2, Package, BarChart3
} from 'lucide-react';
import { useDashboardStats } from '../../hooks/useDashboardStats';
import { useDashboardData } from '../../hooks/useDashboardData';
import { DASHBOARD_PERIODS } from '../../constants';
import DashboardHeader from './DashboardHeader';
import StatCard from './StatCard';
import StatusDistribution from './StatusDistribution';
import DoctorStats from './DoctorStats';
import DoctorOccupancy from './DoctorOccupancy';
import TrendChart from './TrendChart';
import PatientStats from './PatientStats';
import RevenueChart from './RevenueChart';
import BranchComparisonChart from './BranchComparisonChart';
import CollectionRateChart from './CollectionRateChart';
import RevenueTrendChart from './RevenueTrendChart';
import TopServicesChart from './TopServicesChart';
import ServiceCategoryChart from './ServiceCategoryChart';
import ConsumablesChart from './ConsumablesChart';
import PatientTrafficChart from './PatientTrafficChart';
import WeeklyGrowthChart from './WeeklyGrowthChart';
import EfficiencyChart from './EfficiencyChart';
import DemographicsChart from './DemographicsChart';
import ProcedureStatusChart from './ProcedureStatusChart';
import DoctorKPIChart from './DoctorKPIChart';
import HourlyDistributionChart from './HourlyDistributionChart';

const TABS = [
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'services', label: 'Services & Inventory', icon: Package },
    { id: 'patients', label: 'Patient Analytics', icon: Users },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
];

const tabContentVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.06 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.15 } },
};

const Dashboard = ({ appointments, doctors, selectedDate }) => {
    const [period, setPeriod] = useState(DASHBOARD_PERIODS.WEEK);
    const [activeTab, setActiveTab] = useState('financial');
    const stats = useDashboardStats(appointments, doctors, period, selectedDate);
    const { data: dashboardData } = useDashboardData(period);

    const financial = dashboardData?.financial;
    const services = dashboardData?.services;
    const patients = dashboardData?.patients;
    const performance = dashboardData?.performance;

    return (
        <motion.div
            className="dashboard-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <DashboardHeader
                period={period}
                setPeriod={setPeriod}
                title="Management Dashboard"
            />

            {/* Top Stats Row - Always visible */}
            <div className="dashboard-grid dashboard-grid-4">
                <StatCard
                    title="Total Revenue"
                    value={financial ? (financial.summary.totalRevenue >= 1000000
                        ? `${(financial.summary.totalRevenue / 1000000).toFixed(2)}M`
                        : `${(financial.summary.totalRevenue / 1000).toFixed(0)}K`) : '—'}
                    subtitle={`SAR — ${period === DASHBOARD_PERIODS.TODAY ? 'Today' : period === DASHBOARD_PERIODS.WEEK ? 'This Week' : 'This Month'}`}
                    icon={DollarSign}
                    color="green"
                    trend={financial ? 12.5 : undefined}
                />
                <StatCard
                    title="Appointments"
                    value={stats.appointmentStats.total || (performance?.statusOverview?.totalProcedures ?? '—')}
                    subtitle={`${period === DASHBOARD_PERIODS.TODAY ? 'Today' : period === DASHBOARD_PERIODS.WEEK ? 'This Week' : 'This Month'}`}
                    icon={Calendar}
                    color="primary"
                />
                <StatCard
                    title="Patients Today"
                    value={patients?.todaySummary?.total ?? stats.appointmentStats.today}
                    subtitle={patients ? `${patients.todaySummary.newPatients} new, ${patients.todaySummary.returningPatients} returning` : 'Scheduled today'}
                    icon={Users}
                    color="blue"
                />
                <StatCard
                    title="Collection Rate"
                    value={financial ? `${financial.summary.overallCollectionRate}%` : '—'}
                    subtitle="Paid vs Total invoices"
                    icon={Activity}
                    color="purple"
                />
            </div>

            {/* Tab Navigation */}
            <div className="dashboard-tabs">
                {TABS.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <Icon size={16} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'financial' && (
                    <motion.div key="financial" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
                        <div className="dashboard-grid dashboard-grid-2">
                            <RevenueChart data={financial?.branchRevenue} />
                            <CollectionRateChart data={financial?.summary} />
                        </div>

                        <div className="dashboard-grid dashboard-grid-2">
                            <BranchComparisonChart data={financial?.branchComparison} />
                            <motion.div
                                className="stat-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h4 className="chart-title"><Award size={18} /> Branch Revenue Ranking</h4>
                                {financial?.branchRevenue ? (
                                    <div className="ranking-list">
                                        {financial.branchRevenue.map((branch, i) => (
                                            <div key={branch.branchId} className="ranking-item">
                                                <div className="ranking-position">
                                                    <span className={`ranking-badge ${i === 0 ? 'gold' : i === 1 ? 'silver' : 'bronze'}`}>
                                                        #{i + 1}
                                                    </span>
                                                </div>
                                                <div className="ranking-info">
                                                    <span className="ranking-name">{branch.branchName}</span>
                                                    <span className="ranking-detail">{branch.appointmentCount} appointments</span>
                                                </div>
                                                <div className="ranking-value">
                                                    <span className="ranking-amount">{branch.totalRevenue.toLocaleString()} SAR</span>
                                                    <span className="ranking-rate">{branch.collectionRate}% collected</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="chart-empty">Loading...</div>
                                )}
                            </motion.div>
                        </div>

                        <div className="dashboard-grid dashboard-grid-1">
                            <RevenueTrendChart data={financial?.dailyTrend} />
                        </div>
                    </motion.div>
                )}

                {activeTab === 'services' && (
                    <motion.div key="services" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
                        <div className="dashboard-grid dashboard-grid-2">
                            <TopServicesChart data={services?.topServices} />
                            <ServiceCategoryChart data={services?.servicesByCategory} />
                        </div>

                        <div className="dashboard-grid dashboard-grid-1">
                            <ConsumablesChart data={services?.consumablesUsage} alerts={services?.alerts} />
                        </div>
                    </motion.div>
                )}

                {activeTab === 'patients' && (
                    <motion.div key="patients" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
                        <div className="dashboard-grid dashboard-grid-4">
                            <StatCard
                                title="New Patients"
                                value={patients?.todaySummary?.newPatients ?? '—'}
                                subtitle={patients ? `${patients.todaySummary.newPatientPercentage}% of today` : ''}
                                icon={Users}
                                color="blue"
                            />
                            <StatCard
                                title="Returning Patients"
                                value={patients?.todaySummary?.returningPatients ?? '—'}
                                subtitle="Came back again"
                                icon={Users}
                                color="green"
                            />
                            <StatCard
                                title="Avg Wait Time"
                                value={patients?.efficiencyByBranch ? `${Math.round(patients.efficiencyByBranch.reduce((s, b) => s + b.averageWaitTime, 0) / patients.efficiencyByBranch.length)}m` : '—'}
                                subtitle="Across all branches"
                                icon={Clock}
                                color="orange"
                            />
                            <StatCard
                                title="Avg No-Show Rate"
                                value={patients?.efficiencyByBranch ? `${Math.round(patients.efficiencyByBranch.reduce((s, b) => s + b.noShowRate, 0) / patients.efficiencyByBranch.length)}%` : '—'}
                                subtitle="Missed appointments"
                                icon={Activity}
                                color="purple"
                            />
                        </div>

                        <div className="dashboard-grid dashboard-grid-1">
                            <PatientTrafficChart data={patients?.dailyTraffic} />
                        </div>

                        <div className="dashboard-grid dashboard-grid-2">
                            <WeeklyGrowthChart data={patients?.weeklyGrowth} />
                            <EfficiencyChart data={patients?.efficiencyByBranch} />
                        </div>

                        <div className="dashboard-grid dashboard-grid-1">
                            <DemographicsChart data={patients?.demographics} />
                        </div>
                    </motion.div>
                )}

                {activeTab === 'performance' && (
                    <motion.div key="performance" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
                        <div className="dashboard-grid dashboard-grid-4">
                            <StatCard
                                title="Total Procedures"
                                value={performance?.statusOverview?.totalProcedures ?? '—'}
                                subtitle="Today's procedures"
                                icon={Stethoscope}
                                color="primary"
                            />
                            <StatCard
                                title="Completed"
                                value={performance?.statusOverview?.completed ?? '—'}
                                subtitle={performance ? `${performance.statusOverview.completionRate}% completion` : ''}
                                icon={Activity}
                                color="green"
                                trend={performance ? performance.statusOverview.completionRate : undefined}
                            />
                            <StatCard
                                title="In Progress"
                                value={performance?.statusOverview?.inProgress ?? '—'}
                                subtitle="Currently active"
                                icon={Clock}
                                color="blue"
                            />
                            <StatCard
                                title="No-Shows"
                                value={performance?.statusOverview?.noShows ?? '—'}
                                subtitle="Missed today"
                                icon={Users}
                                color="orange"
                            />
                        </div>

                        <div className="dashboard-grid dashboard-grid-2">
                            <ProcedureStatusChart data={performance?.statusOverview} />
                            <DoctorKPIChart data={performance?.doctorKPIs} />
                        </div>

                        <div className="dashboard-grid dashboard-grid-1">
                            <HourlyDistributionChart data={performance?.hourlyDistribution} />
                        </div>
                    </motion.div>
                )}

                {activeTab === 'appointments' && (
                    <motion.div key="appointments" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
                        <div className="dashboard-grid dashboard-grid-2">
                            <StatusDistribution data={stats.appointmentStats.byStatus} />
                            <DoctorStats data={stats.doctorStats} />
                        </div>

                        <div className="dashboard-grid dashboard-grid-1">
                            <TrendChart
                                data={stats.appointmentStats.byDate}
                                title={`Appointments ${period === DASHBOARD_PERIODS.TODAY ? 'Today' : period === DASHBOARD_PERIODS.WEEK ? 'This Week' : 'This Month'}`}
                            />
                        </div>

                        <div className="dashboard-grid dashboard-grid-2">
                            <DoctorOccupancy data={stats.doctorStats} />
                            <PatientStats data={stats.patientStats} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Dashboard;
