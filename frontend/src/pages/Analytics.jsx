import React, { useState, useEffect, useContext } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ActivitySquare, CalendarDays } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import './analytics.css';

export const Analytics = () => {
  const { user } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  
  useEffect(() => {
    const fetchStats = async () => {
       try {
         const res = await api.get('/workouts');
         setWorkouts(res.data);
       } catch (err) {
         console.error(err);
       }
    };
    fetchStats();
  }, []);

  // Compute Consistency Data
  const grouped = {};
  workouts.forEach(w => {
    const day = new Date(w.date).toLocaleDateString('en-US', { weekday: 'short' });
    if (!grouped[day]) grouped[day] = 0;
    grouped[day] += (w.sets * 5); // 5 mins per set
  });
  
  const consistencyData = Object.keys(grouped).map(day => ({
    day, activeMin: grouped[day]
  }));

  const safeConsistencyData = consistencyData.length > 0 ? consistencyData : [
    { day: 'Mon', activeMin: 0 }, { day: 'Tue', activeMin: 0 }
  ];

  // Weight Trend: Simulated since history collection wasn't part of core
  const weightTrendData = [
    { week: 'Week 1', weight: 180 },
    { week: 'Week 2', weight: 178 },
    { week: 'Week 3', weight: 177.5 },
    { week: 'Week 4', weight: 176 },
    { week: 'Week 5', weight: 175.2 },
    { week: 'Target', weight: user?.targetWeight || 170 },
  ];

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="tracker-header dashboard-header">
        <TrendingUp color="var(--accent-primary)" size={32} />
        <h1>Progress Analysis</h1>
      </div>
      <p className="text-muted mb-4">Deep dive into your fitness journey over time.</p>

      <div className="analytics-overview-grid mb-4">
         <div className="glass-panel stat-card">
           <ActivitySquare size={24} color="#10B981" />
           <div className="stat-card-details">
             <span className="stat-card-title">Total Workouts</span>
             <span className="stat-card-val">{workouts.length}</span>
           </div>
         </div>
         <div className="glass-panel stat-card">
           <TrendingUp size={24} color="var(--accent-primary)" />
           <div className="stat-card-details">
             <span className="stat-card-title">Weight Change Target</span>
             <span className="stat-card-val">{(user?.targetWeight - user?.currentWeight) || 0} <span className="text-sm">lbs</span></span>
           </div>
         </div>
         <div className="glass-panel stat-card">
           <CalendarDays size={24} color="#F59E0B" />
           <div className="stat-card-details">
             <span className="stat-card-title">Target Goal</span>
             <span className="stat-card-val" style={{fontSize: '1.2rem'}}>{user?.primaryGoal || 'Maintenance'}</span>
           </div>
         </div>
      </div>

      <div className="analytics-chart-grid">
        <div className="glass-panel chart-panel">
          <h3 className="section-title">Weight Trend Simulation</h3>
          <div className="chart-wrapper">
             <ResponsiveContainer width="100%" height={300}>
               <AreaChart data={weightTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.8}/>
                     <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="week" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                 <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                 <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}
                   itemStyle={{ color: 'var(--text-main)' }}
                 />
                 <Area type="monotone" dataKey="weight" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorWeight)" strokeWidth={3} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel chart-panel">
          <h3 className="section-title">Consistency: Active Minutes</h3>
          <div className="chart-wrapper">
             <ResponsiveContainer width="100%" height={300}>
               <BarChart data={safeConsistencyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                 <XAxis dataKey="day" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                 <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                 <Tooltip 
                   cursor={{fill: 'var(--bg-secondary)'}}
                   contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}
                 />
                 <Bar dataKey="activeMin" fill="var(--accent-success)" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
