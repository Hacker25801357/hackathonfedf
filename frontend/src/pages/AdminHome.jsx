import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resourceAPI, userAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalResources: 0,
    totalUsers: 0,
    totalDownloads: 0,
    avgRating: 0,
    recentResources: []
  });

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/dashboard');
      return;
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [resourcesRes, usersRes] = await Promise.all([
        resourceAPI.getAll(),
        userAPI.getAll()
      ]);

      const resourcesData = resourcesRes.data.data;
      const usersData = usersRes.data.data;

      // Calculate stats
      const totalDownloads = resourcesData.reduce((sum, r) => sum + r.downloadCount, 0);
      const avgRating = resourcesData.length > 0
        ? resourcesData.reduce((sum, r) => sum + r.averageRating, 0) / resourcesData.length
        : 0;

      // Get recent resources (last 5)
      const recentResources = resourcesData
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setStats({
        totalResources: resourcesData.length,
        totalUsers: usersData.length,
        totalDownloads,
        avgRating,
        recentResources
      });

      setError('');
    } catch (err) {
      setError('Failed to load statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
      
      <div className="admin-home">
        <div className="dashboard-header">
          <h1>📊 Admin Dashboard</h1>
          <p>Overview of your Educational Resource Library</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <h3>Total Resources</h3>
            <p className="stat-value">{stats.totalResources}</p>
            <button 
              onClick={() => navigate('/admin/resources')} 
              className="stat-link"
            >
              Manage Resources →
            </button>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <h3>Total Users</h3>
            <p className="stat-value">{stats.totalUsers}</p>
            <button 
              onClick={() => navigate('/admin/users')} 
              className="stat-link"
            >
              View Users →
            </button>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📥</div>
            <h3>Total Downloads</h3>
            <p className="stat-value">{stats.totalDownloads}</p>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <h3>Average Rating</h3>
            <p className="stat-value">{stats.avgRating.toFixed(1)}</p>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button 
              onClick={() => navigate('/admin/resources')}
              className="action-card"
            >
              <span className="action-icon">➕</span>
              <h3>Add New Resource</h3>
              <p>Upload educational materials</p>
            </button>
            
            <button 
              onClick={() => navigate('/admin/resources')}
              className="action-card"
            >
              <span className="action-icon">📝</span>
              <h3>Manage Resources</h3>
              <p>Edit or delete resources</p>
            </button>
            
            <button 
              onClick={() => navigate('/admin/users')}
              className="action-card"
            >
              <span className="action-icon">👤</span>
              <h3>View Users</h3>
              <p>Manage user accounts</p>
            </button>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="action-card"
            >
              <span className="action-icon">🔍</span>
              <h3>Browse Resources</h3>
              <p>View as a regular user</p>
            </button>
          </div>
        </div>

        <div className="recent-section">
          <h2>Recently Added Resources</h2>
          {stats.recentResources.length > 0 ? (
            <div className="recent-resources">
              {stats.recentResources.map(resource => (
                <div key={resource._id} className="recent-resource-item">
                  <div className="recent-resource-info">
                    <h4>{resource.title}</h4>
                    <p className="resource-type">{resource.type} • {resource.subject}</p>
                    <p className="resource-date">Added {formatDate(resource.createdAt)}</p>
                  </div>
                  <div className="recent-resource-stats">
                    <span className="stat-badge">⭐ {resource.averageRating.toFixed(1)}</span>
                    <span className="stat-badge">📥 {resource.downloadCount}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No resources yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
