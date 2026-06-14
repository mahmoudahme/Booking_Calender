import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const fmt = (n) => (n ?? 0).toLocaleString();

const STATUS_CONFIG = {
    paid: {
        label: 'Paid',
        labelAr: 'مدفوع',
        icon: CheckCircle,
        color: '#16a34a',
        bg: 'rgba(22,163,74,0.1)',
    },
    inPayment: {
        label: 'In Payment',
        labelAr: 'في التحصيل',
        icon: Clock,
        color: '#2563eb',
        bg: 'rgba(37,99,235,0.1)',
    },
    partial: {
        label: 'Partial',
        labelAr: 'مدفوع جزئياً',
        icon: AlertTriangle,
        color: '#d97706',
        bg: 'rgba(217,119,6,0.1)',
    },
    notPaid: {
        label: 'Not Paid',
        labelAr: 'غير مدفوع',
        icon: XCircle,
        color: '#dc2626',
        bg: 'rgba(220,38,38,0.1)',
    },
};

const PaymentBreakdownCard = ({ paymentBreakdown, overdue }) => {
    const { isDarkMode } = useTheme();
    const [showOverdue, setShowOverdue] = useState(false);

    const rows = paymentBreakdown ? [
        { key: 'paid',      data: paymentBreakdown.paid      },
        { key: 'inPayment', data: paymentBreakdown.inPayment  },
        { key: 'partial',   data: paymentBreakdown.partial    },
        { key: 'notPaid',   data: paymentBreakdown.notPaid    },
    ].filter(r => r.data?.count > 0) : [];

    const totalInvoiced  = rows.reduce((s, r) => s + (r.data.untaxed  || 0), 0);

    return (
        <motion.div
            className="stat-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="chart-title" style={{ marginBottom: 16 }}>
                <CheckCircle size={17} /> Payment Breakdown — This Period
            </h4>

            {/* Summary bar */}
            <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6, opacity: 0.7 }}>
                    <span>Invoiced (ex-VAT)</span>
                    <span>{fmt(totalInvoiced)} SAR</span>
                </div>
                {/* Stacked progress */}
                <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', gap: 1 }}>
                    {rows.map(({ key, data }) => {
                        const pct = totalInvoiced > 0 ? (data.untaxed / totalInvoiced) * 100 : 0;
                        return (
                            <div
                                key={key}
                                style={{ width: `${pct}%`, background: STATUS_CONFIG[key].color, transition: 'width 0.4s' }}
                                title={`${STATUS_CONFIG[key].label}: ${fmt(data.untaxed)} SAR`}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Status rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {rows.map(({ key, data }) => {
                    const cfg = STATUS_CONFIG[key];
                    const Icon = cfg.icon;
                    return (
                        <div
                            key={key}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '10px 12px', borderRadius: 8,
                                background: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                                border: `1px solid ${cfg.color}22`,
                            }}
                        >
                            <div style={{
                                width: 34, height: 34, borderRadius: 8,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: cfg.bg, flexShrink: 0,
                            }}>
                                <Icon size={16} color={cfg.color} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                                    <span style={{ fontWeight: 600, fontSize: 13 }}>{cfg.label}</span>
                                    <span style={{ fontWeight: 700, fontSize: 14, color: cfg.color }}>
                                        {fmt(data.untaxed)} SAR
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.6, marginTop: 2 }}>
                                    <span>{data.count} invoice{data.count !== 1 ? 's' : ''}</span>
                                    {data.outstanding > 0 && (
                                        <span style={{ color: '#dc2626' }}>
                                            {fmt(data.outstanding)} SAR outstanding
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Overdue section */}
            {overdue && overdue.count > 0 && (
                <div style={{ marginTop: 18, borderTop: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`, paddingTop: 14 }}>
                    <button
                        onClick={() => setShowOverdue(v => !v)}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            width: '100%', background: 'rgba(220,38,38,0.08)',
                            border: '1px solid rgba(220,38,38,0.2)', borderRadius: 8,
                            padding: '10px 12px', cursor: 'pointer', color: '#dc2626',
                        }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 13 }}>
                            <AlertTriangle size={15} />
                            {overdue.count} Overdue Invoice{overdue.count !== 1 ? 's' : ''} — {fmt(overdue.totalOutstanding)} SAR
                        </span>
                        {showOverdue ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>

                    <AnimatePresence>
                        {showOverdue && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {overdue.invoices.map((inv, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: 'flex', justifyContent: 'space-between',
                                                alignItems: 'center', padding: '7px 10px',
                                                borderRadius: 6, fontSize: 12,
                                                background: isDarkMode ? 'rgba(220,38,38,0.06)' : 'rgba(220,38,38,0.04)',
                                            }}
                                        >
                                            <div>
                                                <span style={{ fontWeight: 600 }}>{inv.name}</span>
                                                <span style={{ opacity: 0.5, marginLeft: 8 }}>
                                                    due {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '—'}
                                                </span>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={{ color: '#dc2626', fontWeight: 700 }}>
                                                    {fmt(inv.outstanding)} SAR
                                                </span>
                                                <span style={{ opacity: 0.5, marginLeft: 6, fontSize: 11 }}>
                                                    of {fmt(inv.total)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {overdue.count > overdue.invoices.length && (
                                        <div style={{ textAlign: 'center', fontSize: 11, opacity: 0.5, padding: 4 }}>
                                            +{overdue.count - overdue.invoices.length} more invoices
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
};

export default PaymentBreakdownCard;
