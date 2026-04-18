import React, { useState } from 'react';
import { useAppState } from '../context/AppState';

type Panel = 'home' | 'practitioners' | 'children' | 'appointments' | 'facilities' | 'reports';

const stats = [
  { label: 'Practitioners On Duty', value: '12', sub: 'Out of 15 total', icon: '👥', tint: 'from-violet-50 to-violet-100/50', border: 'border-violet-200', accent: 'text-violet-700' },
  { label: 'Children Scheduled', value: '28', sub: "Today's appointments", icon: '🧒', tint: 'from-orange-50 to-orange-100/50', border: 'border-orange-200', accent: 'text-orange-700' },
  { label: 'Facilities Available', value: '8/12', sub: 'Rooms ready', icon: '🏥', tint: 'from-emerald-50 to-emerald-100/50', border: 'border-emerald-200', accent: 'text-emerald-700' },
  { label: 'Pending Confirmations', value: '4', sub: 'Awaiting response', icon: '⏰', tint: 'from-amber-50 to-amber-100/50', border: 'border-amber-200', accent: 'text-amber-700' },
];

const quickActions = [
  { id: 'reg', label: 'Register Child', icon: '👶', grad: 'from-[hsl(170,60%,45%)] to-[hsl(170,60%,38%)]' },
  { id: 'book', label: 'Book Slot', icon: '📅', grad: 'from-[hsl(25,90%,58%)] to-[hsl(25,90%,50%)]' },
  { id: 'walkin', label: 'Check-In Walk-In', icon: '📋', grad: 'from-[hsl(250,65%,58%)] to-[hsl(280,60%,55%)]' },
  { id: 'facility', label: 'Update Facility', icon: '🏢', grad: 'from-[hsl(212,80%,50%)] to-[hsl(212,80%,42%)]' },
];

const timeline = [
  { time: '09:00', name: 'Emma S.', therapy: 'Speech Therapy', dr: 'Dr. Sarah Chen', room: '201', status: 'pending' },
  { time: '09:30', name: 'Lucas M.', therapy: 'Occupational Therapy', dr: 'Dr. James Wilson', room: '103', status: 'in-session' },
  { time: '10:00', name: 'Olivia R.', therapy: 'Physical Therapy', dr: 'Dr. Emily Parker', room: '205', status: 'pending' },
  { time: '10:30', name: 'Noah J.', therapy: 'Behavioral Therapy', dr: 'Dr. Michael Brown', room: '102', status: 'pending' },
];

const alerts = [
  { msg: 'Dr. Sarah Chen running 15 mins late', icon: '⚠️' },
  { msg: 'Room 205 cleaning in progress — 10 mins remaining', icon: '🧹' },
  { msg: '3 new parent confirmations received', icon: '✅' },
];

const practitioners = [
  { name: 'Dr. Sarah Chen', specialty: 'Speech Therapy', license: 'SLP-12345', exp: '8 years', sessions: 6, status: 'Available', initials: 'SC', tint: 'bg-[hsl(170,60%,45%)]' },
  { name: 'Dr. James Wilson', specialty: 'Occupational Therapy', license: 'OTR-67890', exp: '12 years', sessions: 5, status: 'In Session', initials: 'JW', tint: 'bg-[hsl(250,65%,58%)]' },
  { name: 'Dr. Emily Parker', specialty: 'Physical Therapy', license: 'PT-24680', exp: '6 years', sessions: 7, status: 'Available', initials: 'EP', tint: 'bg-[hsl(25,90%,58%)]' },
  { name: 'Dr. Michael Brown', specialty: 'Behavioral Therapy', license: 'BCBA-13579', exp: '10 years', sessions: 0, status: 'Unavailable', initials: 'MB', tint: 'bg-[hsl(212,80%,50%)]' },
];

