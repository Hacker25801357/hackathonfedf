import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={isAdmin() ? '/admin' : '/dashboard'} className="navbar-logo">
          📚 Educational Library
        </Link>
        
        <div className="navbar-menu">
          {isAdmin() ? (
            <>
              <Link to="/admin" className="navbar-link">Dashboard</Link>
              <Link to="/admin/resources" className="navbar-link">Manage Resources</Link>
              <Link to="/admin/users" className="navbar-link">Manage Users</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="navbar-link">Browse Resources</Link>
            </>
          )}
          
          <div className="navbar-user">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">({user?.role})</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
