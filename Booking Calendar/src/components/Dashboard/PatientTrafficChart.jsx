import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const PatientTrafficChart = ({ data }) => {
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
                <h4 className="chart-title"><Users size={18} /> Patient Traffic</h4>
                <div className="chart-empty">No traffic data available</div>
            </motion.div>
        );
    }

    const chartData = data.slice(-14).map(d => ({
        date: d.date.slice(5),
        'New Patients': d.newPatients,
        'Returning': d.returningPatients,
        total: d.total,
    }));

    return (
        <motion.div
            className="stat-card chart-card chart-card-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><Users size={18} /> Patient Traffic (New vs Returning)</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                        <defs>
                            <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1877f2" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#1877f2" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0da35d" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#0da35d" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="date" stroke={textColor} fontSize={11} tickLine={false} />
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
                        <Area type="monotone" dataKey="New Patients" stroke="#1877f2" strokeWidth={2} fill="url(#colorNew)" />
                        <Area type="monotone" dataKey="Returning" stroke="#0da35d" strokeWidth={2} fill="url(#colorReturning)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default PatientTrafficChart;
