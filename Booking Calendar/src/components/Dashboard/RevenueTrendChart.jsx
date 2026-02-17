import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const BRANCH_COLORS = ['#1fa391', '#1877f2', '#f59e0b'];

const RevenueTrendChart = ({ data }) => {
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
                <h4 className="chart-title"><TrendingUp size={18} /> Revenue Trend</h4>
                <div className="chart-empty">No trend data available</div>
            </motion.div>
        );
    }

    // Transform: each day has branches array -> flatten to { date, branch1Revenue, branch2Revenue, ... }
    const chartData = data.slice(-14).map(day => {
        const point = { date: day.date.slice(5) };
        day.branches.forEach(b => {
            const key = b.branchName.replace(' Branch', '').replace(' - Downtown', '');
            point[key] = b.revenue;
        });
        return point;
    });

    const branchNames = data[0]?.branches.map(b => b.branchName.replace(' Branch', '').replace(' - Downtown', '')) || [];

    return (
        <motion.div
            className="stat-card chart-card chart-card-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><TrendingUp size={18} /> Daily Revenue Trend (All Branches)</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="date" stroke={textColor} fontSize={11} tickLine={false} />
                        <YAxis stroke={textColor} fontSize={11} tickLine={false} axisLine={false}
                            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{label}</p>
                                            {payload.map((p, i) => (
                                                <p key={i} className="tooltip-value" style={{ color: p.color }}>
                                                    {p.name}: {Number(p.value).toLocaleString()} SAR
                                                </p>
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend />
                        {branchNames.map((name, i) => (
                            <Line
                                key={name}
                                type="monotone"
                                dataKey={name}
                                stroke={BRANCH_COLORS[i % BRANCH_COLORS.length]}
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default RevenueTrendChart;
