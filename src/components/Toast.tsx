import React from 'react';
import { useAppState } from '../context/AppState';

export const Toast = () => {
  const { toastData } = useAppState();
  const icon = toastData.type === 'success' ? '✅' : toastData.type === 'error' ? '❌' : 'ℹ️';

  return (
    <div className={`fixed bottom-20 left-4 right-4 z-[9999] bg-ms-dark text-primary-foreground px-4 py-3 rounded-xl text-[13px] font-bold flex items-center gap-2.5 shadow-xl transition-all duration-300 max-w-[360px] mx-auto ${toastData.visible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
      <span className="text-[17px] shrink-0">{icon}</span>
      <span>{toastData.msg}</span>
    </div>
  );
};
