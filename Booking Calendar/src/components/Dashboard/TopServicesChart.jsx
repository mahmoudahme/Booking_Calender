import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Stethoscope } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const TopServicesChart = ({ data }) => {
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
                <h4 className="chart-title"><Stethoscope size={18} /> Top Services</h4>
                <div className="chart-empty">No services data available</div>
            </motion.div>
        );
    }

    const chartData = data.slice(0, 8).map(s => ({
        name: s.serviceName.length > 18 ? s.serviceName.substring(0, 16) + '...' : s.serviceName,
        fullName: s.serviceName,
        revenue: s.totalRevenue,
        count: s.procedureCount,
    }));

    const colors = ['#1fa391', '#1877f2', '#7c3aed', '#f59e0b', '#0da35d', '#ea580c', '#ec4899', '#06b6d4'];

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><Stethoscope size={18} /> Top-Selling Services</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                        <XAxis type="number" stroke={textColor} fontSize={11} tickLine={false}
                            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                        <YAxis type="category" dataKey="name" stroke={textColor} fontSize={11} tickLine={false} width={120} />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{d.fullName}</p>
                                            <p className="tooltip-value">Revenue: {d.revenue.toLocaleString()} SAR</p>
                                            <p className="tooltip-subvalue">Procedures: {d.count}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="revenue" fill="#7c3aed" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default TopServicesChart;
