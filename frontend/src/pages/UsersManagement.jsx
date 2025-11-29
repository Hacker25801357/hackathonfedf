import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './UsersManagement.css';

const UsersManagement = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/dashboard');
      return;
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAll();
      setUsers(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id, email) => {
    if (!window.confirm(`Are you sure you want to delete user: ${email}?`)) {
      return;
    }

    try {
      await userAPI.delete(id);
      setUsers(users.filter(user => user._id !== id));
      alert('User deleted successfully');
    } catch (err) {
      alert('Failed to delete user');
      console.error(err);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="users-management">
        <div className="page-header">
          <h1>User Management</h1>
          <p>Manage all registered users</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="stats-overview">
          <div className="stat-box">
            <h3>Total Users</h3>
            <p className="stat-number">{users.length}</p>
          </div>
          <div className="stat-box">
            <h3>Admin Users</h3>
            <p className="stat-number">
              {users.filter(u => u.role === 'admin').length}
            </p>
          </div>
          <div className="stat-box">
            <h3>Regular Users</h3>
            <p className="stat-number">
              {users.filter(u => u.role === 'user').length}
            </p>
          </div>
        </div>

        <div className="users-table-container">
          <h2>All Users</h2>
          
          {users.length === 0 ? (
            <div className="no-users">
              <p>No users found</p>
            </div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-name">
                        {user.name}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>{formatDate(user.updatedAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleDeleteUser(user._id, user.email)}
                          className="btn btn-danger btn-small"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
