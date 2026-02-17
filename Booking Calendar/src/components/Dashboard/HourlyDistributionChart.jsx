import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const HourlyDistributionChart = ({ data }) => {
    const { isDarkMode } = useTheme();

    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';
    const textColor = isDarkMode ? '#e4e6eb' : '#1a1a1b';

    if (!data || data.length === 0) {
        return (
            <motion.div
                className="stat-card chart-card chart-card-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title"><BarChart3 size={18} /> Hourly Distribution</h4>
                <div className="chart-empty">No hourly data available</div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="stat-card chart-card chart-card-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><BarChart3 size={18} /> Today's Hourly Appointment Distribution</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="hour" stroke={textColor} fontSize={11} tickLine={false} />
                        <YAxis stroke={textColor} fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{label}</p>
                                            {payload.map((p, i) => (
                                                <p key={i} className="tooltip-value" style={{ color: p.color }}>
                                                    {p.name}: {p.value}
                                                </p>
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend />
                        <Bar dataKey="completed" name="Completed" stackId="a" fill="#0da35d" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#1877f2" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="appointments" name="Scheduled" fill="rgba(124, 58, 237, 0.3)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default HourlyDistributionChart;
