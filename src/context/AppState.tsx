import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Role = 'partner' | 'admin' | 'reception';
type Screen = 'splash' | 'auth' | 'verify' | 'dashboard' | 'admin' | 'reception';
type DashPanel = 'overview' | 'appointments' | 'soap' | 'therapists' | 'patients' | 'revenue' | 'invoices' | 'profile' | 'availability';

interface AppState {
  screen: Screen;
  setScreen: (s: Screen) => void;
  role: Role;
  setRole: (r: Role) => void;
  dashPanel: DashPanel;
  setDashPanel: (p: DashPanel) => void;
  wizardOpen: boolean;
  setWizardOpen: (b: boolean) => void;
  uploadedDocs: Set<string>;
  addDoc: (id: string) => void;
  selectedPlan: string;
  setSelectedPlan: (p: string) => void;
  toast: (msg: string, type?: 'info' | 'success' | 'error') => void;
  toastData: { msg: string; type: string; visible: boolean };
}

const AppContext = createContext<AppState>({} as AppState);
export const useAppState = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [screen, setScreen] = useState<Screen>('splash');
  const [role, setRole] = useState<Role>('partner');
  const [dashPanel, setDashPanel] = useState<DashPanel>('overview');
  const [wizardOpen, setWizardOpen] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<Set<string>>(new Set());
  const [selectedPlan, setSelectedPlan] = useState('growth');
  const [toastData, setToastData] = useState({ msg: '', type: 'info', visible: false });

  const addDoc = useCallback((id: string) => {
    setUploadedDocs(prev => new Set(prev).add(id));
  }, []);

  const toast = useCallback((msg: string, type: 'info' | 'success' | 'error' = 'info') => {
    setToastData({ msg, type, visible: true });
    setTimeout(() => setToastData(prev => ({ ...prev, visible: false })), 3200);
  }, []);

  return (
    <AppContext.Provider value={{
      screen, setScreen, role, setRole, dashPanel, setDashPanel,
      wizardOpen, setWizardOpen, uploadedDocs, addDoc,
      selectedPlan, setSelectedPlan, toast, toastData
    }}>
      {children}
    </AppContext.Provider>
  );
};
