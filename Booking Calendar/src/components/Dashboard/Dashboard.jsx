import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Users, Stethoscope, Clock, Activity,
    DollarSign, Award, Building2, Package, BarChart3,
    Target, MessageCircle, CalendarCheck,
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
import LeadStatusChart from './LeadStatusChart';
import LeadSourceChart from './LeadSourceChart';
import LeadConversionTrend from './LeadConversionTrend';
import CommunicationPanel from './CommunicationPanel';
import BookingPerformancePanel from './BookingPerformancePanel';

const TABS = [
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'services', label: 'Services & Inventory', icon: Package },
    { id: 'patients', label: 'Patient Analytics', icon: Users },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'lead-analytics', label: 'Lead Analytics', icon: Target },
    { id: 'communication', label: 'Communication', icon: MessageCircle },
    { id: 'booking-performance', label: 'Booking Performance', icon: CalendarCheck },
];

const tabContentVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.06 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.15 } },
};

const Dashboard = ({ appointments, doctors, selectedDate }) => {
    const [period, setPeriod] = useState(DASHBOARD_PERIODS.WEEK);
    const [activeTab, setActiveTab] = useState('financial');
    const [customRange, setCustomRange] = useState({ start: '', end: '' });
    const stats = useDashboardStats(appointments, doctors, period, selectedDate, customRange);
    const { data: dashboardData } = useDashboardData(period, customRange);

    const periodLabel = period === DASHBOARD_PERIODS.TODAY ? 'Today'
        : period === DASHBOARD_PERIODS.WEEK ? 'This Week'
        : period === DASHBOARD_PERIODS.CUSTOM
            ? (customRange?.start && customRange?.end ? `${customRange.start} → ${customRange.end}` : 'Custom Range')
        : 'This Month';

    const financial        = dashboardData?.financial;
    const services         = dashboardData?.services;
    const patients         = dashboardData?.patients;
    const performance      = dashboardData?.performance;
    const appointmentsDummy = dashboardData?.appointments;
    const leads            = dashboardData?.leads;
    const communication    = dashboardData?.communication;
    const bookingPerf      = dashboardData?.bookingPerformance;

    return (
        <motion.div
            className="dashboard-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <DashboardHeader
                period={period}
                setPeriod={setPeriod}
                customRange={customRange}
                setCustomRange={setCustomRange}
                title="Management Dashboard"
            />

            {/* Top Stats Row - Always visible */}
            <div className="dashboard-grid dashboard-grid-4">
                <StatCard
                    title="Total Revenue"
                    value={financial ? (financial.summary.totalRevenue >= 1000000
                        ? `${(financial.summary.totalRevenue / 1000000).toFixed(2)}M`
                        : `${(financial.summary.totalRevenue / 1000).toFixed(0)}K`) : '—'}
                    subtitle={`SAR — ${periodLabel}`}
                    icon={DollarSign}
                    color="green"
                    trend={financial ? 12.5 : undefined}
                />
                <StatCard
                    title="Appointments"
                    value={appointmentsDummy?.appointmentStats?.total || stats.appointmentStats.total || (performance?.statusOverview?.totalProcedures ?? '—')}
                    subtitle={periodLabel}
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
                                subtitle={patients ? `${patients.todaySummary.newPatientPercentage}% of period — first visit` : ''}
                                icon={Users}
                                color="blue"
                            />
                            <StatCard
                                title="Returning Patients"
                                value={patients?.todaySummary?.returningPatients ?? '—'}
                                subtitle={patients ? `${patients.todaySummary.total} total in ${periodLabel}` : 'Came back again'}
                                icon={Users}
                                color="green"
                            />
                            <StatCard
                                title="Avg Appointment Duration"
                                value={patients?.avgDurationMinutes ? `${patients.avgDurationMinutes}m` : '—'}
                                subtitle="Average session length"
                                icon={Clock}
                                color="orange"
                            />
                            <StatCard
                                title="Unconfirmed Rate"
                                value={patients?.efficiencyByBranch?.length > 0
                                    ? `${Math.round(patients.efficiencyByBranch.reduce((s, b) => s + (b.noShowRate ?? 0), 0) / patients.efficiencyByBranch.length)}%`
                                    : '—'}
                                subtitle="Booked but not confirmed"
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
                            <StatusDistribution data={appointmentsDummy?.appointmentStats?.byStatus} />
                            <DoctorStats data={appointmentsDummy?.doctorStats} />
                        </div>

                        <div className="dashboard-grid dashboard-grid-1">
                            <TrendChart
                                data={appointmentsDummy?.appointmentStats?.byDate}
                                title={`Appointments — ${periodLabel}`}
                            />
                        </div>

                        <div className="dashboard-grid dashboard-grid-2">
                            <DoctorOccupancy data={appointmentsDummy?.doctorStats} />
                            <PatientStats data={appointmentsDummy?.patientStats} />
                        </div>
                    </motion.div>
                )}
                {activeTab === 'lead-analytics' && (
                    <motion.div key="lead-analytics" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
                        <div className="dashboard-grid dashboard-grid-4">
                            <StatCard
                                title="Total Leads"
                                value={leads?.summary?.totalLeads ?? '—'}
                                subtitle={periodLabel}
                                icon={Target}
                                color="blue"
                            />
                            <StatCard
                                title="New Leads"
                                value={leads?.byStatus?.[0]?.value ?? '—'}
                                subtitle="Awaiting first contact"
                                icon={Target}
                                color="primary"
                            />
                            <StatCard
                                title="In Progress"
                                value={leads?.byStatus?.[1]?.value ?? '—'}
                                subtitle="Currently being handled"
                                icon={Activity}
                                color="orange"
                            />
                            <StatCard
                                title="Conversion Rate"
                                value={leads?.summary?.conversionRate !== undefined ? `${leads.summary.conversionRate}%` : '—'}
                                subtitle="Leads converted to bookings"
                                icon={CalendarCheck}
                                color="green"
                                trend={leads?.summary?.conversionRate}
                            />
                        </div>

                        <div className="dashboard-grid dashboard-grid-2">
                            <LeadStatusChart
                                data={leads?.byStatus}
                                conversionRate={leads?.summary?.conversionRate}
                            />
                            <LeadSourceChart data={leads?.bySource} />
                        </div>

                        <div className="dashboard-grid dashboard-grid-1">
                            <LeadConversionTrend data={leads?.conversionTrend} />
                        </div>
                    </motion.div>
                )}

                {activeTab === 'communication' && (
                    <motion.div key="communication" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
                        <div className="dashboard-grid dashboard-grid-4">
                            <StatCard
                                title="Avg First Response"
                                value={communication?.summary?.avgFirstResponseMinutes != null
                                    ? `${communication.summary.avgFirstResponseMinutes}m`
                                    : '—'}
                                subtitle="Time to first reply"
                                icon={Clock}
                                color="orange"
                            />
                            <StatCard
                                title="Unanswered Threads"
                                value={communication?.summary?.unansweredThreads ?? '—'}
                                subtitle="Pending — need a reply"
                                icon={MessageCircle}
                                color="purple"
                            />
                            <StatCard
                                title="Active Chats"
                                value={communication?.summary?.activeChatVolume ?? '—'}
                                subtitle="Open conversations"
                                icon={MessageCircle}
                                color="primary"
                            />
                            <StatCard
                                title="Lead Messages"
                                value={communication?.summary?.totalLeadMessages ?? '—'}
                                subtitle="Messages on CRM leads"
                                icon={Activity}
                                color="blue"
                            />
                        </div>

                        <div className="dashboard-grid dashboard-grid-1">
                            <CommunicationPanel
                                data={communication?.summary ? {
                                    avgFirstResponseMinutes: communication.summary.avgFirstResponseMinutes,
                                    unansweredThreads: communication.summary.unansweredThreads,
                                    activeChatVolume: communication.summary.activeChatVolume,
                                    responseTimeTrend: communication.responseTimeTrend,
                                } : null}
                            />
                        </div>
                    </motion.div>
                )}

                {activeTab === 'booking-performance' && (
                    <motion.div key="booking-performance" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
                        <div className="dashboard-grid dashboard-grid-4">
                            <StatCard
                                title="Confirmed Bookings"
                                value={bookingPerf?.summary?.confirmedAppointments ?? '—'}
                                subtitle="Successfully scheduled"
                                icon={CalendarCheck}
                                color="green"
                            />
                            <StatCard
                                title="Cancelled"
                                value={bookingPerf?.summary?.cancelledAppointments ?? '—'}
                                subtitle="Bookings cancelled"
                                icon={Calendar}
                                color="orange"
                            />
                            <StatCard
                                title="Cancellation Rate"
                                value={bookingPerf?.summary?.cancellationRate !== undefined ? `${bookingPerf.summary.cancellationRate}%` : '—'}
                                subtitle="% of bookings cancelled"
                                icon={Activity}
                                color="purple"
                            />
                            <StatCard
                                title="Show Rate"
                                value={bookingPerf?.summary?.showRate !== undefined
                                    ? `${bookingPerf.summary.showRate}%`
                                    : '—'}
                                subtitle="Bookings that were kept"
                                icon={CalendarCheck}
                                color="primary"
                                trend={bookingPerf?.summary?.showRate}
                            />
                        </div>

                        <div className="dashboard-grid dashboard-grid-1">
                            <BookingPerformancePanel
                                data={bookingPerf?.summary ? {
                                    confirmedAppointments: bookingPerf.summary.confirmedAppointments,
                                    cancelledAppointments: bookingPerf.summary.cancelledAppointments,
                                    cancellationRate: bookingPerf.summary.cancellationRate,
                                } : null}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Dashboard;
