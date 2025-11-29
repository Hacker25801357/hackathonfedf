import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resourceAPI, userAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ResourceCard from '../components/ResourceCard';
import ResourceForm from '../components/ResourceForm';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [stats, setStats] = useState({
    totalResources: 0,
    totalUsers: 0,
    totalDownloads: 0,
    avgRating: 0
  });

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resourcesRes, usersRes] = await Promise.all([
        resourceAPI.getAll(),
        userAPI.getAll()
      ]);

      const resourcesData = resourcesRes.data.data;
      setResources(resourcesData);
      setUsers(usersRes.data.data);

      // Calculate stats
      const totalDownloads = resourcesData.reduce((sum, r) => sum + r.downloadCount, 0);
      const avgRating = resourcesData.length > 0
        ? resourcesData.reduce((sum, r) => sum + r.averageRating, 0) / resourcesData.length
        : 0;

      setStats({
        totalResources: resourcesData.length,
        totalUsers: usersRes.data.data.length,
        totalDownloads,
        avgRating
      });

      setError('');
    } catch (err) {
      setError('Failed to load data');
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
      fetchData();
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
    fetchData();
  };

  const handleViewResource = (id) => {
    navigate(`/resource/${id}`);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button onClick={handleCreateResource} className="btn btn-primary">
            + Add New Resource
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Resources</h3>
            <p className="stat-value">{stats.totalResources}</p>
          </div>
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Total Downloads</h3>
            <p className="stat-value">{stats.totalDownloads}</p>
          </div>
          <div className="stat-card">
            <h3>Average Rating</h3>
            <p className="stat-value">{stats.avgRating.toFixed(1)}</p>
          </div>
        </div>

        <div className="admin-section">
          <h2>All Resources</h2>
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
        </div>

        <div className="admin-section">
          <h2>User Management</h2>
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

export default AdminDashboard;
