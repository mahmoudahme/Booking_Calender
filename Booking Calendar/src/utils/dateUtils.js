import { format, startOfWeek, addDays } from 'date-fns';

/**
 * Get relative date from today
 */
export const getRelativeDate = (daysOffset) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return format(date, 'yyyy-MM-dd');
};

/**
 * Get date range for day view
 */
export const getDayRange = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return {
        startDate: `${dateStr}T00:00:00`,
        endDate: `${dateStr}T23:59:59`,
        dates: [dateStr]
    };
};

/**
 * Get date range for week view
 */
export const getWeekRange = (date) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 0 });
    const startDate = format(weekStart, 'yyyy-MM-dd') + 'T00:00:00';
    const endDate = format(addDays(weekStart, 6), 'yyyy-MM-dd') + 'T23:59:59';

    const dates = [];
    for (let i = 0; i < 7; i++) {
        dates.push(format(addDays(weekStart, i), 'yyyy-MM-dd'));
    }

    return { startDate, endDate, dates };
};

/**
 * Get week days array
 */
export const getWeekDays = (date) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
};
