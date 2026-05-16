import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import MainLayout from './components/MainLayout';
import LandingPage from './components/LandingPage';
import FeedView from './components/FeedView';
import ReferralHub from './components/ReferralHub';
import Leaderboard from './components/Leaderboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import type { DashboardTab } from './types/community';

function ProtectedDashboard() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>('feed');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'feed' && <FeedView />}
      {activeTab === 'referrals' && <ReferralHub />}
      {activeTab === 'leaderboard' && <Leaderboard />}
    </MainLayout>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<ProtectedDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
