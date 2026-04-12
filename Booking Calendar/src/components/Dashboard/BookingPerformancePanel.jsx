import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, XCircle, TrendingDown } from 'lucide-react';

const BookingPerformancePanel = ({ data }) => {
    if (!data) {
        return (
            <motion.div
                className="stat-card chart-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h4 className="chart-title"><CalendarCheck size={18} /> Booking Performance</h4>
                <div className="chart-empty">No booking data available</div>
            </motion.div>
        );
    }

    const cancelRate  = data.cancellationRate;
    const confirmRate = 100 - cancelRate;
    const isHighCancel = cancelRate > 20;

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title"><CalendarCheck size={18} /> Booking Performance</h4>

            <div className="booking-perf-stats">
                <div className="booking-perf-item">
                    <div className="booking-perf-icon bpi-green">
                        <CalendarCheck size={22} />
                    </div>
                    <div>
                        <div className="booking-perf-value">
                            {data.confirmedAppointments.toLocaleString()}
                        </div>
                        <div className="booking-perf-label">Confirmed Appointments</div>
                    </div>
                </div>

                <div className="booking-perf-item">
                    <div className="booking-perf-icon bpi-pink">
                        <XCircle size={22} />
                    </div>
                    <div>
                        <div className="booking-perf-value">
                            {data.cancelledAppointments.toLocaleString()}
                        </div>
                        <div className="booking-perf-label">Cancelled</div>
                    </div>
                </div>
            </div>

            <div className="booking-rate-section">
                <div className="booking-rate-header">
                    <span className="booking-rate-title">
                        <TrendingDown size={14} /> Cancellation Rate
                    </span>
                    <span
                        className="booking-rate-pct"
                        style={{ color: isHighCancel ? 'var(--appointment-pink-text)' : 'var(--appointment-green-text)' }}
                    >
                        {cancelRate}%
                    </span>
                </div>

                <div className="booking-rate-bar-bg">
                    <div
                        className="booking-rate-bar-fill booking-rate-confirm"
                        style={{ width: `${confirmRate}%` }}
                    />
                    <div
                        className="booking-rate-bar-fill booking-rate-cancel"
                        style={{ width: `${cancelRate}%` }}
                    />
                </div>

                <div className="booking-rate-legend">
                    <span>
                        <span className="rate-dot rate-dot-green" />
                        Confirmed {confirmRate}%
                    </span>
                    <span>
                        <span className="rate-dot rate-dot-pink" />
                        Cancelled {cancelRate}%
                    </span>
                </div>

                {isHighCancel && (
                    <div className="booking-rate-warning">
                        Cancellation rate is above the 20% threshold. Consider follow-up reminders.
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default BookingPerformancePanel;
