import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Sidebar = ({
    isOpen,
    selectedDate,
    onDateChange,
    doctors,
    selectedDoctors,
    setSelectedDoctors
}) => {
    const handleDoctorToggle = (doctorId) => {
        if (selectedDoctors.includes(doctorId)) {
            setSelectedDoctors(selectedDoctors.filter(id => id !== doctorId));
        } else {
            setSelectedDoctors([...selectedDoctors, doctorId]);
        }
    };

    const handleToggleAll = () => {
        if (selectedDoctors.length === doctors.length) {
            setSelectedDoctors([]);
        } else {
            setSelectedDoctors(doctors.map(d => d.id));
        }
    };

    return (
        <aside className={`sidebar-right ${isOpen ? 'open' : ''}`}>
            <div>
                <h3 className="sidebar-title">Select Date</h3>
                <Calendar
                    onChange={(date) => {
                        onDateChange(date);
                        if (window.innerWidth <= 992) {
                            // Auto-close sidebar on mobile after selection
                        }
                    }}
                    value={selectedDate}
                />
            </div>

            <div className="filter-section" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 className="sidebar-title" style={{ marginBottom: 0 }}>Doctors</h3>
                    <button
                        onClick={handleToggleAll}
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                        {selectedDoctors.length === doctors.length ? 'Unselect All' : 'Select All'}
                    </button>
                </div>

                <div className="doctor-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {doctors.map(doc => (
                        <label
                            key={doc.id}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', padding: '4px 0' }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedDoctors.includes(doc.id)}
                                onChange={() => handleDoctorToggle(doc.id)}
                                style={{ accentColor: 'var(--primary)', width: '16px', height: '16px', cursor: 'pointer' }}
                            />
                            <span>{doc.name}</span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
