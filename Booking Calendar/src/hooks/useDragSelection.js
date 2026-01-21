import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { timeToMinutes, calculateDragDuration } from '../utils/timeUtils';

/**
 * Custom hook for drag selection functionality
 */
export const useDragSelection = (selectedDate) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(null);
    const [dragEnd, setDragEnd] = useState(null);
    const [dragDoctor, setDragDoctor] = useState(null);
    const [dragDate, setDragDate] = useState(null);

    const startDrag = (time, doctor, date = null) => {
        setIsDragging(true);
        setDragStart(time);
        setDragEnd(time);
        setDragDoctor(doctor);
        setDragDate(date || format(selectedDate, 'yyyy-MM-dd'));
    };

    const updateDrag = (time) => {
        if (isDragging) {
            setDragEnd(time);
        }
    };

    const endDrag = () => {
        let result = null;

        if (isDragging && dragStart && dragEnd && dragDoctor) {
            const duration = calculateDragDuration(dragStart, dragEnd);
            const startTime = timeToMinutes(dragStart) < timeToMinutes(dragEnd) ? dragStart : dragEnd;
            const date = dragDate || format(selectedDate, 'yyyy-MM-dd');

            result = {
                doctor: dragDoctor,
                time: startTime,
                date,
                duration
            };
        }

        // Reset drag state
        setIsDragging(false);
        setDragStart(null);
        setDragEnd(null);
        setDragDoctor(null);
        setDragDate(null);

        return result;
    };

    const resetDrag = () => {
        setIsDragging(false);
        setDragStart(null);
        setDragEnd(null);
        setDragDoctor(null);
        setDragDate(null);
    };

    return {
        isDragging,
        dragStart,
        dragEnd,
        dragDoctor,
        dragDate,
        startDrag,
        updateDrag,
        endDrag,
        resetDrag
    };
};
