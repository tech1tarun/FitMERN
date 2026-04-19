import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Mail, Lock, UserPlus, User } from 'lucide-react';
import './auth.css';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    const result = await register(name, email, password);
    if (!result.success) {
      setErrorMsg(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="auth-wrapper animate-fade-in">
      <div className="glass-panel auth-card">
        <h2 className="auth-title">Join FitMERN</h2>
        <p className="auth-subtitle">Start your fitness journey today</p>

        {errorMsg && <div className="auth-error-banner">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input 
              type="text" 
              className="input-control with-icon" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input 
              type="email" 
              className="input-control with-icon" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              className="input-control with-icon" 
              placeholder="Create Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
            <UserPlus size={20} /> {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};
