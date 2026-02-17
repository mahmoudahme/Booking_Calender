import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const EfficiencyChart = ({ data }) => {
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
                <h4 className="chart-title"><Clock size={18} /> Efficiency QA</h4>
                <div className="chart-empty">No efficiency data available</div>
            </motion.div>
        );
    }

    const chartData = data.map(b => ({
        name: b.branchName.replace(' Branch', '').replace(' - Downtown', ''),
        'Wait Time (min)': b.averageWaitTime,
        'No-Show Rate (%)': b.noShowRate,
        satisfaction: b.patientSatisfaction,
    }));

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><Clock size={18} /> Branch Efficiency & QA</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} />
                        <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{label}</p>
                                            <p className="tooltip-value">Avg Wait: {d['Wait Time (min)']} min</p>
                                            <p className="tooltip-subvalue">No-Show: {d['No-Show Rate (%)']}%</p>
                                            <p className="tooltip-subvalue">Satisfaction: {d.satisfaction}%</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend />
                        <Bar dataKey="Wait Time (min)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="No-Show Rate (%)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="efficiency-cards">
                {data.map((b, i) => (
                    <div key={i} className="efficiency-card-item">
                        <span className="efficiency-branch">{b.branchName.replace(' Branch', '').replace(' - Downtown', '')}</span>
                        <div className="efficiency-metrics">
                            <span className="efficiency-metric">
                                <Clock size={12} /> {b.averageWaitTime}m wait
                            </span>
                            <span className="efficiency-metric" style={{ color: b.noShowRate > 10 ? '#ef4444' : '#0da35d' }}>
                                <AlertCircle size={12} /> {b.noShowRate}% no-show
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default EfficiencyChart;