const children = [
  { id: 'C-001', name: 'Emma S.', age: 5, plan: 'Speech & Language', dr: 'Dr. Sarah Chen', parent: 'Jennifer S.', next: 'Today, 9:00 AM', attendance: 95, initials: 'ES', tint: 'bg-[hsl(25,90%,58%)]' },
  { id: 'C-002', name: 'Lucas M.', age: 7, plan: 'Occupational Therapy', dr: 'Dr. James Wilson', parent: 'Michael M.', next: 'Today, 9:30 AM', attendance: 88, initials: 'LM', tint: 'bg-[hsl(250,65%,58%)]' },
  { id: 'C-003', name: 'Olivia R.', age: 4, plan: 'Physical Therapy', dr: 'Dr. Emily Parker', parent: 'Rachel R.', next: 'Today, 10:00 AM', attendance: 92, initials: 'OR', tint: 'bg-[hsl(170,60%,45%)]' },
  { id: 'C-004', name: 'Noah J.', age: 6, plan: 'Behavioral Therapy', dr: 'Dr. Michael Brown', parent: 'Sarah J.', next: 'Tomorrow, 2:00 PM', attendance: 97, initials: 'NJ', tint: 'bg-[hsl(212,80%,50%)]' },
];

const slots = [
  { time: '08:00 AM', booked: false },
  { time: '08:30 AM', booked: false },
  { time: '09:00 AM', booked: true, name: 'Emma S.', therapy: 'Speech Therapy', dr: 'Dr. Sarah Chen', status: 'in-session' },
  { time: '09:30 AM', booked: true, name: 'Lucas M.', therapy: 'Occupational Therapy', dr: 'Dr. James Wilson', status: 'in-session' },
  { time: '10:00 AM', booked: true, name: 'Olivia R.', therapy: 'Physical Therapy', dr: 'Dr. Emily Parker', status: 'pending' },
  { time: '10:30 AM', booked: false },
  { time: '11:00 AM', booked: false },
  { time: '11:30 AM', booked: false },
];

const rooms = [
  { id: '101', floor: 1, type: 'Speech Therapy', cap: 2, status: 'In Session', session: 'Emma S. – Dr. Sarah Chen' },
  { id: '102', floor: 1, type: 'Behavioral Therapy', cap: 1, status: 'Available' },
  { id: '103', floor: 1, type: 'Occupational Therapy', cap: 3, status: 'In Session', session: 'Lucas M. – Dr. James Wilson' },
  { id: '201', floor: 2, type: 'Speech Therapy', cap: 2, status: 'Available' },
  { id: '202', floor: 2, type: 'Group Activities', cap: 8, status: 'Available' },
  { id: '203', floor: 2, type: 'Sensory Integration', cap: 4, status: 'Maintenance' },
  { id: '204', floor: 2, type: 'Physical Therapy', cap: 3, status: 'Available' },
  { id: '205', floor: 2, type: 'Physical Therapy', cap: 3, status: 'In Session', session: 'Olivia R. – Dr. Emily Parker' },
];

const reportStats = [
  { label: 'Sessions Completed', value: '18', sub: 'Today  +12% from yesterday', icon: '📈', tint: 'from-emerald-50 to-emerald-100/50', accent: 'text-emerald-700', border: 'border-emerald-200' },
  { label: 'No-Shows', value: '2', sub: 'Today', icon: '⏰', tint: 'from-amber-50 to-amber-100/50', accent: 'text-amber-700', border: 'border-amber-200' },
  { label: 'Practitioner Occupancy', value: '87%', sub: 'Average today', icon: '👥', tint: 'from-violet-50 to-violet-100/50', accent: 'text-violet-700', border: 'border-violet-200' },
  { label: 'Facility Usage', value: '75%', sub: 'Peak hours', icon: '🏥', tint: 'from-orange-50 to-orange-100/50', accent: 'text-orange-700', border: 'border-orange-200' },
];

const reports = [
  { name: 'Daily Sessions Report', sub: 'Complete session logs for today', icon: '📅' },
  { name: 'Practitioner Occupancy', sub: 'Therapist utilization metrics', icon: '👥' },
  { name: 'Facility Usage Analytics', sub: 'Room and space utilization stats', icon: '🏥' },
  { name: 'No-Show Analysis', sub: 'Missed appointments breakdown', icon: '⏰' },
];

