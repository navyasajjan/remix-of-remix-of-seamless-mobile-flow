import React, { useEffect, useState } from 'react';

export const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(onFinish, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[hsl(var(--splash-bg-from))] via-[hsl(var(--splash-bg-via))] to-[hsl(var(--splash-bg-to))] overflow-hidden">
      {/* Animated rings */}
      <div className={`absolute w-[500px] h-[500px] rounded-full border border-white/[0.04] transition-all duration-[1.5s] ease-out ${phase >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
      <div className={`absolute w-[700px] h-[700px] rounded-full border border-white/[0.03] transition-all duration-[2s] ease-out delay-300 ${phase >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
      <div className={`absolute w-[900px] h-[900px] rounded-full border border-white/[0.02] transition-all duration-[2.5s] ease-out delay-500 ${phase >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))]/40 animate-float"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}

      <div className="relative flex flex-col items-center z-10">
        {/* Logo mark */}
        <div className={`transition-all duration-700 ease-out ${phase >= 1 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-75'}`}>
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rotate-6 opacity-60 blur-sm" />
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center shadow-2xl">
              <span className="text-3xl font-display font-bold text-white tracking-tight">M</span>
            </div>
          </div>
        </div>

        {/* Brand name */}
        <div className={`transition-all duration-700 delay-300 ease-out ${phase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
          <h1 className="font-display text-4xl font-bold text-white tracking-tight mb-1">
            Mano<span className="text-[hsl(var(--primary))]">Setu</span>
          </h1>
        </div>

        {/* Tagline */}
        <div className={`transition-all duration-700 delay-500 ease-out ${phase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <p className="text-white/50 text-sm font-semibold tracking-wide mt-2">CDC Partner Portal</p>
        </div>

        {/* Loading bar */}
        <div className={`mt-8 w-48 h-1 rounded-full bg-white/10 overflow-hidden transition-all duration-500 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`h-full rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] transition-all duration-[1.5s] ease-out ${phase >= 2 ? 'w-full' : 'w-0'}`} />
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-500 delay-200 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white/30 text-xs font-semibold mt-4">Empowering Child Development</p>
        </div>
      </div>
    </div>
  );
};
