import React from 'react';
import { format, isSameDay } from 'date-fns';
import { getWeekDays } from '../../utils/dateUtils';
import { HOURS } from '../../constants';
import AppointmentBlock from '../Appointment/AppointmentBlock';
import DragPreview from '../Appointment/DragPreview';
import { calculateTop, calculateHeight } from '../../utils/timeUtils';

const WeekView = ({
    selectedDate,
    doctors,
    selectedDoctors,
    appointments,
    highlightedAppId,
    isDragging,
    dragStart,
    dragEnd,
    dragDoctor,
    dragDate,
    selectedSlot,
    selectedDuration,
    showModal,
    onDragStart,
    onDragUpdate
}) => {
    const weekDays = getWeekDays(selectedDate);
    const activeDoctorId = selectedDoctors[0];

    return (
        <>
            {weekDays.map(dayDate => {
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
                            {/* Background slots */}
                            {HOURS.map(h => (
                                <div
                                    key={h}
                                    className="slot-placeholder"
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        onDragStart(h, doctors[0], dateStr);
                                    }}
                                    onMouseEnter={() => {
                                        if (isDragging) {
                                            onDragUpdate(h);
                                        }
                                    }}
                                />
                            ))}

                            {/* Drag Selection Preview */}
                            {isDragging && dragDoctor?.id === activeDoctorId && dragDate === dateStr && dragStart && dragEnd && (
                                <DragPreview
                                    isDragging={isDragging}
                                    dragStart={dragStart}
                                    dragEnd={dragEnd}
                                    dragDoctor={dragDoctor}
                                    dragDate={dragDate}
                                    currentDoctor={dragDoctor}
                                    currentDate={dateStr}
                                    selectedSlot={null}
                                    selectedDuration={selectedDuration}
                                    showModal={false}
                                    style={{
                                        width: `${100 / selectedDoctors.length}%`,
                                        left: 0,
                                        zIndex: 20
                                    }}
                                />
                            )}

                            {/* Selected Slot Preview */}
                            {selectedSlot && selectedSlot.doctor.id === activeDoctorId && selectedSlot.date === dateStr && showModal && (
                                <DragPreview
                                    isDragging={false}
                                    dragStart={null}
                                    dragEnd={null}
                                    dragDoctor={null}
                                    dragDate={null}
                                    currentDoctor={selectedSlot.doctor}
                                    currentDate={dateStr}
                                    selectedSlot={selectedSlot}
                                    selectedDuration={selectedDuration}
                                    showModal={showModal}
                                    style={{
                                        width: `${100 / selectedDoctors.length}%`,
                                        left: 0
                                    }}
                                />
                            )}

                            {/* Render Appointments for ALL selected doctors */}
                            {appointments
                                .filter(a => selectedDoctors.includes(a.docId) && a.date === dateStr)
                                .map(app => {
                                    const docIndex = selectedDoctors.indexOf(app.docId);
                                    const laneWidth = 100 / selectedDoctors.length;
                                    const leftPos = docIndex * laneWidth;
                                    const doctor = doctors.find(d => d.id === app.docId);

                                    return (
                                        <AppointmentBlock
                                            key={app.id}
                                            appointment={app}
                                            doctor={doctor}
                                            isHighlighted={highlightedAppId === app.id}
                                            style={{
                                                width: `${laneWidth}%`,
                                                left: `${leftPos}%`,
                                                fontSize: '0.75rem',
                                                padding: '2px 4px'
                                            }}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default WeekView;
