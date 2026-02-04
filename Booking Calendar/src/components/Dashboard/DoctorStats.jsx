import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const DoctorStats = ({ data }) => {
    const { isDarkMode } = useTheme();

    const primaryColor = isDarkMode ? '#20c9a6' : '#1fa391';
    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';
    const textColor = isDarkMode ? '#e4e6eb' : '#1a1a1b';

    const chartData = data.slice(0, 6).map(doctor => ({
        name: doctor.name.length > 12 ? doctor.name.substring(0, 12) + '...' : doctor.name,
        fullName: doctor.name,
        appointments: doctor.appointmentCount,
        minutes: doctor.totalMinutes
    }));

    if (chartData.length === 0) {
        return (
            <motion.div
                className="stat-card chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title">Appointments by Doctor</h4>
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
            <h4 className="chart-title">Appointments by Doctor</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={true} vertical={false} />
                        <XAxis type="number" stroke={textColor} fontSize={12} />
                        <YAxis
                            type="category"
                            dataKey="name"
                            stroke={textColor}
                            fontSize={12}
                            width={100}
                            tickLine={false}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{data.fullName}</p>
                                            <p className="tooltip-value">{data.appointments} appointments</p>
                                            <p className="tooltip-subvalue">{data.minutes} min total</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="appointments" fill={primaryColor} radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default DoctorStats;
