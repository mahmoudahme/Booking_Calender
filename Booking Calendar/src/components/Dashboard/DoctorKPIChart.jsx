import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const DoctorKPIChart = ({ data }) => {
    const { isDarkMode } = useTheme();

    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';
    const textColor = isDarkMode ? '#e4e6eb' : '#1a1a1b';

    if (!data || data.length === 0) {
        return (
            <motion.div
                className="stat-card chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title"><Award size={18} /> Doctor KPIs</h4>
                <div className="chart-empty">No KPI data available</div>
            </motion.div>
        );
    }

    const chartData = data.slice(0, 8).map(d => ({
        name: d.doctorName.replace('Dr. ', ''),
        fullName: d.doctorName,
        completion: d.completionRate,
        total: d.totalAppointments,
        completed: d.completedAppointments,
        revenue: d.revenue,
        rating: d.patientRating,
    }));

    const getBarColor = (rate) => {
        if (rate >= 85) return '#0da35d';
        if (rate >= 65) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><Award size={18} /> Doctor Completion Rate & KPIs</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                        <XAxis type="number" stroke={textColor} fontSize={11} tickLine={false} domain={[0, 100]}
                            tickFormatter={(v) => `${v}%`} />
                        <YAxis type="category" dataKey="name" stroke={textColor} fontSize={11} tickLine={false} width={100} />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{d.fullName}</p>
                                            <p className="tooltip-value">Completion: {d.completion}%</p>
                                            <p className="tooltip-subvalue">Appointments: {d.completed}/{d.total}</p>
                                            <p className="tooltip-subvalue">Revenue: {d.revenue.toLocaleString()} SAR</p>
                                            <p className="tooltip-subvalue">Rating: {d.rating}/5.0</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="completion" radius={[0, 4, 4, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(entry.completion)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default DoctorKPIChart;
