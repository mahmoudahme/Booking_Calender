import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const TrendChart = ({ data, title = 'Appointment Trend' }) => {
    const { isDarkMode } = useTheme();

    const primaryColor = isDarkMode ? '#20c9a6' : '#1fa391';
    const gradientStart = isDarkMode ? 'rgba(32, 201, 166, 0.3)' : 'rgba(31, 163, 145, 0.3)';
    const gradientEnd = isDarkMode ? 'rgba(32, 201, 166, 0.05)' : 'rgba(31, 163, 145, 0.05)';
    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';
    const textColor = isDarkMode ? '#e4e6eb' : '#1a1a1b';

    if (!data || data.length === 0) {
        return (
            <motion.div
                className="stat-card chart-card chart-card-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title">
                    <TrendingUp size={18} />
                    {title}
                </h4>
                <div className="chart-empty">No trend data available</div>
            </motion.div>
        );
    }

    const maxValue = Math.max(...data.map(d => d.count));
    const yAxisMax = Math.ceil(maxValue * 1.2) || 10;

    return (
        <motion.div
            className="stat-card chart-card chart-card-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title">
                <TrendingUp size={18} />
                {title}
            </h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                    >
                        <defs>
                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={primaryColor} stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke={textColor}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke={textColor}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={[0, yAxisMax]}
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{label}</p>
                                            <p className="tooltip-value">{payload[0].value} appointments</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke={primaryColor}
                            strokeWidth={2}
                            fill="url(#colorCount)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default TrendChart;
