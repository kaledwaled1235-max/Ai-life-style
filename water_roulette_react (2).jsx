import React, { useState, useEffect } from "react";

export default function WaterRoulette() {
  const CHAMBERS = 6;
  const [loadedIndex, setLoadedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fired, setFired] = useState(false);
  const [splash, setSplash] = useState(false);
  const [message, setMessage] = useState("Ready — pull the trigger!");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    resetLoaded();
  }, []);

  function resetLoaded() {
    const idx = Math.floor(Math.random() * CHAMBERS);
    setLoadedIndex(idx);
    setMessage("New round — pull the trigger!");
    setCurrentIndex(0);
    setFired(false);
    setSplash(false);
    setStreak(0);
  }

  function pullTrigger() {
    if (fired) return;
    setFired(true);
    setMessage("Click...");

    setTimeout(() => {
      if (currentIndex === loadedIndex) {
        setSplash(true);
        setMessage("SPLASH! You got wet 😅");
        setStreak((s) => s + 1);

        setTimeout(() => {
          resetLoaded();
        }, 1400);
      } else {
        setMessage("Safe — chamber empty.");
        setCurrentIndex((prev) => (prev + 1) % CHAMBERS);
        setTimeout(() => {
          setFired(false);
        }, 600);
      }
    }, 900);
  }

  function renderChambers() {
    const items = [];
    const size = 240;
    const center = size / 2;
    const radius = 88;

    for (let i = 0; i < CHAMBERS; i++) {
      const angle = (i / CHAMBERS) * Math.PI * 2 - Math.PI / 2;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      const isActive = i === currentIndex;

      items.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x + 'px',
            top: y + 'px',
            width: 36,
            height: 36,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
            transform: 'translate(-50%,-50%)',
            transition: 'all .2s',
            background: isActive ? '#2563eb' : '#e2e8f0',
            color: isActive ? '#fff' : '#1e293b',
          }}
        >
          {i + 1}
        </div>
      );
    }

    return (
      <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '8px solid #e6eefb', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg,#fff,#f8fafc)' }}>
          <div style={{ width: 112, height: 112, borderRadius: '50%' }} />
        </div>
        {items}
        <div style={{ position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%) translateY(-50%)' }}>
          <div style={{ width: 6, height: 14, background: '#dc2626', borderRadius: 3 }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'linear-gradient(135deg,#f1f7ff,#eef2ff)' }}>
      <div style={{ width: '980px', maxWidth: '96vw', background: '#ffffff', borderRadius: 18, padding: 20, boxShadow: '0 8px 30px rgba(17,24,39,0.06)', border: '1px solid rgba(15,23,42,0.04)' }}>
        <h1 style={{ fontSize: 20, margin: 0, textAlign: 'center' }}>Water Roulette</h1>
        <p style={{ marginTop: 8, marginBottom: 12, textAlign: 'center', color: '#6b7280', fontSize: 13 }}>Pull the trigger — one chamber squirts water.</p>

        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            {renderChambers()}
            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#6b7280' }}>Current chamber</div>
              <div style={{ fontFamily: 'monospace', fontWeight: 700 }}>{currentIndex + 1} / {CHAMBERS}</div>
            </div>
          </div>

          <div style={{ width: 260, flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 220, height: 110, marginBottom: 10 }}>
                <div style={{ position: 'absolute', left: 0, top: 30, width: 160, height: 36, background: '#111827', borderRadius: 10, transform: 'rotate(8deg)', boxShadow: '0 8px 18px rgba(17,24,39,0.12)' }} />
                <div style={{ position: 'absolute', right: 0, top: 46, width: 72, height: 42, background: '#111827', borderRadius: 8, transform: 'rotate(10deg)' }} />
                <div style={{ position: 'absolute', left: 36, top: 64, width: 18, height: 22, background: '#111827', borderRadius: 4 }} />

                <div style={{ position: 'absolute', right: -10, top: 6, width: 140, height: 120, pointerEvents: 'none', opacity: splash ? 1 : 0, transition: 'opacity .12s' }}>
                  <svg viewBox="0 0 120 120" width="120" height="120" style={{ display: 'block', animation: splash ? 'splashAnim 900ms ease-out forwards' : 'none' }}>
                    <g>
                      <circle cx="24" cy="60" r="18" fill="rgba(37,99,235,0.16)" />
                      <path d="M36 48 C56 40, 82 46, 100 36" stroke="rgba(37,99,235,0.95)" strokeWidth="4" fill="none" strokeLinecap="round" />
                      <path d="M34 66 C58 74, 88 68, 102 86" stroke="rgba(37,99,235,0.7)" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </g>
                  </svg>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                <button onClick={pullTrigger} disabled={fired} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e6eefb', background: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                  Pull Trigger
                </button>

                <button onClick={resetLoaded} style={{ padding: '10px 12px', borderRadius: 10, background: '#fff', border: '1px solid #e6eefb', fontWeight: 700, cursor: 'pointer' }}>
                  Reset / New Round
                </button>
              </div>

              <div style={{ marginTop: 12, textAlign: 'center', fontSize: 13, color: '#6b7280' }}>
                <div style={{ fontSize: 12 }}>Streak (wet pulls)</div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>{streak}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, textAlign: 'center', padding: '8px 10px', borderRadius: 8, background: '#fff7ed', border: '1px solid #ffedd5', color: '#92400e' }}>{message}</div>
        <div style={{ marginTop: 8, textAlign: 'center', fontSize: 13, color: '#6b7280' }}>Made for fun — water only. No weapons, no harm.</div>

        <style>{`
          @keyframes splashAnim {
            0% { transform: translateX(0) scale(0.6); opacity: 1 }
            60% { transform: translateX(28px) scale(1.05); opacity: 1 }
            100% { transform: translateX(60px) scale(0.9); opacity: 0 }
          }
        `}</style>
      </div>
    </div>
  );
}
