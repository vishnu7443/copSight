import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';
import { Navbar } from './components/common/Navbar';
import { HeaderTicker } from './components/common/HeaderTicker';
import { Sidebar } from './components/common/Sidebar';
import { PitchModal } from './components/common/PitchModal';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AIAgentConsolePage } from './pages/AIAgentConsolePage';
import { IncidentsPage } from './pages/IncidentsPage';
import { AIMapPage } from './pages/AIMapPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AuditPage } from './pages/AuditPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { CommandCenterMode } from './pages/CommandCenterMode';

const AppContent: React.FC = () => {
  const { token, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showPitchModal, setShowPitchModal] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-amber-400 font-extrabold text-sm font-poppins">
        Initializing KSP-CopSight Secure Portal...
      </div>
    );
  }

  if (!token) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Navbar onOpenPitchModal={() => setShowPitchModal(true)} />
      <HeaderTicker />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          {activeTab === 'dashboard' && <DashboardPage />}
          {activeTab === 'command-center' && <CommandCenterMode />}
          {activeTab === 'ai-agent' && <AIAgentConsolePage />}
          {activeTab === 'workspace' && <WorkspacePage />}
          {activeTab === 'ai-map' && <AIMapPage />}
          {activeTab === 'incidents' && <IncidentsPage />}
          {activeTab === 'analytics' && <AnalyticsPage />}
          {activeTab === 'audit' && <AuditPage />}
        </main>
      </div>

      {/* Global Standalone Pitch Modal */}
      {showPitchModal && <PitchModal onClose={() => setShowPitchModal(false)} />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <AppContent />
      </WebSocketProvider>
    </AuthProvider>
  );
};

export default App;
