import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { STATUS_COLORS, STATUS_LABELS } from '../../constants';
import { useTheme } from '../../hooks/useTheme';

const StatusDistribution = ({ data }) => {
    const { isDarkMode } = useTheme();

    const chartData = Object.entries(data).map(([status, count]) => ({
        name: STATUS_LABELS[status] || status,
        value: count,
        status
    }));

    const getColor = (status) => {
        const colorSet = STATUS_COLORS[status];
        if (colorSet) {
            return isDarkMode ? colorSet.dark : colorSet.light;
        }
        return isDarkMode ? '#9ca3af' : '#4b5563';
    };

    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    if (total === 0) {
        return (
            <motion.div
                className="stat-card chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title">Status Distribution</h4>
                <div className="chart-empty">No appointments in this period</div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title">Status Distribution</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getColor(entry.status)}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    const percentage = ((data.value / total) * 100).toFixed(1);
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{data.name}</p>
                                            <p className="tooltip-value">{data.value} ({percentage}%)</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{ paddingTop: 20 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="chart-center-value">
                <span className="center-number">{total}</span>
                <span className="center-label">Total</span>
            </div>
        </motion.div>
    );
};

export default StatusDistribution;
