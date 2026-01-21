import { useState, useEffect } from 'react';
import bookingAPI from '../services/api';

/**
 * Custom hook for managing doctors data
 */
export const useDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctors, setSelectedDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const data = await bookingAPI.getDoctors();
                setDoctors(data);
                setSelectedDoctors(data.map(d => d.id));
                console.log("Doctors loaded:", data);
            } catch (err) {
                setError(err);
                console.error('Error in useDoctors:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    return {
        doctors,
        selectedDoctors,
        setSelectedDoctors,
        loading,
        error
    };
};
