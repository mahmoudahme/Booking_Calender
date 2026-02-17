import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const CollectionRateChart = ({ data }) => {
    const { isDarkMode } = useTheme();

    if (!data) {
        return (
            <motion.div
                className="stat-card chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title"><CreditCard size={18} /> Collection Rate</h4>
                <div className="chart-empty">No data available</div>
            </motion.div>
        );
    }

    const chartData = [
        { name: 'Paid', value: data.totalPaid, color: '#0da35d' },
        { name: 'Pending', value: data.totalPending, color: '#ea580c' },
    ];

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><CreditCard size={18} /> Invoice Collection Rate</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{d.name}</p>
                                            <p className="tooltip-value">{d.value.toLocaleString()} SAR</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div className="chart-center-value">
                    <span className="center-number">{data.overallCollectionRate}%</span>
                    <span className="center-label">Collected</span>
                </div>
            </div>
            <div className="collection-summary">
                <div className="collection-item">
                    <span className="collection-dot" style={{ background: '#0da35d' }}></span>
                    <span className="collection-label">Paid</span>
                    <span className="collection-value">{data.totalPaid.toLocaleString()} SAR</span>
                </div>
                <div className="collection-item">
                    <span className="collection-dot" style={{ background: '#ea580c' }}></span>
                    <span className="collection-label">Pending</span>
                    <span className="collection-value">{data.totalPending.toLocaleString()} SAR</span>
                </div>
            </div>
        </motion.div>
    );
};

export default CollectionRateChart;
