import React from 'react';
import { VIEW_MODES } from '../../constants';
import TimeGutter from './TimeGutter';
import DayView from './DayView';
import WeekView from './WeekView';

const CalendarView = ({
    viewMode,
    selectedDate,
    doctors,
    selectedDoctors,
    appointments,
    doctorSlots,
    highlightedAppId,
    dragState,
    selectedSlot,
    selectedDuration,
    showModal,
    onDragStart,
    onDragUpdate,
    onAppointmentClick
}) => {
    return (
        <section className="scheduler-main">
            {/* State Legend */}
            <div className="state-legend">
                <div className="legend-item"><div className="legend-color bg-gray"></div><span>On The Fly</span></div>
                <div className="legend-item"><div className="legend-color bg-teal"></div><span>Confirmed</span></div>
                <div className="legend-item"><div className="legend-color bg-blue"></div><span>Arrived</span></div>
                <div className="legend-item"><div className="legend-color bg-purple"></div><span>In Chair</span></div>
                <div className="legend-item"><div className="legend-color bg-orange"></div><span>In Payment</span></div>
                <div className="legend-item"><div className="legend-color bg-green"></div><span>Paid</span></div>
                <div className="legend-item"><div className="legend-color bg-pink"></div><span>Closed</span></div>
            </div>

            <div className="scheduler-scroll-container">
                <div className="scheduler-grid">
                    {/* Time Gutter */}
                    <TimeGutter />

                    {/* Render Day or Week View */}
                    {viewMode === VIEW_MODES.DAY ? (
                        <DayView
                            selectedDate={selectedDate}
                            doctors={doctors}
                            selectedDoctors={selectedDoctors}
                            appointments={appointments}
                            doctorSlots={doctorSlots}
                            highlightedAppId={highlightedAppId}
                            isDragging={dragState.isDragging}
                            dragStart={dragState.dragStart}
                            dragEnd={dragState.dragEnd}
                            dragDoctor={dragState.dragDoctor}
                            dragDate={dragState.dragDate}
                            selectedSlot={selectedSlot}
                            selectedDuration={selectedDuration}
                            showModal={showModal}
                            onDragStart={onDragStart}
                            onDragUpdate={onDragUpdate}
                            onAppointmentClick={onAppointmentClick}
                        />
                    ) : (
                        <WeekView
                            selectedDate={selectedDate}
                            doctors={doctors}
                            selectedDoctors={selectedDoctors}
                            appointments={appointments}
                            highlightedAppId={highlightedAppId}
                            isDragging={dragState.isDragging}
                            dragStart={dragState.dragStart}
                            dragEnd={dragState.dragEnd}
                            dragDoctor={dragState.dragDoctor}
                            dragDate={dragState.dragDate}
                            selectedSlot={selectedSlot}
                            selectedDuration={selectedDuration}
                            showModal={showModal}
                            onDragStart={onDragStart}
                            onDragUpdate={onDragUpdate}
                            onAppointmentClick={onAppointmentClick}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default CalendarView;
