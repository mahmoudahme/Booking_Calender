import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const COLORS = ['#1fa391', '#1877f2', '#7c3aed', '#f59e0b', '#0da35d', '#ea580c', '#ec4899', '#06b6d4'];

const ServiceCategoryChart = ({ data }) => {
    const { isDarkMode } = useTheme();

    if (!data || data.length === 0) {
        return (
            <motion.div
                className="stat-card chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title"><Layers size={18} /> Service Categories</h4>
                <div className="chart-empty">No category data available</div>
            </motion.div>
        );
    }

    const total = data.reduce((sum, item) => sum + item.totalRevenue, 0);

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><Layers size={18} /> Revenue by Service Category</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                            data={data.map(d => ({ name: d.category, value: d.totalRevenue }))}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={85}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    const pct = ((d.value / total) * 100).toFixed(1);
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{d.name}</p>
                                            <p className="tooltip-value">{d.value.toLocaleString()} SAR ({pct}%)</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: 15 }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default ServiceCategoryChart;
