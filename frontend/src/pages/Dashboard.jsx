import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ActivitySquare, Flame, TrendingUp, CalendarDays, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import api from '../services/api';

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workoutRes, dietRes] = await Promise.all([
          api.get('/workouts'),
          api.get('/diet')
        ]);
        setWorkouts(workoutRes.data);
        setMeals(dietRes.data);
      } catch (err) {
        console.error("Dashboard error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Compute stats based on the API returns
  const today = new Date().toLocaleDateString();
  const todaysMeals = meals.filter(m => new Date(m.date).toLocaleDateString() === today);
  const todaysCalories = todaysMeals.reduce((acc, curr) => acc + curr.calories, 0);

  const todaysWorkouts = workouts.filter(w => new Date(w.date).toLocaleDateString() === today);
  const todaysSets = todaysWorkouts.reduce((acc, curr) => acc + curr.sets, 0);

  // Group workouts by day for chart
  const recentWorkouts = workouts.slice(0, 7).reverse();
  const activityData = recentWorkouts.length > 0 ? recentWorkouts.map((w) => ({
    name: new Date(w.date).toLocaleDateString('en-US', { weekday: 'short' }),
    score: w.sets * 10 // estimate 10 mins per set
  })) : [
    { name: 'Mon', score: 0 },
    { name: 'Tue', score: 0 },
    { name: 'Wed', score: 0 },
  ];

  return (
    <div className="page-wrapper animate-fade-in dashboard-layout">
      
      <div className="dashboard-header mb-4">
        <div>
          <h1 className="text-gradient">Welcome back, {user?.name?.split(' ')[0] || 'Athlete'}</h1>
          <p className="text-muted">Here is your daily snapshot.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="metric-card glass-panel">
          <div className="metric-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
            <ActivitySquare color="#10B981" size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Today's Sets</span>
            <span className="metric-value">{loading ? '-' : todaysSets}</span>
          </div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
            <Flame color="#F59E0B" size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Calories Intake</span>
            <span className="metric-value">{loading ? '-' : todaysCalories} <span className="text-sm text-muted">kcal</span></span>
          </div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-icon" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
            <CalendarDays color="var(--accent-primary)" size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Total Workouts Logged</span>
            <span className="metric-value">{loading ? '-' : workouts.length}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content mt-4">
        
        <div className="chart-container glass-panel">
          <div className="flex-between mb-4">
            <h3 className="section-title" style={{ margin: 0 }}>Recent Activity</h3>
            <Link to="/analytics" className="text-sm text-muted hover-accent" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              View Analytics <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-main)' }}
                />
                <Area type="monotone" dataKey="score" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="sidebar-container">
          <div className="quick-actions glass-panel">
            <h3 className="section-title">Quick Actions</h3>
            <div className="action-button-list mt-2">
              <Link to="/workouts" className="btn btn-primary w-full text-center" style={{ display: 'block', textDecoration: 'none' }}>Log Workout</Link>
              <Link to="/diet" className="btn btn-secondary w-full text-center mt-2" style={{ display: 'block', textDecoration: 'none' }}>Log Nutrition</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
