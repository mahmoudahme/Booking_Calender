import React from 'react';
import { format } from 'date-fns';
import { HOURS } from '../../constants';
import AppointmentBlock from '../Appointment/AppointmentBlock';
import DragPreview from '../Appointment/DragPreview';

const DayView = ({
    selectedDate,
    doctors,
    selectedDoctors,
    appointments,
    doctorSlots,
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
    const dateStr = format(selectedDate, 'yyyy-MM-dd');

    return (
        <>
            {doctors.filter(doc => selectedDoctors.includes(doc.id)).map(doc => (
                <div key={doc.id} className="doctor-column">
                    <div className="doctor-header">
                        <h4>{doc.name}</h4>
                        <p>{doc.specialty}</p>
                    </div>

                    <div className="grid-body">
                        {/* Background slots */}
                        {HOURS.map(h => {
                            const slot = doctorSlots[`${doc.id}_${dateStr}`]?.find(s => s.subtime === h);
                            const isAvailable = slot && slot.available;

                            return (
                                <div
                                    key={h}
                                    className={`slot-placeholder ${!isAvailable ? 'slot-unavailable' : ''}`}
                                    onMouseDown={(e) => {
                                        if (!isAvailable) return;
                                        e.preventDefault();
                                        onDragStart(h, doc, dateStr);
                                    }}
                                    onMouseEnter={() => {
                                        if (isDragging && isAvailable) {
                                            onDragUpdate(h);
                                        }
                                    }}
                                />
                            );
                        })}

                        {/* Drag Preview */}
                        <DragPreview
                            isDragging={isDragging}
                            dragStart={dragStart}
                            dragEnd={dragEnd}
                            dragDoctor={dragDoctor}
                            dragDate={dragDate}
                            currentDoctor={doc}
                            currentDate={dateStr}
                            selectedSlot={selectedSlot}
                            selectedDuration={selectedDuration}
                            showModal={showModal}
                        />

                        {/* Appointment blocks */}
                        {appointments
                            .filter(a => a.docId === doc.id && a.date === dateStr)
                            .map(app => (
                                <AppointmentBlock
                                    key={app.id}
                                    appointment={app}
                                    doctor={doc}
                                    isHighlighted={highlightedAppId === app.id}
                                />
                            ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default DayView;
