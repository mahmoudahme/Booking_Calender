import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    trendLabel,
    color = 'primary',
    children
}) => {
    const getTrendClass = () => {
        if (!trend) return '';
        return trend > 0 ? 'trend-up' : trend < 0 ? 'trend-down' : '';
    };

    return (
        <motion.div
            className={`stat-card stat-card-${color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="stat-card-header">
                {Icon && <Icon size={20} className="stat-card-icon" />}
                <h4 className="stat-card-title">{title}</h4>
            </div>

            {value !== undefined && (
                <div className="stat-card-value">{value}</div>
            )}

            {subtitle && (
                <div className="stat-card-subtitle">{subtitle}</div>
            )}

            {trend !== undefined && (
                <div className={`stat-card-trend ${getTrendClass()}`}>
                    <span className="trend-value">
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                    {trendLabel && <span className="trend-label">{trendLabel}</span>}
                </div>
            )}

            {children && (
                <div className="stat-card-content">
                    {children}
                </div>
            )}
        </motion.div>
    );
};

export default StatCard;
