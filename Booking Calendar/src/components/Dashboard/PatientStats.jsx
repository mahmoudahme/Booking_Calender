import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, UserCheck, Star } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const PatientStats = ({ data }) => {
    const { isDarkMode } = useTheme();

    const primaryColor = isDarkMode ? '#20c9a6' : '#1fa391';
    const blueColor = isDarkMode ? '#5ba3ff' : '#1877f2';
    const greenColor = isDarkMode ? '#4ade80' : '#0da35d';
    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title">
                <Users size={18} />
                Patient Statistics
            </h4>

            <div className="patient-stats-grid">
                <div className="patient-stat-item">
                    <div className="patient-stat-icon" style={{ backgroundColor: `${primaryColor}20` }}>
                        <Users size={20} style={{ color: primaryColor }} />
                    </div>
                    <div className="patient-stat-info">
                        <span className="patient-stat-value">{data.uniquePatients}</span>
                        <span className="patient-stat-label">Unique Patients</span>
                    </div>
                </div>

                <div className="patient-stat-item">
                    <div className="patient-stat-icon" style={{ backgroundColor: `${blueColor}20` }}>
                        <UserPlus size={20} style={{ color: blueColor }} />
                    </div>
                    <div className="patient-stat-info">
                        <span className="patient-stat-value">{data.newPatients}</span>
                        <span className="patient-stat-label">New Patients</span>
                    </div>
                </div>

                <div className="patient-stat-item">
                    <div className="patient-stat-icon" style={{ backgroundColor: `${greenColor}20` }}>
                        <UserCheck size={20} style={{ color: greenColor }} />
                    </div>
                    <div className="patient-stat-info">
                        <span className="patient-stat-value">{data.returningPatients}</span>
                        <span className="patient-stat-label">Returning</span>
                    </div>
                </div>
            </div>

            {data.frequentVisitors && data.frequentVisitors.length > 0 && (
                <div className="frequent-visitors">
                    <h5 className="frequent-visitors-title">
                        <Star size={14} />
                        Frequent Visitors
                    </h5>
                    <div className="frequent-visitors-list">
                        {data.frequentVisitors.map((visitor, index) => (
                            <motion.div
                                key={index}
                                className="visitor-item"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <span className="visitor-rank">{index + 1}</span>
                                <span className="visitor-name">{visitor.name}</span>
                                <span className="visitor-count">{visitor.count} visits</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default PatientStats;
