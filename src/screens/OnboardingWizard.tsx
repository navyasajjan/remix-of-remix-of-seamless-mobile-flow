import React, { useState } from 'react';
import { useAppState } from '../context/AppState';

const steps = [
  { num: 1, label: 'Account' },
  { num: 2, label: 'Details' },
  { num: 3, label: 'Docs' },
  { num: 4, label: 'Services' },
  { num: 5, label: 'Plan' },
  { num: 6, label: 'Review' },
];

const services = [
  { emoji: '🗣️', name: 'Speech Therapy' },
  { emoji: '🤲', name: 'Occupational Therapy' },
  { emoji: '🦶', name: 'Physiotherapy' },
  { emoji: '🧩', name: 'ABA Therapy' },
  { emoji: '📚', name: 'Special Education' },
  { emoji: '🎨', name: 'Art Therapy' },
  { emoji: '🎵', name: 'Music Therapy' },
  { emoji: '🧠', name: 'Behaviour Therapy' },
  { emoji: '🌐', name: 'Teletherapy' },
  { emoji: '👨‍👩‍👧', name: 'Parent Training' },
  { emoji: '📋', name: 'Assessments' },
  { emoji: '🏫', name: 'School Readiness' },
];

const requiredDocs = [
  { id: 'dc1', icon: '🏛️', name: 'Registration Certificate', hint: 'Society/Trust/Company' },
  { id: 'dc2', icon: '🪪', name: 'PAN Card', hint: 'Institution / Owner' },
  { id: 'dc3', icon: '🪪', name: 'Owner ID Proof', hint: 'Aadhaar / Passport' },
  { id: 'dc4', icon: '📬', name: 'Address Proof', hint: 'Utility bill / Lease' },
];

const optionalDocs = [
  { id: 'dc5', icon: '📄', name: 'GST Certificate', hint: 'If applicable' },
  { id: 'dc6', icon: '⚕️', name: 'Medical Council', hint: 'If applicable' },
  { id: 'dc7', icon: '📋', name: 'MOA / AOA', hint: 'Memorandum' },
  { id: 'dc8', icon: '📷', name: 'Centre Photos', hint: 'Therapy rooms' },
];

const plans = [
  { id: 'starter', price: '₹0', period: '/mo', name: 'Starter', feats: ['Up to 2 therapists', '20 sessions/month', 'Basic SOAP notes', 'ManoSetu listing'], popular: false },
  { id: 'growth', price: '₹2,999', period: '/mo', name: 'Growth', feats: ['Up to 6 therapists', 'Unlimited sessions', 'AI SOAP assistant', 'Revenue analytics', 'Parent portal'], popular: true },
  { id: 'advanced', price: '₹6,999', period: '/mo', name: 'Advanced', feats: ['Unlimited therapists', 'Multi-branch', 'Custom branding', 'Priority review', 'Dedicated CSM'], popular: false },
];

