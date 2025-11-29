import React from 'react';
import './SearchFilters.css';

const SearchFilters = ({ filters, onFilterChange }) => {
  const resourceTypes = ['Textbook', 'Research Paper', 'Study Guide', 'Lecture Notes', 'Video', 'Other'];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="search-filters">
      <div className="filter-row">
        <div className="filter-group search-group">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search by title, description, tags..."
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">All Types</option>
            {resourceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <input
            type="text"
            name="subject"
            value={filters.subject}
            onChange={handleChange}
            placeholder="Filter by subject"
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <select
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="filter-select"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rated</option>
            <option value="downloads">Most Downloaded</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
