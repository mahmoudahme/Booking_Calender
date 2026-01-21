import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { useDoctors } from './hooks/useDoctors';
import { useAppointments } from './hooks/useAppointments';
import { useSearch } from './hooks/useSearch';
import { useDragSelection } from './hooks/useDragSelection';
import { useTheme } from './hooks/useTheme';
import { timeToMinutes } from './utils/timeUtils';
import { VIEW_MODES, DEFAULT_DURATION } from './constants';
import bookingAPI from './services/api';
import Header from './components/Header/Header';
import CalendarView from './components/Calendar/CalendarView';
import Sidebar from './components/Sidebar/Sidebar';
import AppointmentModal from './components/Appointment/AppointmentModal';
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

    // Custom Hooks
    const { doctors, selectedDoctors, setSelectedDoctors } = useDoctors();
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

    // Handle booking submission
    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Extract patient details
        const firstName = formData.get('firstName');
        const middleName = formData.get('middleName');
        const lastName = formData.get('lastName');

        // Construct full name if fields exist, otherwise might be coming from search selection state (handled via hidden inputs if we were strictly using form submit, but here we can rely on state or just combine fields)
        let patientName = '';
        if (firstName && lastName) {
            patientName = `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`;
        } else {
            // If manual search/select was used without filling breakdown, you might need to handle that. 
            // But the new form encourages filling details. 
            // For safety, let's look for a direct patientName input if it exists (for backward compatibility w/ old modal)
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
            await bookingAPI.createAppointment({
                doctorId: selectedSlot.doctor.id,
                patientName, // Full name
                patientId: patientId ? parseInt(patientId) : null,
                patientDetails: { // Send detailed info if backend supports it
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
            });

            setIsBooked(true);
            await refetch();

            setTimeout(() => {
                setShowModal(false);
                setIsBooked(false);
                setSelectedDuration(DEFAULT_DURATION);
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Failed to book appointment. Please try again.');
        }
    };

    return (
        <div className="app-container">
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
                <CalendarView
                    viewMode={viewMode}
                    selectedDate={selectedDate}
                    doctors={doctors}
                    selectedDoctors={selectedDoctors}
                    appointments={appointments}
                    doctorSlots={doctorSlots}
                    highlightedAppId={highlightedAppId}
                    dragState={dragState}
                    selectedSlot={selectedSlot}
                    selectedDuration={selectedDuration}
                    showModal={showModal}
                    onDragStart={dragState.startDrag}
                    onDragUpdate={dragState.updateDrag}
                />

                <Sidebar
                    isOpen={isSidebarOpen}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    doctors={doctors}
                    selectedDoctors={selectedDoctors}
                    setSelectedDoctors={setSelectedDoctors}
                />
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
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}

export default App;
