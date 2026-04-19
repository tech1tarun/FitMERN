import React, { useState, useEffect } from 'react';
import { PlusCircle, Activity, Dumbbell } from 'lucide-react';
import api from '../services/api.js';
import './workout.css';

export const WorkoutLog = () => {
  const [workouts, setWorkouts] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await api.get('/workouts');
        setWorkouts(res.data);
      } catch (err) {
        console.error("Failed to fetch workouts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    if (!exerciseName || !sets || !reps || !weight) return;
    
    try {
      const payload = {
        exerciseName,
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: parseFloat(weight)
      };
      
      const res = await api.post('/workouts', payload);
      setWorkouts([res.data, ...workouts]);
      
      setExerciseName('');
      setSets('');
      setReps('');
      setWeight('');
    } catch (err) {
      console.error("Failed to save workout", err);
    }
  };

  return (
    <div className="page-wrapper animate-fade-in tracker-layout">
      <div className="tracker-form-container">
        <div className="glass-panel">
          <div className="tracker-header">
            <Activity color="var(--accent-primary)" size={28} />
            <h2>Log Your Workout</h2>
          </div>
          <p className="text-muted mb-4">Track your progressive overload session by session.</p>

          <form onSubmit={handleAddWorkout} className="tracker-form">
            <div className="form-group">
              <label>Exercise Name</label>
              <input 
                type="text" 
                className="input-control" 
                placeholder="e.g. Deadlift, Pull-ups" 
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Sets</label>
                <input 
                  type="number" 
                  className="input-control" 
                  placeholder="3" 
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  min="1"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Reps (per set)</label>
                <input 
                  type="number" 
                  className="input-control" 
                  placeholder="10" 
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  min="1"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Weight (lbs/kg)</label>
                <input 
                  type="number" 
                  className="input-control" 
                  placeholder="150" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="0"
                  required 
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              <PlusCircle size={20} /> Add Set to Log
            </button>
          </form>
        </div>
      </div>

      <div className="tracker-history-container">
        <h3 className="section-title">Today's Routine</h3>
        
        {loading ? (
          <p className="text-muted">Loading your routine...</p>
        ) : workouts.length === 0 ? (
           <div className="empty-state glass-panel text-center">
             <Dumbbell size={48} color="var(--text-muted)" className="mb-2 mx-auto inline-block" />
             <p className="text-muted">No exercises logged yet. Time to hit the iron!</p>
           </div>
        ) : (
          <div className="history-list">
            {workouts.map((log) => (
              <div key={log._id || log.id} className="glass-panel history-item">
                <div className="history-details">
                  <h4>{log.exerciseName || log.name}</h4>
                  <span className="text-muted text-sm">{new Date(log.date).toLocaleDateString()}</span>
                </div>
                <div className="history-stats">
                  <div className="stat-badge">
                    <span>{log.sets} x {log.reps}</span> reps
                  </div>
                  <div className="stat-badge stat-highlight">
                    <span>{log.weight}</span> lbs
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
