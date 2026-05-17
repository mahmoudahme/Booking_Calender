import React from 'react';
import { BarChart3, CalendarRange, ArrowRight } from 'lucide-react';
import { DASHBOARD_PERIODS } from '../../constants';

const PERIOD_OPTIONS = [
    { id: DASHBOARD_PERIODS.TODAY, label: 'Today' },
    { id: DASHBOARD_PERIODS.WEEK,  label: 'This Week' },
    { id: DASHBOARD_PERIODS.MONTH, label: 'This Month' },
    { id: DASHBOARD_PERIODS.CUSTOM, label: 'Custom', icon: CalendarRange },
];

const DashboardHeader = ({ period, setPeriod, customRange, setCustomRange, title = 'Dashboard' }) => {
    const isCustom = period === DASHBOARD_PERIODS.CUSTOM;

    const handleCustomDate = (field, value) => {
        setCustomRange(prev => ({ ...prev, [field]: value }));
    };

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
        <div className="dashboard-header">
            {/* Left: icon + title + date */}
            <div className="dashboard-header-left">
                <div className="dashboard-header-icon">
                    <BarChart3 size={22} />
                </div>
                <div>
                    <h1 className="dashboard-title">{title}</h1>
                    <p style={{
                        margin: 0,
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        marginTop: 2,
                        fontWeight: 500,
                    }}>
                        {today}
                    </p>
                </div>
            </div>

            {/* Right: period selector + custom date range */}
            <div className="dashboard-header-right" style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <div className="period-selector">
                    {PERIOD_OPTIONS.map(opt => {
                        const PIcon = opt.icon;
                        return (
                            <button
                                key={opt.id}
                                className={`period-btn ${period === opt.id ? 'active' : ''}`}
                                onClick={() => setPeriod(opt.id)}
                            >
                                {PIcon && <PIcon size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />}
                                {opt.label}
                            </button>
                        );
                    })}
                </div>

                {isCustom && (
                    <div className="custom-date-range">
                        <div className="date-range-field">
                            <label className="date-range-label">From</label>
                            <input
                                type="date"
                                className="date-range-input"
                                value={customRange?.start || ''}
                                onChange={e => handleCustomDate('start', e.target.value)}
                                max={customRange?.end || undefined}
                            />
                        </div>
                        <ArrowRight size={15} className="date-range-arrow" />
                        <div className="date-range-field">
                            <label className="date-range-label">To</label>
                            <input
                                type="date"
                                className="date-range-input"
                                value={customRange?.end || ''}
                                onChange={e => handleCustomDate('end', e.target.value)}
                                min={customRange?.start || undefined}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardHeader;
