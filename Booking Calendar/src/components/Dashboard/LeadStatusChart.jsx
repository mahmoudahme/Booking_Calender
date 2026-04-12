import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const COLORS_LIGHT = ['#1877f2', '#ea580c', '#0da35d'];
const COLORS_DARK  = ['#5ba3ff', '#fb923c', '#4ade80'];

const LeadStatusChart = ({ data, conversionRate }) => {
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? COLORS_DARK : COLORS_LIGHT;
    const total = data ? data.reduce((s, d) => s + d.value, 0) : 0;

    if (!data || total === 0) {
        return (
            <motion.div
                className="stat-card chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title"><Target size={18} /> Lead Status Distribution</h4>
                <div className="chart-empty">No lead data available</div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><Target size={18} /> Lead Status Distribution</h4>
            <div className="chart-container" style={{ position: 'relative' }}>
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
                                            <p className="tooltip-value">{d.value} leads ({pct}%)</p>
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
                            wrapperStyle={{ paddingTop: 12 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div className="chart-center-value">
                    <span className="center-number">{total}</span>
                    <span className="center-label">Leads</span>
                </div>
            </div>

            <div className="lead-conversion-badge">
                <span className="lead-conversion-label">Conversion Rate</span>
                <span className="lead-conversion-value">{conversionRate}%</span>
            </div>
        </motion.div>
    );
};

export default LeadStatusChart;
