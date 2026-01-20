import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { User, CheckCircle2, Search, Menu, X, Calendar as CalendarIcon, Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = 'http://72.62.16.223:3000/api/v1/booking-calendar'; // Adjust if port is different


// Mock data helpers (removed static arrays)
const getRelativeDate = (daysOffset) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return format(date, 'yyyy-MM-dd');
};


const HOURS = [];
for (let h = 9; h <= 21; h++) {
  ['00', '15', '30', '45'].forEach(m => {
    if (h === 21 && m !== '00') return;
    const hourStr = h < 10 ? `0${h}` : `${h}`;
    HOURS.push(`${hourStr}:${m}`);
  });
}

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(60); // Default 60 minutes
  const [isBooked, setIsBooked] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Drag selection states
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);

  const [dragDoctor, setDragDoctor] = useState(null);
  const [dragDate, setDragDate] = useState(null);

  // View state
  const [viewMode, setViewMode] = useState('day'); // 'day' | 'week'

  // API Data States
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctorSlots, setDoctorSlots] = useState({}); // { docId_date: [slots] }

  // Filter state
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  // Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [highlightedAppId, setHighlightedAppId] = useState(null);

  // Fetch Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/doctors`);
        const data = response.data.data; // Access data from standard response wrapper
        setDoctors(data);
        setSelectedDoctors(data.map(d => d.id));
        console.log("Full API Response:", response.data);

      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch Appointments
  const fetchAppointments = async (silent = false) => {
    // Validate inputs before fetching
    if (!selectedDate || isNaN(selectedDate.getTime())) return;
    if (!selectedDoctors || selectedDoctors.length === 0) {
      setAppointments([]);
      return;
    }

    if (!silent) setIsRefreshing(true);
    try {
      let startDate, endDate;
      const currentDates = [];
      if (viewMode === 'day') {
        startDate = format(selectedDate, 'yyyy-MM-dd') + 'T00:00:00';
        endDate = format(selectedDate, 'yyyy-MM-dd') + 'T23:59:59';
        currentDates.push(format(selectedDate, 'yyyy-MM-dd'));
      } else {
        const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
        startDate = format(weekStart, 'yyyy-MM-dd') + 'T00:00:00';
        endDate = format(addDays(weekStart, 6), 'yyyy-MM-dd') + 'T23:59:59';
        for (let i = 0; i < 7; i++) {
          currentDates.push(format(addDays(weekStart, i), 'yyyy-MM-dd'));
        }
      }

      const response = await axios.get(`${API_BASE_URL}/appointments`, {
        params: {
          startDate,
          endDate,
          doctorIds: selectedDoctors.join(','),
        }
      });
      console.log("Fetched Appointments:", response.data);
      setAppointments(response.data.data.appointments || []);

      // Fetch slots for each selected doctor and each visible day
      const slotsData = {};
      for (const docId of selectedDoctors) {
        for (const dateStr of currentDates) {
          const dayName = format(new Date(dateStr), 'EEEE');
          const slotsResponse = await axios.get(`${API_BASE_URL}/slots`, {
            params: { doctorId: docId, day: dayName }
          });
          slotsData[`${docId}_${dateStr}`] = slotsResponse.data.data;
        }
      }
      setDoctorSlots(slotsData);

    } catch (error) {
      console.error('Error fetching appointments and slots:', error);
    } finally {
      if (!silent) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate, viewMode, selectedDoctors]);

  // Polling every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAppointments(true);
    }, 20000);
    return () => clearInterval(interval);
  }, [selectedDate, viewMode, selectedDoctors]);

  // Search Effect
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
          params: { term: searchTerm }
        });
        setSearchResults(response.data.data); // Access data from standard response wrapper
      } catch (error) {
        console.error('Error searching:', error);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);


  const handleSearchResultClick = (app) => {
    // 1. Switch to the date
    setSelectedDate(new Date(app.date));

    // 2. Highlight the appointment
    setHighlightedAppId(app.id);

    // 3. Clear search
    setSearchTerm('');
    setSearchResults([]);

    // 4. Remove highlight after 3 seconds
    setTimeout(() => setHighlightedAppId(null), 3000);
  };
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  // Add global mouse up listener to end dragging
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging && dragStart && dragEnd && dragDoctor) {
        // Calculate duration and open modal
        const duration = calculateDragDuration(dragStart, dragEnd);
        setSelectedDuration(duration);
        const startTime = timeToMinutes(dragStart) < timeToMinutes(dragEnd) ? dragStart : dragEnd;
        // Use dragged date or fallback to selectedDate (for day view)
        const date = dragDate || format(selectedDate, 'yyyy-MM-dd');
        setSelectedSlot({ doctor: dragDoctor, time: startTime, date });
        setShowModal(true);
      }
      setIsDragging(false);
      setDragStart(null);
      setDragEnd(null);
      setDragDoctor(null);
      setDragDate(null);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging, dragStart, dragEnd, dragDoctor]);

  const timeToMinutes = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const calculateDragDuration = (startTime, endTime) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    return Math.abs(endMinutes - startMinutes) + 15; // +15 to include the end slot
  };

  const calculateTop = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    const totalMinutes = (h - 9) * 60 + m;
    return totalMinutes * (160 / 60); // 160px per hour (40px per 15 mins)
  };

  const calculateHeight = (duration) => duration * (160 / 60);

  // Check if a slot conflicts with existing appointments
  const isSlotAvailable = (doctorId, startTime, duration, checkDate) => {
    const [h, m] = startTime.split(':').map(Number);
    const slotStart = h * 60 + m;
    const slotEnd = slotStart + duration;

    // Use provided date or selectedDate as fallback
    const targetDateStr = checkDate || format(selectedDate, 'yyyy-MM-dd');

    return !appointments
      .filter(a => a.docId === doctorId && a.date === targetDateStr)
      .some(app => {
        const [ah, am] = app.time.split(':').map(Number);
        const appStart = ah * 60 + am;
        const appEnd = appStart + app.duration;
        return (slotStart < appEnd && slotEnd > appStart);
      });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const patientName = e.target.querySelector('input[type="text"]').value;
    const notes = e.target.querySelector('textarea').value;

    try {
      await axios.post(`${API_BASE_URL}/appointments`, {
        doctorId: selectedSlot.doctor.id,
        patientName,
        date: selectedSlot.date,
        time: selectedSlot.time,
        duration: selectedDuration,
        notes,
      });

      setIsBooked(true);
      // Refresh appointments
      const startDate = format(selectedDate, 'yyyy-MM-dd') + 'T00:00:00';
      const endDate = format(selectedDate, 'yyyy-MM-dd') + 'T23:59:59';
      const response = await axios.get(`${API_BASE_URL}/appointments`, {
        params: { startDate, endDate, doctorIds: selectedDoctors.join(',') }
      });
      setAppointments(response.data.data.appointments || []); // Access appointments key

      setTimeout(() => {
        setShowModal(false);
        setIsBooked(false);
        setSelectedDuration(60);
      }, 2000);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };


  const renderDayViewOverlays = (doc, dateStr) => (
    <>
      {/* Drag selection preview */}
      {isDragging && dragDoctor?.id === doc.id && dragDate === dateStr && dragStart && dragEnd && (
        <motion.div
          className="drag-selection-preview"
          style={{
            top: `${calculateTop(
              timeToMinutes(dragStart) < timeToMinutes(dragEnd) ? dragStart : dragEnd
            )}px`,
            height: `${calculateHeight(calculateDragDuration(dragStart, dragEnd))}px`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="drag-label">
            {calculateDragDuration(dragStart, dragEnd)} min
          </span>
        </motion.div>
      )}

      {/* Preview of selected slot with duration */}
      {selectedSlot && selectedSlot.doctor.id === doc.id && selectedSlot.date === dateStr && showModal && (
        <motion.div
          className="appointment-preview"
          style={{
            top: `${calculateTop(selectedSlot.time)}px`,
            height: `${calculateHeight(selectedDuration)}px`
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="preview-label">Preview ({selectedDuration} min)</span>
        </motion.div>
      )}

      {/* Appointment blocks */}
      {appointments.filter(a => a.docId === doc.id && a.date === dateStr).map(app => {
        const appStart = new Date(app.appointment_date);
        const appEnd = new Date(app.end_date);
        const timeStr = format(appStart, 'HH:mm');

        return (
          <motion.div
            key={app.id}
            className={`appointment-block appointment-${app.type} ${highlightedAppId === app.id ? 'appointment-highlighted' : ''}`}
            style={{
              top: `${calculateTop(app.time)}px`, // Use app.time directly
              height: `${calculateHeight(app.duration)}px`
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            onClick={(e) => {
              e.stopPropagation();
              alert(`Appointment: ${app.title}\nTime: ${app.time} (${app.duration} min)`);
            }}
          >
            <span className="app-time">{format(appStart, 'HH:mm')} - {format(appEnd, 'HH:mm')}</span>
            <span className="app-title">{app.title}</span>

            {/* Hover Tooltip */}
            <div className="appointment-tooltip">
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{app.title}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>Dr. {doc.name}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>
                {format(appStart, 'hh:mm a')} - {format(appEnd, 'hh:mm a')}
              </div>
              <div style={{ marginTop: '4px', fontStyle: 'italic', fontSize: '0.65rem' }}>
                {app.duration} mins • {app.type.toUpperCase()}
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  );

  const handleNavigate = (direction) => {
    const amount = direction === 'next' ? 1 : -1;
    if (viewMode === 'day') {
      setSelectedDate(prev => addDays(prev, amount));
    } else {
      setSelectedDate(prev => addDays(prev, amount * 7));
    }
  };

  return (
    <div className="app-container">
      <header>
        <div className="header-left">
          {/* New Navigation Toolbar matching the requested design */}
          <div className="nav-toolbar">

            {/* Date Navigation Controls */}
            <div className="date-nav-controls">
              <button
                onClick={() => handleNavigate('prev')}
                className="nav-btn-icon"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => setSelectedDate(new Date())}
                className="nav-btn-today"
              >
                {viewMode === 'day' ? 'Today' : 'This Week'}
              </button>

              <button
                onClick={() => handleNavigate('next')}
                className="nav-btn-icon"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* View Toggle */}
            <div className="view-toggle-group">
              <button
                onClick={() => setViewMode('day')}
                className={`view-toggle-btn ${viewMode === 'day' ? 'active' : ''}`}
              >
                Day
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`view-toggle-btn ${viewMode === 'week' ? 'active' : ''}`}
              >
                Week
              </button>
            </div>

            <button
              onClick={() => fetchAppointments()}
              disabled={isRefreshing}
              className={`nav-btn-today ${isRefreshing ? 'refresh-loading' : ''}`}
              style={{ marginLeft: '10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              {isRefreshing ? 'Updating...' : 'Refresh'}
            </button>

            {/* Current Date Display */}
            {viewMode === 'day' ? (
              <h2 className="current-date-display">
                {format(selectedDate, 'MMM d, yyyy')}
              </h2>
            ) : (
              <h2 className="current-date-display">
                {format(startOfWeek(selectedDate, { weekStartsOn: 0 }), 'MMM d')} - {format(addDays(startOfWeek(selectedDate, { weekStartsOn: 0 }), 6), 'MMM d, yyyy')}
              </h2>
            )}
          </div>
        </div>

        <div className="header-right">
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search (Patient, ID, Doctor)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="search-results-dropdown">
                {searchResults.map(app => {
                  const doctor = doctors.find(d => d.id === app.docId);
                  return (
                    <div
                      key={app.id}
                      className="search-result-item"
                      onClick={() => handleSearchResultClick(app)}
                    >
                      <span className="result-main-text">{app.title}</span>
                      <div className="result-sub-text">
                        <span>{format(new Date(app.date), 'MMM d')} • {app.time}</span>
                        <span>Dr. {doctor?.name.split(' ').slice(1).join(' ')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button
            className="toggle-sidebar-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ display: 'flex' }}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </button>

          <div className="user-profile">
            <User size={20} color="#1fa391" />
            <span className="user-name">Administrator</span>
          </div>

          <button className="toggle-sidebar-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={20} /> : <CalendarIcon size={20} />}
          </button>
        </div>
      </header>

      <div className="booking-layout">
        <section className="scheduler-main">
          <div className="scheduler-scroll-container">
            <div className="scheduler-grid">
              {/* Time Gutter */}
              <div className="time-gutter">
                <div className="time-gutter-header"></div>
                {HOURS.map(h => (
                  <div key={h} className={`time-label-row ${h.endsWith(':00') ? 'hour-mark' : ''}`}>{h}</div>
                ))}
              </div>

              {/* Header logic depending on View Mode */}
              {viewMode === 'day' ? (
                // DAY VIEW: Columns are Doctors
                doctors.filter(doc => selectedDoctors.includes(doc.id)).map(doc => (
                  <div key={doc.id} className="doctor-column">
                    <div className="doctor-header">
                      <h4>{doc.name}</h4>
                      <p>{doc.specialty}</p>
                    </div>

                    <div className="grid-body">
                      {/* Background slots */}
                      {HOURS.map(h => {
                        const dateStr = format(selectedDate, 'yyyy-MM-dd');
                        const isAvailable = doctorSlots[`${doc.id}_${dateStr}`]?.some(s => s.subtime === h);
                        console.log("isAvailable", isAvailable);
                        return (
                          <div
                            key={h}
                            className={`slot-placeholder ${!isAvailable ? 'slot-unavailable' : ''}`}
                            onMouseDown={(e) => {
                              if (!isAvailable) return;
                              e.preventDefault();
                              setIsDragging(true);
                              setDragStart(h);
                              setDragEnd(h);
                              setDragDoctor(doc);
                              setDragDate(dateStr);
                            }}
                            onMouseEnter={() => {
                              if (isDragging && isAvailable) {
                                setDragEnd(h);
                              }
                            }}
                          />
                        );
                      })}

                      {/* Day View Components - Drag Preview & Appointments */}
                      {renderDayViewOverlays(doc, format(selectedDate, 'yyyy-MM-dd'))}
                    </div>
                  </div>
                ))
              ) : (
                // WEEK VIEW: Columns are Days, displaying ALL selected doctors
                (() => {
                  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 }); // Sunday
                  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
                  const activeDoctorId = selectedDoctors[0];
                  const activeDoctor = doctors.find(d => d.id === activeDoctorId) || doctors[0];

                  return days.map(dayDate => {
                    const dateStr = format(dayDate, 'yyyy-MM-dd');
                    return (
                      <div key={dateStr} className="doctor-column">
                        <div className="doctor-header week-header" style={{ textAlign: 'center' }}>
                          <h4 style={{ color: isSameDay(dayDate, new Date()) ? 'var(--primary)' : 'inherit' }}>
                            {format(dayDate, 'EEE')}
                          </h4>
                          <p>{format(dayDate, 'd MMM')}</p>
                        </div>

                        <div className="grid-body">
                          {/* Background slots for Week View */}
                          {HOURS.map(h => {
                            const isAvailable = doctorSlots[`${activeDoctorId}_${dateStr}`]?.some(s => s.subtime === h);
                            return (
                              <div
                                key={h}
                                className={`slot-placeholder ${!isAvailable ? 'slot-unavailable' : ''}`}
                                onMouseDown={(e) => {
                                  if (!isAvailable) return;
                                  e.preventDefault();
                                  setIsDragging(true);
                                  setDragStart(h);
                                  setDragEnd(h);
                                  setDragDoctor(activeDoctor);
                                  setDragDate(dateStr);
                                }}
                                onMouseEnter={() => {
                                  if (isDragging && isAvailable) {
                                    setDragEnd(h);
                                  }
                                }}
                              />
                            );
                          })}

                          {/* Week View Overlays - Custom for Multi-Doctor Support */}

                          {/* 1. Drag Selection Preview (First Doctor Lane) */}
                          {isDragging && dragDoctor?.id === activeDoctorId && dragDate === dateStr && dragStart && dragEnd && (
                            <motion.div
                              className="drag-selection-preview"
                              style={{
                                top: `${calculateTop(
                                  timeToMinutes(dragStart) < timeToMinutes(dragEnd) ? dragStart : dragEnd
                                )}px`,
                                height: `${calculateHeight(calculateDragDuration(dragStart, dragEnd))}px`,
                                width: `${100 / selectedDoctors.length}%`,
                                left: 0,
                                zIndex: 20
                              }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <span className="drag-label">
                                {calculateDragDuration(dragStart, dragEnd)} min
                              </span>
                            </motion.div>
                          )}

                          {/* 2. Selected Slot Preview */}
                          {selectedSlot && selectedSlot.doctor.id === activeDoctorId && selectedSlot.date === dateStr && showModal && (
                            <motion.div
                              className="appointment-preview"
                              style={{
                                top: `${calculateTop(selectedSlot.time)}px`,
                                height: `${calculateHeight(selectedDuration)}px`,
                                width: `${100 / selectedDoctors.length}%`,
                                left: 0
                              }}
                            >
                              <span className="preview-label">Preview</span>
                            </motion.div>
                          )}

                          {/* 3. Render Appointments for ALL selected doctors */}
                          {appointments
                            .filter(a => selectedDoctors.includes(a.docId) && a.date === dateStr)
                            .map(app => {
                              const appStart = new Date(app.appointment_date);
                              const appEnd = new Date(app.end_date);
                              const timeStr = format(appStart, 'HH:mm');

                              // Calculate lane position
                              const docIndex = selectedDoctors.indexOf(app.docId);
                              const laneWidth = 100 / selectedDoctors.length;
                              const leftPos = docIndex * laneWidth;
                              const doctor = doctors.find(d => d.id === app.docId);

                              return (
                                <motion.div
                                  key={app.id}
                                  className={`appointment-block appointment-${app.type} ${highlightedAppId === app.id ? 'appointment-highlighted' : ''}`}
                                  style={{
                                    top: `${calculateTop(app.time)}px`, // Use app.time directly
                                    height: `${calculateHeight(app.duration)}px`,
                                    width: `${laneWidth}%`,
                                    left: `${leftPos}%`,
                                    fontSize: '0.75rem',
                                    padding: '2px 4px'
                                  }}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  whileHover={{ scale: 1.02, zIndex: 50 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    alert(`Dr. ${doctor?.name}\nPatient: ${app.title}\nTime: ${app.time}`);
                                  }}
                                >
                                  <span className="app-time" style={{ display: 'block', fontSize: '0.7em', opacity: 0.8 }}>
                                    {format(appStart, 'HH:mm')}
                                  </span>
                                  <span className="app-title" style={{ fontWeight: 'bold', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {doctor?.name.split(' ').slice(1).join(' ')}
                                  </span>

                                  {/* Hover Tooltip for Week View */}
                                  <div className="appointment-tooltip">
                                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{app.title}</div>
                                    <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>Dr. {doctor?.name}</div>
                                    <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>
                                      {format(appStart, 'hh:mm a')} - {format(appEnd, 'hh:mm a')}
                                    </div>
                                    <div style={{ marginTop: '4px', fontStyle: 'italic', fontSize: '0.65rem' }}>
                                      {app.duration} mins • {app.type.toUpperCase()}
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  });
                })()
              )}
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className={`sidebar-right ${isSidebarOpen ? 'open' : ''}`}>
          <div>
            <h3 className="sidebar-title">Select Date</h3>
            <Calendar
              onChange={(date) => {
                setSelectedDate(date);
                if (window.innerWidth <= 992) setIsSidebarOpen(false);
              }}
              value={selectedDate}
            />
          </div>

          <div className="filter-section" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 className="sidebar-title" style={{ marginBottom: 0 }}>Doctors</h3>
              <button
                onClick={() => setSelectedDoctors(selectedDoctors.length === doctors.length ? [] : doctors.map(d => d.id))}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}
              >
                {selectedDoctors.length === doctors.length ? 'Unselect All' : 'Select All'}
              </button>
            </div>

            <div className="doctor-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {doctors.map(doc => (
                <label key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', padding: '4px 0' }}>
                  <input
                    type="checkbox"
                    checked={selectedDoctors.includes(doc.id)}
                    onChange={() => {
                      if (selectedDoctors.includes(doc.id)) {
                        setSelectedDoctors(selectedDoctors.filter(id => id !== doc.id));
                      } else {
                        setSelectedDoctors([...selectedDoctors, doc.id]);
                      }
                    }}
                    style={{ accentColor: 'var(--primary)', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span>{doc.name}</span>
                </label>
              ))}
            </div>
          </div>


        </aside>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <motion.div
              className="modal-content"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {!isBooked ? (
                <>
                  <div className="modal-header">
                    <h2>New Appointment</h2>
                    <button className="btn-close" onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}>&times;</button>
                  </div>

                  <form onSubmit={handleBookingSubmit}>
                    <div className="modal-body">
                      {viewMode === 'week' ? (
                        <div className="form-group">
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
                              border: '1px solid #ddd',
                              marginBottom: '1rem',
                              fontSize: '1rem'
                            }}
                          >
                            {doctors.map(d => (
                              <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                            ))}
                          </select>
                          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                            Booking at <strong>{selectedSlot?.time}</strong> on <strong>{selectedSlot?.date}</strong>
                            {selectedDuration !== 60 && (
                              <span style={{ display: 'block', marginTop: '0.5rem', color: '#1fa391', fontWeight: 600 }}>
                                Duration: {selectedDuration} minutes
                              </span>
                            )}
                          </p>
                        </div>
                      ) : (
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
                          Booking with <strong style={{ color: '#1fa391' }}>{selectedSlot?.doctor?.name}</strong> at <strong>{selectedSlot?.time}</strong>
                          {selectedDuration !== 60 && (
                            <span style={{ display: 'block', marginTop: '0.5rem', color: '#1fa391', fontWeight: 600 }}>
                              Duration: {selectedDuration} minutes
                            </span>
                          )}
                        </p>
                      )}

                      {selectedSlot && !isSlotAvailable(selectedSlot.doctor.id, selectedSlot.time, selectedDuration, selectedSlot.date) && (
                        <div className="warning-box" style={{ background: '#fff4f4', border: '1px solid #ffcdd2', padding: '10px', borderRadius: '6px', marginBottom: '1rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{ fontSize: '1.2rem' }}>⚠</span>
                          <div>
                            <p style={{ color: '#d32f2f', fontWeight: 'bold', fontSize: '0.9rem', margin: 0 }}>Doctor Not Available</p>
                            <p style={{ color: '#d32f2f', fontSize: '0.8rem', margin: 0 }}>This slot conflicts with an existing appointment.</p>
                          </div>
                        </div>
                      )}

                      {/* Duration Selection - Only show if default duration (not drag-selected) */}
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

                      <div className="form-group">
                        <label>Patient Name</label>
                        <input type="text" placeholder="Full name" required autoFocus />
                      </div>

                      <div className="form-group">
                        <label>Reason for Visit</label>
                        <textarea placeholder="Brief description..." rows="3" style={{ resize: 'none' }}></textarea>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
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
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
