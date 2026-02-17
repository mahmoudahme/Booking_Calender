import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const RevenueChart = ({ data }) => {
    const { isDarkMode } = useTheme();

    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';
    const textColor = isDarkMode ? '#e4e6eb' : '#1a1a1b';

    const colors = ['#1fa391', '#1877f2', '#f59e0b'];

    if (!data || data.length === 0) {
        return (
            <motion.div
                className="stat-card chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title"><DollarSign size={18} /> Branch Revenue</h4>
                <div className="chart-empty">No revenue data available</div>
            </motion.div>
        );
    }

    const chartData = data.map(branch => ({
        name: branch.branchName.replace(' Branch', '').replace(' - ', '\n'),
        revenue: branch.totalRevenue,
        paid: branch.paidInvoices,
        pending: branch.pendingInvoices,
    }));

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><DollarSign size={18} /> Branch Revenue Comparison</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} />
                        <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false}
                            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{label}</p>
                                            {payload.map((p, i) => (
                                                <p key={i} className="tooltip-value" style={{ color: p.color }}>
                                                    {p.name}: {p.value.toLocaleString()} SAR
                                                </p>
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend />
                        <Bar dataKey="paid" name="Paid" fill="#0da35d" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="pending" name="Pending" fill="#ea580c" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default RevenueChart;
