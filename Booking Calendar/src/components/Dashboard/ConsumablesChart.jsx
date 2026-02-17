import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Package, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const ConsumablesChart = ({ data, alerts }) => {
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
                <h4 className="chart-title"><Package size={18} /> Consumables Usage</h4>
                <div className="chart-empty">No consumables data available</div>
            </motion.div>
        );
    }

    const chartData = data.slice(0, 8).map(c => ({
        name: c.itemName.length > 15 ? c.itemName.substring(0, 13) + '...' : c.itemName,
        fullName: c.itemName,
        used: c.quantityUsed,
        stock: c.currentStock,
        cost: c.totalCost,
        status: c.stockStatus,
    }));

    const getBarColor = (entry) => {
        if (entry.status === 'low') return '#ef4444';
        if (entry.status === 'medium') return '#f59e0b';
        return '#0da35d';
    };

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><Package size={18} /> Top Consumed Materials</h4>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="name" stroke={textColor} fontSize={10} tickLine={false} angle={-25} textAnchor="end" height={60} />
                        <YAxis stroke={textColor} fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    return (
                                        <div className="chart-tooltip">
                                            <p className="tooltip-label">{d.fullName}</p>
                                            <p className="tooltip-value">Used: {d.used} units</p>
                                            <p className="tooltip-subvalue">In Stock: {d.stock}</p>
                                            <p className="tooltip-subvalue">Cost: {d.cost.toLocaleString()} SAR</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="used" fill="#1877f2" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            {alerts && alerts.length > 0 && (
                <div className="consumable-alerts">
                    {alerts.map((alert, i) => (
                        <div key={i} className="consumable-alert-item">
                            <AlertTriangle size={14} />
                            <span>{alert.message}</span>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default ConsumablesChart;
