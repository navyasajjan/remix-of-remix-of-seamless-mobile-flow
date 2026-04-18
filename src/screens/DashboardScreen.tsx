import React, { useState } from 'react';
import { useAppState } from '../context/AppState';

const appointments = [
  { time: '10:00', name: 'Arjun Mehta', age: '4y', detail: 'Dr. Priya · #12', badge: 'Speech', color: 'from-violet-500 to-blue-500', live: true, avatar: '👦' },
  { time: '11:00', name: 'Kavya Reddy', age: '6y', detail: 'Dr. Anand · #8', badge: 'OT', color: 'from-teal-400 to-emerald-500', live: false, avatar: '👧' },
  { time: '11:30', name: 'Rohan Gupta', age: '5y', detail: 'Dr. Meena · #3', badge: 'Behaviour', color: 'from-rose-400 to-pink-500', live: false, avatar: '👦' },
  { time: '12:00', name: 'Sneha Patel', age: '7y', detail: 'Dr. Priya · #18', badge: 'Physio', color: 'from-amber-400 to-orange-500', live: false, avatar: '👧' },
  { time: '02:00', name: 'Dev Sharma', age: '3y', detail: 'Dr. Anand · #1', badge: 'Speech', color: 'from-violet-500 to-blue-500', live: false, avatar: '👦' },
];

const navItems = [
  { id: 'overview', icon: '🏠', label: 'Home' },
  { id: 'appointments', icon: '📅', label: 'Appts' },
  { id: 'soap', icon: '📝', label: 'SOAP' },
  { id: 'patients', icon: '👶', label: 'Patients' },
  { id: 'more', icon: '⚡', label: 'More' },
];

const moreItems = [
  { id: 'therapists', icon: '👨‍⚕️', label: 'Therapists' },
  { id: 'revenue', icon: '💰', label: 'Revenue' },
  { id: 'invoices', icon: '🧾', label: 'Invoices' },
  { id: 'profile', icon: '🏥', label: 'Profile' },
  { id: 'availability', icon: '🗓️', label: 'Schedule' },
];

const soapResponses = [
  "Based on session data: Suggest 10-min daily PECS Phase II practice. Target: child initiates 5 requests per day.",
  "Assessment note: 60% success on 2-step instructions indicates receptive language at ~28-30 month level.",
  "Home program: 1) Mirror play 5min 2) Bubbles for breath support 5min 3) 'More/stop' game 10min.",
];

