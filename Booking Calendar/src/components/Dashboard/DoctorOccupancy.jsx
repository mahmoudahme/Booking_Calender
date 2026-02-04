import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const DoctorOccupancy = ({ data }) => {
    const { isDarkMode } = useTheme();

    const getOccupancyColor = (rate) => {
        if (rate >= 80) return isDarkMode ? '#4ade80' : '#0da35d';
        if (rate >= 50) return isDarkMode ? '#fb923c' : '#ea580c';
        return isDarkMode ? '#9ca3af' : '#4b5563';
    };

    const sortedData = [...data].sort((a, b) => b.occupancyRate - a.occupancyRate).slice(0, 6);

    if (sortedData.length === 0) {
        return (
            <motion.div
                className="stat-card chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title">
                    <Clock size={18} />
                    Doctor Occupancy
                </h4>
                <div className="chart-empty">No data available</div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title">
                <Clock size={18} />
                Doctor Occupancy
            </h4>
            <div className="occupancy-list">
                {sortedData.map((doctor, index) => (
                    <motion.div
                        key={doctor.id}
                        className="occupancy-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="occupancy-info">
                            <span className="occupancy-name">{doctor.name}</span>
                            <span className="occupancy-rate">{doctor.occupancyRate}%</span>
                        </div>
                        <div className="occupancy-bar-bg">
                            <motion.div
                                className="occupancy-bar-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${doctor.occupancyRate}%` }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                style={{ backgroundColor: getOccupancyColor(doctor.occupancyRate) }}
                            />
                        </div>
                        <div className="occupancy-details">
                            {Math.round(doctor.totalMinutes / 60)}h booked
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default DoctorOccupancy;
