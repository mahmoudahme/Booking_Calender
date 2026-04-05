import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import bookingAPI from '../services/api';
import { getDayRange, getWeekRange, getMonthRange } from '../utils/dateUtils';
import { normalizeTime } from '../utils/timeUtils';
import { VIEW_MODES, POLLING_INTERVAL } from '../constants';

/**
 * Custom hook for managing appointments and doctor slots
 */
export const useAppointments = (selectedDate, viewMode, selectedDoctors) => {
    const [appointments, setAppointments] = useState([]);
    const [doctorSlots, setDoctorSlots] = useState({});
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchAppointments = useCallback(async (silent = false) => {
        // Validate inputs
        if (!selectedDate || isNaN(selectedDate.getTime())) return;
        if (!silent) setIsRefreshing(true);

        try {
            // Get date range based on view mode
            const isDashboard = viewMode === VIEW_MODES.DASHBOARD;
            const { startDate, endDate, dates } = viewMode === VIEW_MODES.DAY
                ? getDayRange(selectedDate)
                : isDashboard
                ? getMonthRange(selectedDate)
                : getWeekRange(selectedDate);

            // Fetch appointments
            const appointmentsData = await bookingAPI.getAppointments(
                startDate,
                endDate,
                selectedDoctors
            );

            console.log("Fetched Appointments:", appointmentsData);
            setAppointments(appointmentsData);

            // Skip slot fetching in dashboard mode (not needed for stats)
            if (isDashboard) return;

            // Fetch slots for all dates (bulk fetch)
            const slotsData = {};

            for (const dateStr of dates) {
                const schedulesMap = await bookingAPI.getSchedule(dateStr);

                if (schedulesMap) {
                    // Iterate over returned doctor schedules
                    Object.keys(schedulesMap).forEach(docId => {
                        const rawSlots = schedulesMap[docId];

                        const normalizedSlots = rawSlots.map(s => ({
                            ...s,
                            subtime: normalizeTime(s.subtime),
                            originalTime: s.subtime
                        }));

                        slotsData[`${docId}_${dateStr}`] = normalizedSlots;
                    });
                }
            }

            setDoctorSlots(slotsData);
        } catch (error) {
            console.error('Error fetching appointments and slots:', error);
        } finally {
            if (!silent) setIsRefreshing(false);
        }
    }, [selectedDate, viewMode, selectedDoctors]);

    // Initial fetch and on dependencies change
    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    // Polling disabled as requested
    /*
    useEffect(() => {
        const interval = setInterval(() => {
            fetchAppointments(true);
        }, POLLING_INTERVAL);

        return () => clearInterval(interval);
    }, [fetchAppointments]);
    */

    return {
        appointments,
        doctorSlots,
        isRefreshing,
        refetch: fetchAppointments
    };
};
