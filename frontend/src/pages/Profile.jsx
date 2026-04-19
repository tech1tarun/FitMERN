import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Settings, Save, User as UserIcon, Target, Scale } from 'lucide-react';
import './profile.css';

export const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('lbs');
  
  const [goal, setGoal] = useState('Weight Loss');
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);

  // Sync state with Context
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAge(user.age || '');
      setHeight(user.height || '');
      setHeightUnit(user.heightUnit || 'cm');
      setCurrentWeight(user.currentWeight || '');
      setTargetWeight(user.targetWeight || '');
      setWeightUnit(user.weightUnit || 'lbs');
      setGoal(user.primaryGoal || 'Weight Loss');
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    setIsError(false);

    const result = await updateProfile({
      name,
      age: Number(age),
      height: Number(height),
      heightUnit,
      currentWeight: Number(currentWeight),
      targetWeight: Number(targetWeight),
      weightUnit,
      primaryGoal: goal
    });

    if (result.success) {
      setStatusMsg('Saved Successfully!');
      setTimeout(() => setStatusMsg(''), 3000);
    } else {
      setIsError(true);
      setStatusMsg(result.message);
    }
  };

  return (
    <div className="page-wrapper animate-fade-in profile-layout">
      <div className="profile-sidebar glass-panel">
        <div className="profile-avatar">
          <UserIcon size={48} color="var(--text-main)" />
        </div>
        <h2 className="profile-name">{name}</h2>
        <p className="text-muted text-center mb-4">{user?.email}</p>
        
        <div className="profile-stats">
           <div className="stat-block">
             <span className="stat-value">{currentWeight || '---'}</span>
             <span className="text-muted">{weightUnit}</span>
           </div>
           <div className="stat-divider"></div>
           <div className="stat-block">
             <span className="stat-value">{height || '---'}</span>
             <span className="text-muted">{heightUnit}</span>
           </div>
        </div>
      </div>

      <div className="profile-content glass-panel">
        <div className="tracker-header mb-4">
          <Settings color="var(--accent-primary)" size={28} />
          <h2>Profile & Goals</h2>
        </div>

        {statusMsg && (
          <div className="mb-4 text-center p-3 rounded" style={{ backgroundColor: isError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)', color: isError ? '#ef4444' : '#10b981', border: `1px solid ${isError ? '#ef4444' : '#10b981'}` }}>
             {statusMsg}
          </div>
        )}

        <form onSubmit={handleSave} className="profile-form">
          <h3 className="section-title">Personal Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" className="input-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input type="number" className="input-control" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group relative w-full">
              <label>Height</label>
              <div className="flex" style={{display: 'flex', gap: '10px'}}>
                <input type="number" step="0.1" className="input-control" style={{flex: 1}} value={height} onChange={(e) => setHeight(e.target.value)} required />
                <select className="input-control w-24" style={{width: '90px'}} value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
                   <option value="cm">cm</option>
                   <option value="ft">ft</option>
                </select>
              </div>
            </div>
          </div>

          <h3 className="section-title mt-4">Fitness Objectives</h3>
          
          <div className="form-row">
            <div className="form-group relative">
               <label>Primary Goal</label>
               <div className="goal-input-wrapper">
                 <Target className="input-icon-goal" size={18} color="var(--text-muted)" />
                 <select className="input-control select-control" value={goal} onChange={(e) => setGoal(e.target.value)}>
                   <option>Weight Loss</option>
                   <option>Muscle Gain</option>
                   <option>Maintenance</option>
                   <option>General Fitness</option>
                 </select>
               </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group relative">
              <label>Current Weight</label>
              <div className="flex" style={{display: 'flex', gap: '10px'}}>
                 <input type="number" step="0.1" className="input-control" style={{flex: 1}} value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} required />
                 <select className="input-control" style={{width: '90px'}} value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
                   <option value="lbs">lbs</option>
                   <option value="kg">kg</option>
                </select>
              </div>
            </div>
            <div className="form-group relative">
              <label>Target Weight</label>
              <div className="flex" style={{display: 'flex', gap: '10px'}}>
                 <input type="number" step="0.1" className="input-control" style={{flex: 1}} value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)} required />
                 <select className="input-control" style={{width: '90px'}} value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
                   <option value="lbs">lbs</option>
                   <option value="kg">kg</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