const activityLog = [
  { time: '08:45 AM', text: 'Emma S. checked in for Speech Therapy with Dr. Sarah Chen' },
  { time: '09:12 AM', text: 'Room 103 assigned to Lucas M. — Occupational Therapy session started' },
  { time: '09:35 AM', text: 'Dr. Emily Parker marked session with Olivia R. as completed' },
  { time: '10:05 AM', text: 'New appointment booked for Noah J. — Tomorrow 2:00 PM' },
  { time: '10:28 AM', text: 'Room 206 marked under maintenance — estimated completion 2 hours' },
];

const navItems: { id: Panel; icon: string; label: string }[] = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'practitioners', icon: '👨‍⚕️', label: 'Doctors' },
  { id: 'children', icon: '🧒', label: 'Children' },
  { id: 'appointments', icon: '📅', label: 'Slots' },
  { id: 'facilities', icon: '🏥', label: 'Rooms' },
];

const statusPill = (status: string) => {
  const map: Record<string, string> = {
    'Available': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'In Session': 'bg-orange-50 text-orange-700 border-orange-200',
    'Unavailable': 'bg-muted text-muted-foreground border-border',
    'Maintenance': 'bg-amber-50 text-amber-700 border-amber-200',
    'pending': 'bg-amber-50 text-amber-700 border-amber-200',
    'in-session': 'bg-orange-50 text-orange-700 border-orange-200',
    'completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  return map[status] || 'bg-muted text-muted-foreground border-border';
};

export const ReceptionDashboard = () => {
  const { setScreen, toast } = useAppState();
  const [panel, setPanel] = useState<Panel>('home');
  const [showMore, setShowMore] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(220,30%,97%)] via-background to-[hsl(170,40%,97%)] pb-24">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass border-b border-border/60">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[hsl(170,60%,45%)] to-[hsl(170,60%,35%)] flex items-center justify-center shadow-md">
              <span className="text-white text-base">💚</span>
            </div>
            <div>
              <div className="text-[13px] font-display font-extrabold text-foreground leading-tight">ManoNiketan</div>
              <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">CDC Reception</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => toast('🔔 5 new notifications', 'info')} className="relative w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center shadow-sm active:scale-95 transition-transform">
              <span className="text-base">🔔</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-white text-[9px] font-extrabold flex items-center justify-center">3</span>
            </button>
            <button onClick={() => { setScreen('auth'); toast('👋 Signed out', 'info'); }} className="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center shadow-sm active:scale-95 transition-transform">
              <span className="text-sm">⏻</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 animate-fade-in">
        {/* HOME */}
        {panel === 'home' && (
          <>
            <div className="mb-1 text-[11px] font-bold text-muted-foreground">Friday, April 17, 2026</div>
            <h1 className="font-display text-[22px] font-extrabold text-foreground leading-tight">Welcome back, Reception Team</h1>
            <p className="text-[12.5px] text-muted-foreground font-semibold mb-4">Here's what's happening at the CDC today</p>

            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {stats.map((s, i) => (
                <div key={i} className={`bg-gradient-to-br ${s.tint} border ${s.border} rounded-2xl p-3.5 shadow-sm`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10.5px] font-extrabold text-foreground/80 uppercase tracking-wider leading-tight">{s.label}</span>
                    <span className="text-base">{s.icon}</span>
                  </div>
                  <div className={`text-2xl font-display font-black ${s.accent} leading-none mb-1`}>{s.value}</div>
                  <div className="text-[10px] font-semibold text-muted-foreground">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <h3 className="text-[13px] font-display font-extrabold text-foreground mb-2.5">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {quickActions.map(a => (
                  <button
                    key={a.id}
                    onClick={() => toast(`✓ ${a.label}`, 'success')}
                    className={`bg-gradient-to-br ${a.grad} text-white rounded-2xl p-4 shadow-md active:scale-[0.97] transition-transform flex flex-col items-center gap-1.5`}
                  >
                    <span className="text-2xl">{a.icon}</span>
                    <span className="text-[11.5px] font-extrabold leading-tight text-center">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-display font-extrabold text-foreground">Today's Timeline</h3>
                <button className="text-[11px] font-extrabold text-primary">View All</button>
              </div>
              <div className="space-y-2">
                {timeline.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40 border border-border/60">
                    <div className="text-center shrink-0 w-12">
                      <div className="text-[12px] font-display font-extrabold text-foreground">{t.time}</div>
                      <span className={`mt-1 inline-block text-[8px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${statusPill(t.status)}`}>{t.status === 'in-session' ? 'Live' : t.status}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] font-extrabold text-foreground truncate">{t.name}</div>
                      <div className="text-[10.5px] font-semibold text-muted-foreground truncate">{t.therapy}</div>
                      <div className="text-[10px] font-bold text-primary truncate">{t.dr} · Room {t.room}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-sm p-4 mb-4">
              <h3 className="text-[13px] font-display font-extrabold text-foreground mb-3">Alerts & Notifications</h3>
              <div className="space-y-2">
                {alerts.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="text-base shrink-0">{a.icon}</span>
                    <span className="text-[11.5px] font-semibold text-amber-900 leading-snug">{a.msg}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-2.5 rounded-xl border border-border bg-muted/30 text-[11.5px] font-extrabold text-foreground active:scale-[0.98]">View All Notifications</button>
            </div>
          </>
        )}

        {/* PRACTITIONERS */}
        {panel === 'practitioners' && (
          <>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="font-display text-[22px] font-extrabold text-foreground leading-tight">Practitioners</h1>
                <p className="text-[12px] text-muted-foreground font-semibold">Manage schedules & availability</p>
              </div>
              <button onClick={() => toast('+ Add Practitioner', 'info')} className="shrink-0 px-3 py-2 rounded-xl bg-gradient-to-br from-[hsl(170,60%,45%)] to-[hsl(170,60%,38%)] text-white text-[11px] font-extrabold shadow-md active:scale-95">+ Add</button>
            </div>
            <div className="relative mb-3">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search by name or specialty…" className="w-full px-3.5 py-3 rounded-xl border border-border bg-card text-[12.5px] font-semibold outline-none focus:border-primary" />
            </div>
            <div className="space-y-3">
              {practitioners.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.specialty.toLowerCase().includes(search.toLowerCase())).map((p, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border shadow-sm p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-xl ${p.tint} flex items-center justify-center text-white font-display font-extrabold text-[13px] shrink-0`}>{p.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-extrabold text-foreground truncate">{p.name}</div>
                      <div className="text-[11px] font-semibold text-muted-foreground truncate">{p.specialty}</div>
                    </div>
                    <span className={`shrink-0 text-[9px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full border ${statusPill(p.status)}`}>{p.status}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div className="bg-muted/40 rounded-lg p-2"><div className="text-[9px] font-bold text-muted-foreground uppercase">License</div><div className="text-[10.5px] font-extrabold text-foreground truncate">{p.license}</div></div>
                    <div className="bg-muted/40 rounded-lg p-2"><div className="text-[9px] font-bold text-muted-foreground uppercase">Exp</div><div className="text-[10.5px] font-extrabold text-foreground">{p.exp}</div></div>
                    <div className="bg-orange-50 rounded-lg p-2 border border-orange-200"><div className="text-[9px] font-bold text-orange-700 uppercase">Today</div><div className="text-[10.5px] font-extrabold text-orange-700">{p.sessions} sess.</div></div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 rounded-xl border border-border text-[11px] font-extrabold text-foreground active:scale-[0.98]">📅 Schedule</button>
                    <button className="flex-1 py-2.5 rounded-xl bg-foreground text-background text-[11px] font-extrabold active:scale-[0.98]">View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CHILDREN */}
        {panel === 'children' && (
          <>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="font-display text-[22px] font-extrabold text-foreground leading-tight">Children & Parents</h1>
                <p className="text-[12px] text-muted-foreground font-semibold">Manage registrations & info</p>
              </div>
              <button onClick={() => toast('+ Register New Child', 'info')} className="shrink-0 px-3 py-2 rounded-xl bg-gradient-to-br from-[hsl(170,60%,45%)] to-[hsl(170,60%,38%)] text-white text-[11px] font-extrabold shadow-md active:scale-95">+ New</button>
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search by name, ID, or parent…" className="w-full px-3.5 py-3 rounded-xl border border-border bg-card text-[12.5px] font-semibold outline-none focus:border-primary mb-3" />
            <div className="space-y-3">
              {children.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase())).map((c, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border shadow-sm p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-xl ${c.tint} flex items-center justify-center text-white font-display font-extrabold text-[13px] shrink-0`}>{c.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2"><span className="text-[13px] font-extrabold text-foreground">{c.name}</span><span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-muted rounded-full text-muted-foreground">{c.id}</span></div>
                      <div className="text-[11px] font-semibold text-muted-foreground">Age: {c.age} years</div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div>
                      <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Therapy Plan</div>
                      <span className="inline-block text-[10.5px] font-extrabold text-[hsl(170,60%,35%)] bg-[hsl(170,60%,94%)] px-2 py-1 rounded-md">{c.plan}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><div className="text-[9px] font-bold text-muted-foreground uppercase">Practitioner</div><div className="text-[11px] font-extrabold text-foreground truncate">{c.dr}</div></div>
                      <div><div className="text-[9px] font-bold text-muted-foreground uppercase">Parent</div><div className="text-[11px] font-extrabold text-foreground truncate">{c.parent}</div></div>
                    </div>
                    <div><div className="text-[9px] font-bold text-muted-foreground uppercase">Next Session</div><div className="text-[11px] font-extrabold text-[hsl(170,60%,35%)]">{c.next}</div></div>
                    <div>
                      <div className="flex justify-between mb-1"><span className="text-[9px] font-bold text-muted-foreground uppercase">Attendance</span><span className="text-[10px] font-extrabold text-emerald-700">{c.attendance}%</span></div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${c.attendance}%` }} /></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 rounded-xl border border-border text-[11px] font-extrabold active:scale-[0.98]">👁 Profile</button>
                    <button className="flex-1 py-2.5 rounded-xl bg-foreground text-background text-[11px] font-extrabold active:scale-[0.98]">📅 Schedule</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* APPOINTMENTS */}
        {panel === 'appointments' && (
          <>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="font-display text-[22px] font-extrabold text-foreground leading-tight">Appointments</h1>
                <p className="text-[12px] text-muted-foreground font-semibold">Manage sessions & bookings</p>
              </div>
              <button onClick={() => toast('+ Book New Slot', 'info')} className="shrink-0 px-3 py-2 rounded-xl bg-gradient-to-br from-[hsl(170,60%,45%)] to-[hsl(170,60%,38%)] text-white text-[11px] font-extrabold shadow-md active:scale-95">+ Slot</button>
            </div>
            <div className="bg-card rounded-2xl border border-border shadow-sm p-3 mb-3 flex items-center justify-between">
              <button className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center font-extrabold">‹</button>
              <div className="text-center">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">📅</div>
                <div className="text-[12.5px] font-display font-extrabold text-foreground">Friday, April 17</div>
              </div>
              <button className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center font-extrabold">›</button>
            </div>
            <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
              {['Today', 'Week', 'Month'].map((v, i) => (
                <button key={v} className={`shrink-0 px-3 py-1.5 rounded-full text-[10.5px] font-extrabold ${i === 0 ? 'bg-foreground text-background' : 'bg-muted/50 text-muted-foreground border border-border'}`}>{v}</button>
              ))}
            </div>
            <h3 className="text-[12.5px] font-display font-extrabold text-foreground mb-2">Daily Schedule</h3>
            <div className="space-y-2">
              {slots.map((s, i) => (
                <div key={i} className={`rounded-xl border p-3 ${s.booked ? 'bg-[hsl(170,60%,97%)] border-[hsl(170,60%,85%)]' : 'bg-card border-dashed border-border'}`}>
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-display font-extrabold text-foreground w-16">{s.time}</div>
                    {s.booked ? (
                      <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
                        <div className="min-w-0">
                          <div className="text-[12px] font-extrabold text-foreground truncate">{s.name}</div>
                          <div className="text-[10px] font-semibold text-muted-foreground truncate">{s.therapy}</div>
                          <div className="text-[10px] font-bold text-primary truncate">{s.dr}</div>
                        </div>
                        <span className={`shrink-0 text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full border ${statusPill(s.status!)}`}>{s.status === 'in-session' ? 'Live' : s.status}</span>
                      </div>
                    ) : (
                      <button onClick={() => toast(`Booking ${s.time}`, 'info')} className="flex-1 flex items-center justify-between text-muted-foreground"><span className="text-[11px] font-bold">Available slot</span><span className="w-6 h-6 rounded-full bg-muted/60 flex items-center justify-center font-extrabold">+</span></button>
                    )}
                  </div>
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
                <p className="text-[12px] text-muted-foreground font-semibold">Monitor & manage rooms</p>
              </div>
              <button onClick={() => toast('+ Add Facility', 'info')} className="shrink-0 px-3 py-2 rounded-xl bg-gradient-to-br from-[hsl(170,60%,45%)] to-[hsl(170,60%,38%)] text-white text-[11px] font-extrabold shadow-md active:scale-95">+ Add</button>
            </div>
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <div className="bg-card border-l-4 border-l-emerald-500 border border-border rounded-xl p-3"><div className="text-2xl font-display font-black text-foreground">12</div><div className="text-[10px] font-bold text-muted-foreground uppercase">Total Rooms</div></div>
              <div className="bg-card border-l-4 border-l-emerald-500 border border-border rounded-xl p-3"><div className="text-2xl font-display font-black text-emerald-700">8</div><div className="text-[10px] font-bold text-muted-foreground uppercase">Available</div></div>
              <div className="bg-card border-l-4 border-l-orange-500 border border-border rounded-xl p-3"><div className="text-2xl font-display font-black text-orange-700">3</div><div className="text-[10px] font-bold text-muted-foreground uppercase">In Use</div></div>
              <div className="bg-card border-l-4 border-l-amber-500 border border-border rounded-xl p-3"><div className="text-2xl font-display font-black text-amber-700">1</div><div className="text-[10px] font-bold text-muted-foreground uppercase">Maintenance</div></div>
            </div>
            {[1, 2].map(floor => (
              <div key={floor} className="mb-4">
                <div className="flex items-center gap-2 mb-2"><span className="text-[hsl(170,60%,45%)]">🏢</span><h3 className="text-[13px] font-display font-extrabold text-foreground">Floor {floor}</h3></div>
                <div className="space-y-2">
                  {rooms.filter(r => r.floor === floor).map((r) => (
                    <div key={r.id} className="bg-card rounded-xl border border-border p-3 shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-[13px] font-display font-extrabold text-foreground">Room {r.id}</div>
                          <div className="text-[11px] font-semibold text-muted-foreground">{r.type}</div>
                        </div>
                        <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full border ${statusPill(r.status)}`}>{r.status}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground mb-2">
                        <span>📍 Floor {r.floor}</span><span>👥 Cap: {r.cap}</span>
                      </div>
                      {r.session && (
                        <div className="bg-muted/40 rounded-lg p-2 mb-2">
                          <div className="text-[9px] font-bold text-muted-foreground uppercase">Current Session</div>
                          <div className="text-[10.5px] font-extrabold text-foreground">{r.session}</div>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 rounded-lg border border-border text-[10.5px] font-extrabold active:scale-[0.98]">Details</button>
                        <button disabled={r.status !== 'Available'} className="flex-1 py-2 rounded-lg bg-foreground text-background text-[10.5px] font-extrabold active:scale-[0.98] disabled:opacity-40">Assign</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* REPORTS */}
        {panel === 'reports' && (
          <>
            <h1 className="font-display text-[22px] font-extrabold text-foreground leading-tight">Logs & Reports</h1>
            <p className="text-[12px] text-muted-foreground font-semibold mb-4">View activity & generate reports</p>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {reportStats.map((s, i) => (
                <div key={i} className={`bg-gradient-to-br ${s.tint} border ${s.border} rounded-2xl p-3.5 shadow-sm`}>
                  <div className="flex justify-between items-start mb-1"><span className="text-[10.5px] font-extrabold text-foreground/80 uppercase tracking-wider leading-tight">{s.label}</span><span className="text-base">{s.icon}</span></div>
                  <div className={`text-2xl font-display font-black ${s.accent} leading-none mb-1`}>{s.value}</div>
                  <div className="text-[10px] font-semibold text-muted-foreground">{s.sub}</div>
                </div>
              ))}
            </div>
            <h3 className="text-[13px] font-display font-extrabold text-foreground mb-2.5">Generate Reports</h3>
            <div className="space-y-2 mb-5">
              {reports.map((r, i) => (
                <button key={i} onClick={() => toast(`📥 Exporting: ${r.name}`, 'success')} className="w-full bg-card border border-border rounded-xl p-3 flex items-center gap-3 active:scale-[0.99] shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(170,60%,94%)] flex items-center justify-center text-base shrink-0">{r.icon}</div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-[12px] font-extrabold text-foreground truncate">{r.name}</div>
                    <div className="text-[10px] font-semibold text-muted-foreground truncate">{r.sub}</div>
                  </div>
                  <span className="text-[10.5px] font-extrabold text-[hsl(170,60%,35%)] shrink-0">📥 Export</span>
                </button>
              ))}
            </div>
            <div className="bg-card rounded-2xl border border-border shadow-sm p-4">
              <div className="flex items-center justify-between mb-3"><h3 className="text-[13px] font-display font-extrabold text-foreground">Recent Activity</h3><button className="text-[10px] font-extrabold text-primary">📥 Export</button></div>
              <div className="space-y-2.5">
                {activityLog.map((a, i) => (
                  <div key={i} className="flex gap-3 pb-2.5 border-b border-border/60 last:border-0 last:pb-0">
                    <div className="text-[10px] font-display font-extrabold text-muted-foreground w-14 shrink-0">{a.time}</div>
                    <div className="text-[11px] font-semibold text-foreground leading-snug">{a.text}</div>
                  </div>
                ))}
              </div>
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
            <button onClick={() => { setPanel('reports'); setShowMore(false); }} className="w-full p-3 rounded-xl bg-muted/40 border border-border flex items-center gap-3 mb-2 active:scale-[0.98]">
              <span className="text-xl">📊</span><div className="text-left flex-1"><div className="text-[12px] font-extrabold text-foreground">Reports & Logs</div><div className="text-[10px] font-semibold text-muted-foreground">Analytics & exports</div></div>
            </button>
            <button onClick={() => { setShowMore(false); setScreen('auth'); toast('👋 Signed out'); }} className="w-full p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 active:scale-[0.98]">
              <span className="text-xl">⏻</span><div className="text-left flex-1"><div className="text-[12px] font-extrabold text-destructive">Sign Out</div><div className="text-[10px] font-semibold text-muted-foreground">End your session</div></div>
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
              <button
                key={item.id}
                onClick={() => { setPanel(item.id); setShowMore(false); }}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all ${active ? 'bg-gradient-to-br from-[hsl(170,60%,45%)] to-[hsl(170,60%,38%)] text-white shadow-md scale-105' : 'text-muted-foreground'}`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-[9px] font-extrabold">{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => setShowMore(true)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl ${showMore ? 'bg-foreground text-background' : 'text-muted-foreground'}`}
          >
            <span className="text-base">⋯</span>
            <span className="text-[9px] font-extrabold">More</span>
          </button>
        </div>
      </div>
    </div>
  );
};