export const OnboardingWizard = () => {
  const { wizardOpen, setWizardOpen, uploadedDocs, addDoc, selectedPlan, setSelectedPlan, toast, setScreen } = useAppState();
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedSvcs, setSelectedSvcs] = useState<Set<string>>(new Set());
  const [finalChecks, setFinalChecks] = useState<Set<number>>(new Set());

  if (!wizardOpen) return null;

  const getStepState = (num: number) => {
    if (num < currentStep) return 'done';
    if (num === currentStep) return 'active';
    return 'pending';
  };

  const goNext = () => {
    if (currentStep === 3 && uploadedDocs.size < 4) {
      toast('Please upload all 4 required documents', 'error');
      return;
    }
    if (currentStep < 6) setCurrentStep(currentStep + 1);
    else { setWizardOpen(false); setScreen('verify'); }
  };

  const goPrev = () => { if (currentStep > 2) setCurrentStep(currentStep - 1); };
  const closeWizard = () => { setWizardOpen(false); setScreen('verify'); };
  const handleDocUpload = (docId: string, name: string) => { addDoc(docId); toast(name + ' uploaded!', 'success'); };
  const toggleSvc = (name: string) => { setSelectedSvcs(prev => { const n = new Set(prev); n.has(name) ? n.delete(name) : n.add(name); return n; }); };
  const toggleFC = (idx: number) => { setFinalChecks(prev => { const n = new Set(prev); n.has(idx) ? n.delete(idx) : n.add(idx); return n; }); };
  const reqCount = ['dc1', 'dc2', 'dc3', 'dc4'].filter(id => uploadedDocs.has(id)).length;

  const inputClass = "w-full px-3.5 py-3 border-2 border-border rounded-xl text-[13px] font-semibold text-foreground bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[800] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-[600px] max-h-[95vh] flex flex-col shadow-2xl animate-modal-in border border-white/50">
        {/* Header */}
        <div className="px-5 pt-5 border-b border-border shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-[hsl(280,60%,55%)] flex items-center justify-center">
                <span className="text-white text-xs font-black">M</span>
              </div>
              <span className="font-display text-[14px] font-extrabold text-foreground">Setup Wizard</span>
            </div>
            <button onClick={closeWizard} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[13px] text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">✕</button>
          </div>
          {/* Stepper */}
          <div className="flex items-start pb-5 overflow-x-auto gap-0">
            {steps.map((step, i) => {
              const state = getStepState(step.num);
              return (
                <React.Fragment key={step.num}>
                  <div className="flex flex-col items-center relative min-w-[32px]">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black z-10 transition-all ${
                      state === 'done' ? 'border-emerald-500 bg-emerald-500 text-white' :
                      state === 'active' ? 'border-primary bg-primary text-white shadow-md shadow-primary/30' :
                      'border-border bg-white text-muted-foreground'
                    }`}>
                      {state === 'done' ? '✓' : step.num}
                    </div>
                    <span className={`absolute top-8 text-[7px] font-extrabold whitespace-nowrap uppercase tracking-wide ${
                      state === 'active' ? 'text-primary' : state === 'done' ? 'text-emerald-500' : 'text-muted-foreground'
                    }`}>{step.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mt-3 mx-0.5 rounded-full transition-colors ${state === 'done' ? 'bg-emerald-500' : 'bg-border'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-base font-display font-extrabold text-foreground mb-1 flex items-center gap-2">🏥 Centre Details</h3>
              <p className="text-[12px] text-muted-foreground font-semibold mb-5">Tell us about your CDC</p>
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                <div>
                  <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">Year Est. <span className="text-destructive">*</span></label>
                  <select className={inputClass + " appearance-none"}>
                    <option value="">Select</option><option>2024</option><option>2023</option><option>2022</option><option>2021</option><option>2020</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">Therapists <span className="text-destructive">*</span></label>
                  <select className={inputClass + " appearance-none"}>
                    <option value="">Select</option><option>1–2</option><option>3–5</option><option>6–10</option><option>10+</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">Centre Type <span className="text-destructive">*</span></label>
                <select className={inputClass + " appearance-none"}>
                  <option value="">Select</option><option>Private Clinic</option><option>Hospital-based</option><option>NGO / Trust</option><option>Government CDC</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">Full Address <span className="text-destructive">*</span></label>
                <textarea className={inputClass + " resize-y min-h-[64px]"} rows={2} placeholder="Door no., Street, Area, City, PIN" />
              </div>
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                <div>
                  <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">PAN <span className="text-destructive">*</span></label>
                  <input className={inputClass} placeholder="AAACC1234D" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1.5 block">GST</label>
                  <input className={inputClass} placeholder="Optional" />
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2 items-start">
                <span className="text-sm shrink-0">⚠️</span>
                <span className="text-[11px] font-semibold text-amber-700 leading-relaxed">Ensure info matches your registration documents.</span>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-base font-display font-extrabold text-foreground mb-1 flex items-center gap-2">📁 Documents</h3>
              <p className="text-[12px] text-muted-foreground font-semibold mb-4">Upload for verification. JPG, PNG, PDF (max 5MB)</p>
              <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-primary/10 rounded-xl p-3 flex gap-2 items-start mb-4">
                <span className="text-base shrink-0">🔒</span>
                <span className="text-[11px] font-semibold text-muted-foreground leading-relaxed">All docs are <strong className="text-primary font-extrabold">AES-256 encrypted</strong>.</span>
              </div>
              <p className="text-[10px] font-extrabold text-foreground uppercase tracking-wider mb-2">📌 Required</p>
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {requiredDocs.map(doc => (
                  <div key={doc.id} className={`border-2 ${uploadedDocs.has(doc.id) ? 'border-emerald-300 bg-emerald-50' : 'border-dashed border-border bg-muted/30'} rounded-xl p-3 flex flex-col items-center gap-1 cursor-pointer text-center relative min-h-[90px] justify-center transition-all active:scale-95`}
                    onClick={() => handleDocUpload(doc.id, doc.name)}>
                    {!uploadedDocs.has(doc.id) && <span className="absolute -top-2 -right-1 text-[8px] font-black bg-destructive text-white px-1.5 py-0.5 rounded-full">REQ</span>}
                    <span className="text-xl">{doc.icon}</span>
                    <span className="text-[10.5px] font-extrabold text-foreground leading-tight">{doc.name}</span>
                    <span className="text-[9px] text-muted-foreground font-semibold">{doc.hint}</span>
                    {uploadedDocs.has(doc.id) && <span className="text-[10px] font-extrabold text-emerald-500">✓ Done</span>}
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-extrabold text-foreground uppercase tracking-wider mb-2">📎 Recommended</p>
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                {optionalDocs.map(doc => (
                  <div key={doc.id} className={`border-2 ${uploadedDocs.has(doc.id) ? 'border-emerald-300 bg-emerald-50' : 'border-dashed border-border bg-muted/30'} rounded-xl p-3 flex flex-col items-center gap-1 cursor-pointer text-center relative min-h-[90px] justify-center transition-all active:scale-95`}
                    onClick={() => handleDocUpload(doc.id, doc.name)}>
                    <span className="text-xl">{doc.icon}</span>
                    <span className="text-[10.5px] font-extrabold text-foreground leading-tight">{doc.name}</span>
                    <span className="text-[9px] text-muted-foreground font-semibold">{doc.hint}</span>
                    {uploadedDocs.has(doc.id) && <span className="text-[10px] font-extrabold text-emerald-500">✓ Done</span>}
                  </div>
                ))}
              </div>
              <p className="text-[12px] font-bold text-muted-foreground">{reqCount}/4 required uploaded</p>
            </div>
          )}

          {/* Step 4: Services */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              <h3 className="text-base font-display font-extrabold text-foreground mb-1 flex items-center gap-2">🧠 Services</h3>
              <p className="text-[12px] text-muted-foreground font-semibold mb-4">Select therapy types your CDC provides</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {services.map(svc => (
                  <div key={svc.name} onClick={() => toggleSvc(svc.name)} className={`p-2.5 rounded-xl border-2 text-center cursor-pointer transition-all active:scale-95 ${selectedSvcs.has(svc.name) ? 'border-primary bg-violet-50 shadow-sm' : 'border-border bg-white'}`}>
                    <span className="text-lg block mb-0.5">{svc.emoji}</span>
                    <span className={`text-[10px] font-extrabold ${selectedSvcs.has(svc.name) ? 'text-primary' : 'text-muted-foreground'}`}>{svc.name}</span>
                  </div>
                ))}
              </div>
              <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2 block">Age Groups <span className="text-destructive">*</span></label>
              <div className="flex gap-2 flex-wrap mb-4">
                {['0–2 yrs', '2–6 yrs', '6–12 yrs', '12–18 yrs', 'Adults'].map(age => (
                  <label key={age} className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground cursor-pointer bg-muted/50 px-2.5 py-1.5 rounded-lg border border-border">
                    <input type="checkbox" className="accent-primary rounded" defaultChecked={age === '2–6 yrs' || age === '6–12 yrs'} /> {age}
                  </label>
                ))}
              </div>
              <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2 block">Conditions</label>
              <div className="flex gap-2 flex-wrap mb-4">
                {['Autism (ASD)', 'ADHD', 'Speech Delay', 'Cerebral Palsy', 'Down Syndrome', 'Dev. Delay'].map(c => (
                  <label key={c} className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground cursor-pointer bg-muted/50 px-2.5 py-1.5 rounded-lg border border-border">
                    <input type="checkbox" className="accent-primary rounded" defaultChecked={c === 'Autism (ASD)' || c === 'Speech Delay'} /> {c}
                  </label>
                ))}
              </div>
              <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2 block">Languages <span className="text-destructive">*</span></label>
              <div className="flex gap-2 flex-wrap">
                {['English', 'Telugu', 'Hindi', 'Tamil', 'Kannada'].map(l => (
                  <label key={l} className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground cursor-pointer bg-muted/50 px-2.5 py-1.5 rounded-lg border border-border">
                    <input type="checkbox" className="accent-primary rounded" defaultChecked={l === 'English' || l === 'Telugu'} /> {l}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Plan */}
          {currentStep === 5 && (
            <div className="animate-fade-in">
              <h3 className="text-base font-display font-extrabold text-foreground mb-1 flex items-center gap-2">💎 Choose Plan</h3>
              <p className="text-[12px] text-muted-foreground font-semibold mb-4">Start free. Upgrade anytime.</p>
              <div className="flex flex-col gap-3 mb-4">
                {plans.map(plan => (
                  <div key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`border-2 rounded-2xl p-4 cursor-pointer transition-all relative active:scale-[0.98] ${selectedPlan === plan.id ? 'border-primary bg-violet-50 shadow-md' : 'border-border bg-white'}`}>
                    {plan.popular && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white text-[8px] font-black px-2.5 py-0.5 rounded-full tracking-wider">POPULAR</span>}
                    <div className="font-display text-xl font-extrabold text-foreground">{plan.price}<small className="text-sm font-semibold text-muted-foreground">{plan.period}</small></div>
                    <div className="text-[12px] font-extrabold text-foreground mt-0.5 mb-2">{plan.name}</div>
                    <div className="flex flex-col gap-1">
                      {plan.feats.map(f => (
                        <div key={f} className="text-[10.5px] font-semibold text-muted-foreground flex gap-1.5"><span className="text-emerald-500 font-black">✓</span> {f}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-primary/10 rounded-xl p-3 flex gap-2 items-start">
                <span className="text-base shrink-0">🎁</span>
                <span className="text-[11px] font-semibold text-muted-foreground leading-relaxed"><strong className="text-primary font-extrabold">First 3 months free</strong> on Growth & Advanced.</span>
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {currentStep === 6 && (
            <div className="animate-fade-in">
              <h3 className="text-base font-display font-extrabold text-foreground mb-1 flex items-center gap-2">✅ Review & Submit</h3>
              <p className="text-[12px] text-muted-foreground font-semibold mb-4">Confirm before submitting</p>
              
              <div className="bg-muted/50 rounded-xl p-3.5 mb-3 border border-border">
                <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2">Centre Info</p>
                {[['Name', 'BrightMinds CDC'], ['Contact', 'Dr. Ramesh Kumar'], ['Location', 'Hyderabad, TG'], ['Type', 'Private Clinic']].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-1.5 border-b border-border last:border-none">
                    <span className="text-[11px] font-bold text-muted-foreground">{k}</span>
                    <span className="text-[11px] font-extrabold text-foreground">{v}</span>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-xl p-3.5 mb-3 border border-border">
                <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2">Documents</p>
                {['Registration Certificate', 'PAN Card', 'Owner ID Proof', 'Address Proof'].map((name, i) => (
                  <div key={name} className="flex items-center justify-between py-1.5 border-b border-border last:border-none">
                    <span className="text-[11px] font-bold text-muted-foreground">{name}</span>
                    <span className={`text-[11px] font-extrabold ${uploadedDocs.has('dc' + (i + 1)) ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {uploadedDocs.has('dc' + (i + 1)) ? '✓ Done' : '⏳'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-xl p-3.5 mb-4 border border-border">
                <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2">Plan</p>
                {[['Plan', selectedPlan === 'starter' ? 'Starter — Free' : selectedPlan === 'growth' ? 'Growth — ₹2,999/mo' : 'Advanced — ₹6,999/mo'], ['Trial', '3 months free'], ['Review', '2–3 days']].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-1.5 border-b border-border last:border-none">
                    <span className="text-[11px] font-bold text-muted-foreground">{k}</span>
                    <span className="text-[11px] font-extrabold text-primary">{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 mb-4">
                {['All submitted information is accurate', 'I agree to CDC Partner Code of Ethics', 'False info may result in suspension'].map((text, i) => (
                  <div key={i} onClick={() => toggleFC(i)} className={`flex items-center gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-all ${finalChecks.has(i) ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-border'}`}>
                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center text-[10px] shrink-0 transition-all ${finalChecks.has(i) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-border bg-white'}`}>
                      {finalChecks.has(i) ? '✓' : ''}
                    </div>
                    <span className={`text-[11px] font-bold ${finalChecks.has(i) ? 'text-emerald-600' : 'text-muted-foreground'}`}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-border flex items-center gap-3 shrink-0 bg-white rounded-b-3xl">
          {currentStep > 2 && (
            <button onClick={goPrev} className="px-4 py-2.5 rounded-xl border-2 border-border text-[12px] font-extrabold text-muted-foreground active:scale-95 transition-transform">← Back</button>
          )}
          <span className="text-[11px] font-bold text-muted-foreground whitespace-nowrap">{currentStep}/6</span>
          <button onClick={goNext} className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-primary to-[hsl(280,60%,55%)] text-white font-extrabold text-[13px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-lg">
            {currentStep === 6 ? '🚀 Submit' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
};
