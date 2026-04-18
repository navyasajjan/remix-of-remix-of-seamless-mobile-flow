import React from 'react';
import { useAppState } from '../context/AppState';

export const VerifyScreen = () => {
  const { setScreen, toast } = useAppState();

  const goToDashboard = () => {
    setScreen('dashboard');
    toast('🚀 Welcome to your CDC dashboard!', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: 'linear-gradient(180deg, hsl(250,65%,58%) 0%, hsl(250,40%,96%) 35%, hsl(220,25%,97%) 100%)' }}>
      <div className="bg-white rounded-3xl p-6 max-w-[440px] w-full shadow-xl border border-white/50 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl animate-pop-in bg-gradient-to-br from-primary to-[hsl(280,60%,55%)] shadow-lg">
          🎉
        </div>
        <h1 className="font-display text-xl font-extrabold text-foreground mb-1.5">Application Submitted!</h1>
        <p className="text-[12.5px] text-muted-foreground font-semibold leading-relaxed mb-5">Your CDC is under compliance review. Dashboard activated within 2–3 working days.</p>

        <div className="border border-border rounded-2xl p-4 mb-4 text-left bg-muted/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-display font-extrabold text-foreground">Verification Progress</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-600">Under Review</span>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { icon: '✅', label: 'Account Created & OTP Verified', tag: 'Done', state: 'done' },
              { icon: '📁', label: 'Documents Submitted', tag: 'Done', state: 'done' },
              { icon: '🔍', label: 'Compliance Team Review', tag: 'In progress', state: 'active' },
              { icon: '✨', label: 'Verified CDC Badge Issued', tag: 'Pending', state: 'pending' },
              { icon: '🚀', label: 'CDC Goes Live on Marketplace', tag: 'Pending', state: 'pending' },
            ].map((step, i) => (
              <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl ${step.state === 'done' ? 'bg-emerald-50 border border-emerald-100' : step.state === 'active' ? 'bg-violet-50 border border-violet-100' : 'bg-muted border border-border'}`}>
                <span className="text-sm">{step.icon}</span>
                <span className={`flex-1 text-[11.5px] font-bold ${step.state === 'done' ? 'text-emerald-600' : step.state === 'active' ? 'text-primary' : 'text-muted-foreground'}`}>{step.label}</span>
                <span className={`text-[10px] font-extrabold ${step.state === 'done' ? 'text-emerald-500' : step.state === 'active' ? 'text-primary' : 'text-muted-foreground'}`}>{step.tag}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-xl p-4 mb-4 text-left border border-primary/10">
          <p className="text-[11px] font-extrabold text-foreground mb-2 flex items-center gap-1.5">⏳ What happens next?</p>
          <div className="flex flex-col gap-2">
            {['Compliance team reviews documents (1–2 days)', 'You receive email with full dashboard access', 'Add therapists, set availability, configure services', 'CDC goes live on ManoSetu marketplace 🚀'].map((text, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px] font-semibold text-muted-foreground">
                <div className="w-5 h-5 rounded-lg bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={goToDashboard} className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white px-6 py-3.5 rounded-xl text-[13.5px] font-extrabold shadow-lg active:scale-[0.98] transition-transform">
          Open My Dashboard →
        </button>
        <p className="mt-3 text-[11px] font-bold text-muted-foreground">Questions? Email <span className="text-primary font-extrabold">cdc@manosetu.in</span></p>
      </div>
    </div>
  );
};
