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
    WEEK: 'week'
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
