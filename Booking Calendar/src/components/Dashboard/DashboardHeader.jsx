import React from 'react';
import { TrendingUp, CalendarRange, ArrowRight } from 'lucide-react';
import { DASHBOARD_PERIODS } from '../../constants';

const DashboardHeader = ({ period, setPeriod, customRange, setCustomRange, title = 'Dashboard' }) => {
    const isCustom = period === DASHBOARD_PERIODS.CUSTOM;

    const handleCustomDate = (field, value) => {
        const updated = { ...customRange, [field]: value };
        setCustomRange(updated);
    };

    return (
        <div className="dashboard-header">
            <div className="dashboard-header-left">
                <TrendingUp size={28} className="dashboard-header-icon" />
                <h1 className="dashboard-title">{title}</h1>
            </div>

            <div className="dashboard-header-right">
                <div className="period-selector">
                    <button
                        className={`period-btn ${period === DASHBOARD_PERIODS.TODAY ? 'active' : ''}`}
                        onClick={() => setPeriod(DASHBOARD_PERIODS.TODAY)}
                    >
                        Today
                    </button>
                    <button
                        className={`period-btn ${period === DASHBOARD_PERIODS.WEEK ? 'active' : ''}`}
                        onClick={() => setPeriod(DASHBOARD_PERIODS.WEEK)}
                    >
                        This Week
                    </button>
                    <button
                        className={`period-btn ${period === DASHBOARD_PERIODS.MONTH ? 'active' : ''}`}
                        onClick={() => setPeriod(DASHBOARD_PERIODS.MONTH)}
                    >
                        This Month
                    </button>
                    <button
                        className={`period-btn ${isCustom ? 'active' : ''}`}
                        onClick={() => setPeriod(DASHBOARD_PERIODS.CUSTOM)}
                    >
                        <CalendarRange size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        Custom
                    </button>
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
                        <ArrowRight size={16} className="date-range-arrow" />
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
