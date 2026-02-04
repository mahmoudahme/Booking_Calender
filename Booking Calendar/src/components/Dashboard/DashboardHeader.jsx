import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { DASHBOARD_PERIODS } from '../../constants';

const DashboardHeader = ({ period, setPeriod, title = 'Dashboard' }) => {
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
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
