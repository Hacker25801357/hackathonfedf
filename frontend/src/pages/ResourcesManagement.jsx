import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resourceAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ResourceCard from '../components/ResourceCard';
import ResourceForm from '../components/ResourceForm';
import './ResourcesManagement.css';

const ResourcesManagement = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/dashboard');
      return;
    }
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await resourceAPI.getAll();
      setResources(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load resources');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResource = () => {
    setEditingResource(null);
    setShowResourceForm(true);
  };

  const handleEditResource = (resource) => {
    setEditingResource(resource);
    setShowResourceForm(true);
  };

  const handleDeleteResource = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) {
      return;
    }

    try {
      await resourceAPI.delete(id);
      setResources(resources.filter(r => r._id !== id));
      alert('Resource deleted successfully');
    } catch (err) {
      alert('Failed to delete resource');
      console.error(err);
    }
  };

  const handleResourceFormClose = () => {
    setShowResourceForm(false);
    setEditingResource(null);
  };

  const handleResourceFormSuccess = () => {
    setShowResourceForm(false);
    setEditingResource(null);
    fetchResources();
  };

  const handleViewResource = (id) => {
    navigate(`/resource/${id}`);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading">Loading resources...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="resources-management">
        <div className="page-header">
          <div>
            <h1>Manage Resources</h1>
            <p>Create, edit, and delete educational resources</p>
          </div>
          <button onClick={handleCreateResource} className="btn btn-primary btn-large">
            + Add New Resource
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="resources-stats">
          <div className="stat-item">
            <span className="stat-label">Total Resources:</span>
            <span className="stat-count">{resources.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Downloads:</span>
            <span className="stat-count">
              {resources.reduce((sum, r) => sum + r.downloadCount, 0)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average Rating:</span>
            <span className="stat-count">
              {resources.length > 0
                ? (resources.reduce((sum, r) => sum + r.averageRating, 0) / resources.length).toFixed(1)
                : '0.0'}
            </span>
          </div>
        </div>

        {resources.length === 0 ? (
          <div className="no-resources">
            <p>No resources found. Click "Add New Resource" to create one!</p>
          </div>
        ) : (
          <div className="resources-grid">
            {resources.map(resource => (
              <ResourceCard
                key={resource._id}
                resource={resource}
                onView={() => handleViewResource(resource._id)}
                onEdit={() => handleEditResource(resource)}
                onDelete={() => handleDeleteResource(resource._id)}
                isAdmin={true}
              />
            ))}
          </div>
        )}
      </div>

      {showResourceForm && (
        <ResourceForm
          resource={editingResource}
          onClose={handleResourceFormClose}
          onSuccess={handleResourceFormSuccess}
        />
      )}
    </div>
  );
};

export default ResourcesManagement;
