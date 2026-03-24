import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const DASHBOARD_API_BASE = 'http://localhost:3000/api/v1/dashboard';

export const useDashboardData = (period = 'monthly') => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const periodMap = {
        today: 'daily',
        week: 'weekly',
        month: 'monthly',
    };

    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const apiPeriod = periodMap[period] || 'monthly';
            const response = await axios.get(`${DASHBOARD_API_BASE}/full`, {
                params: { period: apiPeriod },
            });

            const responseData = response.data?.data || response.data;
            setData(responseData);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [period]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return { data, loading, error, refetch: fetchDashboardData };
};

export default useDashboardData;
