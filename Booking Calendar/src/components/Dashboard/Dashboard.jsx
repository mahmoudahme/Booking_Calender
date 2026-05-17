import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Users, Stethoscope, Clock, Activity,
    DollarSign, Award, Package, BarChart3,
    Target, MessageCircle, CalendarCheck, CalendarRange,
    TrendingUp,
} from 'lucide-react';
import { useDashboardStats } from '../../hooks/useDashboardStats';
import { useDashboardData } from '../../hooks/useDashboardData';
import { DASHBOARD_PERIODS } from '../../constants';
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

/* ── Navigation structure ───────────────────────────────── */
const NAV_GROUPS = [
    {
        label: 'Analytics',
        items: [
            { id: 'financial',    label: 'Financial',     icon: DollarSign   },
            { id: 'patients',     label: 'Patients',       icon: Users        },
            { id: 'appointments', label: 'Appointments',   icon: Calendar     },
            { id: 'performance',  label: 'Performance',    icon: BarChart3    },
        ],
    },
    {
        label: 'Business',
        items: [
            { id: 'services',          label: 'Services',       icon: Package      },
            { id: 'lead-analytics',    label: 'Leads',          icon: Target       },
            { id: 'communication',     label: 'Communication',  icon: MessageCircle},
            { id: 'booking-performance', label: 'Booking',      icon: CalendarCheck},
        ],
    },
];

const PERIOD_BTNS = [
    { id: DASHBOARD_PERIODS.TODAY,  label: 'Today'     },
    { id: DASHBOARD_PERIODS.WEEK,   label: 'Week'      },
    { id: DASHBOARD_PERIODS.MONTH,  label: 'Month'     },
    { id: DASHBOARD_PERIODS.CUSTOM, label: 'Custom', icon: CalendarRange },
];

const PAGE_META = {
    financial:           { label: 'Financial',     icon: DollarSign    },
    patients:            { label: 'Patients',       icon: Users         },
    appointments:        { label: 'Appointments',   icon: Calendar      },
    performance:         { label: 'Performance',    icon: BarChart3     },
    services:            { label: 'Services',       icon: Package       },
    'lead-analytics':    { label: 'Leads',          icon: Target        },
    communication:       { label: 'Communication',  icon: MessageCircle },
    'booking-performance': { label: 'Booking',      icon: CalendarCheck },
};

const contentVariants = {
    hidden:  { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0,  transition: { duration: 0.25, staggerChildren: 0.06 } },
    exit:    { opacity: 0, x: -16, transition: { duration: 0.15 } },
};

