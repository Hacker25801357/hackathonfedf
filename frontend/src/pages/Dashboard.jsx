import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resourceAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ResourceCard from '../components/ResourceCard';
import SearchFilters from '../components/SearchFilters';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    subject: '',
    sort: 'latest'
  });

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, resources]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await resourceAPI.getAll();
      setResources(response.data.data);
      setFilteredResources(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load resources');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...resources];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.subject.toLowerCase().includes(searchLower) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(resource => resource.type === filters.type);
    }

    // Subject filter
    if (filters.subject) {
      filtered = filtered.filter(resource =>
        resource.subject.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }

    // Sort
    switch (filters.sort) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'rating':
        filtered.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'downloads':
        filtered.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
      default:
        break;
    }

    setFilteredResources(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleViewResource = (id) => {
    navigate(`/resource/${id}`);
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name}!</h1>
          <p>Explore our educational resources</p>
        </div>

        <SearchFilters filters={filters} onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="loading">Loading resources...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="results-info">
              <p>{filteredResources.length} resource(s) found</p>
            </div>

            <div className="resources-grid">
              {filteredResources.length > 0 ? (
                filteredResources.map(resource => (
                  <ResourceCard
                    key={resource._id}
                    resource={resource}
                    onView={() => handleViewResource(resource._id)}
                  />
                ))
              ) : (
                <div className="no-resources">
                  <p>No resources found matching your criteria</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
