import React from 'react';
import { motion } from 'framer-motion';
import { calculateTop, calculateHeight, calculateDragDuration, timeToMinutes } from '../../utils/timeUtils';

const DragPreview = ({
    isDragging,
    dragStart,
    dragEnd,
    dragDoctor,
    dragDate,
    currentDoctor,
    currentDate,
    selectedSlot,
    selectedDuration,
    showModal,
    style = {}
}) => {
    // Drag selection preview
    if (isDragging && dragDoctor?.id === currentDoctor.id && dragDate === currentDate && dragStart && dragEnd) {
        const duration = calculateDragDuration(dragStart, dragEnd);
        const startTime = timeToMinutes(dragStart) < timeToMinutes(dragEnd) ? dragStart : dragEnd;

        return (
            <motion.div
                className="drag-selection-preview"
                style={{
                    top: `${calculateTop(startTime)}px`,
                    height: `${calculateHeight(duration)}px`,
                    ...style
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <span className="drag-label">{duration} min</span>
            </motion.div>
        );
    }

    // Preview of selected slot with duration
    if (selectedSlot && selectedSlot.doctor.id === currentDoctor.id && selectedSlot.date === currentDate && showModal) {
        return (
            <motion.div
                className="appointment-preview"
                style={{
                    top: `${calculateTop(selectedSlot.time)}px`,
                    height: `${calculateHeight(selectedDuration)}px`,
                    ...style
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
            >
                <span className="preview-label">Preview ({selectedDuration} min)</span>
            </motion.div>
        );
    }

    return null;
};

export default DragPreview;
