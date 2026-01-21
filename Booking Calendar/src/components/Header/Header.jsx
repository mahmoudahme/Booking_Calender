import React from 'react';
import { User, Moon, Sun, Calendar as CalendarIcon, X } from 'lucide-react';
import { motion } from 'framer-motion';
import NavigationToolbar from '../UI/NavigationToolbar';
import SearchBar from './SearchBar';

const Header = ({
    viewMode,
    setViewMode,
    selectedDate,
    onNavigate,
    onRefresh,
    isRefreshing,
    searchTerm,
    setSearchTerm,
    searchResults,
    doctors,
    onSearchResultClick,
    isDarkMode,
    toggleTheme,
    isSidebarOpen,
    toggleSidebar
}) => {
    return (
        <header>
            <div className="header-left">
                <NavigationToolbar
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    selectedDate={selectedDate}
                    onNavigate={onNavigate}
                    onRefresh={onRefresh}
                    isRefreshing={isRefreshing}
                />
            </div>

            <div className="header-right">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    searchResults={searchResults}
                    doctors={doctors}
                    onResultClick={onSearchResultClick}
                />

                <button
                    className="toggle-sidebar-btn"
                    onClick={toggleTheme}
                    style={{ display: 'flex' }}
                    title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isDarkMode ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.div>
                </button>

                <div className="user-profile">
                    <User size={20} color="#1fa391" />
                    <span className="user-name">Administrator</span>
                </div>

                <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
                    {isSidebarOpen ? <X size={20} /> : <CalendarIcon size={20} />}
                </button>
            </div>
        </header>
    );
};

export default Header;
