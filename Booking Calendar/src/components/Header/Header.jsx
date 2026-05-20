import React from 'react';
import { User, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ isDarkMode, toggleTheme }) => {
    return (
        <header>
            <div className="header-left" />

            <div className="header-right">
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
            </div>
        </header>
    );
};

export default Header;
