import React from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VIEW_MODES } from '../../constants';

const NavigationToolbar = ({
    viewMode,
    setViewMode,
    selectedDate,
    onNavigate,
    onRefresh,
    isRefreshing
}) => {
    return (
        <div className="nav-toolbar">
            {/* Date Navigation Controls */}
            <div className="date-nav-controls">
                <button
                    onClick={() => onNavigate('prev')}
                    className="nav-btn-icon"
                >
                    <ChevronLeft size={20} />
                </button>

                <button
                    onClick={() => onNavigate('today')}
                    className="nav-btn-today"
                >
                    {viewMode === VIEW_MODES.DAY ? 'Today' : 'This Week'}
                </button>

                <button
                    onClick={() => onNavigate('next')}
                    className="nav-btn-icon"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* View Toggle */}
            <div className="view-toggle-group">
                <button
                    onClick={() => setViewMode(VIEW_MODES.DAY)}
                    className={`view-toggle-btn ${viewMode === VIEW_MODES.DAY ? 'active' : ''}`}
                >
                    Day
                </button>
                <button
                    onClick={() => setViewMode(VIEW_MODES.WEEK)}
                    className={`view-toggle-btn ${viewMode === VIEW_MODES.WEEK ? 'active' : ''}`}
                >
                    Week
                </button>
            </div>

            <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className={`nav-btn-today ${isRefreshing ? 'refresh-loading' : ''}`}
                style={{ marginLeft: '10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
                {isRefreshing ? 'Updating...' : 'Refresh'}
            </button>

            {/* Current Date Display */}
            {viewMode === VIEW_MODES.DAY ? (
                <h2 className="current-date-display">
                    {format(selectedDate, 'MMM d, yyyy')}
                </h2>
            ) : (
                <h2 className="current-date-display">
                    {format(startOfWeek(selectedDate, { weekStartsOn: 0 }), 'MMM d')} - {format(addDays(startOfWeek(selectedDate, { weekStartsOn: 0 }), 6), 'MMM d, yyyy')}
                </h2>
            )}
        </div>
    );
};

export default NavigationToolbar;
