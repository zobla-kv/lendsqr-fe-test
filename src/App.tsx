import './App.scss';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';

import ProtectedRoute from './guards/ProtectedRoute';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>

          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
