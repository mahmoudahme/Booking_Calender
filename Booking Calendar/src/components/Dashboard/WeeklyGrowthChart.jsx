import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const WeeklyGrowthChart = ({ data }) => {
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
                <h4 className="chart-title"><TrendingUp size={18} /> Weekly Growth</h4>
                <div className="chart-empty">No growth data available</div>
            </motion.div>
        );
    }

    const chartData = data.map(w => ({
        week: w.week,
        volume: w.patientVolume,
        growth: w.growthRate,
        newPatients: w.newPatients,
    }));

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><TrendingUp size={18} /> Week-over-Week Patient Growth</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="week" stroke={textColor} fontSize={12} tickLine={false} />
                        <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{label}</p>
                                            <p className="tooltip-value">Volume: {d.volume} patients</p>
                                            <p className="tooltip-subvalue">New: {d.newPatients}</p>
                                            <p className="tooltip-subvalue" style={{ color: d.growth >= 0 ? '#0da35d' : '#ef4444' }}>
                                                Growth: {d.growth > 0 ? '+' : ''}{d.growth}%
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <ReferenceLine y={0} stroke={gridColor} />
                        <Line type="monotone" dataKey="volume" stroke="#1fa391" strokeWidth={3} dot={{ r: 5, fill: '#1fa391' }} activeDot={{ r: 7 }} />
                        <Line type="monotone" dataKey="newPatients" stroke="#7c3aed" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: '#7c3aed' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="growth-legend">
                <span className="growth-legend-item"><span className="growth-dot" style={{ background: '#1fa391' }}></span> Total Volume</span>
                <span className="growth-legend-item"><span className="growth-dot" style={{ background: '#7c3aed' }}></span> New Patients</span>
            </div>
        </motion.div>
    );
};

export default WeeklyGrowthChart;
