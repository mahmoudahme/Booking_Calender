import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const SOURCE_EMOJI = {
    'Facebook':    '📘',
    'WhatsApp':    '💬',
    'Direct Call': '📞',
    'Instagram':   '📸',
    'Referral':    '🤝',
    'Website':     '🌐',
};

const LeadSourceChart = ({ data }) => {
    const { isDarkMode } = useTheme();
    const gridColor      = isDarkMode ? '#374151' : '#e5e7eb';
    const textColor      = isDarkMode ? '#e4e6eb' : '#1a1a1b';
    const leadsColor     = isDarkMode ? '#5ba3ff' : '#1877f2';
    const convertedColor = isDarkMode ? '#4ade80' : '#0da35d';

    if (!data || data.length === 0) {
        return (
            <motion.div
                className="stat-card chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title"><Share2 size={18} /> Lead Source Breakdown</h4>
                <div className="chart-empty">No source data available</div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><Share2 size={18} /> Lead Source Breakdown</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                        barGap={4}
                        barCategoryGap="30%"
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis
                            dataKey="source"
                            stroke={textColor}
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v) => `${SOURCE_EMOJI[v] ?? ''} ${v}`}
                        />
                        <YAxis
                            stroke={textColor}
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    const convRate = payload[1] && payload[0]
                                        ? Math.round((payload[1].value / payload[0].value) * 100)
                                        : 0;
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">
                                                {SOURCE_EMOJI[label] ?? ''} {label}
                                            </p>
                                            {payload.map((p, i) => (
                                                <p key={i} className="tooltip-value" style={{ color: p.fill }}>
                                                    {p.name}: {p.value}
                                                </p>
                                            ))}
                                            {payload.length === 2 && (
                                                <p className="tooltip-subvalue">
                                                    Conversion: {convRate}%
                                                </p>
                                            )}
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend wrapperStyle={{ paddingTop: 8 }} />
                        <Bar
                            dataKey="leads"
                            name="Total Leads"
                            fill={leadsColor}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={36}
                        />
                        <Bar
                            dataKey="converted"
                            name="Converted"
                            fill={convertedColor}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={36}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default LeadSourceChart;
