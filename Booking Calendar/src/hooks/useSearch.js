import { useState, useEffect } from 'react';
import bookingAPI from '../services/api';
import { SEARCH_DEBOUNCE } from '../constants';

/**
 * Custom hook for search functionality
 */
export const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [highlightedAppId, setHighlightedAppId] = useState(null);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            try {
                const results = await bookingAPI.searchAppointments(searchTerm);
                setSearchResults(results);
            } catch (error) {
                console.error('Error in useSearch:', error);
            }
        }, SEARCH_DEBOUNCE);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleSearchResultClick = (app, onDateChange) => {
        // Switch to the date
        onDateChange(new Date(app.date));

        // Highlight the appointment
        setHighlightedAppId(app.id);

        // Clear search
        setSearchTerm('');
        setSearchResults([]);

        // Remove highlight after 3 seconds
        setTimeout(() => setHighlightedAppId(null), 3000);
    };

    return {
        searchTerm,
        setSearchTerm,
        searchResults,
        highlightedAppId,
        handleSearchResultClick
    };
};
