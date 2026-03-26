import React from 'react';

const STEPS = [
    { key: 'onthyfly', label: 'On The Fly' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'arrived', label: 'Arrived' },
    { key: 'in_chair', label: 'In Chair' },
    { key: 'in_payment', label: 'In Payment' },
    { key: 'paid', label: 'Paid' },
    { key: 'visit_closed', label: 'Visit Closed' },
];

const ACTION_MAP = {
    onthyfly:   { label: 'Confirm',  nextState: 'confirmed'    },
    confirmed:  { label: 'Arrive',   nextState: 'arrived'      },
    arrived:    { label: 'In Chair', nextState: 'in_chair'     },
    in_chair:   null,
    in_payment: { label: 'Pay',      nextState: 'paid'         },
    paid:       null,
    visit_closed: null,
};

const BTN = {
    base: {
        padding: '7px 22px',
        border: 'none',
        borderRadius: '6px',
        fontWeight: '600',
        fontSize: '0.88rem',
        cursor: 'pointer',
        transition: 'opacity 0.15s',
    },
    primary: { background: '#6b46c1', color: 'white' },
    outline: { background: 'transparent', color: '#6b46c1', border: '2px solid #6b46c1' },
};

const StatusStepper = ({ currentStatus, onStatusChange, isLoading }) => {
    const currentIndex = STEPS.findIndex(s => s.key === currentStatus);
    const action = ACTION_MAP[currentStatus] ?? null;

    return (
        <div style={{
            background: 'var(--bg-secondary, #f3f4f6)',
            borderBottom: '1px solid var(--border-color, #e4e6eb)',
        }}>
            {/* ── Row 1: Status Steps ── */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 16px 6px',
                overflowX: 'auto',
                gap: '2px',
            }}>
                {STEPS.map((step, index) => {
                    const isActive = step.key === currentStatus;
                    const isPast   = index < currentIndex;

                    return (
                        <React.Fragment key={step.key}>
                            <span
                                style={{
                                    padding: '7px 14px',
                                    background: isActive ? 'white' : 'transparent',
                                    border: isActive ? '2px solid #1fa391' : '1px solid transparent',
                                    borderRadius: '4px',
                                    cursor: 'default',
                                    fontWeight: isActive ? '700' : isPast ? '500' : '400',
                                    color: isActive ? '#1fa391' : isPast ? '#1fa391' : '#999',
                                    fontSize: '0.83rem',
                                    whiteSpace: 'nowrap',
                                    userSelect: 'none',
                                }}
                            >
                                {step.label}
                            </span>
                            {index < STEPS.length - 1 && (
                                <span style={{ color: '#ccc', fontSize: '1rem', userSelect: 'none', padding: '0 1px' }}>
                                    ›
                                </span>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* ── Row 2: Action Buttons ── */}
            {action && (
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    padding: '6px 16px 10px',
                }}>
                    <button
                        onClick={() => onStatusChange(action.nextState)}
                        disabled={isLoading}
                        style={{
                            ...BTN.base, ...BTN.primary,
                            opacity: isLoading ? 0.6 : 1,
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {action.label}
                    </button>

                    <button
                        onClick={() => onStatusChange('visit_closed')}
                        disabled={isLoading}
                        style={{
                            ...BTN.base, ...BTN.outline,
                            opacity: isLoading ? 0.6 : 1,
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default StatusStepper;
