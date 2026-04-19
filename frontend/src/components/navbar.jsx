import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogOut, User, Dumbbell, Apple, Settings, TrendingUp } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';

import './navbar.css';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <Activity color="var(--accent-primary)" size={28} />
          <span className="navbar-logo-text">FitMERN</span>
        </Link>

        <nav className="navbar-links">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-item">
                <User size={18} /> Dashboard
              </Link>
              <Link to="/workouts" className="nav-item">
                <Dumbbell size={18} /> Workouts
              </Link>
              <Link to="/diet" className="nav-item">
                <Apple size={18} /> Diet
              </Link>
              <Link to="/analytics" className="nav-item">
                <TrendingUp size={18} /> Analytics
              </Link>
              <Link to="/profile" className="nav-item">
                <Settings size={18} /> Profile
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary nav-logout-btn">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up Free</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
