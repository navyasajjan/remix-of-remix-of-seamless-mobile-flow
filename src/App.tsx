import React from 'react';
import { AppProvider, useAppState } from './context/AppState';
import { SplashScreen } from './screens/SplashScreen';
import { AuthScreen } from './screens/AuthScreen';
import { OnboardingWizard } from './screens/OnboardingWizard';
import { VerifyScreen } from './screens/VerifyScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { AdminDashboard } from './screens/AdminDashboard';
import { ReceptionDashboard } from './screens/ReceptionDashboard';
import { Toast } from './components/Toast';

const AppContent = () => {
  const { screen, setScreen } = useAppState();
  return (
    <>
      {screen === 'splash' && <SplashScreen onFinish={() => setScreen('auth')} />}
      {screen === 'auth' && <AuthScreen />}
      {screen === 'verify' && <VerifyScreen />}
      {screen === 'dashboard' && <DashboardScreen />}
      {screen === 'admin' && <AdminDashboard />}
      {screen === 'reception' && <ReceptionDashboard />}
      <OnboardingWizard />
      <Toast />
    </>
  );
};

const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
