import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { GitCompare } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const BranchComparisonChart = ({ data }) => {
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
                <h4 className="chart-title"><GitCompare size={18} /> Branch Comparison</h4>
                <div className="chart-empty">No comparison data available</div>
            </motion.div>
        );
    }

    const chartData = data.map(b => ({
        name: b.branchName.replace(' Branch', '').replace(' - Downtown', ''),
        revenue: Math.round(b.revenue / 1000),
        appointments: b.appointments,
    }));

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><GitCompare size={18} /> Revenue vs Appointments by Branch</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} />
                        <YAxis yAxisId="left" stroke={textColor} fontSize={12} tickLine={false} axisLine={false}
                            tickFormatter={(v) => `${v}K`} />
                        <YAxis yAxisId="right" orientation="right" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{label}</p>
                                            {payload.map((p, i) => (
                                                <p key={i} className="tooltip-value" style={{ color: p.color }}>
                                                    {p.name}: {p.name === 'Revenue (K)' ? `${p.value}K SAR` : p.value}
                                                </p>
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend />
                        <Bar yAxisId="left" dataKey="revenue" name="Revenue (K)" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="right" dataKey="appointments" name="Appointments" fill="#1877f2" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default BranchComparisonChart;
