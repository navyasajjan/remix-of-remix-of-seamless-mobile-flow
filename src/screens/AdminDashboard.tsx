import React, { useState } from 'react';
import { useAppState } from '../context/AppState';

type Panel = 'home' | 'practitioners' | 'children' | 'appointments' | 'facilities' | 'reports' | 'staff' | 'finance';

const kpis = [
  { label: 'Total Revenue', value: '₹4.2L', sub: '+18% MoM', icon: '💰', tint: 'from-emerald-50 to-emerald-100/50', border: 'border-emerald-200', accent: 'text-emerald-700' },
  { label: 'Active Patients', value: '186', sub: '+12 this week', icon: '👥', tint: 'from-violet-50 to-violet-100/50', border: 'border-violet-200', accent: 'text-violet-700' },
  { label: 'Practitioners', value: '15', sub: '12 on duty', icon: '👨‍⚕️', tint: 'from-blue-50 to-blue-100/50', border: 'border-blue-200', accent: 'text-blue-700' },
  { label: 'Occupancy', value: '87%', sub: 'Avg this week', icon: '📊', tint: 'from-amber-50 to-amber-100/50', border: 'border-amber-200', accent: 'text-amber-700' },
  { label: 'Sessions Today', value: '28', sub: '18 completed', icon: '📅', tint: 'from-rose-50 to-rose-100/50', border: 'border-rose-200', accent: 'text-rose-700' },
  { label: 'Facility Usage', value: '75%', sub: 'Peak hours', icon: '🏥', tint: 'from-orange-50 to-orange-100/50', border: 'border-orange-200', accent: 'text-orange-700' },
];

const adminActions = [
  { id: 'add-prac', label: 'Add Practitioner', icon: '👨‍⚕️', grad: 'from-[hsl(250,65%,58%)] to-[hsl(280,60%,55%)]' },
  { id: 'add-room', label: 'Add Facility', icon: '🏥', grad: 'from-[hsl(212,80%,50%)] to-[hsl(212,80%,42%)]' },
  { id: 'staff', label: 'Manage Staff', icon: '👥', grad: 'from-[hsl(170,60%,45%)] to-[hsl(170,60%,38%)]' },
  { id: 'invoice', label: 'Generate Invoice', icon: '🧾', grad: 'from-[hsl(38,95%,55%)] to-[hsl(38,95%,45%)]' },
];

const alerts = [
  { msg: 'Dr. Sarah Chen running 15 mins late', sev: 'warn', icon: '⚠️' },
  { msg: 'Room 205 cleaning in progress', sev: 'info', icon: '🧹' },
  { msg: 'License renewal due — Dr. Brown (15 days)', sev: 'critical', icon: '🚨' },
  { msg: '3 new parent confirmations received', sev: 'success', icon: '✅' },
];

const practitioners = [
  { name: 'Dr. Sarah Chen', specialty: 'Speech Therapy', license: 'SLP-12345', exp: '8 years', rating: 4.9, sessions: 142, status: 'Available', initials: 'SC', tint: 'bg-[hsl(170,60%,45%)]' },
  { name: 'Dr. James Wilson', specialty: 'Occupational Therapy', license: 'OTR-67890', exp: '12 years', rating: 4.8, sessions: 198, status: 'In Session', initials: 'JW', tint: 'bg-[hsl(250,65%,58%)]' },
  { name: 'Dr. Emily Parker', specialty: 'Physical Therapy', license: 'PT-24680', exp: '6 years', rating: 4.7, sessions: 124, status: 'Available', initials: 'EP', tint: 'bg-[hsl(25,90%,58%)]' },
  { name: 'Dr. Michael Brown', specialty: 'Behavioral Therapy', license: 'BCBA-13579', exp: '10 years', rating: 4.9, sessions: 156, status: 'On Leave', initials: 'MB', tint: 'bg-[hsl(212,80%,50%)]' },
];

const staff = [
  { name: 'Reception Team', role: 'Front Desk', count: 3, icon: '🛎️' },
  { name: 'Admin Manager', role: 'Operations', count: 1, icon: '👔' },
  { name: 'Accounts', role: 'Finance', count: 2, icon: '💼' },
  { name: 'Cleaning Staff', role: 'Maintenance', count: 4, icon: '🧹' },
];

