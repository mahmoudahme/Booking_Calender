import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

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
    const isUp   = trend !== undefined && trend > 0;
    const isDown = trend !== undefined && trend < 0;

    return (
        <motion.div
            className={`stat-card stat-card-${color}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
        >
            {/* Title row with icon badge */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <h4 className="stat-card-title" style={{ margin: 0 }}>{title}</h4>
                {Icon && (
                    <div className="stat-card-icon-badge">
                        <Icon size={17} />
                    </div>
                )}
            </div>

            {/* Main value */}
            {value !== undefined && (
                <div className="stat-card-value">{value}</div>
            )}

            {/* Footer: subtitle + trend chip */}
            <div className="stat-card-footer">
                {subtitle && (
                    <div className="stat-card-subtitle">{subtitle}</div>
                )}

                {trend !== undefined && (
                    <div className={`stat-card-trend ${isUp ? 'trend-up' : isDown ? 'trend-down' : ''}`}>
                        {isUp   ? <TrendingUp  size={11} /> : null}
                        {isDown ? <TrendingDown size={11} /> : null}
                        <span>
                            {isUp ? '+' : ''}{trend}%
                        </span>
                        {trendLabel && <span style={{ fontWeight: 500, marginLeft: 2 }}>{trendLabel}</span>}
                    </div>
                )}
            </div>

            {children && (
                <div className="stat-card-content">{children}</div>
            )}
        </motion.div>
    );
};

export default StatCard;
