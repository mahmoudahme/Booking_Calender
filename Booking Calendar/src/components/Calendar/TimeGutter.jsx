import React from 'react';
import { HOURS } from '../../constants';

const TimeGutter = () => {
    return (
        <div className="time-gutter">
            <div className="time-gutter-header"></div>
            {HOURS.map(h => {
                const [hour, min] = h.split(':');
                const hourInt = parseInt(hour, 10);
                const ampm = hourInt >= 12 ? 'PM' : 'AM';
                let hour12 = hourInt % 12;
                if (hour12 === 0) hour12 = 12;
                const displayTime = `${hour12}:${min} ${ampm}`;

                return (
                    <div key={h} className={`time-label-row ${h.endsWith(':00') ? 'hour-mark' : ''}`}>
                        {displayTime}
                    </div>
                );
            })}
        </div>
    );
};

export default TimeGutter;