const children = [
  { id: 'C-001', name: 'Emma S.', age: 5, plan: 'Speech & Language', dr: 'Dr. Sarah Chen', parent: 'Jennifer S.', attendance: 95, initials: 'ES', tint: 'bg-[hsl(25,90%,58%)]' },
  { id: 'C-002', name: 'Lucas M.', age: 7, plan: 'Occupational Therapy', dr: 'Dr. James Wilson', parent: 'Michael M.', attendance: 88, initials: 'LM', tint: 'bg-[hsl(250,65%,58%)]' },
  { id: 'C-003', name: 'Olivia R.', age: 4, plan: 'Physical Therapy', dr: 'Dr. Emily Parker', parent: 'Rachel R.', attendance: 92, initials: 'OR', tint: 'bg-[hsl(170,60%,45%)]' },
  { id: 'C-004', name: 'Noah J.', age: 6, plan: 'Behavioral Therapy', dr: 'Dr. Michael Brown', parent: 'Sarah J.', attendance: 97, initials: 'NJ', tint: 'bg-[hsl(212,80%,50%)]' },
];

const rooms = [
  { id: '101', floor: 1, type: 'Speech Therapy', status: 'In Session' },
  { id: '102', floor: 1, type: 'Behavioral Therapy', status: 'Available' },
  { id: '103', floor: 1, type: 'Occupational Therapy', status: 'In Session' },
  { id: '201', floor: 2, type: 'Speech Therapy', status: 'Available' },
  { id: '202', floor: 2, type: 'Group Activities', status: 'Available' },
  { id: '203', floor: 2, type: 'Sensory Integration', status: 'Maintenance' },
  { id: '204', floor: 2, type: 'Physical Therapy', status: 'Available' },
  { id: '205', floor: 2, type: 'Physical Therapy', status: 'In Session' },
];

const invoices = [
  { id: 'INV-2456', client: 'Jennifer S.', amount: '₹12,500', date: 'Apr 15', status: 'Paid' },
  { id: 'INV-2457', client: 'Michael M.', amount: '₹18,000', date: 'Apr 16', status: 'Paid' },
  { id: 'INV-2458', client: 'Rachel R.', amount: '₹9,500', date: 'Apr 17', status: 'Pending' },
  { id: 'INV-2459', client: 'Sarah J.', amount: '₹15,000', date: 'Apr 17', status: 'Overdue' },
];

const revenueByService = [
  { name: 'Speech Therapy', val: 145000, color: 'hsl(170,60%,45%)' },
  { name: 'Occupational Therapy', val: 128000, color: 'hsl(250,65%,58%)' },
  { name: 'Physical Therapy', val: 98000, color: 'hsl(25,90%,58%)' },
  { name: 'Behavioral Therapy', val: 49000, color: 'hsl(212,80%,50%)' },
];

const reports = [
  { name: 'Revenue Report', sub: 'Monthly financial breakdown', icon: '💰' },
  { name: 'Practitioner Performance', sub: 'KPI & ratings analysis', icon: '📈' },
  { name: 'Patient Outcomes', sub: 'Therapy progress metrics', icon: '🧠' },
  { name: 'Audit Log', sub: 'System activity & access', icon: '🔒' },
];

const navItems: { id: Panel; icon: string; label: string }[] = [
  { id: 'home', icon: '📊', label: 'Overview' },
  { id: 'practitioners', icon: '👨‍⚕️', label: 'Doctors' },
  { id: 'children', icon: '🧒', label: 'Patients' },
  { id: 'finance', icon: '💰', label: 'Finance' },
  { id: 'facilities', icon: '🏥', label: 'Rooms' },
];

const statusPill = (status: string) => {
  const map: Record<string, string> = {
    'Available': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'In Session': 'bg-orange-50 text-orange-700 border-orange-200',
    'On Leave': 'bg-muted text-muted-foreground border-border',
    'Maintenance': 'bg-amber-50 text-amber-700 border-amber-200',
    'Paid': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
    'Overdue': 'bg-rose-50 text-rose-700 border-rose-200',
  };
  return map[status] || 'bg-muted text-muted-foreground border-border';
};

