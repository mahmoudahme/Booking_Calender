import { format } from 'date-fns';
import { PIXELS_PER_HOUR, PIXELS_PER_15MIN } from '../constants';

/**
 * Convert time string (HH:mm) to minutes since midnight
 */
export const timeToMinutes = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
};

/**
 * Calculate duration between two time strings
 */
export const calculateDragDuration = (startTime, endTime) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    return Math.abs(endMinutes - startMinutes) + 15; // +15 to include the end slot
};

/**
 * Calculate top position for a time slot in pixels
 */
export const calculateTop = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    const totalMinutes = (h - 9) * 60 + m;
    return totalMinutes * (PIXELS_PER_HOUR / 60);
};

/**
 * Calculate height for a duration in pixels
 */
export const calculateHeight = (duration) => duration * (PIXELS_PER_HOUR / 60);

/**
 * Format time range (HH:mm - HH:mm)
 */
export const formatTimeRange = (startTime, duration) => {
    if (!startTime) return '';
    const [h, m] = startTime.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);
    const end = new Date(date.getTime() + duration * 60000);
    return `${startTime} - ${format(end, 'HH:mm')}`;
};

/**
 * Format time range in AM/PM format
 */
export const formatTimeAMPM = (startTime, duration) => {
    if (!startTime) return '';
    const [h, m] = startTime.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);
    const end = new Date(date.getTime() + duration * 60000);
    return `${format(date, 'hh:mm a')} - ${format(end, 'hh:mm a')}`;
};

/**
 * Normalize time from "09:00 Am" to "09:00" (24h format)
 */
export const normalizeTime = (timeStr) => {
    if (typeof timeStr !== 'string' || !(timeStr.includes('m') || timeStr.includes('M'))) {
        return timeStr;
    }

    const parts = timeStr.split(' ');
    if (parts.length !== 2) return timeStr;

    const [time, modifier] = parts;
    let [hh, mm] = time.split(':');

    if (hh === '12') hh = '00';
    if (modifier.toLowerCase() === 'pm') {
        hh = (parseInt(hh, 10) + 12).toString();
    }

    return `${hh.toString().padStart(2, '0')}:${mm}`;
};

/**
 * Convert minutes to time string (HH:mm)
 */
export const minutesToTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};
