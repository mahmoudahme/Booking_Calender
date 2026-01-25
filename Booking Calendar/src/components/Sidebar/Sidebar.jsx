import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ChevronDown, ChevronRight, Filter } from 'lucide-react';

const Sidebar = ({
    isOpen,
    selectedDate,
    onDateChange,
    doctors,
    selectedDoctors,
    setSelectedDoctors,
    selectedStates,
    setSelectedStates
}) => {
    const [isDoctorsExpanded, setIsDoctorsExpanded] = useState(true);
    const [isStatesExpanded, setIsStatesExpanded] = useState(true);

    const APPOINTMENT_STATES = [
        { id: 'onthyfly', label: 'On The Fly', color: 'bg-gray' },
        { id: 'confirmed', label: 'Confirmed', color: 'bg-teal' },
        { id: 'arrived', label: 'Arrived', color: 'bg-blue' },
        { id: 'in_chair', label: 'In Chair', color: 'bg-purple' },
        { id: 'in_payment', label: 'In Payment', color: 'bg-orange' },
        { id: 'paid', label: 'Paid', color: 'bg-green' },
        { id: 'closed', label: 'Closed', color: 'bg-pink' },
    ];

    const handleDoctorToggle = (doctorId) => {
        if (selectedDoctors.includes(doctorId)) {
            setSelectedDoctors(selectedDoctors.filter(id => id !== doctorId));
        } else {
            setSelectedDoctors([...selectedDoctors, doctorId]);
        }
    };

    const handleToggleAllDoctors = () => {
        if (selectedDoctors.length === doctors.length) {
            setSelectedDoctors([]);
        } else {
            setSelectedDoctors(doctors.map(d => d.id));
        }
    };

    const handleStateToggle = (stateId) => {
        if (selectedStates.includes(stateId)) {
            setSelectedStates(selectedStates.filter(id => id !== stateId));
        } else {
            setSelectedStates([...selectedStates, stateId]);
        }
    };

    const handleToggleAllStates = () => {
        if (selectedStates.length === APPOINTMENT_STATES.length) {
            setSelectedStates([]);
        } else {
            setSelectedStates(APPOINTMENT_STATES.map(s => s.id));
        }
    };

    return (
        <aside className={`sidebar-right ${isOpen ? 'open' : ''}`}>
            {/* 1. Date Selection */}
            <div>
                <h3 className="sidebar-title">Select Date</h3>
                <Calendar
                    onChange={(date) => {
                        onDateChange(date);
                    }}
                    value={selectedDate}
                />
            </div>

            {/* 2. Collapsible State Filter Section */}
            <div className="filter-section" style={{ marginTop: '2rem' }}>
                <div
                    onClick={() => setIsStatesExpanded(!isStatesExpanded)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        marginBottom: '1rem',
                        padding: '4px 0'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isStatesExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        <h3 className="sidebar-title" style={{ margin: 0 }}>Status Filters</h3>
                    </div>
                    <Filter size={16} color="var(--text-muted)" />
                </div>

                {isStatesExpanded && (
                    <div style={{ paddingLeft: '26px' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.8rem' }}>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleToggleAllStates(); }}
                                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.75rem' }}
                            >
                                {selectedStates.length === APPOINTMENT_STATES.length ? 'Unselect All' : 'Select All'}
                            </button>
                        </div>
                        <div className="state-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '10px 15px'
                        }}>
                            {APPOINTMENT_STATES.map(state => (
                                <label
                                    key={state.id}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedStates.includes(state.id)}
                                        onChange={() => handleStateToggle(state.id)}
                                        style={{ accentColor: 'var(--primary)', width: '14px', height: '14px', cursor: 'pointer' }}
                                    />
                                    <div className={`legend-color ${state.color}`} style={{ width: '8px', height: '8px', flexShrink: 0 }}></div>
                                    <span style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>{state.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Collapsible Doctors Section */}
            <div className="filter-section" style={{ marginTop: '2rem' }}>
                <div
                    onClick={() => setIsDoctorsExpanded(!isDoctorsExpanded)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        marginBottom: '1rem',
                        padding: '4px 2px'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isDoctorsExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        <h3 className="sidebar-title" style={{ margin: 0 }}>Doctors</h3>
                    </div>
                </div>

                {isDoctorsExpanded && (
                    <div style={{ paddingLeft: '26px' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.8rem' }}>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleToggleAllDoctors(); }}
                                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.75rem' }}
                            >
                                {selectedDoctors.length === doctors.length ? 'Unselect All' : 'Select All'}
                            </button>
                        </div>
                        <div className="doctor-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {doctors.map(doc => (
                                <label
                                    key={doc.id}
                                    style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', padding: '2px 0' }}
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
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