const sevTint = (s: string) => ({ critical: 'bg-rose-50 border-rose-200 text-rose-900', warn: 'bg-amber-50 border-amber-200 text-amber-900', info: 'bg-blue-50 border-blue-200 text-blue-900', success: 'bg-emerald-50 border-emerald-200 text-emerald-900' }[s] || 'bg-muted border-border text-foreground');

export const AdminDashboard = () => {
  const { setScreen, toast } = useAppState();
  const [panel, setPanel] = useState<Panel>('home');
  const [showMore, setShowMore] = useState(false);
  const [search, setSearch] = useState('');

  const totalRevenue = revenueByService.reduce((a, b) => a + b.val, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(250,40%,97%)] via-background to-[hsl(280,40%,97%)] pb-24">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass border-b border-border/60">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[hsl(250,65%,58%)] to-[hsl(280,60%,45%)] flex items-center justify-center shadow-md">
              <span className="text-white text-base">🛡️</span>
            </div>
            <div>
              <div className="text-[13px] font-display font-extrabold text-foreground leading-tight">ManoNiketan</div>
              <div className="text-[9px] font-bold text-primary uppercase tracking-wider">CDC Admin Panel</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => toast('🔔 8 new admin alerts', 'info')} className="relative w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center shadow-sm active:scale-95">
              <span className="text-base">🔔</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-white text-[9px] font-extrabold flex items-center justify-center">8</span>
            </button>
            <button onClick={() => { setScreen('auth'); toast('👋 Signed out', 'info'); }} className="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center shadow-sm active:scale-95">
              <span className="text-sm">⏻</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 animate-fade-in">
        {/* HOME / OVERVIEW */}
        {panel === 'home' && (
          <>
            <div className="bg-gradient-to-br from-[hsl(250,65%,58%)] to-[hsl(280,60%,45%)] text-white rounded-2xl p-4 mb-4 shadow-lg">
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Friday, April 17, 2026</div>
              <h1 className="font-display text-[20px] font-extrabold leading-tight mt-0.5">Welcome, CDC Admin</h1>
              <p className="text-[12px] font-semibold opacity-90 mt-0.5">Full operational control & insights</p>
              <div className="flex gap-2 mt-3">
                <div className="flex-1 bg-white/15 backdrop-blur rounded-lg p-2.5 border border-white/20">
                  <div className="text-[9px] font-bold opacity-80 uppercase">Today</div>
                  <div className="text-[14px] font-display font-extrabold">28 sessions</div>
                </div>
                <div className="flex-1 bg-white/15 backdrop-blur rounded-lg p-2.5 border border-white/20">
                  <div className="text-[9px] font-bold opacity-80 uppercase">Revenue</div>
                  <div className="text-[14px] font-display font-extrabold">₹4.2L MoM</div>
                </div>
              </div>
            </div>

            <h3 className="text-[13px] font-display font-extrabold text-foreground mb-2.5">Key Metrics</h3>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {kpis.map((s, i) => (
                <div key={i} className={`bg-gradient-to-br ${s.tint} border ${s.border} rounded-2xl p-3.5 shadow-sm`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-extrabold text-foreground/80 uppercase tracking-wider leading-tight">{s.label}</span>
                    <span className="text-base">{s.icon}</span>
                  </div>
                  <div className={`text-2xl font-display font-black ${s.accent} leading-none mb-1`}>{s.value}</div>
                  <div className="text-[10px] font-semibold text-muted-foreground">{s.sub}</div>
                </div>
              ))}
            </div>

            <h3 className="text-[13px] font-display font-extrabold text-foreground mb-2.5">Admin Actions</h3>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {adminActions.map(a => (
                <button key={a.id} onClick={() => toast(`✓ ${a.label}`, 'success')} className={`bg-gradient-to-br ${a.grad} text-white rounded-2xl p-4 shadow-md active:scale-[0.97] flex flex-col items-center gap-1.5`}>
                  <span className="text-2xl">{a.icon}</span>
                  <span className="text-[11.5px] font-extrabold leading-tight text-center">{a.label}</span>
                </button>
              ))}
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-display font-extrabold text-foreground">Critical Alerts</h3>
                <span className="text-[10px] font-extrabold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">{alerts.length} active</span>
              </div>
              <div className="space-y-2">
                {alerts.map((a, i) => (
                  <div key={i} className={`flex items-start gap-2.5 p-2.5 rounded-xl border ${sevTint(a.sev)}`}>
                    <span className="text-base shrink-0">{a.icon}</span>
                    <span className="text-[11.5px] font-semibold leading-snug">{a.msg}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-sm p-4 mb-4">
              <h3 className="text-[13px] font-display font-extrabold text-foreground mb-3">Revenue Mix</h3>
              <div className="space-y-2.5">
                {revenueByService.map((r) => {
                  const pct = (r.val / totalRevenue) * 100;
                  return (
                    <div key={r.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[11px] font-bold text-foreground">{r.name}</span>
                        <span className="text-[11px] font-extrabold" style={{ color: r.color }}>₹{(r.val / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: r.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* PRACTITIONERS */}
        {panel === 'practitioners' && (
          <>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="font-display text-[22px] font-extrabold text-foreground leading-tight">Practitioners</h1>
                <p className="text-[12px] text-muted-foreground font-semibold">Hire, manage, review</p>
              </div>
              <button onClick={() => toast('+ Add Practitioner', 'info')} className="shrink-0 px-3 py-2 rounded-xl bg-gradient-to-br from-[hsl(250,65%,58%)] to-[hsl(280,60%,45%)] text-white text-[11px] font-extrabold shadow-md active:scale-95">+ Add</button>
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search practitioners…" className="w-full px-3.5 py-3 rounded-xl border border-border bg-card text-[12.5px] font-semibold outline-none focus:border-primary mb-3" />
            <div className="space-y-3">
              {practitioners.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase())).map((p, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border shadow-sm p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl ${p.tint} flex items-center justify-center text-white font-display font-extrabold shrink-0`}>{p.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-extrabold text-foreground truncate">{p.name}</div>
                      <div className="text-[11px] font-semibold text-muted-foreground truncate">{p.specialty}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-extrabold text-amber-600">⭐ {p.rating}</span>
                        <span className="text-[10px] font-bold text-muted-foreground">· {p.sessions} sessions</span>
                      </div>
                    </div>
                    <span className={`shrink-0 text-[9px] font-extrabold uppercase px-2 py-1 rounded-full border ${statusPill(p.status)}`}>{p.status}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-muted/40 rounded-lg p-2 text-center"><div className="text-[9px] font-bold text-muted-foreground uppercase">License</div><div className="text-[10px] font-extrabold text-foreground truncate">{p.license}</div></div>
                    <div className="bg-muted/40 rounded-lg p-2 text-center"><div className="text-[9px] font-bold text-muted-foreground uppercase">Exp</div><div className="text-[10px] font-extrabold text-foreground">{p.exp}</div></div>
                    <div className="bg-violet-50 border border-violet-200 rounded-lg p-2 text-center"><div className="text-[9px] font-bold text-violet-700 uppercase">Rating</div><div className="text-[10px] font-extrabold text-violet-700">{p.rating}/5</div></div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 rounded-xl border border-border text-[11px] font-extrabold active:scale-[0.98]">✏️ Edit</button>
                    <button className="flex-1 py-2.5 rounded-xl bg-foreground text-background text-[11px] font-extrabold active:scale-[0.98]">View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CHILDREN / PATIENTS */}
        {panel === 'children' && (
          <>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="font-display text-[22px] font-extrabold text-foreground leading-tight">Patients</h1>
                <p className="text-[12px] text-muted-foreground font-semibold">All registered children</p>
              </div>
              <button onClick={() => toast('+ Register New Patient', 'info')} className="shrink-0 px-3 py-2 rounded-xl bg-gradient-to-br from-[hsl(250,65%,58%)] to-[hsl(280,60%,45%)] text-white text-[11px] font-extrabold shadow-md active:scale-95">+ New</button>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-card border border-border rounded-xl p-2.5 text-center"><div className="text-lg font-display font-black text-foreground">186</div><div className="text-[9px] font-bold text-muted-foreground uppercase">Total</div></div>
              <div className="bg-card border border-border rounded-xl p-2.5 text-center"><div className="text-lg font-display font-black text-emerald-700">94%</div><div className="text-[9px] font-bold text-muted-foreground uppercase">Active</div></div>
              <div className="bg-card border border-border rounded-xl p-2.5 text-center"><div className="text-lg font-display font-black text-violet-700">12</div><div className="text-[9px] font-bold text-muted-foreground uppercase">New (wk)</div></div>
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search patients…" className="w-full px-3.5 py-3 rounded-xl border border-border bg-card text-[12.5px] font-semibold outline-none focus:border-primary mb-3" />
            <div className="space-y-3">
              {children.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase())).map((c, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border shadow-sm p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-11 h-11 rounded-xl ${c.tint} flex items-center justify-center text-white font-display font-extrabold shrink-0`}>{c.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2"><span className="text-[13px] font-extrabold text-foreground">{c.name}</span><span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-muted rounded-full text-muted-foreground">{c.id}</span></div>
                      <div className="text-[11px] font-semibold text-muted-foreground">{c.age}y · {c.parent}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10.5px] font-extrabold text-[hsl(250,65%,48%)] bg-[hsl(250,80%,96%)] px-2 py-1 rounded-md">{c.plan}</span>
                    <span className="text-[10px] font-extrabold text-emerald-700">{c.attendance}% att.</span>
                  </div>
                  <div className="text-[10.5px] font-bold text-muted-foreground mb-3">Practitioner: <span className="text-foreground">{c.dr}</span></div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg border border-border text-[10.5px] font-extrabold active:scale-[0.98]">📋 Records</button>
                    <button className="flex-1 py-2 rounded-lg bg-foreground text-background text-[10.5px] font-extrabold active:scale-[0.98]">View</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* FINANCE */}
        {panel === 'finance' && (
          <>
            <h1 className="font-display text-[22px] font-extrabold text-foreground leading-tight">Finance</h1>
            <p className="text-[12px] text-muted-foreground font-semibold mb-4">Revenue, invoices & payouts</p>

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-2xl p-4 mb-4 shadow-lg">
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">This Month</div>
              <div className="text-3xl font-display font-black leading-none mt-1">₹4,20,000</div>
              <div className="text-[11px] font-semibold opacity-90 mt-1">↗ +18% vs last month</div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="bg-white/15 rounded-lg p-2"><div className="text-[9px] opacity-80 font-bold uppercase">Paid</div><div className="text-[12px] font-extrabold">₹3.4L</div></div>
                <div className="bg-white/15 rounded-lg p-2"><div className="text-[9px] opacity-80 font-bold uppercase">Pending</div><div className="text-[12px] font-extrabold">₹62K</div></div>
                <div className="bg-white/15 rounded-lg p-2"><div className="text-[9px] opacity-80 font-bold uppercase">Overdue</div><div className="text-[12px] font-extrabold">₹18K</div></div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-sm p-4 mb-4">
              <h3 className="text-[13px] font-display font-extrabold text-foreground mb-3">Revenue by Service</h3>
              <div className="space-y-2.5">
                {revenueByService.map(r => {
                  const pct = (r.val / totalRevenue) * 100;
                  return (
                    <div key={r.name}>
                      <div className="flex justify-between mb-1"><span className="text-[11px] font-bold">{r.name}</span><span className="text-[11px] font-extrabold" style={{ color: r.color }}>₹{(r.val / 1000).toFixed(0)}K · {pct.toFixed(0)}%</span></div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full" style={{ width: `${pct}%`, background: r.color }} /></div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[13px] font-display font-extrabold text-foreground">Recent Invoices</h3>
              <button onClick={() => toast('+ Generate Invoice', 'info')} className="text-[11px] font-extrabold text-primary">+ New</button>
            </div>
            <div className="space-y-2">
              {invoices.map(inv => (
                <div key={inv.id} className="bg-card rounded-xl border border-border p-3 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2"><span className="text-[12px] font-extrabold text-foreground">{inv.id}</span><span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full border ${statusPill(inv.status)}`}>{inv.status}</span></div>
                    <div className="text-[10.5px] font-semibold text-muted-foreground truncate">{inv.client} · {inv.date}</div>
                  </div>
                  <div className="text-[13px] font-display font-extrabold text-foreground shrink-0">{inv.amount}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* FACILITIES */}
        {panel === 'facilities' && (
          <>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="font-display text-[22px] font-extrabold text-foreground leading-tight">Facilities</h1>
                <p className="text-[12px] text-muted-foreground font-semibold">Rooms & equipment oversight</p>
              </div>
              <button onClick={() => toast('+ Add Facility', 'info')} className="shrink-0 px-3 py-2 rounded-xl bg-gradient-to-br from-[hsl(250,65%,58%)] to-[hsl(280,60%,45%)] text-white text-[11px] font-extrabold shadow-md active:scale-95">+ Add</button>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="bg-card border border-border rounded-xl p-2 text-center"><div className="text-base font-display font-black text-foreground">12</div><div className="text-[8.5px] font-bold text-muted-foreground uppercase">Total</div></div>
              <div className="bg-card border border-border rounded-xl p-2 text-center"><div className="text-base font-display font-black text-emerald-700">8</div><div className="text-[8.5px] font-bold text-muted-foreground uppercase">Free</div></div>
              <div className="bg-card border border-border rounded-xl p-2 text-center"><div className="text-base font-display font-black text-orange-700">3</div><div className="text-[8.5px] font-bold text-muted-foreground uppercase">In Use</div></div>
              <div className="bg-card border border-border rounded-xl p-2 text-center"><div className="text-base font-display font-black text-amber-700">1</div><div className="text-[8.5px] font-bold text-muted-foreground uppercase">Maint.</div></div>
            </div>
            {[1, 2].map(floor => (
              <div key={floor} className="mb-4">
                <h3 className="text-[12.5px] font-display font-extrabold text-foreground mb-2">🏢 Floor {floor}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {rooms.filter(r => r.floor === floor).map(r => (
                    <div key={r.id} className="bg-card rounded-xl border border-border p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-1"><span className="text-[12px] font-display font-extrabold text-foreground">Room {r.id}</span></div>
                      <div className="text-[10px] font-semibold text-muted-foreground mb-2 truncate">{r.type}</div>
                      <span className={`text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded-full border ${statusPill(r.status)}`}>{r.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* STAFF */}
        {panel === 'staff' && (
          <>
            <h1 className="font-display text-[22px] font-extrabold text-foreground leading-tight">Staff Management</h1>
            <p className="text-[12px] text-muted-foreground font-semibold mb-4">Non-clinical team</p>
            <div className="space-y-2.5">
              {staff.map((s, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border shadow-sm p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-2xl shrink-0">{s.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-extrabold text-foreground">{s.name}</div>
                    <div className="text-[11px] font-semibold text-muted-foreground">{s.role}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-display font-black text-primary">{s.count}</div>
                    <div className="text-[9px] font-bold text-muted-foreground uppercase">members</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* APPOINTMENTS */}
        {panel === 'appointments' && (
          <>
            <h1 className="font-display text-[22px] font-extrabold text-foreground leading-tight">Appointments</h1>
            <p className="text-[12px] text-muted-foreground font-semibold mb-4">All sessions, all practitioners</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-card border border-border rounded-xl p-3 text-center"><div className="text-xl font-display font-black text-foreground">28</div><div className="text-[9px] font-bold text-muted-foreground uppercase">Today</div></div>
              <div className="bg-card border border-border rounded-xl p-3 text-center"><div className="text-xl font-display font-black text-emerald-700">18</div><div className="text-[9px] font-bold text-muted-foreground uppercase">Done</div></div>
              <div className="bg-card border border-border rounded-xl p-3 text-center"><div className="text-xl font-display font-black text-amber-700">2</div><div className="text-[9px] font-bold text-muted-foreground uppercase">No-Show</div></div>
            </div>
            <div className="bg-card rounded-2xl border border-border shadow-sm p-4">
              <p className="text-[11.5px] font-semibold text-muted-foreground text-center py-6">Detailed scheduling lives in the Receptionist view. Admin gets aggregate metrics here.</p>
            </div>
          </>
        )}

        {/* REPORTS */}
        {panel === 'reports' && (
          <>
            <h1 className="font-display text-[22px] font-extrabold text-foreground leading-tight">Reports & Analytics</h1>
            <p className="text-[12px] text-muted-foreground font-semibold mb-4">Operational & financial insights</p>
            <div className="space-y-2 mb-5">
              {reports.map((r, i) => (
                <button key={i} onClick={() => toast(`📥 Exporting: ${r.name}`, 'success')} className="w-full bg-card border border-border rounded-xl p-3 flex items-center gap-3 active:scale-[0.99] shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(250,80%,96%)] flex items-center justify-center text-base shrink-0">{r.icon}</div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-[12px] font-extrabold text-foreground truncate">{r.name}</div>
                    <div className="text-[10px] font-semibold text-muted-foreground truncate">{r.sub}</div>
                  </div>
                  <span className="text-[10.5px] font-extrabold text-primary shrink-0">📥 Export</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* More overlay */}
      {showMore && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end" onClick={() => setShowMore(false)}>
          <div className="w-full bg-card rounded-t-3xl p-5 animate-modal-in" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
            <h3 className="text-[14px] font-display font-extrabold text-foreground mb-3">More</h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button onClick={() => { setPanel('staff'); setShowMore(false); }} className="p-3 rounded-xl bg-muted/40 border border-border flex flex-col items-center gap-1 active:scale-[0.98]">
                <span className="text-xl">👥</span><span className="text-[11px] font-extrabold text-foreground">Staff</span>
              </button>
              <button onClick={() => { setPanel('appointments'); setShowMore(false); }} className="p-3 rounded-xl bg-muted/40 border border-border flex flex-col items-center gap-1 active:scale-[0.98]">
                <span className="text-xl">📅</span><span className="text-[11px] font-extrabold text-foreground">Appointments</span>
              </button>
              <button onClick={() => { setPanel('reports'); setShowMore(false); }} className="p-3 rounded-xl bg-muted/40 border border-border flex flex-col items-center gap-1 active:scale-[0.98]">
                <span className="text-xl">📊</span><span className="text-[11px] font-extrabold text-foreground">Reports</span>
              </button>
              <button onClick={() => { setShowMore(false); toast('⚙️ Settings', 'info'); }} className="p-3 rounded-xl bg-muted/40 border border-border flex flex-col items-center gap-1 active:scale-[0.98]">
                <span className="text-xl">⚙️</span><span className="text-[11px] font-extrabold text-foreground">Settings</span>
              </button>
            </div>
            <button onClick={() => { setShowMore(false); setScreen('auth'); toast('👋 Signed out'); }} className="w-full p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 active:scale-[0.98]">
              <span className="text-xl">⏻</span><div className="text-left flex-1"><div className="text-[12px] font-extrabold text-destructive">Sign Out</div></div>
            </button>
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-border/60">
        <div className="flex items-center justify-around px-2 py-1.5 max-w-[480px] mx-auto">
          {navItems.map(item => {
            const active = panel === item.id;
            return (
              <button key={item.id} onClick={() => { setPanel(item.id); setShowMore(false); }} className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all ${active ? 'bg-gradient-to-br from-[hsl(250,65%,58%)] to-[hsl(280,60%,45%)] text-white shadow-md scale-105' : 'text-muted-foreground'}`}>
                <span className="text-base">{item.icon}</span>
                <span className="text-[9px] font-extrabold">{item.label}</span>
              </button>
            );
          })}
          <button onClick={() => setShowMore(true)} className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl ${showMore ? 'bg-foreground text-background' : 'text-muted-foreground'}`}>
            <span className="text-base">⋯</span>
            <span className="text-[9px] font-extrabold">More</span>
          </button>
        </div>
      </div>
    </div>
  );
};
