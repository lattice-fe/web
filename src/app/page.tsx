"use client";

import React, { useCallback, useEffect, useState } from "react";

// Drop your screenshots into public/shots/ and list them here.
// Any width works; they're shown inside a framed browser-ish card.
const SHOTS: { src: string; caption: string }[] = [
  { src: "/shots/watson.png", caption: "Ask watson about a file and it actually reads it before answering." },
  { src: "/shots/explorer-cards.png", caption: "Hover a file to peek inside without opening it." },
  { src: "/shots/split-preview.png", caption: "Read a file right next to the folder it lives in." },
  { src: "/shots/spotlight.png", caption: "One shortcut for search, math, commands, or a quick question." },
  { src: "/shots/spotlight-watson.png", caption: "Say what you want in plain words, get back the exact command." },
  { src: "/shots/spotlight-kind-search.png", caption: "Search by kind or by meaning, across every drive at once." },
  { src: "/shots/spotlight-create-note.png", caption: "Jot a note without leaving what you're doing." },
  { src: "/shots/keep.png", caption: "Notes and checklists, right next to your files." },
];

const THEME = {
  background: "#121212",
  color: "#e0e0e0",
  "--ink": "#121212",
  "--ink-2": "#181818",
  "--card": "#1e1e1e",
  "--border": "#333333",
  "--dim": "#9e9e9e",
  "--terracotta": "#5f6b78",
  "--amber": "#6b7b89",
  "--sans": "'Google Sans', system-ui, sans-serif",
  "--mono": "'Google Sans Code', ui-monospace, monospace",
} as React.CSSProperties;

const REPO = "https://github.com/lattice-fe/lattice";

function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} style={{ display: "block" }}>
      <g fill="none" stroke="var(--terracotta)" strokeWidth="2" strokeLinecap="round" opacity="0.92">
        <line x1="10" y1="10" x2="38" y2="10" /><line x1="10" y1="38" x2="38" y2="38" />
        <line x1="10" y1="10" x2="10" y2="38" /><line x1="38" y1="10" x2="38" y2="38" />
        <line x1="10" y1="24" x2="38" y2="24" /><line x1="24" y1="10" x2="24" y2="38" />
      </g>
      <g fill="var(--terracotta)"><circle cx="10" cy="10" r="3.1" /><circle cx="38" cy="10" r="3.1" /><circle cx="10" cy="38" r="3.1" /><circle cx="38" cy="38" r="3.1" /><circle cx="24" cy="10" r="3.1" /><circle cx="10" cy="24" r="3.1" /><circle cx="38" cy="24" r="3.1" /><circle cx="24" cy="38" r="3.1" /></g>
      <circle cx="24" cy="24" r="7.4" fill="none" stroke="var(--amber)" strokeWidth="1.5" opacity="0.45" />
      <circle cx="24" cy="24" r="4.4" fill="var(--amber)" />
    </svg>
  );
}

