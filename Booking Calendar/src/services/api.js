import axios from 'axios';
import { API_BASE_URL } from '../constants';

/**
 * API Service for Booking Calendar
 */
class BookingAPI {
    /**
     * Fetch all doctors
     */
    async getDoctors() {
        try {
            const response = await axios.get(`${API_BASE_URL}/doctors`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching doctors:', error);
            throw error;
        }
    }

    /**
     * Fetch appointments within date range
     */
    async getAppointments(startDate, endDate, doctorIds) {
        try {
            const response = await axios.get(`${API_BASE_URL}/appointments`, {
                params: {
                    startDate,
                    endDate,
                    doctorIds: doctorIds.join(',')
                }
            });
            return response.data.data.appointments || [];
        } catch (error) {
            console.error('Error fetching appointments:', error);
            throw error;
        }
    }

    /**
     * Fetch doctor schedule for a specific date
     * @param {string} date - Date in yyyy-MM-dd format
     * @param {number} doctorId - Optional doctor ID, if not provided fetches all doctors
     */
    async getSchedule(date, doctorId = null) {
        try {
            const params = { date };
            if (doctorId) params.doctorId = doctorId;

            const response = await axios.get(`${API_BASE_URL}/get-schedule`, { params });

            // Handle nested response structure
            const responseData = response.data;
            const innerData = responseData.data || {};
            const schedulesMap = innerData.data?.schedules || innerData.schedules || responseData.schedules;

            return schedulesMap || {};
        } catch (error) {
            console.error(`Error fetching schedule for date ${date}:`, error);
            return {};
        }
    }

    /**
     * Search appointments
     */
    async searchAppointments(term) {
        try {
            const response = await axios.get(`${API_BASE_URL}/search`, {
                params: { term }
            });
            // Handle wrapped response { data: [...] } or direct array
            return response.data.data || response.data;
        } catch (error) {
            console.error('Error searching appointments:', error);
            throw error;
        }
    }

    /**
     * Search patients
     */
    async searchPatients(term) {
        try {
            const response = await axios.get(`${API_BASE_URL}/patients/search`, {
                params: { term }
            });
            // Handle wrapped response { data: [...] } or direct array
            return response.data.data || response.data;
        } catch (error) {
            console.error('Error searching patients:', error);
            return [];
        }
    }

    /**
     * Create new appointment
     */
    async createAppointment(appointmentData) {
        try {
            const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData);
            return response.data;
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new BookingAPI();
