import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const DemographicsChart = ({ data }) => {
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
                <h4 className="chart-title"><UserCheck size={18} /> Patient Demographics</h4>
                <div className="chart-empty">No demographics data available</div>
            </motion.div>
        );
    }

    const genderData = [
        { name: 'Male', value: data.byGender.male, color: '#1877f2' },
        { name: 'Female', value: data.byGender.female, color: '#ec4899' },
    ];

    const ageData = data.byAgeGroup.map(g => ({
        name: g.group,
        count: g.count,
    }));

    const COLORS_AGE = ['#1fa391', '#1877f2', '#7c3aed', '#f59e0b', '#ea580c'];

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><UserCheck size={18} /> Patient Demographics</h4>
            <div className="demographics-grid">
                <div className="demographics-section">
                    <h5 className="demographics-subtitle">Gender Distribution</h5>
                    <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                            <Pie
                                data={genderData}
                                cx="50%"
                                cy="50%"
                                innerRadius={35}
                                outerRadius={60}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {genderData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const d = payload[0].payload;
                                        return (
                                            <div className="chart-tooltip">
                                                <p className="tooltip-label">{d.name}</p>
                                                <p className="tooltip-value">{d.value}%</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="demographics-section">
                    <h5 className="demographics-subtitle">Age Distribution</h5>
                    <ResponsiveContainer width="100%" height={160}>
                        <BarChart data={ageData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                            <XAxis dataKey="name" stroke={textColor} fontSize={10} tickLine={false} />
                            <YAxis stroke={textColor} fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="chart-tooltip">
                                                <p className="tooltip-label">Age: {label}</p>
                                                <p className="tooltip-value">{payload[0].value} patients</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {ageData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS_AGE[index % COLORS_AGE.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
};

export default DemographicsChart;
