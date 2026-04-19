import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Mail, Lock, LogIn } from 'lucide-react';
import './auth.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    const result = await login(email, password);
    if (!result.success) {
      setErrorMsg(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="auth-wrapper animate-fade-in">
      <div className="glass-panel auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to track your next workout</p>

        {errorMsg && <div className="auth-error-banner">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
            <LogIn size={20} /> {isLoading ? 'Authenticating...' : "Let's Go"}
          </button>
        </form>
      </div>
    </div>
  );
};
