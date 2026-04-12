import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { MessageCircle, Clock, AlertCircle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const formatMinutes = (mins) => {
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

const CommunicationPanel = ({ data }) => {
    const { isDarkMode } = useTheme();
    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';
    const textColor = isDarkMode ? '#e4e6eb' : '#1a1a1b';
    const lineColor = isDarkMode ? '#fb923c' : '#ea580c';

    if (!data) {
        return (
            <motion.div
                className="stat-card chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title"><MessageCircle size={18} /> Communication Overview</h4>
                <div className="chart-empty">No communication data available</div>
            </motion.div>
        );
    }

    const metrics = [
        {
            icon: Clock,
            iconClass: 'comm-icon-orange',
            value: formatMinutes(data.avgFirstResponseMinutes),
            label: 'Avg First Response',
            urgent: data.avgFirstResponseMinutes > 30,
        },
        {
            icon: AlertCircle,
            iconClass: 'comm-icon-pink',
            value: data.unansweredThreads,
            label: 'Unanswered Threads',
            urgent: data.unansweredThreads > 5,
            pulsing: data.unansweredThreads > 0,
        },
        {
            icon: MessageCircle,
            iconClass: 'comm-icon-blue',
            value: data.activeChatVolume,
            label: 'Active Chats',
            urgent: false,
        },
    ];

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><MessageCircle size={18} /> Communication Overview</h4>

            <div className="comm-metrics-grid">
                {metrics.map((m, i) => {
                    const Icon = m.icon;
                    return (
                        <div key={i} className="comm-metric-item">
                            <div className={`comm-metric-icon ${m.iconClass}`}>
                                <Icon size={18} />
                            </div>
                            <div className="comm-metric-info">
                                <div className="comm-metric-value-row">
                                    <span className={`comm-metric-value ${m.urgent ? 'comm-value-urgent' : ''}`}>
                                        {m.value}
                                    </span>
                                    {m.pulsing && <span className="pending-dot" />}
                                </div>
                                <span className="comm-metric-label">{m.label}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {data.responseTimeTrend && data.responseTimeTrend.length > 1 && (
                <div className="comm-trend-section">
                    <p className="comm-trend-title">Response Time Trend (minutes)</p>
                    <ResponsiveContainer width="100%" height={130}>
                        <LineChart
                            data={data.responseTimeTrend}
                            margin={{ top: 4, right: 10, left: 0, bottom: 4 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke={textColor}
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke={textColor}
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                width={28}
                            />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="chart-tooltip">
                                                <p className="tooltip-label">{label}</p>
                                                <p className="tooltip-value">{payload[0].value} min avg response</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="avgMinutes"
                                stroke={lineColor}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </motion.div>
    );
};

export default CommunicationPanel;
