import React, { useState, useEffect } from 'react';
import { Apple, Utensils, PieChart } from 'lucide-react';
import api from '../services/api.js';
import './diet.css';

export const DietLog = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await api.get('/diet');
        setMeals(res.data);
      } catch (err) {
        console.error("Failed to fetch meals", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const handleAddMeal = async (e) => {
    e.preventDefault();
    if (!mealName || !calories) return;
    
    try {
      const payload = {
        mealName,
        calories: parseInt(calories),
        protein: parseInt(protein) || 0,
        carbs: parseInt(carbs) || 0,
        fats: parseInt(fats) || 0
      };
      
      const res = await api.post('/diet', payload);
      setMeals([res.data, ...meals]);
      
      setMealName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFats('');
    } catch (err) {
       console.error("Failed to save meal", err);
    }
  };

  const totalCalories = meals.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = meals.reduce((acc, curr) => acc + curr.protein, 0);
  const totalCarbs = meals.reduce((acc, curr) => acc + curr.carbs, 0);
  const totalFats = meals.reduce((acc, curr) => acc + curr.fats, 0);

  return (
    <div className="page-wrapper animate-fade-in tracker-layout">
      
      <div className="tracker-form-container">
        <div className="glass-panel">
          <div className="tracker-header">
            <Apple color="var(--accent-success)" size={28} />
            <h2>Nutrition Tracker</h2>
          </div>
          <p className="text-muted mb-4">You can't out-train a bad diet. Log your meals.</p>

          <form onSubmit={handleAddMeal} className="tracker-form">
            <div className="form-group">
              <label>Meal Name</label>
              <input 
                type="text" 
                className="input-control" 
                placeholder="e.g. Protein Shake" 
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-group">
                <label>Total Calories (kcal)</label>
                <input 
                  type="number" 
                  className="input-control calorie-input" 
                  placeholder="300" 
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  min="0"
                  required 
                />
            </div>
            
            <div className="form-row macro-row">
              <div className="form-group">
                <label>Protein (g)</label>
                <input 
                  type="number" 
                  className="input-control" 
                  placeholder="25" 
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Carbs (g)</label>
                <input 
                  type="number" 
                  className="input-control" 
                  placeholder="10" 
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Fats (g)</label>
                <input 
                  type="number" 
                  className="input-control" 
                  placeholder="5" 
                  value={fats}
                  onChange={(e) => setFats(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2" style={{ background: 'var(--accent-success)' }}>
              <Utensils size={20} /> Log Meal
            </button>
          </form>
        </div>
      </div>

      <div className="tracker-history-container">
        <div className="macro-summary-panel mb-4">
           <div className="macro-header">
             <PieChart size={20} color="var(--text-main)" />
             <h3>Daily Overview</h3>
           </div>
           
           <div className="macro-huge-stat">
              <span>{totalCalories}</span> kcal
           </div>
           
           <div className="macro-progress-bars">
             <div className="macro-col">
                <span className="macro-label">Protein</span>
                <div className="m-bar-bg"><div className="m-bar-fill protein-fill" style={{width: `${Math.min(totalProtein/2, 100)}%`}}></div></div>
                <span className="macro-val">{totalProtein}g</span>
             </div>
             <div className="macro-col">
                <span className="macro-label">Carbs</span>
                <div className="m-bar-bg"><div className="m-bar-fill carbs-fill" style={{width: `${Math.min(totalCarbs/3, 100)}%`}}></div></div>
                <span className="macro-val">{totalCarbs}g</span>
             </div>
             <div className="macro-col">
                <span className="macro-label">Fats</span>
                <div className="m-bar-bg"><div className="m-bar-fill fats-fill" style={{width: `${Math.min(totalFats/1, 100)}%`}}></div></div>
                <span className="macro-val">{totalFats}g</span>
             </div>
           </div>
        </div>

        <h3 className="section-title">Verified Meals</h3>
        
        {loading ? (
           <p className="text-muted">Loading nutrition history...</p>
        ) : meals.length === 0 ? (
           <div className="empty-state glass-panel text-center">
             <p className="text-muted">No meals logged yet on DB.</p>
           </div>
        ) : (
          <div className="history-list">
            {meals.map((meal) => (
              <div key={meal._id || meal.id} className="glass-panel history-item">
                <div className="history-details">
                  <h4>{meal.mealName || meal.name}</h4>
                  <span className="text-muted text-sm">{new Date(meal.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="history-stats">
                  <div className="stat-badge stat-highlight" style={{color: 'var(--accent-success)'}}>
                    <span>{meal.calories}</span> kcal
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
