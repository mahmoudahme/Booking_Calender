import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const ProcedureStatusChart = ({ data }) => {
    const { isDarkMode } = useTheme();

    if (!data) {
        return (
            <motion.div
                className="stat-card chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title"><CheckCircle size={18} /> Procedure Status</h4>
                <div className="chart-empty">No procedure data available</div>
            </motion.div>
        );
    }

    const chartData = [
        { name: 'Completed', value: data.completed, color: '#0da35d' },
        { name: 'In Progress', value: data.inProgress, color: '#1877f2' },
        { name: 'Pending', value: data.pending, color: '#f59e0b' },
        { name: 'Cancelled', value: data.cancelled, color: '#ef4444' },
        { name: 'No-Shows', value: data.noShows, color: '#6b7280' },
    ].filter(d => d.value > 0);

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><CheckCircle size={18} /> Today's Procedure Status</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={260}>
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
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    const pct = ((d.value / data.totalProcedures) * 100).toFixed(1);
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{d.name}</p>
                                            <p className="tooltip-value">{d.value} ({pct}%)</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: 10 }} />
                    </PieChart>
                </ResponsiveContainer>
                <div className="chart-center-value">
                    <span className="center-number">{data.completionRate}%</span>
                    <span className="center-label">Done</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProcedureStatusChart;
