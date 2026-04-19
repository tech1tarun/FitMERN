import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import './App.css';

// Components
import { Navbar } from './components/navbar.jsx';

// Pages
import { Landing } from './pages/Landing.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { WorkoutLog } from './pages/WorkoutLog.jsx';
import { DietLog } from './pages/DietLog.jsx';
import { Profile } from './pages/Profile.jsx';
import { Analytics } from './pages/Analytics.jsx';

// Context
import { AuthContext } from './context/AuthContext.jsx';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/workouts" element={user ? <WorkoutLog /> : <Navigate to="/login" />} />
          <Route path="/diet" element={user ? <DietLog /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
