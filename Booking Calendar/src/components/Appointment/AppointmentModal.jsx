import React, { useState, useEffect, useCallback } from 'react'; // Added useEffect, useCallback
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronDown, Search, X } from 'lucide-react';
import bookingAPI from '../../services/api'; // Import API

const AppointmentModal = ({
    showModal,
    isBooked,
    selectedSlot,
    selectedDuration,
    setSelectedDuration,
    viewMode,
    doctors,
    setSelectedSlot,
    isSlotAvailable,
    onSubmit,
    onClose
}) => {
    const [isNewPatient, setIsNewPatient] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchResults, setSearchResults] = useState([]); // State for search results

    // Controlled Form State
    const [patientData, setPatientData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        mobile: '',
        nationalId: '',
        dob: '',
        age: '',
        gender: '',
        additionalPhone: ''
    });

    // Debounced Search & Fetch
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!isNewPatient) {
                // Prevent re-fetching if the search term matches the selected patient
                if (selectedPatient && searchTerm === selectedPatient.name) {
                    return;
                }
                const results = await bookingAPI.searchPatients(searchTerm);
                setSearchResults(results);
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, isNewPatient, selectedPatient]);

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        setSearchTerm(patient.name);
        setPatientData({
            firstName: patient.firstName || '',
            middleName: patient.middleName || '',
            lastName: patient.lastName || '',
            mobile: patient.mobile || '',
            nationalId: patient.nationalId || '',
            dob: patient.dob || '',
            age: patient.age || '',
            gender: patient.gender || '',
            additionalPhone: ''
        });
        setSearchResults([]); // Hide dropdown after selection
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Calculate Age from DOB
    const handleDobChange = (e) => {
        const dob = e.target.value;
        setPatientData(prev => ({ ...prev, dob })); // Update state

        if (dob) {
            const birthDate = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setPatientData(prev => ({ ...prev, dob, age }));
        }
    };

    // Calculate DOB from Age (Approximate)
    const handleAgeChange = (e) => {
        const age = e.target.value;
        setPatientData(prev => ({ ...prev, age })); // Update state

        const ageNum = parseInt(age);
        if (ageNum && !isNaN(ageNum)) {
            const today = new Date();
            const birthYear = today.getFullYear() - ageNum;
            const dob = `${birthYear}-01-01`;
            setPatientData(prev => ({ ...prev, age, dob }));
        }
    };

    if (!showModal) return null;

    return (
        <AnimatePresence>
            <div className="modal-overlay" onClick={onClose}>
                <motion.div
                    className="modal-content modal-content-wide"
                    onClick={e => e.stopPropagation()}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    {!isBooked ? (
                        <>
                            <div className="modal-header">
                                <h2>New Appointment</h2>
                                <button
                                    className="btn-close"
                                    onClick={onClose}
                                    style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}
                                >
                                    &times;
                                </button>
                            </div>

                            <form onSubmit={onSubmit}>
                                <div className="modal-body">
                                    {/* HIDDEN INPUT FOR PATIENT ID */}
                                    <input type="hidden" name="patientId" value={selectedPatient?.id || ''} />

                                    {/* Appointment Info */}
                                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                                        {viewMode === 'week' ? (
                                            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                                                <label>Select Doctor</label>
                                                <select
                                                    value={selectedSlot?.doctor?.id}
                                                    onChange={(e) => {
                                                        const newDoc = doctors.find(d => d.id === parseInt(e.target.value));
                                                        setSelectedSlot({ ...selectedSlot, doctor: newDoc });
                                                    }}
                                                    className="doctor-select"
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px',
                                                        borderRadius: '6px',
                                                        border: '1px solid var(--border)',
                                                        fontSize: '1rem',
                                                        background: 'var(--bg)',
                                                        color: 'var(--text)'
                                                    }}
                                                >
                                                    {doctors.map(d => (
                                                        <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                                                    ))}
                                                </select>
                                            </div>
                                        ) : (
                                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                                Doctor: <strong style={{ color: 'var(--primary)' }}>{selectedSlot?.doctor?.name}</strong>
                                            </p>
                                        )}
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>
                                            Time: <strong>{selectedSlot?.time}</strong> • Date: <strong>{selectedSlot?.date}</strong> • Duration: <strong>{selectedDuration} min</strong>
                                        </p>
                                    </div>

                                    {selectedSlot && !isSlotAvailable(selectedSlot.doctor.id, selectedSlot.time, selectedDuration, selectedSlot.date) && (
                                        <div className="warning-box" style={{ background: '#fff4f4', border: '1px solid #ffcdd2', padding: '10px', borderRadius: '6px', marginBottom: '1rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <span style={{ fontSize: '1.2rem' }}>⚠</span>
                                            <div>
                                                <p style={{ color: '#d32f2f', fontWeight: 'bold', fontSize: '0.9rem', margin: 0 }}>Doctor Not Available</p>
                                                <p style={{ color: '#d32f2f', fontSize: '0.8rem', margin: 0 }}>This slot conflicts with an existing appointment.</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Duration Selection */}
                                    {selectedDuration === 60 && (
                                        <div className="form-group">
                                            <label>Duration (Minutes)</label>
                                            <div className="duration-selector">
                                                {[30, 60, 90, 120].map(duration => {
                                                    const available = selectedSlot ? isSlotAvailable(selectedSlot.doctor.id, selectedSlot.time, duration, selectedSlot.date) : true;
                                                    return (
                                                        <button
                                                            key={duration}
                                                            type="button"
                                                            className={`duration-btn ${selectedDuration === duration ? 'active' : ''} ${!available ? 'unavailable' : ''}`}
                                                            onClick={() => available && setSelectedDuration(duration)}
                                                            disabled={!available}
                                                            title={!available ? 'This duration conflicts with existing appointments' : ''}
                                                        >
                                                            {duration} min
                                                            {!available && <span className="conflict-badge">⚠</span>}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Patient Details Section */}
                                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text)' }}>PATIENT DETAILS</h3>

                                        {/* Registration Type */}
                                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                <input
                                                    type="radio"
                                                    name="registrationType"
                                                    checked={isNewPatient}
                                                    onChange={() => {
                                                        setIsNewPatient(true);
                                                        setSelectedPatient(null);
                                                        setSearchTerm('');
                                                        // Reset form
                                                        setPatientData({
                                                            firstName: '', middleName: '', lastName: '',
                                                            mobile: '', nationalId: '', dob: '', age: '',
                                                            gender: '', additionalPhone: ''
                                                        });
                                                    }}
                                                    style={{ accentColor: 'var(--primary)' }}
                                                />
                                                <span>New Registration</span>
                                            </label>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                <input
                                                    type="radio"
                                                    name="registrationType"
                                                    checked={!isNewPatient}
                                                    onChange={() => setIsNewPatient(false)}
                                                    style={{ accentColor: 'var(--primary)' }}
                                                />
                                                <span>Existing Patient</span>
                                            </label>
                                        </div>

                                        {/* Patient Search (for existing patients) */}
                                        {!isNewPatient && (
                                            <div className="form-group" style={{ position: 'relative', marginBottom: '1rem' }}>
                                                <label>Select Patient <span style={{ color: '#d32f2f' }}>*</span></label>
                                                <div style={{ position: 'relative' }}>
                                                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                                    <input
                                                        type="text"
                                                        placeholder="Select or search patient..."
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        onClick={() => {
                                                            // Trigger re-fetch or ensure list is visible if empty
                                                            if (searchResults.length === 0) {
                                                                // Force update to trigger effect if needed, mostly handled by effect
                                                            }
                                                        }}
                                                        style={{ paddingLeft: '40px', paddingRight: '30px' }}
                                                        autoFocus
                                                        autoComplete="off"
                                                    />
                                                    <ChevronDown size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }} />
                                                </div>

                                                {/* Search Results Dropdown */}
                                                {searchResults.length > 0 && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '100%',
                                                        left: 0,
                                                        right: 0,
                                                        background: 'var(--bg)',
                                                        border: '1px solid var(--border)',
                                                        borderRadius: '6px',
                                                        marginTop: '4px',
                                                        maxHeight: '250px',
                                                        overflowY: 'auto',
                                                        zIndex: 1000,
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                    }}>
                                                        {searchResults.map(patient => (
                                                            <div
                                                                key={patient.id}
                                                                onClick={() => handlePatientSelect(patient)}
                                                                style={{
                                                                    padding: '10px 12px',
                                                                    cursor: 'pointer',
                                                                    borderBottom: '1px solid var(--border)',
                                                                    transition: 'background 0.2s'
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                            >
                                                                <div style={{ fontWeight: 600, marginBottom: '2px' }}>{patient.name}</div>
                                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                                    {patient.mobile} • {patient.nationalId}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Patient Form Fields */}
                                        {(isNewPatient || selectedPatient) && (
                                            <>
                                                <h4 style={{ fontSize: '0.9rem', marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>BASIC INFORMATION</h4>

                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
                                                    {/* Row 1: Names */}
                                                    <div className="form-group">
                                                        <label>First Name <span style={{ color: '#d32f2f' }}>*</span></label>
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            placeholder="First Name"
                                                            value={patientData.firstName}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Middle Name</label>
                                                        <input
                                                            type="text"
                                                            name="middleName"
                                                            placeholder="Middle Name"
                                                            value={patientData.middleName}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Last Name</label>
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            placeholder="Last Name"
                                                            value={patientData.lastName}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    {/* Row 2: Personal Info */}
                                                    <div className="form-group">
                                                        <label>Mobile Phone <span style={{ color: '#d32f2f' }}>*</span></label>
                                                        <input
                                                            type="tel"
                                                            name="mobile"
                                                            placeholder="+966"
                                                            value={patientData.mobile}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>National ID</label>
                                                        <input
                                                            type="text"
                                                            name="nationalId"
                                                            placeholder="National ID"
                                                            value={patientData.nationalId}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Date of Birth</label>
                                                        <input
                                                            type="date"
                                                            name="dob"
                                                            placeholder="DD MM YY"
                                                            value={patientData.dob}
                                                            onChange={handleDobChange}
                                                        />
                                                    </div>

                                                    {/* Row 3: Extra Info */}
                                                    <div className="form-group">
                                                        <label>Age</label>
                                                        <input
                                                            type="number"
                                                            name="age"
                                                            placeholder="0"
                                                            value={patientData.age}
                                                            onChange={handleAgeChange}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Gender</label>
                                                        <select
                                                            name="gender"
                                                            value={patientData.gender}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="">Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Additional Phone</label>
                                                        <input
                                                            type="tel"
                                                            name="additionalPhone"
                                                            placeholder="Additional Phone"
                                                            value={patientData.additionalPhone}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Reason for Visit */}
                                        <div className="form-group" style={{ marginTop: '1rem' }}>
                                            <label>Reason for Visit</label>
                                            <textarea
                                                name="notes"
                                                placeholder="Brief description..."
                                                rows="3"
                                                style={{ resize: 'none', width: '100%' }}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={selectedSlot && !isSlotAvailable(selectedSlot.doctor.id, selectedSlot.time, selectedDuration, selectedSlot.date)}
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{ background: '#e6f4f2', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}
                            >
                                <CheckCircle2 size={32} color="#1fa391" />
                            </motion.div>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Appointment Confirmed</h2>
                            <p style={{ color: '#666' }}>The schedule has been updated successfully.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AppointmentModal;
