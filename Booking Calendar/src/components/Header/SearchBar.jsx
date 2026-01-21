import React from 'react';
import { Search } from 'lucide-react';
import { format } from 'date-fns';

const SearchBar = ({ searchTerm, setSearchTerm, searchResults, doctors, onResultClick }) => {
    return (
        <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
                type="text"
                placeholder="Search (Patient, ID, Doctor)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
                <div className="search-results-dropdown">
                    {searchResults.map(app => {
                        const doctor = doctors.find(d => d.id === app.docId);
                        return (
                            <div
                                key={app.id}
                                className="search-result-item"
                                onClick={() => onResultClick(app)}
                            >
                                <span className="result-main-text">{app.title}</span>
                                <div className="result-sub-text">
                                    <span>{format(new Date(app.date), 'MMM d')} • {app.time}</span>
                                    <span>Dr. {doctor?.name.split(' ').slice(1).join(' ')}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
