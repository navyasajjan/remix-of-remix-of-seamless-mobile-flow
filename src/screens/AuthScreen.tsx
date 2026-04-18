import React, { useState, useRef } from 'react';
import { useAppState } from '../context/AppState';

export const AuthScreen = () => {
  const { setScreen, setWizardOpen, setRole, toast } = useAppState();
  const [emailInput, setEmailInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const [tab, setTab] = useState<'login' | 'reg'>('login');
  const [loginPhase, setLoginPhase] = useState<1 | 2>(1);
  const [regPhase, setRegPhase] = useState<1 | 2>(1);
  const [phone, setPhone] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showRegPw, setShowRegPw] = useState(false);
  const [timer, setTimer] = useState(30);
  const timerRef = useRef<NodeJS.Timeout>();

  const startTimer = () => {
    let s = 30;
    setTimer(s);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      s--;
      setTimer(s);
      if (s <= 0) clearInterval(timerRef.current);
    }, 1000);
  };

  const otpInputs = (count: number) => {
    const refs = useRef<(HTMLInputElement | null)[]>([]);
    return (
      <div className="flex gap-2.5">
        {Array.from({ length: count }).map((_, i) => (
          <input
            key={i}
            ref={el => refs.current[i] = el}
            className="flex-1 p-3.5 border-2 border-border rounded-xl text-[21px] font-black text-foreground text-center outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
            maxLength={1}
            inputMode="numeric"
            onChange={(e) => {
              if (e.target.value.length === 1 && i < count - 1) {
                refs.current[i + 1]?.focus();
              }
            }}
          />
        ))}
      </div>
    );
  };

  const doLogin = () => {
    toast('Signing in…', 'info');
    const email = emailInput.toLowerCase().trim();
    setTimeout(() => {
      if (email.startsWith('admin')) {
        setRole('admin');
        setScreen('admin');
        toast('🛡️ Welcome, CDC Admin!', 'success');
      } else if (email.startsWith('recept') || email.startsWith('reception') || email.startsWith('rd')) {
        setRole('reception');
        setScreen('reception');
        toast('👋 Welcome, Reception Team!', 'success');
      } else {
        setRole('partner');
        setScreen('dashboard');
        toast('🎉 Welcome back, BrightMinds CDC!', 'success');
      }
    }, 1100);
  };

  const sendLoginOTP = () => {
    if (phone.length < 10) { toast('Please enter a valid 10-digit number', 'error'); return; }
    setLoginPhase(2);
    startTimer();
    toast('📲 OTP sent to +91 ' + phone, 'success');
  };

  const sendRegOTP = () => {
    if (regPhone.length < 10) { toast('Please enter a valid 10-digit number', 'error'); return; }
    if (!agreed) { toast('Please agree to the Terms of Service', 'error'); return; }
    setRegPhase(2);
    toast('📲 OTP sent to +91 ' + regPhone, 'success');
  };

  const verifyRegOTP = () => {
    toast('✅ Verified! Starting setup wizard…', 'success');
    setTimeout(() => setWizardOpen(true), 500);
  };

  const inputClass = "w-full px-3.5 py-3 border-2 border-border rounded-xl text-[13.5px] font-semibold text-foreground bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(180deg, hsl(250,65%,58%) 0%, hsl(250,40%,96%) 35%, hsl(220,25%,97%) 100%)' }}>
      <div className="w-full max-w-[420px]">
        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(280,60%,55%)] flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-black font-display">M</span>
            </div>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-white mb-1">ManoSetu</h1>
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 text-[10px] font-extrabold text-white/80 tracking-wider uppercase">
            ⚕ CDC Partner Portal
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-white/50 overflow-hidden">
          {/* Tabs */}
          <div className="flex bg-muted/50 p-1.5 mx-4 mt-4 rounded-xl gap-1">
            <button onClick={() => setTab('login')} className={`flex-1 py-2.5 px-2 rounded-lg text-[12px] font-extrabold transition-all ${tab === 'login' ? 'bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white shadow-md' : 'text-muted-foreground'}`}>
              CDC Login
            </button>
            <button onClick={() => setTab('reg')} className={`flex-1 py-2.5 px-2 rounded-lg text-[12px] font-extrabold transition-all ${tab === 'reg' ? 'bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white shadow-md' : 'text-muted-foreground'}`}>
              New CDC
            </button>
          </div>

          <div className="p-5">
            {/* LOGIN */}
            {tab === 'login' && (
              <div className="animate-fade-in">
                {loginPhase === 1 ? (
                  <>
                    <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1 text-[11px] font-extrabold text-emerald-600 mb-3">
                      👋 Welcome back, partner
                    </div>
                    <h2 className="text-lg font-display font-extrabold text-foreground mb-0.5">Sign in to your CDC</h2>
                    <p className="text-[12px] text-muted-foreground font-semibold mb-4">Access your dashboard, appointments & reports</p>

                    <div className="mb-3.5">
                      <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider flex items-center gap-1 mb-1.5">
                        Mobile Number <span className="text-destructive">*</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="px-3 py-3 border-2 border-border rounded-xl text-[13px] font-bold text-foreground bg-muted/30 flex items-center gap-1 shrink-0">🇮🇳 +91</div>
                        <input className={inputClass} type="tel" placeholder="98765 43210" maxLength={10} value={phone} onChange={e => setPhone(e.target.value)} />
                      </div>
                      <p className="text-[10px] text-muted-foreground font-semibold mt-1">You'll receive a 4-digit OTP</p>
                    </div>

                    <div className="flex items-center gap-2.5 my-3 text-muted-foreground text-[11px] font-bold">
                      <div className="flex-1 h-px bg-border" />or<div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="mb-3">
                      <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">Email</label>
                      <input className={inputClass} type="email" placeholder="admin@ / recept@ / partner@" value={emailInput} onChange={e => setEmailInput(e.target.value)} />
                      <p className="text-[10px] text-muted-foreground font-semibold mt-1">Try <strong className="text-primary">admin@</strong>, <strong className="text-primary">recept@</strong>, or any other email</p>
                    </div>

                    <div className="mb-3">
                      <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">Password</label>
                      <div className="relative">
                        <input className={inputClass + " pr-10"} type={showPw ? 'text' : 'password'} placeholder="Your password" value={pwInput} onChange={e => setPwInput(e.target.value)} />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground" onClick={() => setShowPw(!showPw)}>{showPw ? '🙈' : '👁'}</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <label className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground cursor-pointer">
                        <input type="checkbox" className="accent-primary rounded" /> Remember me
                      </label>
                      <a className="text-[11px] font-extrabold text-primary">Forgot?</a>
                    </div>

                    <button onClick={doLogin} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white font-extrabold text-[13px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-lg">
                      Sign In →
                    </button>

                    <div className="flex items-center gap-2.5 my-3 text-muted-foreground text-[11px] font-bold">
                      <div className="flex-1 h-px bg-border" />quick access<div className="flex-1 h-px bg-border" />
                    </div>

                    <button onClick={sendLoginOTP} className="w-full py-3 rounded-xl bg-primary/5 text-primary border-2 border-primary/20 font-extrabold text-[12.5px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
                      📱 Login via OTP
                    </button>
                  </>
                ) : (
                  <>
                    <div className="bg-violet-50 border border-violet-100 rounded-xl p-3 text-[12px] font-semibold text-muted-foreground flex items-center gap-2 mb-4">
                      📲 OTP sent to <strong className="text-primary ml-1">+91 {phone}</strong>
                    </div>
                    <div className="mb-4">
                      <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider flex items-center gap-1 mb-2">
                        Enter 4-digit OTP <span className="text-destructive">*</span>
                      </label>
                      {otpInputs(4)}
                    </div>
                    <div className="text-center text-[12px] font-bold text-muted-foreground mb-3">
                      {timer > 0 ? <>Resend in <strong className="text-foreground">{timer}s</strong></> : <span className="text-primary font-extrabold cursor-pointer" onClick={() => { startTimer(); toast('📱 OTP resent!', 'info'); }}>Resend OTP</span>}
                    </div>
                    <button onClick={doLogin} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white font-extrabold text-[13px] flex items-center justify-center gap-2 shadow-lg">
                      Verify & Sign In →
                    </button>
                    <div className="text-center mt-3">
                      <span className="text-[12px] font-extrabold text-primary cursor-pointer" onClick={() => setLoginPhase(1)}>← Change number</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* REGISTER */}
            {tab === 'reg' && (
              <div className="animate-fade-in">
                {regPhase === 1 ? (
                  <>
                    <h2 className="text-lg font-display font-extrabold text-foreground mb-0.5">Register your CDC</h2>
                    <p className="text-[12px] text-muted-foreground font-semibold mb-4">Join India's largest child development network</p>

                    <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-primary/10 rounded-xl p-3 flex gap-2.5 items-start mb-4">
                      <span className="text-base shrink-0">ℹ️</span>
                      <span className="text-[11px] font-semibold text-muted-foreground leading-relaxed">Complete a <strong className="text-primary font-extrabold">5-step wizard</strong> after registration. Documents reviewed in <strong className="text-primary font-extrabold">2–3 days</strong>.</span>
                    </div>

                    <div className="mb-3">
                      <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">CDC Name <span className="text-destructive">*</span></label>
                      <input className={inputClass} placeholder="e.g. BrightMinds CDC" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 mb-3">
                      <div>
                        <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">Contact Person <span className="text-destructive">*</span></label>
                        <input className={inputClass} placeholder="Dr. Ramesh Kumar" />
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">Designation <span className="text-destructive">*</span></label>
                        <select className={inputClass + " appearance-none"}>
                          <option value="">Select role</option>
                          <option>Director / Owner</option><option>Centre Head</option><option>Medical Director</option><option>Admin Manager</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">Mobile <span className="text-destructive">*</span></label>
                      <div className="flex gap-2">
                        <div className="px-3 py-3 border-2 border-border rounded-xl text-[13px] font-bold text-foreground bg-muted/30 flex items-center gap-1 shrink-0">🇮🇳 +91</div>
                        <input className={inputClass} type="tel" placeholder="98765 43210" maxLength={10} value={regPhone} onChange={e => setRegPhone(e.target.value)} />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">Email <span className="text-destructive">*</span></label>
                      <input className={inputClass} type="email" placeholder="admin@brightminds.in" />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 mb-3">
                      <div>
                        <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">City <span className="text-destructive">*</span></label>
                        <select className={inputClass + " appearance-none"}>
                          <option value="">Select</option><option>Hyderabad</option><option>Bangalore</option><option>Chennai</option><option>Mumbai</option><option>Delhi NCR</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">State <span className="text-destructive">*</span></label>
                        <select className={inputClass + " appearance-none"}>
                          <option value="">Select</option><option>Telangana</option><option>Karnataka</option><option>Tamil Nadu</option><option>Maharashtra</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">Password <span className="text-destructive">*</span></label>
                      <div className="relative">
                        <input className={inputClass + " pr-10"} type={showRegPw ? 'text' : 'password'} placeholder="Min 8 chars, 1 number" />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground" onClick={() => setShowRegPw(!showRegPw)}>{showRegPw ? '🙈' : '👁'}</button>
                      </div>
                    </div>

                    <div className="flex gap-2 items-start my-3">
                      <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-4 h-4 accent-primary shrink-0 mt-0.5 cursor-pointer rounded" />
                      <label className="text-[11px] text-muted-foreground font-semibold leading-relaxed cursor-pointer" onClick={() => setAgreed(!agreed)}>
                        I agree to ManoSetu's <span className="text-primary font-extrabold">Terms</span>, <span className="text-primary font-extrabold">Privacy</span>, and <span className="text-primary font-extrabold">CDC Partner Agreement</span>.
                      </label>
                    </div>

                    <button onClick={sendRegOTP} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white font-extrabold text-[13px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-lg">
                      Continue — Verify OTP →
                    </button>
                  </>
                ) : (
                  <>
                    <div className="bg-violet-50 border border-violet-100 rounded-xl p-3 text-[12px] font-semibold text-muted-foreground flex items-center gap-2 mb-4">
                      📲 OTP sent to <strong className="text-primary ml-1">+91 {regPhone}</strong>
                    </div>
                    <div className="mb-4">
                      <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2 block">Enter 4-digit OTP <span className="text-destructive">*</span></label>
                      {otpInputs(4)}
                    </div>
                    <div className="text-center text-[12px] font-bold text-muted-foreground mb-3">
                      Resend OTP in <strong className="text-foreground">30s</strong>
                    </div>
                    <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-primary/10 rounded-xl p-3 text-[11px] font-semibold text-muted-foreground leading-relaxed mb-3.5">
                      ✅ After verification, you'll complete a <strong className="text-primary">5-step setup wizard</strong> to go live on the marketplace.
                    </div>
                    <button onClick={verifyRegOTP} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white font-extrabold text-[13px] flex items-center justify-center gap-2 shadow-lg">
                      Verify & Continue →
                    </button>
                    <div className="text-center mt-3">
                      <span className="text-[12px] font-extrabold text-primary cursor-pointer" onClick={() => setRegPhase(1)}>← Change number</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
