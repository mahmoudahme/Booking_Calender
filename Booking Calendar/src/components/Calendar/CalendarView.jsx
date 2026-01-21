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
    onDragUpdate
}) => {
    return (
        <section className="scheduler-main">
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
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default CalendarView;
