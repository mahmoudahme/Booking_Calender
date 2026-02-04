import React, { useState, useEffect } from 'react'; 
import { format, addDays } from 'date-fns';
import { useDoctors } from './hooks/useDoctors';
import { useAppointments } from './hooks/useAppointments';
import { useSearch } from './hooks/useSearch';
import { useDragSelection } from './hooks/useDragSelection';
import { useTheme } from './hooks/useTheme';
import { useOdooContext } from './hooks/useOdooContext';
import { timeToMinutes } from './utils/timeUtils';
import { VIEW_MODES, DEFAULT_DURATION } from './constants';
import bookingAPI from './services/api';
import Header from './components/Header/Header';
import CalendarView from './components/Calendar/CalendarView';
import Sidebar from './components/Sidebar/Sidebar';
import AppointmentModal from './components/Appointment/AppointmentModal';
import Dashboard from './components/Dashboard/Dashboard';
import './index.css';

function App() {
    // State Management
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewMode, setViewMode] = useState(VIEW_MODES.DAY);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(DEFAULT_DURATION);
    const [isBooked, setIsBooked] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [selectedStates, setSelectedStates] = useState([
        'onthyfly', 'confirmed', 'arrived', 'in_chair', 'in_payment', 'paid', 'closed'
    ]);

    // Custom Hooks
    const odooContext = useOdooContext();
    const { doctors, selectedDoctors, setSelectedDoctors } = useDoctors();

    // Debug: Log Odoo context
    useEffect(() => {
        console.log('🔗 Odoo Context:', odooContext);
        if (odooContext.user) {
            console.log('👤 User:', odooContext.user.name);
            console.log('🏢 Company:', odooContext.user.companyName);
        }
    }, [odooContext]);
    const { appointments, doctorSlots, isRefreshing, refetch } = useAppointments(
        selectedDate,
        viewMode,
        selectedDoctors
    );
    const { searchTerm, setSearchTerm, searchResults, highlightedAppId, handleSearchResultClick } = useSearch();
    const dragState = useDragSelection(selectedDate);
    const { isDarkMode, toggleTheme } = useTheme();

    // Handle drag end - open modal
    useEffect(() => {
        const handleMouseUp = () => {
            const result = dragState.endDrag();
            if (result) {
                setSelectedDuration(result.duration);
                setSelectedSlot(result);
                setShowModal(true);
            }
        };

        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, [dragState.isDragging, dragState.dragStart, dragState.dragEnd, dragState.dragDoctor]);

    // Navigation handlers
    const handleNavigate = (direction) => {
        if (direction === 'today') {
            setSelectedDate(new Date());
        } else {
            const amount = direction === 'next' ? 1 : -1;
            const days = viewMode === VIEW_MODES.DAY ? amount : amount * 7;
            setSelectedDate(prev => addDays(prev, days));
        }
    };

    // Handle appointment click (edit mode)
    const handleAppointmentClick = async (appointment) => {
        try {
            // Fetch full appointment details
            const fullAppointment = await bookingAPI.getAppointmentById(appointment.id);

            console.log('Full appointment data:', fullAppointment);
            console.log('Patient details:', fullAppointment?.data?.patientDetails);

            // Extract the actual appointment data from the API response
            const appointmentData = fullAppointment?.data || fullAppointment;

            // Defensive: Ensure ID exists in the object we store in state
            if (appointmentData && !appointmentData.id) {
                console.warn('API response missing ID, using ID from click event');
                appointmentData.id = appointment.id;
            }

            // Find the doctor
            const doctor = doctors.find(d => d.id === appointment.docId);

            // Set edit mode state
            setEditMode(true);
            setEditingAppointment(appointmentData);

            // Set slot info for the modal
            setSelectedSlot({
                doctor: doctor,
                time: appointment.time,
                date: appointment.date
            });
            setSelectedDuration(appointment.duration);

            // Open modal
            setShowModal(true);
        } catch (error) {
            console.error('Error loading appointment:', error);
            alert('Failed to load appointment details.');
        }
    };

    // Check if slot is available
    const isSlotAvailable = (doctorId, startTime, duration, checkDate) => {
        const [h, m] = startTime.split(':').map(Number);
        const slotStart = h * 60 + m;
        const slotEnd = slotStart + duration;
        const targetDateStr = checkDate || format(selectedDate, 'yyyy-MM-dd');

        // Check appointment conflicts
        const conflict = appointments
            .filter(a => a.docId === doctorId && a.date === targetDateStr)
            .some(app => {
                const [ah, am] = app.time.split(':').map(Number);
                const appStart = ah * 60 + am;
                const appEnd = appStart + app.duration;
                return slotStart < appEnd && slotEnd > appStart;
            });

        if (conflict) return false;

        // Check slot availability
        const key = `${doctorId}_${targetDateStr}`;
        const slots = doctorSlots[key];
        if (!slots) return false;

        const chunksNeeded = duration / 15;
        for (let i = 0; i < chunksNeeded; i++) {
            const chunkTimeMin = slotStart + i * 15;
            const cH = Math.floor(chunkTimeMin / 60);
            const cM = chunkTimeMin % 60;
            const chunkTimeStr = `${cH.toString().padStart(2, '0')}:${cM.toString().padStart(2, '0')}`;

            const slot = slots.find(s => s.subtime === chunkTimeStr);
            if (!slot || !slot.available) return false;
        }

        return true;
    };

    // Handle appointment deletion
    const handleDeleteAppointment = async (appointmentId) => {
        if (!appointmentId) {
            alert('Error: No appointment ID provided for deletion');
            console.error('Delete called with missing ID');
            return;
        }

        try {
            console.log('Attempting to delete appointment with ID:', appointmentId);
            await bookingAPI.deleteAppointment(appointmentId);
            setShowModal(false);
            setEditMode(false);
            setEditingAppointment(null);
            await refetch();
            alert('Appointment deleted successfully!');
        } catch (error) {
            console.error('Error deleting appointment:', error);
            alert('Failed to delete appointment. Please try again.');
        }
    };

    // Handle booking submission (create or update)
    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Extract patient details (matching OpdRegistrationModel - camelCase)
        const firstName = formData.get('firstName');
        const middleName = formData.get('middleName');
        const lastName = formData.get('lastName');

        // Construct full name (patientName for OpdRegistrationModel)
        let patientName = '';
        if (firstName) {
            patientName = `${firstName}${middleName ? ' ' + middleName : ''}${lastName ? ' ' + lastName : ''}`.trim();
        } else {
            patientName = formData.get('patientName') || '';
        }

        const mobile = formData.get('mobile');
        const nationalId = formData.get('nationalId');
        const dob = formData.get('dob');
        const gender = formData.get('gender');
        const age = formData.get('age');
        const additionalPhone = formData.get('additionalPhone');
        const notes = formData.get('notes');
        const patientId = formData.get('patientId');

        // Collect slot IDs
        const key = `${selectedSlot.doctor.id}_${selectedSlot.date}`;
        const slots = doctorSlots[key] || [];
        const [startH, startM] = selectedSlot.time.split(':').map(Number);
        const startTotalInMin = startH * 60 + startM;
        const neededSlotsCount = Math.floor(selectedDuration / 15);

        const collectedSlotIds = [];
        for (let i = 0; i < neededSlotsCount; i++) {
            const currentTotalMin = startTotalInMin + i * 15;
            const h = Math.floor(currentTotalMin / 60);
            const m = currentTotalMin % 60;
            const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
            const slotObj = slots.find(s => s.subtime === timeStr);
            if (slotObj) {
                collectedSlotIds.push(slotObj.id);
            } else {
                collectedSlotIds.push(null);
            }
        }

        try {
            const appointmentData = {
                doctorId: selectedSlot.doctor.id,
                patientName, // Full name (for OpdRegistrationModel)
                patientId: patientId ? parseInt(patientId) : null,
                patientDetails: { // Send detailed info (matching OpdRegistrationModel)
                    firstName,
                    middleName,
                    lastName,
                    mobile,
                    nationalId,
                    dob,
                    gender,
                    age,
                    additionalPhone
                },
                date: selectedSlot.date,
                time: selectedSlot.time,
                duration: selectedDuration,
                notes,
                slotIds: collectedSlotIds
            };

            if (editMode && editingAppointment) {
                if (!editingAppointment.id) {
                    alert('Error: Missing appointment ID for update');
                    return;
                }
                console.log('Updating appointment with ID:', editingAppointment.id);
                // Update existing appointment
                // Include id in the body as well, just in case
                await bookingAPI.updateAppointment(editingAppointment.id, { ...appointmentData, id: editingAppointment.id });
            } else {
                // Create new appointment
                await bookingAPI.createAppointment(appointmentData);
            }

            setIsBooked(true);
            await refetch();

            setTimeout(() => {
                setShowModal(false);
                setIsBooked(false);
                setEditMode(false);
                setEditingAppointment(null);
                setSelectedDuration(DEFAULT_DURATION);
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error(`Error ${editMode ? 'updating' : 'booking'} appointment:`, error);
            alert(`Failed to ${editMode ? 'update' : 'book'} appointment. Please try again.`);
        }
    };

    // Check if running without Odoo context
    const hasValidContext = odooContext.isEmbedded && odooContext.user;

    // Show access denied if no valid context
    if (!odooContext.isLoading && !hasValidContext) {
        return (
            <div className="app-container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <div style={{
                    fontSize: '48px'
                }}>🔒</div>
                <h2 style={{ margin: 0, color: '#333' }}>Access Denied</h2>
                <p style={{ margin: 0, color: '#666' }}>
                    Please access this calendar from Odoo
                </p>
            </div>
        );
    }

    // Show loading while checking context
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
            {/* User Banner */}
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
                viewMode={viewMode}
                setViewMode={setViewMode}
                selectedDate={selectedDate}
                onNavigate={handleNavigate}
                onRefresh={refetch}
                isRefreshing={isRefreshing}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchResults={searchResults}
                doctors={doctors}
                onSearchResultClick={(app) => handleSearchResultClick(app, setSelectedDate)}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <div className="booking-layout">
                {viewMode === VIEW_MODES.DASHBOARD ? (
                    <Dashboard
                        appointments={appointments}
                        doctors={doctors}
                        selectedDate={selectedDate}
                    />
                ) : (
                    <>
                        <CalendarView
                            viewMode={viewMode}
                            selectedDate={selectedDate}
                            doctors={doctors}
                            selectedDoctors={selectedDoctors}
                            appointments={appointments.filter(app => selectedStates.includes(app.state || app.type))}
                            doctorSlots={doctorSlots}
                            highlightedAppId={highlightedAppId}
                            dragState={dragState}
                            selectedSlot={selectedSlot}
                            selectedDuration={selectedDuration}
                            showModal={showModal}
                            onDragStart={dragState.startDrag}
                            onDragUpdate={dragState.updateDrag}
                            onAppointmentClick={handleAppointmentClick}
                        />

                        <Sidebar
                            isOpen={isSidebarOpen}
                            selectedDate={selectedDate}
                            onDateChange={setSelectedDate}
                            doctors={doctors}
                            selectedDoctors={selectedDoctors}
                            setSelectedDoctors={setSelectedDoctors}
                            selectedStates={selectedStates}
                            setSelectedStates={setSelectedStates}
                        />
                    </>
                )}
            </div>

            <AppointmentModal
                showModal={showModal}
                isBooked={isBooked}
                selectedSlot={selectedSlot}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
                viewMode={viewMode}
                doctors={doctors}
                setSelectedSlot={setSelectedSlot}
                isSlotAvailable={isSlotAvailable}
                onSubmit={handleBookingSubmit}
                onClose={() => {
                    setShowModal(false);
                    setEditMode(false);
                    setEditingAppointment(null);
                }}
                editMode={editMode}
                editingAppointment={editingAppointment}
                onDelete={handleDeleteAppointment}
            />
        </div>
    );
}

export default App;