/* ── Component ──────────────────────────────────────────── */
const Dashboard = ({ appointments, doctors, selectedDate }) => {
    const [period, setPeriod]         = useState(DASHBOARD_PERIODS.WEEK);
    const [activeTab, setActiveTab]   = useState('financial');
    const [customRange, setCustomRange] = useState({ start: '', end: '' });

    const stats         = useDashboardStats(appointments, doctors, period, selectedDate, customRange);
    const { data: dashboardData } = useDashboardData(period, customRange);

    const periodLabel = period === DASHBOARD_PERIODS.TODAY  ? 'Today'
        : period === DASHBOARD_PERIODS.WEEK   ? 'This Week'
        : period === DASHBOARD_PERIODS.CUSTOM
            ? (customRange?.start && customRange?.end
                ? `${customRange.start} → ${customRange.end}`
                : 'Custom Range')
        : 'This Month';

    const financial       = dashboardData?.financial;
    const services        = dashboardData?.services;
    const patients        = dashboardData?.patients;
    const performance     = dashboardData?.performance;
    const apptData        = dashboardData?.appointments;
    const leads           = dashboardData?.leads;
    const communication   = dashboardData?.communication;
    const bookingPerf     = dashboardData?.bookingPerformance;

    const isCustom = period === DASHBOARD_PERIODS.CUSTOM;
    const todayStr = new Date().toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    });

    const PageIcon = PAGE_META[activeTab]?.icon;

    return (
        <motion.div
            className="dashboard-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* ══ LEFT SIDEBAR ══════════════════════════════════ */}
            <aside className="db-sidenav">

                {/* Brand */}
                <div className="db-sidenav-brand">
                    <div className="db-brand-icon">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <div className="db-brand-title">Dashboard</div>
                        <div className="db-brand-date">{todayStr}</div>
                    </div>
                </div>

                {/* Period selector */}
                <div className="db-period-section">
                    <div className="db-section-label">Period</div>
                    <div className="db-period-grid">
                        {PERIOD_BTNS.map(btn => {
                            const BIcon = btn.icon;
                            return (
                                <button
                                    key={btn.id}
                                    className={`db-period-btn ${period === btn.id ? 'active' : ''}`}
                                    onClick={() => setPeriod(btn.id)}
                                >
                                    {BIcon && <BIcon size={11} />}
                                    {btn.label}
                                </button>
                            );
                        })}
                    </div>

                    {isCustom && (
                        <div className="db-custom-range">
                            <div className="db-custom-field">
                                <label className="db-custom-label">From</label>
                                <input
                                    type="date"
                                    className="db-custom-input"
                                    value={customRange?.start || ''}
                                    onChange={e => setCustomRange(p => ({ ...p, start: e.target.value }))}
                                    max={customRange?.end || undefined}
                                />
                            </div>
                            <div className="db-custom-field">
                                <label className="db-custom-label">To</label>
                                <input
                                    type="date"
                                    className="db-custom-input"
                                    value={customRange?.end || ''}
                                    onChange={e => setCustomRange(p => ({ ...p, end: e.target.value }))}
                                    min={customRange?.start || undefined}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Nav groups */}
                <nav className="db-nav">
                    {NAV_GROUPS.map(group => (
                        <div key={group.label} className="db-nav-group">
                            <div className="db-section-label">{group.label}</div>
                            <div className="db-nav-items">
                                {group.items.map(item => {
                                    const IIcon = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            className={`db-nav-item ${activeTab === item.id ? 'active' : ''}`}
                                            onClick={() => setActiveTab(item.id)}
                                        >
                                            <IIcon size={16} />
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* ══ MAIN CONTENT ══════════════════════════════════ */}
            <div className="db-main">

                {/* KPI Cards — always visible, always first */}
                <div className="db-kpi-row">
                    <StatCard
                        title="Total Revenue"
                        value={financial ? (financial.summary.totalRevenue >= 1000000
                            ? `${(financial.summary.totalRevenue / 1000000).toFixed(2)}M`
                            : `${(financial.summary.totalRevenue / 1000).toFixed(0)}K`)
                            : '—'}
                        subtitle={`SAR — ${periodLabel}`}
                        icon={DollarSign}
                        color="green"
                        trend={financial ? 12.5 : undefined}
                    />
                    <StatCard
                        title="Appointments"
                        value={apptData?.appointmentStats?.total || stats.appointmentStats.total || (performance?.statusOverview?.totalProcedures ?? '—')}
                        subtitle={periodLabel}
                        icon={Calendar}
                        color="primary"
                    />
                    <StatCard
                        title="Patients Today"
                        value={patients?.todaySummary?.total ?? stats.appointmentStats.today}
                        subtitle={patients
                            ? `${patients.todaySummary.newPatients} new · ${patients.todaySummary.returningPatients} returning`
                            : 'Scheduled today'}
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

                {/* Page title — below KPI row */}
                <div className="db-page-header">
                    <div className="db-page-icon">
                        {PageIcon && <PageIcon size={18} />}
                    </div>
                    <div>
                        <h2 className="db-page-title">{PAGE_META[activeTab]?.label}</h2>
                        <p className="db-page-sub">{periodLabel}</p>
                    </div>
                </div>

                {/* ── Tab Content ──────────────────────────────── */}
                <AnimatePresence mode="wait">

                    {/* FINANCIAL */}
                    {activeTab === 'financial' && (
                        <motion.div key="financial" className="db-section" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                            <div className="dashboard-grid dashboard-grid-2">
                                <RevenueChart data={financial?.branchRevenue} />
                                <CollectionRateChart data={financial?.summary} />
                            </div>
                            <div className="dashboard-grid dashboard-grid-2">
                                <BranchComparisonChart data={financial?.branchComparison} />
                                <motion.div className="chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                    <h4 className="chart-title"><Award size={17} /> Branch Revenue Ranking</h4>
                                    {financial?.branchRevenue ? (
                                        <div className="ranking-list">
                                            {financial.branchRevenue.map((branch, i) => (
                                                <div key={branch.branchId} className="ranking-item">
                                                    <span className={`ranking-badge ${i === 0 ? 'gold' : i === 1 ? 'silver' : 'bronze'}`}>#{i + 1}</span>
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
                                    ) : <div className="chart-empty">No data</div>}
                                </motion.div>
                            </div>
                            <div className="dashboard-grid dashboard-grid-1">
                                <RevenueTrendChart data={financial?.dailyTrend} period={period} periodLabel={periodLabel} />
                            </div>
                        </motion.div>
                    )}

                    {/* PATIENTS */}
                    {activeTab === 'patients' && (
                        <motion.div key="patients" className="db-section" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                            <div className="dashboard-grid dashboard-grid-4">
                                <StatCard title="New Patients"
                                    value={patients?.todaySummary?.newPatients ?? '—'}
                                    subtitle={patients ? `${patients.todaySummary.newPatientPercentage}% of period` : ''}
                                    icon={Users} color="blue" />
                                <StatCard title="Returning"
                                    value={patients?.todaySummary?.returningPatients ?? '—'}
                                    subtitle={patients ? `${patients.todaySummary.total} total` : ''}
                                    icon={Users} color="green" />
                                <StatCard title="Avg Duration"
                                    value={patients?.avgDurationMinutes ? `${patients.avgDurationMinutes}m` : '—'}
                                    subtitle="Average session length"
                                    icon={Clock} color="orange" />
                                <StatCard title="Unconfirmed Rate"
                                    value={patients?.efficiencyByBranch?.length > 0
                                        ? `${Math.round(patients.efficiencyByBranch.reduce((s, b) => s + (b.noShowRate ?? 0), 0) / patients.efficiencyByBranch.length)}%`
                                        : '—'}
                                    subtitle="Booked but not confirmed"
                                    icon={Activity} color="purple" />
                            </div>
                            <div className="dashboard-grid dashboard-grid-1">
                                <PatientTrafficChart data={patients?.dailyTraffic} period={period} periodLabel={periodLabel} />
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

                    {/* APPOINTMENTS */}
                    {activeTab === 'appointments' && (
                        <motion.div key="appointments" className="db-section" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                            <div className="dashboard-grid dashboard-grid-2">
                                <StatusDistribution data={apptData?.appointmentStats?.byStatus} />
                                <DoctorStats data={apptData?.doctorStats} />
                            </div>
                            <div className="dashboard-grid dashboard-grid-1">
                                <TrendChart data={apptData?.appointmentStats?.byDate} title={`Appointments — ${periodLabel}`} />
                            </div>
                            <div className="dashboard-grid dashboard-grid-2">
                                <DoctorOccupancy data={apptData?.doctorStats} />
                                <PatientStats data={apptData?.patientStats} />
                            </div>
                        </motion.div>
                    )}

                    {/* PERFORMANCE */}
                    {activeTab === 'performance' && (
                        <motion.div key="performance" className="db-section" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                            <div className="dashboard-grid dashboard-grid-4">
                                <StatCard title="Total Procedures"
                                    value={performance?.statusOverview?.totalProcedures ?? '—'}
                                    subtitle="Today's procedures"
                                    icon={Stethoscope} color="primary" />
                                <StatCard title="Completed"
                                    value={performance?.statusOverview?.completed ?? '—'}
                                    subtitle={performance ? `${performance.statusOverview.completionRate}% rate` : ''}
                                    icon={Activity} color="green"
                                    trend={performance ? performance.statusOverview.completionRate : undefined} />
                                <StatCard title="In Progress"
                                    value={performance?.statusOverview?.inProgress ?? '—'}
                                    subtitle="Currently active"
                                    icon={Clock} color="blue" />
                                <StatCard title="No-Shows"
                                    value={performance?.statusOverview?.noShows ?? '—'}
                                    subtitle="Missed today"
                                    icon={Users} color="orange" />
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

                    {/* SERVICES */}
                    {activeTab === 'services' && (
                        <motion.div key="services" className="db-section" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                            <div className="dashboard-grid dashboard-grid-2">
                                <TopServicesChart data={services?.topServices} />
                                <ServiceCategoryChart data={services?.servicesByCategory} />
                            </div>
                            <div className="dashboard-grid dashboard-grid-1">
                                <ConsumablesChart data={services?.consumablesUsage} alerts={services?.alerts} />
                            </div>
                        </motion.div>
                    )}

                    {/* LEADS */}
                    {activeTab === 'lead-analytics' && (
                        <motion.div key="lead-analytics" className="db-section" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                            <div className="dashboard-grid dashboard-grid-4">
                                <StatCard title="Total Leads"
                                    value={leads?.summary?.totalLeads ?? '—'}
                                    subtitle={periodLabel} icon={Target} color="blue" />
                                <StatCard title="New Leads"
                                    value={leads?.byStatus?.[0]?.value ?? '—'}
                                    subtitle="Awaiting first contact" icon={Target} color="primary" />
                                <StatCard title="In Progress"
                                    value={leads?.byStatus?.[1]?.value ?? '—'}
                                    subtitle="Being handled" icon={Activity} color="orange" />
                                <StatCard title="Conversion Rate"
                                    value={leads?.summary?.conversionRate !== undefined ? `${leads.summary.conversionRate}%` : '—'}
                                    subtitle="Leads → Bookings" icon={CalendarCheck} color="green"
                                    trend={leads?.summary?.conversionRate} />
                            </div>
                            <div className="dashboard-grid dashboard-grid-2">
                                <LeadStatusChart data={leads?.byStatus} conversionRate={leads?.summary?.conversionRate} />
                                <LeadSourceChart data={leads?.bySource} />
                            </div>
                            <div className="dashboard-grid dashboard-grid-1">
                                <LeadConversionTrend data={leads?.conversionTrend} />
                            </div>
                        </motion.div>
                    )}

                    {/* COMMUNICATION */}
                    {activeTab === 'communication' && (
                        <motion.div key="communication" className="db-section" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                            <div className="dashboard-grid dashboard-grid-4">
                                <StatCard title="Avg First Response"
                                    value={communication?.summary?.avgFirstResponseMinutes != null
                                        ? `${communication.summary.avgFirstResponseMinutes}m` : '—'}
                                    subtitle="Time to first reply" icon={Clock} color="orange" />
                                <StatCard title="Unanswered"
                                    value={communication?.summary?.unansweredThreads ?? '—'}
                                    subtitle="Need a reply" icon={MessageCircle} color="purple" />
                                <StatCard title="Active Chats"
                                    value={communication?.summary?.activeChatVolume ?? '—'}
                                    subtitle="Open conversations" icon={MessageCircle} color="primary" />
                                <StatCard title="Lead Messages"
                                    value={communication?.summary?.totalLeadMessages ?? '—'}
                                    subtitle="On CRM leads" icon={Activity} color="blue" />
                            </div>
                            <div className="dashboard-grid dashboard-grid-1">
                                <CommunicationPanel data={communication?.summary ? {
                                    avgFirstResponseMinutes: communication.summary.avgFirstResponseMinutes,
                                    unansweredThreads: communication.summary.unansweredThreads,
                                    activeChatVolume: communication.summary.activeChatVolume,
                                    responseTimeTrend: communication.responseTimeTrend,
                                } : null} />
                            </div>
                        </motion.div>
                    )}

                    {/* BOOKING PERFORMANCE */}
                    {activeTab === 'booking-performance' && (
                        <motion.div key="booking-performance" className="db-section" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                            <div className="dashboard-grid dashboard-grid-4">
                                <StatCard title="Confirmed"
                                    value={bookingPerf?.summary?.confirmedAppointments ?? '—'}
                                    subtitle="Successfully scheduled" icon={CalendarCheck} color="green" />
                                <StatCard title="Cancelled"
                                    value={bookingPerf?.summary?.cancelledAppointments ?? '—'}
                                    subtitle="Bookings cancelled" icon={Calendar} color="orange" />
                                <StatCard title="Cancellation Rate"
                                    value={bookingPerf?.summary?.cancellationRate !== undefined
                                        ? `${bookingPerf.summary.cancellationRate}%` : '—'}
                                    subtitle="% of bookings cancelled" icon={Activity} color="purple" />
                                <StatCard title="Show Rate"
                                    value={bookingPerf?.summary?.showRate !== undefined
                                        ? `${bookingPerf.summary.showRate}%` : '—'}
                                    subtitle="Bookings that were kept" icon={CalendarCheck} color="primary"
                                    trend={bookingPerf?.summary?.showRate} />
                            </div>
                            <div className="dashboard-grid dashboard-grid-1">
                                <BookingPerformancePanel data={bookingPerf?.summary ? {
                                    confirmedAppointments: bookingPerf.summary.confirmedAppointments,
                                    cancelledAppointments: bookingPerf.summary.cancelledAppointments,
                                    cancellationRate: bookingPerf.summary.cancellationRate,
                                } : null} />
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Dashboard;