// basePath prefix for static assets referenced via plain <img> (Next only
// auto-prefixes its own /_next assets, not these). Empty on root hosts (CF Pages).
const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function LandingPage() {
  const [i, setI] = useState(0);
  const n = SHOTS.length;
  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // swipe: horizontal drag past 40px advances; ignore mostly-vertical drags (scrolling)
  const touch = React.useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    touch.current = null;
  };

  return (
    <div style={{ ...THEME, minHeight: "100vh", fontFamily: "var(--sans)", display: "flex", flexDirection: "column" }}>
      {/* header */}
      <header style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Mark />
          <span style={{ fontWeight: 600, fontSize: 16 }}>lattice</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
          <a href={REPO} target="_blank" rel="noreferrer" style={{ color: "var(--dim)", textDecoration: "none", padding: "6px 12px", border: "1px solid var(--border)", borderRadius: 8 }}>GitHub</a>
          <a href={`${REPO}/releases`} target="_blank" rel="noreferrer" style={{ color: "#fff", background: "var(--terracotta)", textDecoration: "none", padding: "7px 14px", borderRadius: 8, fontWeight: 500 }}>Download</a>
        </div>
      </header>

      {/* hero */}
      <main style={{ flex: 1, width: "100%", maxWidth: 960, margin: "0 auto", padding: "72px 24px 48px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{ fontSize: "clamp(30px, 6vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.12, margin: 0, maxWidth: 680 }}>
          An agentic workspace for your filesystem.
        </h1>
        <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.6, color: "var(--dim)", maxWidth: 580 }}>
          Search every file by name, contents, or meaning — then hand any of them to watson,
          an assistant that reads and reasons over what&apos;s on your disk.
        </p>
        <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.5, color: "var(--dim-2, #666)", maxWidth: 520, fontFamily: "var(--mono)" }}>
          Your files and index stay local. watson connects to the model you choose.
        </p>

        <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a href={`${REPO}/releases`} target="_blank" rel="noreferrer" style={{ color: "#fff", background: "var(--terracotta)", textDecoration: "none", padding: "11px 22px", borderRadius: 9, fontWeight: 500, fontSize: 14 }}>Download for Windows</a>
          <a href={REPO} target="_blank" rel="noreferrer" style={{ background: "var(--card)", border: "1px solid var(--border)", textDecoration: "none", padding: "11px 22px", borderRadius: 9, fontSize: 14, fontFamily: "var(--mono)", color: "#e0e0e0" }}>view source</a>
        </div>

        {/* carousel */}
        <section style={{ marginTop: 56, width: "100%", position: "relative" }}>
          <style>{`@media (max-width:640px){.car-arrow{display:none!important}}`}</style>
          {/* soft glow behind the frame */}
          <div aria-hidden style={{ position: "absolute", inset: "-8% 6% 12%", background: "radial-gradient(60% 60% at 50% 30%, rgba(95,107,120,.28), transparent 70%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />

          {/* arrows live OUTSIDE the frame so nothing overlays their hit area */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 10 }}>
            {n > 1 && <button type="button" className="car-arrow" onClick={() => go(-1)} aria-label="Previous" style={arrowStyle()}>‹</button>}

            <div style={{ flex: 1, minWidth: 0, borderRadius: 14, border: "1px solid var(--border)", background: "var(--ink-2)", overflow: "hidden", boxShadow: "inset 0 1px 0 rgba(255,255,255,.05), 0 2px 6px rgba(0,0,0,.4), 0 18px 40px -12px rgba(0,0,0,.55), 0 40px 80px -24px rgba(0,0,0,.7)" }}>
              <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ position: "relative", aspectRatio: "16 / 9", background: "var(--ink)", touchAction: "pan-y" }}>
                {/* placeholder shown until a real screenshot loads over it */}
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: "var(--dim)", opacity: 0.4 }}>
                  <Mark size={40} />
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12 }}>screenshot</span>
                </div>
                {SHOTS.map((s, idx) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={s.src}
                    src={BP + s.src}
                    alt={s.caption}
                    draggable={false}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "opacity .35s ease", opacity: idx === i ? 1 : 0 }}
                  />
                ))}
              </div>
            </div>

            {n > 1 && <button type="button" className="car-arrow" onClick={() => go(1)} aria-label="Next" style={arrowStyle()}>›</button>}
          </div>

          {/* caption + dots */}
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 13, color: "var(--dim)", fontFamily: "var(--mono)", minHeight: 18 }}>{SHOTS[i]?.caption}</div>
            <div style={{ display: "flex", gap: 2 }}>
              {SHOTS.map((s, idx) => (
                // wrapper gives a ~40px tap target; inner span is the visible pill
                <button key={s.src} type="button" onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`}
                  style={{ appearance: "none", WebkitAppearance: "none", border: "none", background: "transparent", cursor: "pointer", touchAction: "manipulation", WebkitTapHighlightColor: "transparent", padding: 14, margin: -6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ display: "block", width: idx === i ? 22 : 8, height: 8, borderRadius: 4, background: idx === i ? "var(--terracotta)" : "var(--border)", transition: "all .25s ease" }} />
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", fontSize: 13, color: "var(--dim)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Mark size={16} />
          <span>lattice — an agentic workspace for your filesystem · AGPL-3.0</span>
        </div>
        <div style={{ display: "flex", gap: 20, fontFamily: "var(--mono)" }}>
          <a href={REPO} target="_blank" rel="noreferrer" style={{ color: "var(--dim)", textDecoration: "none" }}>GitHub</a>
          <a href={`${REPO}/blob/master/CHANGELOG.md`} target="_blank" rel="noreferrer" style={{ color: "var(--dim)", textDecoration: "none" }}>Changelog</a>
          <a href={`${REPO}/releases`} target="_blank" rel="noreferrer" style={{ color: "var(--dim)", textDecoration: "none" }}>Releases</a>
        </div>
      </footer>
    </div>
  );
}

function arrowStyle(): React.CSSProperties {
  return {
    flex: "none", width: 44, height: 44, borderRadius: "50%",
    border: "1px solid var(--border)", background: "var(--card)", color: "#e0e0e0",
    fontSize: 22, lineHeight: 1,
    cursor: "pointer", touchAction: "manipulation", WebkitTapHighlightColor: "transparent",
    appearance: "none", WebkitAppearance: "none",
    display: "flex", alignItems: "center", justifyContent: "center",
  } as React.CSSProperties;
}
