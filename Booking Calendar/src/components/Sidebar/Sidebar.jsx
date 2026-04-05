import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ChevronDown, ChevronRight, Filter } from 'lucide-react';
import { format } from 'date-fns';

const Sidebar = ({
    isOpen,
    selectedDate,
    onDateChange,
    doctors,
    selectedDoctors,
    setSelectedDoctors,
    selectedStates,
    setSelectedStates,
    doctorSlots = {},
    viewMode,
}) => {
    const [isDoctorsExpanded, setIsDoctorsExpanded] = useState(true);
    const [isStatesExpanded, setIsStatesExpanded] = useState(true);
    const [doctorSearch, setDoctorSearch] = useState('');
    const [selectedCompanyId, setSelectedCompanyId] = useState('all');

    const APPOINTMENT_STATES = [
        { id: 'onthyfly', label: 'On The Fly', color: 'bg-gray' },
        { id: 'confirmed', label: 'Confirmed', color: 'bg-teal' },
        { id: 'arrived', label: 'Arrived', color: 'bg-blue' },
        { id: 'in_chair', label: 'In Chair', color: 'bg-purple' },
        { id: 'in_payment', label: 'In Payment', color: 'bg-orange' },
        { id: 'paid', label: 'Paid', color: 'bg-green' },
        { id: 'visit_closed', label: 'visit Closed', color: 'bg-pink' },
    ];

    const handleDoctorSelect = (doctorId) => {
        // Radio behavior: if already selected, deselect; otherwise select only this one
        if (selectedDoctors.includes(doctorId)) {
            setSelectedDoctors([]);
        } else {
            setSelectedDoctors([doctorId]);
        }
    };


    // Extract unique companies from doctors list
    const companies = [
        { id: 'all', name: 'All Branches' },
        ...Array.from(
            new Map(
                doctors
                    .filter(doc => doc.companyId && doc.companyName)
                    .map(doc => [doc.companyId, { id: doc.companyId, name: doc.companyName }])
            ).values()
        )
    ];

    // Check availability per doctor on selectedDate (week view only)
    const isWeekView = viewMode === 'week';
    const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
    const hasSlotsOnDay = (docId) => {
        if (!isWeekView || !selectedDateStr) return true;
        const key = `${docId}_${selectedDateStr}`;
        const slots = doctorSlots[key];
        console.log(`🔍 hasSlotsOnDay doc=${docId} date=${selectedDateStr} key=${key} slots=`, slots);
        if (!Array.isArray(slots) || slots.length === 0) return null;
        return slots.some(s => s.available);
    };

    const filteredDoctors = doctors.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(doctorSearch.toLowerCase());
        const matchesCompany = selectedCompanyId === 'all' || doc.companyId === selectedCompanyId;
        return matchesSearch && matchesCompany;
    });

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
                        {/* Branch / Company Filter */}
                        {companies.length > 1 && (
                            <select
                                value={selectedCompanyId}
                                onChange={(e) => {
                                    const val = e.target.value === 'all' ? 'all' : parseInt(e.target.value);
                                    setSelectedCompanyId(val);
                                    setSelectedDoctors([]);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    width: '100%',
                                    padding: '6px 10px',
                                    marginBottom: '0.6rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    background: 'var(--input-bg)',
                                    color: 'var(--text)',
                                    boxSizing: 'border-box',
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                {companies.map(company => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                        )}
                        <input
                            type="text"
                            placeholder="Search doctors..."
                            value={doctorSearch}
                            onChange={(e) => setDoctorSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                padding: '6px 10px',
                                marginBottom: '0.8rem',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                fontSize: '0.85rem',
                                background: 'var(--input-bg)',
                                color: 'var(--text)',
                                boxSizing: 'border-box',
                                outline: 'none'
                            }}
                        />
                        {filteredDoctors.length > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.8rem' }}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (selectedDoctors.length > 0) {
                                            setSelectedDoctors([]);
                                        } else {
                                            setSelectedDoctors(filteredDoctors.map(d => d.id));
                                        }
                                    }}
                                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                    {selectedDoctors.length > 0 ? 'Unselect All' : 'Select All'}
                                </button>
                            </div>
                        )}
                        <div className="doctor-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {filteredDoctors.map(doc => {
                                const available = hasSlotsOnDay(doc.id);
                                const noSlots = available === false;
                                return (
                                    <label
                                        key={doc.id}
                                        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', padding: '2px 0' }}
                                    >
                                        <input
                                            type="radio"
                                            checked={selectedDoctors.includes(doc.id)}
                                            onChange={() => handleDoctorSelect(doc.id)}
                                            style={{ accentColor: 'var(--primary)', width: '16px', height: '16px', cursor: 'pointer' }}
                                        />
                                        <span style={{ opacity: noSlots ? 0.5 : 1 }}>{doc.name}</span>
                                        {noSlots && (
                                            <span style={{
                                                fontSize: '0.7rem',
                                                padding: '1px 6px',
                                                borderRadius: '10px',
                                                background: 'var(--border-color)',
                                                color: 'var(--text-muted)',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                No slots
                                            </span>
                                        )}
                                    </label>
                                );
                            })}
                            {filteredDoctors.length === 0 && (
                                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>No doctors found</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
