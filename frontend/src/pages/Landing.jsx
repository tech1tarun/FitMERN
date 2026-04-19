import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Dumbbell, Zap } from 'lucide-react';
import './landing.css';

export const Landing = () => {
  return (
    <div className="page-wrapper animate-fade-in">
      <section className="hero-section text-center">
        <h1 className="hero-title">
          Forge Your Path to <span className="text-gradient">Peak Fitness</span>
        </h1>
        <p className="hero-subtitle">
          Track workouts, monitor nutrition, and visualize your progress with the ultimate MERN fitness platform.
        </p>
        <div className="hero-cta">
          <Link to="/register" className="btn btn-primary btn-lg">
            Start Your Journey <ArrowRight size={20} />
          </Link>
          <Link to="/login" className="btn btn-secondary btn-lg">
            Returning Athlete
          </Link>
        </div>
      </section>

      <section className="features-grid">
        <div className="glass-panel feature-card">
          <div className="feature-icon-wrapper">
            <Dumbbell size={32} color="var(--accent-primary)" />
          </div>
          <h3>Smart Workout Tracking</h3>
          <p>Log your routines, sets, and reps seamlessly. Your training data, simplified.</p>
        </div>
        
        <div className="glass-panel feature-card">
          <div className="feature-icon-wrapper">
            <BarChart3 size={32} color="var(--accent-success)" />
          </div>
          <h3>Visual Analytics</h3>
          <p>Watch your progress take shape with beautiful, interactive charts.</p>
        </div>

        <div className="glass-panel feature-card">
          <div className="feature-icon-wrapper">
            <Zap size={32} color="#F59E0B" />
          </div>
          <h3>Goal Crushing</h3>
          <p>Set targets for weight and performance, and hit them with actionable insights.</p>
        </div>
      </section>
    </div>
  );
};
