// API Configuration
export const API_BASE_URL = 'http://72.62.16.223:3000/api/v1/booking-calendar';

// Time Configuration
export const HOURS = (() => {
    const hours = [];
    for (let h = 9; h <= 21; h++) {
        ['00', '15', '30', '45'].forEach(m => {
            if (h === 21 && m !== '00') return;
            const hourStr = h < 10 ? `0${h}` : `${h}`;
            hours.push(`${hourStr}:${m}`);
        });
    }
    return hours;
})();

// View Modes
export const VIEW_MODES = {
    DAY: 'day',
    WEEK: 'week',
    DASHBOARD: 'dashboard'
};

// Dashboard Periods
export const DASHBOARD_PERIODS = {
    TODAY: 'today',
    WEEK: 'week',
    MONTH: 'month'
};

// Status Colors for Charts (matching appointment colors)
export const STATUS_COLORS = {
    onthyfly: { light: '#4b5563', dark: '#9ca3af' },
    confirmed: { light: '#1fa391', dark: '#20c9a6' },
    arrived: { light: '#1877f2', dark: '#5ba3ff' },
    in_chair: { light: '#7c3aed', dark: '#a78bfa' },
    in_payment: { light: '#ea580c', dark: '#fb923c' },
    paid: { light: '#0da35d', dark: '#4ade80' },
    closed: { light: '#f02849', dark: '#ff6b8a' }
};

// Status Labels
export const STATUS_LABELS = {
    onthyfly: 'On The Fly',
    confirmed: 'Confirmed',
    arrived: 'Arrived',
    in_chair: 'In Chair',
    in_payment: 'In Payment',
    paid: 'Paid',
    closed: 'Closed'
};

// Default Values
export const DEFAULT_DURATION = 60; // minutes
export const POLLING_INTERVAL = 20000; // 20 seconds
export const SEARCH_DEBOUNCE = 300; // milliseconds
export const HIGHLIGHT_DURATION = 3000; // 3 seconds

// Grid Dimensions
export const PIXELS_PER_HOUR = 160;
export const PIXELS_PER_15MIN = 40;
export const MINUTES_PER_SLOT = 15;
