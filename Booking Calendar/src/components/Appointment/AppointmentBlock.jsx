import React from 'react';
import { motion } from 'framer-motion';
import { calculateTop, calculateHeight, formatTimeRange, formatTimeAMPM } from '../../utils/timeUtils';

const AppointmentBlock = ({
    appointment,
    doctor,
    isHighlighted,
    style = {},
    onClick = null
}) => {
    const handleClick = (e) => {
        e.stopPropagation();
        if (onClick) {
            onClick(appointment);
        } else {
            alert(`Appointment: ${appointment.title}\nTime: ${formatTimeRange(appointment.time, appointment.duration)}`);
        }
    };

    return (
        <motion.div
            className={`appointment-block appointment-${appointment.type} ${isHighlighted ? 'appointment-highlighted' : ''}`}
            style={{
                top: `${calculateTop(appointment.time)}px`,
                height: `${calculateHeight(appointment.duration)}px`,
                ...style
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            onClick={handleClick}
        >
            <span className="app-title">{appointment.title}</span>

            {/* Hover Tooltip */}
            <div className="appointment-tooltip">
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{appointment.title}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>Dr. {doctor?.name}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>
                    {formatTimeAMPM(appointment.time, appointment.duration)}
                </div>
                <div style={{ marginTop: '4px', fontStyle: 'italic', fontSize: '0.65rem' }}>
                    {appointment.duration} mins • {appointment.type.toUpperCase()}
                </div>
            </div>
        </motion.div>
    );
};

export default AppointmentBlock;
