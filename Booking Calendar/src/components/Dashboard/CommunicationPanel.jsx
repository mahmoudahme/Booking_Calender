import React from 'react';
import {
    ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { MessageCircle, AlertCircle, Smartphone } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const CommunicationPanel = ({ data }) => {
    const { isDarkMode } = useTheme();
    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';
    const textColor = isDarkMode ? '#e4e6eb' : '#1a1a1b';

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
            value: data.leadMessages,
            label: 'Lead Messages',
            urgent: false,
        },
        {
            icon: MessageCircle,
            iconClass: 'comm-icon-orange',
            value: data.appointmentMessages,
            label: 'Appt. Messages',
            urgent: false,
        },
        {
            icon: Smartphone,
            iconClass: 'comm-icon-pink',
            value: data.smsSent != null ? `${data.smsSent} (${data.smsSuccessRate}%)` : '—',
            label: 'SMS Sent',
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

            {data.dailyTrend && data.dailyTrend.length > 0 && (
                <div className="comm-trend-section">
                    <p className="comm-trend-title">Daily Message Volume</p>
                    <ResponsiveContainer width="100%" height={160}>
                        <ComposedChart data={data.dailyTrend} margin={{ top: 4, right: 10, left: 0, bottom: 4 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                            <XAxis dataKey="date" stroke={textColor} fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke={textColor} fontSize={10} tickLine={false} axisLine={false} width={28} />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const d = payload[0].payload;
                                        return (
                                            <div className="chart-tooltip">
                                                <p className="tooltip-label">{label}</p>
                                                <p className="tooltip-value">Leads: {d.leadMessages}</p>
                                                <p className="tooltip-subvalue">Appointments: {d.appointmentMessages}</p>
                                                <p className="tooltip-subvalue">SMS: {d.smsSent}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <Bar dataKey="leadMessages"        name="Leads"        fill="#1877f2" radius={[2,2,0,0]} />
                            <Bar dataKey="appointmentMessages" name="Appointments" fill="#1fa391" radius={[2,2,0,0]} />
                            <Line dataKey="smsSent" name="SMS" stroke="#ea580c" strokeWidth={2} dot={{ r: 3 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            )}
        </motion.div>
    );
};

export default CommunicationPanel;
