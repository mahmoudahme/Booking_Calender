import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useOdooContext } from './hooks/useOdooContext';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import './index.css';

function App() {
    const [selectedDate] = useState(new Date());

    const odooContext = useOdooContext();
    const { isDarkMode, toggleTheme } = useTheme();

    if (!odooContext.isLoading && !(odooContext.isEmbedded && odooContext.user)) {
        return (
            <div className="app-container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <div style={{ fontSize: '48px' }}>🔒</div>
                <h2 style={{ margin: 0, color: '#333' }}>Access Denied</h2>
                <p style={{ margin: 0, color: '#666' }}>
                    Please access this calendar from Odoo
                </p>
            </div>
        );
    }

    if (odooContext.isLoading) {
        return (
            <div className="app-container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <div style={{
                background: '#4CAF50',
                color: 'white',
                padding: '8px 16px',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span>👤 {odooContext.user.name} | 🏢 {odooContext.user.companyName}</span>
                <span style={{ opacity: 0.8 }}>Embedded Mode</span>
            </div>
            <Header
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
            />
            <div className="booking-layout">
                <Dashboard
                    appointments={[]}
                    doctors={[]}
                    selectedDate={selectedDate}
                />
            </div>
        </div>
    );
}

export default App;
