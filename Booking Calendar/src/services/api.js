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
            const responseData = response.data;
            if (responseData && responseData.success === false) {
                console.error('Backend returned unsucessful response:', responseData.message);
                return [];
            }
            return responseData.data || responseData || [];
        } catch (error) {
            console.error('Error fetching doctors:', error);
            return [];
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
                    doctorIds: Array.isArray(doctorIds) ? doctorIds.join(',') : ''
                }
            });

            // Handle wrapped response { success: true, data: { appointments: [] } }
            // or { success: false, data: null }
            const responseData = response.data;
            if (responseData && responseData.success === false) {
                console.error('Backend returned unsucessful response:', responseData.message);
                return [];
            }

            const data = responseData.data || responseData;
            return data?.appointments || [];
        } catch (error) {
            console.error('Error fetching appointments:', error);
            // Return empty array instead of throwing to prevent UI crash
            return [];
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
     * Get last appointment's patient source for a patient
     */
    async getLastAppointmentByPatient(patientId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/patients/${patientId}/last-appointment`);
            return response.data.data || response.data;
        } catch (error) {
            console.error('Error fetching last appointment by patient:', error);
            return { patientSrcId: null };
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
     * Fetch countries
     */
    async getCountries() {
        try {
            const response = await axios.get(`${API_BASE_URL}/countries`);
            return response.data.data || response.data || [];
        } catch (error) {
            console.error('Error fetching countries:', error);
            return [];
        }
    }

    /**
     * Fetch campaign sources
     */
    async getCampaignSources() {
        try {
            const response = await axios.get(`${API_BASE_URL}/campaign-sources`);
            return response.data.data || response.data || [];
        } catch (error) {
            console.error('Error fetching campaign sources:', error);
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

    /**
     * Get appointment by ID
     */
    async getAppointmentById(appointmentId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/appointments/${appointmentId}`);
            const responseData = response.data;
            if (responseData && responseData.success === false) {
                console.error('Backend returned unsucessful response:', responseData.message);
                return null;
            }
            return responseData.data || responseData;
        } catch (error) {
            console.error('Error fetching appointment:', error);
            return null;
        }
    }

    /**
     * Update appointment
     */
    async updateAppointment(appointmentId, appointmentData) {
        try {
            const response = await axios.put(`${API_BASE_URL}/appointments/${appointmentId}`, appointmentData);
            return response.data;
        } catch (error) {
            console.error('Error updating appointment:', error);
            throw error;
        }
    }

    /**
     * Update appointment status only
     */
    async updateAppointmentStatus(appointmentId, state) {
        try {
            const response = await axios.patch(`${API_BASE_URL}/appointments/${appointmentId}/status`, { state });
            return response.data;
        } catch (error) {
            console.error('Error updating appointment status:', error);
            throw error;
        }
    }

    /**
     * Delete appointment
     */
    async deleteAppointment(appointmentId) {
        try {
            console.log('Deleting appointment with ID:', appointmentId);
            const response = await axios.delete(`${API_BASE_URL}/appointments/${appointmentId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting appointment:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new BookingAPI();
