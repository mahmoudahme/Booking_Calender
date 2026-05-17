import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const BRANCH_COLORS = ['#92C2D5', '#d9d480', '#ea580c'];

// Shorten branch names for display
const shortenName = name =>
    name.replace(' Branch', '').replace('Al Khuzama', 'Khuzama').replace('Al Yarmouk', 'Yarmouk').replace('(Khobar)', '').trim();

// Aggregate daily data into weekly buckets
const toWeekly = (rawData) => {
    const weeks = [];
    for (let i = 0; i < rawData.length; i += 7) {
        const chunk = rawData.slice(i, i + 7);
        const startDate = chunk[0].date.slice(5);   // MM-DD
        const endDate   = chunk[chunk.length - 1].date.slice(5);
        const point     = { date: `${startDate}→${endDate}` };

        chunk[0].branches.forEach(b => {
            const key = shortenName(b.branchName);
            point[key] = chunk.reduce((sum, day) => {
                const match = day.branches.find(x => x.branchName === b.branchName);
                return sum + (match?.revenue ?? 0);
            }, 0);
        });
        weeks.push(point);
    }
    return weeks;
};

const RevenueTrendChart = ({ data, period, periodLabel }) => {
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
                <h4 className="chart-title"><TrendingUp size={17} /> Revenue Trend</h4>
                <div className="chart-empty">No data for the selected period</div>
            </motion.div>
        );
    }

    // Choose granularity: daily if ≤ 31 pts, else weekly
    const useWeekly  = data.length > 31;
    const chartData  = useWeekly
        ? toWeekly(data)
        : data.map(day => {
            const point = { date: day.date.slice(5) };   // MM-DD
            day.branches.forEach(b => { point[shortenName(b.branchName)] = b.revenue; });
            return point;
        });

    const branchKeys = data[0]?.branches.map(b => shortenName(b.branchName)) ?? [];

    const granularityLabel = useWeekly ? 'Weekly' : 'Daily';
    const title = `${granularityLabel} Revenue Trend — ${periodLabel ?? 'Selected Period'}`;

    return (
        <motion.div
            className="stat-card chart-card chart-card-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><TrendingUp size={17} /> {title}</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
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
                        <YAxis
                            stroke={textColor}
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={v => `${(v / 1000).toFixed(0)}K`}
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (!active || !payload?.length) return null;
                                return (
                                    <div className="chart-tooltip">
                                        <p className="tooltip-label">{label}</p>
                                        {payload.map((p, i) => (
                                            <p key={i} className="tooltip-value" style={{ color: p.color }}>
                                                {p.name}: {Number(p.value).toLocaleString()} SAR
                                            </p>
                                        ))}
                                    </div>
                                );
                            }}
                        />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        {branchKeys.map((name, i) => (
                            <Line
                                key={name}
                                type="monotone"
                                dataKey={name}
                                stroke={BRANCH_COLORS[i % BRANCH_COLORS.length]}
                                strokeWidth={2.5}
                                dot={false}
                                activeDot={{ r: 5 }}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default RevenueTrendChart;