export const DashboardScreen = () => {
  const { dashPanel, setDashPanel, setScreen, toast } = useAppState();
  const [showMore, setShowMore] = useState(false);
  const [soapAiMsg, setSoapAiMsg] = useState('Ask me to suggest assessment summaries or generate home programs.');
  const [soapInput, setSoapInput] = useState('');
  const [soapIdx, setSoapIdx] = useState(0);

  const handleNav = (id: string) => {
    if (id === 'more') { setShowMore(!showMore); return; }
    setShowMore(false);
    setDashPanel(id as any);
  };

  const soapAI = () => {
    if (!soapInput.trim()) { toast('Please type a question first', 'error'); return; }
    setSoapAiMsg('Thinking…');
    setTimeout(() => { setSoapAiMsg(soapResponses[soapIdx % soapResponses.length]); setSoapIdx(soapIdx + 1); setSoapInput(''); }, 900);
  };

  const activeNav = navItems.find(n => n.id === dashPanel) ? dashPanel : 'more';

  return (
    <div className="min-h-screen flex flex-col pb-20" style={{ background: 'linear-gradient(180deg, hsl(250,65%,58%) 0%, hsl(250,40%,96%) 28%, hsl(220,25%,97%) 100%)' }}>
      {/* Top bar — glass */}
      <div className="glass sticky top-0 z-20 px-4 py-3 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white text-xs font-black">M</span>
              </div>
              <div>
                <span className="font-display text-[15px] font-bold text-foreground">ManoSetu</span>
                <p className="text-[10px] font-semibold text-muted-foreground -mt-0.5">BrightMinds CDC ✓</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => toast('🔔 3 new notifications', 'info')} className="w-10 h-10 rounded-xl bg-white shadow-sm border border-border flex items-center justify-center text-base relative active:scale-95 transition-transform">
              🔔
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive ring-2 ring-white" />
            </button>
            <button onClick={() => { setScreen('auth'); toast('Logged out', 'info'); }} className="w-10 h-10 rounded-xl bg-white shadow-sm border border-border flex items-center justify-center text-base active:scale-95 transition-transform">
              👤
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        {dashPanel === 'overview' && (
          <div className="animate-fade-in">
            {/* Greeting card */}
            <div className="bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] rounded-2xl p-5 mb-5 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute right-8 bottom-2 w-16 h-16 rounded-full bg-white/5" />
              <p className="text-white/70 text-[11px] font-bold mb-1">Thu, 16 Apr 2026 · Hyderabad</p>
              <h2 className="text-xl font-display font-extrabold text-white mb-1">Good morning! 👋</h2>
              <p className="text-white/60 text-[12px] font-semibold">You have <span className="text-white font-bold">12 sessions</span> today</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: 'Sessions', value: '12', change: '+3', icon: '📅', gradient: 'from-violet-50 to-blue-50', accent: 'text-primary' },
                { label: 'Revenue', value: '₹1.8L', change: '+14%', icon: '💰', gradient: 'from-amber-50 to-orange-50', accent: 'text-secondary' },
                { label: 'Patients', value: '84', change: '+6', icon: '👶', gradient: 'from-teal-50 to-emerald-50', accent: 'text-accent' },
                { label: 'Rating', value: '4.8', change: '127', icon: '⭐', gradient: 'from-rose-50 to-pink-50', accent: 'text-[hsl(var(--ms-rose))]' },
              ].map(stat => (
                <div key={stat.label} className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-4 border border-white/60 shadow-sm relative overflow-hidden`}>
                  <span className="absolute -right-1 -bottom-1 text-[36px] opacity-10">{stat.icon}</span>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">{stat.label}</p>
                  <p className={`font-display text-[26px] font-extrabold ${stat.accent} leading-none`}>{stat.value}</p>
                  <p className="text-[11px] font-bold text-emerald-500 mt-1">↑ {stat.change}</p>
                </div>
              ))}
            </div>

            {/* Today's Queue */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-display font-extrabold text-foreground">Today's Queue</h3>
                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">7 left</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {appointments.slice(0, 4).map((appt, i) => (
                  <div key={i} className={`bg-white rounded-2xl p-3.5 border shadow-sm flex items-center gap-3 relative ${appt.live ? 'border-emerald-200 ring-1 ring-emerald-100' : 'border-border'}`}>
                    {appt.live && <span className="absolute -top-2 right-3 text-[8px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full tracking-wide">● LIVE</span>}
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${appt.color} flex items-center justify-center text-lg shadow-sm shrink-0`}>{appt.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-extrabold text-foreground truncate">{appt.name}, {appt.age}</p>
                      <p className="text-[11px] font-semibold text-muted-foreground truncate">{appt.detail}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[10px] font-bold text-muted-foreground">{appt.time}</span>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-gradient-to-r ${appt.color} text-white`}>{appt.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-display font-extrabold text-foreground">Notifications</h3>
                <span className="text-[10px] font-bold bg-destructive/10 text-destructive px-2.5 py-1 rounded-full">3 new</span>
              </div>
              {[
                { icon: '📅', text: 'Arjun rescheduled to 10 AM', time: '2m ago', color: 'bg-violet-100' },
                { icon: '💳', text: 'Payment ₹2,500 from Kavya', time: '18m ago', color: 'bg-emerald-100' },
                { icon: '📊', text: 'March analytics ready', time: '1h ago', color: 'bg-blue-100' },
              ].map((n, i) => (
                <div key={i} className="bg-white rounded-xl p-3 border border-border shadow-sm mb-2 last:mb-0 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${n.color} flex items-center justify-center text-base shrink-0`}>{n.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-foreground truncate">{n.text}</p>
                    <p className="text-[10px] font-semibold text-muted-foreground">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Therapist Utilisation */}
            <div className="bg-white rounded-2xl p-4 border border-border shadow-sm">
              <h3 className="text-[14px] font-display font-extrabold text-foreground mb-3">Team Performance</h3>
              {[
                { name: 'Dr. Priya', pct: 92, color: 'from-violet-500 to-blue-500' },
                { name: 'Dr. Anand', pct: 78, color: 'from-teal-400 to-emerald-500' },
                { name: 'Dr. Meena', pct: 65, color: 'from-amber-400 to-orange-500' },
                { name: 'Dr. Srikanth', pct: 55, color: 'from-rose-400 to-pink-500' },
              ].map(t => (
                <div key={t.name} className="mb-3.5 last:mb-0">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[12px] font-bold text-muted-foreground">{t.name}</span>
                    <span className="text-[12px] font-extrabold text-foreground">{t.pct}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${t.color} rounded-full transition-all`} style={{ width: `${t.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {dashPanel === 'appointments' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-display font-extrabold text-foreground">Appointments</h2>
                <p className="text-[11px] text-muted-foreground font-semibold">Thu, 16 April 2026</p>
              </div>
              <button onClick={() => toast('📅 New appointment...', 'info')} className="px-4 py-2.5 bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white rounded-xl text-[11px] font-extrabold shadow-md active:scale-95 transition-transform">+ New</button>
            </div>
            <div className="flex flex-col gap-2.5">
              {appointments.map((appt, i) => (
                <div key={i} className={`bg-white rounded-2xl p-3.5 border shadow-sm flex items-center gap-3 relative ${appt.live ? 'border-emerald-200 ring-1 ring-emerald-100' : 'border-border'}`}>
                  {appt.live && <span className="absolute -top-2 right-3 text-[8px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full tracking-wide">● LIVE</span>}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${appt.color} flex items-center justify-center text-lg shadow-sm shrink-0`}>{appt.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-extrabold text-foreground truncate">{appt.name}, {appt.age}</p>
                    <p className="text-[11px] font-semibold text-muted-foreground truncate">{appt.detail}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] font-bold text-muted-foreground">{appt.time}</span>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-gradient-to-r ${appt.color} text-white`}>{appt.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {dashPanel === 'soap' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-display font-extrabold text-foreground">SOAP Notes</h2>
                <p className="text-[11px] text-muted-foreground font-semibold">AI-assisted documentation</p>
              </div>
              <button onClick={() => toast('💾 Saved!', 'success')} className="px-4 py-2.5 bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white rounded-xl text-[11px] font-extrabold shadow-md active:scale-95 transition-transform">Save</button>
            </div>

            {/* Patient card */}
            <div className="bg-white rounded-2xl p-4 border border-border shadow-sm mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xl shadow-sm shrink-0">👦</div>
                <div>
                  <p className="text-[14px] font-extrabold text-foreground">Arjun Mehta</p>
                  <p className="text-[11px] font-semibold text-muted-foreground">4yrs · ASD · Speech · Session #12</p>
                  <p className="text-[11px] font-bold text-primary mt-0.5">Dr. Priya Sharma</p>
                </div>
              </div>
            </div>

            {/* SOAP fields */}
            <div className="bg-white rounded-2xl p-4 border border-border shadow-sm mb-3">
              {[
                { label: 'S — Subjective', val: 'Parent reports 3 new words this week. Eye contact 4-5 times.', color: 'bg-violet-100 text-primary' },
                { label: 'O — Objective', val: '2-step instructions 6/10 (60%). 12 spontaneous vocalisations.', color: 'bg-blue-100 text-blue-600' },
                { label: 'A — Assessment', val: 'Steady progress. Below age-appropriate but positive trajectory.', color: 'bg-amber-100 text-amber-600' },
                { label: 'P — Plan', val: 'Continue PECS Phase II. Home: 10min daily labelling.', color: 'bg-emerald-100 text-emerald-600' },
              ].map(f => (
                <div key={f.label} className="mb-4 last:mb-0">
                  <span className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 ${f.color}`}>{f.label}</span>
                  <textarea className="w-full p-3 bg-muted/50 border border-border rounded-xl text-[12.5px] font-semibold text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y min-h-[56px] transition-all" defaultValue={f.val} />
                </div>
              ))}
            </div>

            {/* AI Assistant */}
            <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-primary/15 rounded-2xl p-4 mb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-[hsl(280,60%,55%)] flex items-center justify-center">
                  <span className="text-white text-xs">🤖</span>
                </div>
                <span className="text-[12px] font-extrabold text-primary">AI SOAP Assistant</span>
              </div>
              <p className="text-[12px] font-semibold text-muted-foreground leading-relaxed mb-3">{soapAiMsg}</p>
              <div className="flex gap-2">
                <input className="flex-1 px-3.5 py-2.5 bg-white border border-border rounded-xl text-[12.5px] font-semibold text-foreground outline-none focus:border-primary placeholder:text-muted-foreground/50 shadow-sm" placeholder="Ask AI anything..." value={soapInput} onChange={e => setSoapInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && soapAI()} />
                <button onClick={soapAI} className="px-4 py-2.5 bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white rounded-xl text-[12px] font-extrabold shrink-0 shadow-md active:scale-95 transition-transform">Ask →</button>
              </div>
            </div>
          </div>
        )}

        {dashPanel === 'patients' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-display font-extrabold text-foreground">Patients</h2>
                <p className="text-[11px] text-muted-foreground font-semibold">84 active patients</p>
              </div>
              <button onClick={() => toast('👶 New patient...', 'info')} className="px-4 py-2.5 bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white rounded-xl text-[11px] font-extrabold shadow-md active:scale-95 transition-transform">+ New</button>
            </div>
            {[
              { name: 'Arjun Mehta', age: '4yrs', cond: 'ASD', dr: 'Dr. Priya', sess: 12, next: 'Today 10AM', color: 'from-violet-500 to-blue-500', avatar: '👦' },
              { name: 'Kavya Reddy', age: '6yrs', cond: 'ADHD', dr: 'Dr. Anand', sess: 8, next: 'Today 11AM', color: 'from-teal-400 to-emerald-500', avatar: '👧' },
              { name: 'Rohan Gupta', age: '5yrs', cond: 'Dev. Delay', dr: 'Dr. Meena', sess: 3, next: 'Today 11:30', color: 'from-rose-400 to-pink-500', avatar: '👦' },
              { name: 'Sneha Patel', age: '7yrs', cond: 'CP', dr: 'Dr. Srikanth', sess: 18, next: 'Today 12PM', color: 'from-amber-400 to-orange-500', avatar: '👧' },
            ].map(p => (
              <div key={p.name} className="bg-white rounded-2xl p-4 border border-border shadow-sm mb-3 flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-lg shadow-sm shrink-0`}>{p.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-[13px] font-extrabold text-foreground truncate">{p.name}</p>
                    <span className="text-[9px] font-extrabold bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full shrink-0">{p.next}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-muted-foreground">{p.age} · {p.cond} · {p.dr}</p>
                  <p className="text-[10px] font-bold text-primary mt-0.5">{p.sess} sessions completed</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {dashPanel === 'therapists' && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-display font-extrabold text-foreground mb-4">Therapists</h2>
            {[
              { name: 'Dr. Priya Sharma', spec: 'Speech-Language', sessions: 847, rating: 4.9, status: 'online', avatar: '👩‍⚕️', color: 'from-violet-500 to-blue-500' },
              { name: 'Dr. Anand Rao', spec: 'Occupational Therapy', sessions: 612, rating: 4.8, status: 'busy', avatar: '👨‍⚕️', color: 'from-teal-400 to-emerald-500' },
              { name: 'Dr. Meena K', spec: 'Behaviour Therapy', sessions: 389, rating: 4.7, status: 'online', avatar: '👩‍⚕️', color: 'from-rose-400 to-pink-500' },
              { name: 'Dr. Srikanth V', spec: 'Physiotherapy', sessions: 215, rating: 4.8, status: 'offline', avatar: '👨‍⚕️', color: 'from-amber-400 to-orange-500' },
            ].map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-4 border border-border shadow-sm flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-lg shadow-sm`}>{t.avatar}</div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${t.status === 'online' ? 'bg-emerald-500' : t.status === 'busy' ? 'bg-amber-500' : 'bg-gray-300'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-extrabold text-foreground">{t.name}</p>
                  <p className="text-[11px] font-semibold text-muted-foreground truncate">{t.spec}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[13px] font-extrabold text-foreground">{t.sessions}</p>
                  <p className="text-[11px] font-bold text-amber-500">⭐ {t.rating}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {dashPanel === 'revenue' && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-display font-extrabold text-foreground mb-4">Revenue</h2>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { l: 'April', v: '₹1.8L', c: '↑ 14%', gradient: 'from-violet-50 to-blue-50', accent: 'text-primary' },
                { l: 'Sessions', v: '142', c: '↑ 18', gradient: 'from-teal-50 to-emerald-50', accent: 'text-accent' },
                { l: 'Avg Fee', v: '₹1,267', c: '↑ ₹120', gradient: 'from-amber-50 to-orange-50', accent: 'text-secondary' },
                { l: 'Pending', v: '₹28K', c: '3 inv.', gradient: 'from-rose-50 to-pink-50', accent: 'text-[hsl(var(--ms-rose))]' },
              ].map(s => (
                <div key={s.l} className={`bg-gradient-to-br ${s.gradient} rounded-2xl p-4 border border-white/60 shadow-sm`}>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">{s.l}</p>
                  <p className={`font-display text-xl font-extrabold ${s.accent} mb-1`}>{s.v}</p>
                  <p className="text-[11px] font-bold text-emerald-500">{s.c}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-4 border border-border shadow-sm">
              <span className="text-[14px] font-display font-extrabold text-foreground block mb-3">Revenue Trend</span>
              <div className="flex items-end gap-2 h-28 mb-2">
                {[{ m: 'Nov', v: 82 }, { m: 'Dec', v: 95 }, { m: 'Jan', v: 88 }, { m: 'Feb', v: 102 }, { m: 'Mar', v: 158 }, { m: 'Apr', v: 180 }].map(d => (
                  <div key={d.m} className="flex-1 flex flex-col items-center">
                    <div className={`w-full rounded-lg ${d.m === 'Apr' ? 'bg-gradient-to-t from-primary to-[hsl(280,60%,55%)]' : 'bg-primary/20'}`} style={{ height: `${Math.round(d.v / 180 * 90)}%` }} />
                    <span className="text-[9px] font-bold text-muted-foreground mt-1.5">{d.m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {dashPanel === 'invoices' && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-display font-extrabold text-foreground mb-4">Invoices</h2>
            {[
              { id: '#INV-0284', patient: 'Arjun Mehta', amount: '₹5,000', status: 'Paid', color: 'bg-emerald-100 text-emerald-600' },
              { id: '#INV-0283', patient: 'Kavya Reddy', amount: '₹4,800', status: 'Pending', color: 'bg-amber-100 text-amber-600' },
              { id: '#INV-0282', patient: 'Sneha Patel', amount: '₹4,000', status: 'Paid', color: 'bg-emerald-100 text-emerald-600' },
              { id: '#INV-0281', patient: 'Rohan Gupta', amount: '₹2,400', status: 'Overdue', color: 'bg-red-100 text-red-600' },
            ].map(inv => (
              <div key={inv.id} className="bg-white rounded-2xl p-4 border border-border shadow-sm mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-extrabold text-foreground">{inv.id}</span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${inv.color}`}>{inv.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] font-semibold text-muted-foreground">{inv.patient}</span>
                  <span className="text-[13px] font-extrabold text-foreground">{inv.amount}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {dashPanel === 'profile' && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-display font-extrabold text-foreground mb-4">CDC Profile</h2>
            <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
              {[['CDC Name', 'BrightMinds Child Development Centre'], ['Contact', '+91 98765 43210'], ['Website', 'https://brightminds-cdc.in']].map(([l, v]) => (
                <div key={l} className="mb-4">
                  <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">{l}</label>
                  <input className="w-full px-3.5 py-3 bg-muted/50 border border-border rounded-xl text-[13px] font-semibold text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" defaultValue={v} />
                </div>
              ))}
              <button onClick={() => toast('✅ Profile updated!', 'success')} className="w-full py-3 bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white rounded-xl text-[13px] font-extrabold shadow-md active:scale-95 transition-transform">Save Changes</button>
            </div>
          </div>
        )}

        {dashPanel === 'availability' && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-display font-extrabold text-foreground mb-4">Schedule</h2>
            <div className="bg-white rounded-2xl p-4 border border-border shadow-sm">
              <div className="grid grid-cols-6 gap-1.5">
                <div />
                {['M', 'T', 'W', 'T', 'F'].map(d => <div key={d} className="text-[10px] font-extrabold text-muted-foreground text-center py-1">{d}</div>)}
                <div className="text-[10px] font-bold text-muted-foreground py-2.5">9–12</div>
                {['Open', 'Open', 'Open', 'Booked', 'Open'].map((s, i) => (
                  <div key={i} className={`rounded-lg p-2 text-center text-[9px] font-extrabold ${s === 'Open' ? 'bg-emerald-100 text-emerald-600' : 'bg-violet-100 text-primary'}`}>{s}</div>
                ))}
                <div className="text-[10px] font-bold text-muted-foreground py-2.5">1–5</div>
                {['Booked', 'Off', 'Booked', 'Open', 'Booked'].map((s, i) => (
                  <div key={i} className={`rounded-lg p-2 text-center text-[9px] font-extrabold ${s === 'Open' ? 'bg-emerald-100 text-emerald-600' : s === 'Off' ? 'bg-red-100 text-red-500' : 'bg-violet-100 text-primary'}`}>{s}</div>
                ))}
              </div>
              <button onClick={() => toast('✅ Schedule saved!', 'success')} className="w-full py-3 bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white rounded-xl text-[13px] font-extrabold shadow-md mt-4 active:scale-95 transition-transform">Save Schedule</button>
            </div>
          </div>
        )}
      </div>

      {/* More overlay */}
      {showMore && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={() => setShowMore(false)}>
          <div className="absolute bottom-20 left-3 right-3 bg-white border border-border rounded-2xl p-4 shadow-xl animate-fade-in" onClick={e => e.stopPropagation()}>
            <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-3">More Options</p>
            <div className="grid grid-cols-3 gap-2.5">
              {moreItems.map(item => (
                <button key={item.id} onClick={() => handleNav(item.id)} className="flex flex-col items-center gap-1.5 p-3.5 rounded-xl bg-muted/50 border border-border active:scale-95 transition-transform hover:bg-primary/5">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[10px] font-extrabold text-muted-foreground">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom nav — glass */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/30 flex items-center justify-around px-2 py-2 z-30 safe-area-bottom">
        {navItems.map(item => (
          <button key={item.id} onClick={() => handleNav(item.id)} className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${activeNav === item.id ? 'bg-primary/10' : ''}`}>
            <span className={`text-lg transition-transform ${activeNav === item.id ? 'scale-110' : ''}`}>{item.icon}</span>
            <span className={`text-[9px] font-extrabold transition-colors ${activeNav === item.id ? 'text-primary' : 'text-muted-foreground'}`}>{item.label}</span>
            {activeNav === item.id && <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
          </button>
        ))}
      </div>
    </div>
  );
};
