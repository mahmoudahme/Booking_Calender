import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const LeadConversionTrend = ({ data }) => {
    const { isDarkMode } = useTheme();
    const gridColor      = isDarkMode ? '#374151' : '#e5e7eb';
    const textColor      = isDarkMode ? '#e4e6eb' : '#1a1a1b';
    const leadsColor     = isDarkMode ? '#5ba3ff' : '#1877f2';
    const bookingsColor  = isDarkMode ? '#4ade80' : '#0da35d';

    if (!data || data.length === 0) {
        return (
            <motion.div
                className="stat-card chart-card chart-card-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title"><TrendingUp size={18} /> Lead-to-Booking Trend</h4>
                <div className="chart-empty">No trend data available</div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="stat-card chart-card chart-card-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title">
                <TrendingUp size={18} /> Lead-to-Booking Conversion Trend
            </h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                    >
                        <defs>
                            <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor={leadsColor}    stopOpacity={0.25} />
                                <stop offset="95%" stopColor={leadsColor}    stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="bookingsGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor={bookingsColor} stopOpacity={0.25} />
                                <stop offset="95%" stopColor={bookingsColor} stopOpacity={0.02} />
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
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    const leads    = payload.find(p => p.dataKey === 'leads')?.value ?? 0;
                                    const bookings = payload.find(p => p.dataKey === 'bookings')?.value ?? 0;
                                    const rate     = leads > 0 ? Math.round((bookings / leads) * 100) : 0;
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{label}</p>
                                            {payload.map((p, i) => (
                                                <p key={i} className="tooltip-value" style={{ color: p.stroke }}>
                                                    {p.name}: {p.value}
                                                </p>
                                            ))}
                                            <p className="tooltip-subvalue">
                                                Conversion: {rate}%
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend wrapperStyle={{ paddingTop: 8 }} />
                        <Area
                            type="monotone"
                            dataKey="leads"
                            name="Total Leads"
                            stroke={leadsColor}
                            strokeWidth={2}
                            fill="url(#leadsGrad)"
                        />
                        <Area
                            type="monotone"
                            dataKey="bookings"
                            name="Confirmed Bookings"
                            stroke={bookingsColor}
                            strokeWidth={2}
                            fill="url(#bookingsGrad)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default LeadConversionTrend;
