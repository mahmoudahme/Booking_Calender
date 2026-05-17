import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

// Aggregate daily rows into weekly buckets
const toWeekly = (rawData) =>
    Array.from({ length: Math.ceil(rawData.length / 7) }, (_, wi) => {
        const chunk = rawData.slice(wi * 7, wi * 7 + 7);
        const start = chunk[0].date.slice(5);
        const end   = chunk[chunk.length - 1].date.slice(5);
        return {
            date: `${start}→${end}`,
            'New Patients':  chunk.reduce((s, d) => s + (d.newPatients       ?? 0), 0),
            'Returning':     chunk.reduce((s, d) => s + (d.returningPatients ?? 0), 0),
            total:           chunk.reduce((s, d) => s + (d.total             ?? 0), 0),
        };
    });

const PatientTrafficChart = ({ data, period, periodLabel }) => {
    const { isDarkMode } = useTheme();

    const gridColor = isDarkMode ? '#1e3444' : '#e5e7eb';
    const textColor = isDarkMode ? '#8aafc0' : '#6b8a9a';

    if (!data || data.length === 0) {
        return (
            <motion.div
                className="stat-card chart-card chart-card-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title"><Users size={17} /> Patient Traffic</h4>
                <div className="chart-empty">No data for the selected period</div>
            </motion.div>
        );
    }

    const useWeekly = data.length > 31;
    const chartData = useWeekly
        ? toWeekly(data)
        : data.map(d => ({
            date:            d.date.slice(5),
            'New Patients':  d.newPatients,
            'Returning':     d.returningPatients,
            total:           d.total,
        }));

    const granularity = useWeekly ? 'Weekly' : 'Daily';
    const title = `${granularity} Patient Traffic — ${periodLabel ?? 'Selected Period'}`;

    return (
        <motion.div
            className="stat-card chart-card chart-card-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><Users size={17} /> {title}</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                        <defs>
                            <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor="#92C2D5" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#92C2D5" stopOpacity={0.04} />
                            </linearGradient>
                            <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor="#0da35d" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#0da35d" stopOpacity={0.04} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke={textColor}
                            fontSize={11}
                            tickLine={false}
                            interval={useWeekly ? 0 : 'preserveStartEnd'}
                            angle={useWeekly ? -30 : 0}
                            textAnchor={useWeekly ? 'end' : 'middle'}
                            height={useWeekly ? 40 : 20}
                        />
                        <YAxis stroke={textColor} fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (!active || !payload?.length) return null;
                                const total = payload.reduce((s, p) => s + (p.value ?? 0), 0);
                                return (
                                    <div className="chart-tooltip">
                                        <p className="tooltip-label">{label}</p>
                                        {payload.map((p, i) => (
                                            <p key={i} className="tooltip-value" style={{ color: p.color }}>
                                                {p.name}: {p.value}
                                            </p>
                                        ))}
                                        <p className="tooltip-subvalue">Total: {total}</p>
                                    </div>
                                );
                            }}
                        />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Area type="monotone" dataKey="New Patients" stroke="#92C2D5" strokeWidth={2.5} fill="url(#colorNew)"       dot={false} activeDot={{ r: 5 }} />
                        <Area type="monotone" dataKey="Returning"    stroke="#0da35d"  strokeWidth={2.5} fill="url(#colorReturning)" dot={false} activeDot={{ r: 5 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default PatientTrafficChart;
