import { useState, useEffect } from 'react';

/**
 * Custom hook for theme management
 */
export const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return {
        isDarkMode,
        toggleTheme
    };
};
