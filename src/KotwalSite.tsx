import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  Shield,
  Code2,
  Globe,
  Activity,
  ScrollText,
  Smartphone,
  Send,
  ArrowRight,
  Check,
  Github,
  Download,
  FileText,
  Terminal,
  Sparkles,
} from "lucide-react";
import {
  C,
  F,
  GITHUB_URL,
  GUMROAD_URL,
  EMAIL_ADDRESS,
  PARENT_SITE,
  SAMPLE_REPORT_URL,
} from "./design";

/* ═══════════════════════════════════════════════════════════════════
   KOTWAL — Landing
   Sibling aesthetic to CloudSaathi (warm cream + serif/sans + Devanagari).
   Kotwal palette: maroon primary, orange accent, plum quiet.
   ═══════════════════════════════════════════════════════════════════ */

// ─── Reveal-on-scroll ────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function Rv({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, v] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Devanagari hover flip ───────────────────────────────────────────
function DvH({ en, dv, color = C.maroon }: { en: string; dv: string; color?: string }) {
  const [h, setH] = useState(false);
  return (
    <span
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ position: "relative", display: "inline-block", cursor: "default" }}
    >
      <span style={{ opacity: h ? 0 : 1, transition: "opacity 0.35s" }}>{en}</span>
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          opacity: h ? 1 : 0,
          transition: "opacity 0.35s",
          fontFamily: F.dv,
          color,
          whiteSpace: "nowrap",
        }}
      >
        {dv}
      </span>
    </span>
  );
}

// ─── Section label ───────────────────────────────────────────────────
function SL({ text }: { text: string }) {
  return (
    <p
      style={{
        fontFamily: F.m,
        fontSize: 10,
        letterSpacing: 4,
        color: C.maroon,
        textTransform: "uppercase",
        marginBottom: 14,
      }}
    >
      {text}
    </p>
  );
}

// ─── Background watermark — Sanskrit security idioms ─────────────────
function DvWatermark({ opacity = 0.025 }: { opacity?: number }) {
  const lines = [
    'const सुरक्षा = audit(repo);',
    'let चौकीदार = scan.secrets();',
    '// सतर्कता: vigilance',
    'await जासूस.probe(target);',
    '// पारदर्शिता: transparency',
    'return विश्वास.verify();',
    'const निरीक्षक = compliance.check();',
    '// कोतवाल: city watchman',
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -20,
          left: -60,
          right: -60,
          bottom: -20,
          transform: "rotate(-3deg)",
        }}
      >
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              fontFamily: F.m,
              fontSize: 11,
              color: C.ink,
              lineHeight: "50px",
              whiteSpace: "nowrap",
              paddingLeft: (i % 3) * 140,
            }}
          >
            {Array(5).fill(l).join("            ")}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Logo ────────────────────────────────────────────────────────────
function Logo({ size = 18 }: { size?: number }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}
    >
      <div
        style={{
          width: size / 3,
          height: size / 3,
          borderRadius: "50%",
          background: C.maroon,
          transition: "transform 0.3s",
          transform: h ? "scale(1.4)" : "scale(1)",
        }}
      />
      <span style={{ fontFamily: F.d, fontSize: size, color: C.ink, fontWeight: 500 }}>
        kot
        <span style={{ position: "relative", display: "inline-block" }}>
          <span style={{ opacity: h ? 0 : 1, transition: "opacity 0.4s" }}>wal</span>
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              opacity: h ? 1 : 0,
              transition: "opacity 0.4s",
              fontFamily: F.dv,
              fontSize: size - 1,
              fontWeight: 500,
              color: C.maroon,
            }}
          >
            वाल
          </span>
        </span>
      </span>
    </div>
  );
}

// ─── Buttons ─────────────────────────────────────────────────────────
function PrimaryBtn({
  href,
  children,
  external = true,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: F.m,
        padding: "12px 22px",
        fontSize: 12,
        borderRadius: 3,
        letterSpacing: 0.5,
        background: h ? C.maroonD : C.maroon,
        color: C.bgW,
        transition: "all 0.3s",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        textDecoration: "none",
        textTransform: "uppercase",
        fontWeight: 500,
      }}
    >
      {children}
    </a>
  );
}

function GhostBtn({
  href,
  children,
  external = true,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: F.m,
        padding: "12px 22px",
        fontSize: 12,
        borderRadius: 3,
        letterSpacing: 0.5,
        background: "transparent",
        color: C.ink,
        border: `1px solid ${h ? C.ink : C.bdr}`,
        transition: "all 0.3s",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        textDecoration: "none",
        textTransform: "uppercase",
        fontWeight: 500,
      }}
    >
      {children}
    </a>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      aria-label="Primary"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(245,241,232,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.bdr}` : "1px solid transparent",
        transition: "all 0.5s",
        padding: "0 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="#top" style={{ textDecoration: "none" }}>
          <Logo />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a
            href="#how"
            style={{
              fontFamily: F.b,
              fontSize: 13,
              color: C.inkS,
              textDecoration: "none",
              fontWeight: 400,
            }}
          >
            How it works
          </a>
          <a
            href="#agents"
            style={{
              fontFamily: F.b,
              fontSize: 13,
              color: C.inkS,
              textDecoration: "none",
              fontWeight: 400,
            }}
          >
            Sub-agents
          </a>
          <a
            href="#pricing"
            style={{
              fontFamily: F.b,
              fontSize: 13,
              color: C.inkS,
              textDecoration: "none",
              fontWeight: 400,
            }}
          >
            Pricing
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.inkS, display: "flex", alignItems: "center" }}
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <PrimaryBtn href={GUMROAD_URL}>
            Buy $29 <ArrowRight size={13} />
          </PrimaryBtn>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        padding: "140px 32px 80px",
        overflow: "hidden",
      }}
    >
      <DvWatermark />
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Rv>
          <p
            style={{
              fontFamily: F.m,
              fontSize: 11,
              letterSpacing: 4,
              color: C.maroon,
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: C.orange,
                marginRight: 10,
                animation: "pulseDot 2s ease-in-out infinite",
              }}
            />
            AI security agent · Powered by Claude Code
          </p>
        </Rv>

        <Rv delay={0.05}>
          <h1
            style={{
              fontFamily: F.d,
              fontSize: "clamp(40px, 6vw, 68px)",
              lineHeight: 1.05,
              color: C.ink,
              fontWeight: 500,
              margin: "0 0 28px",
              maxWidth: 900,
              letterSpacing: -1,
            }}
          >
            Your Claude Code subscription is now a{" "}
            <span style={{ color: C.maroon, fontStyle: "italic" }}>
              <DvH en="security team" dv="सुरक्षा टीम" />
            </span>
            .
          </h1>
        </Rv>

        <Rv delay={0.12}>
          <p
            style={{
              fontFamily: F.b,
              fontSize: 19,
              lineHeight: 1.6,
              color: C.inkS,
              maxWidth: 680,
              fontWeight: 300,
              margin: "0 0 36px",
            }}
          >
            Kotwal scans your code, pen-tests your live deployment, and writes the fix as a PR.
            One CLI. Six sub-agents. Runs locally — your data never leaves your machine.
          </p>
        </Rv>

        <Rv delay={0.18}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 28 }}>
            <PrimaryBtn href={GUMROAD_URL}>
              Buy on Gumroad — $29 <ArrowRight size={13} />
            </PrimaryBtn>
            <GhostBtn href={SAMPLE_REPORT_URL} external={false}>
              <Download size={13} /> See a sample report
            </GhostBtn>
          </div>
        </Rv>

        <Rv delay={0.24}>
          <div
            style={{
              fontFamily: F.m,
              fontSize: 12,
              color: C.inkM,
              display: "flex",
              gap: 18,
              flexWrap: "wrap",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Check size={13} color={C.green} /> One-time payment
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Check size={13} color={C.green} /> No SaaS lock-in
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Check size={13} color={C.green} /> Runs on your laptop
            </span>
          </div>
        </Rv>

        {/* Terminal preview */}
        <Rv delay={0.32}>
          <div
            style={{
              marginTop: 64,
              maxWidth: 760,
              borderRadius: 8,
              overflow: "hidden",
              border: `1px solid ${C.bdr}`,
              boxShadow: "0 24px 60px -20px rgba(26,26,36,0.18)",
              background: C.bgDark,
            }}
          >
            <div
              style={{
                padding: "10px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#FF5F57",
                }}
              />
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#FEBC2E",
                }}
              />
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#28C840",
                }}
              />
              <span
                style={{
                  marginLeft: 12,
                  fontFamily: F.m,
                  fontSize: 11,
                  color: "#8A8A96",
                }}
              >
                ~/my-app — kotwal
              </span>
            </div>
            <div style={{ padding: "20px 22px", fontFamily: F.m, fontSize: 13.5, lineHeight: 1.7 }}>
              <div style={{ color: "#8A8A96" }}>$ <span style={{ color: "#F5F1E8" }}>kotwal --repo my-org/my-app --url https://app.example.com --ai</span></div>
              <div style={{ color: "#5BB8A6", marginTop: 12 }}>chowkidar  scanning 16 secret patterns, 22 SAST rules, 6 ecosystems...</div>
              <div style={{ color: "#5BB8A6" }}>jasoos     pen-testing live deployment...</div>
              <div style={{ color: "#5BB8A6" }}>mukhbir    checking SSL, headers, uptime...</div>
              <div style={{ color: "#5BB8A6" }}>darogha    verifying branch protection, CODEOWNERS...</div>
              <div style={{ color: "#F58634", marginTop: 12 }}>found     3 critical · 7 high · 12 medium</div>
              <div style={{ color: "#F58634" }}>ai        triaging false positives... 11 dismissed</div>
              <div style={{ color: "#F58634" }}>ai        generating fix code for 11 confirmed findings</div>
              <div style={{ color: "#F5F1E8", marginTop: 12 }}>delivered  reports/audit.docx · PR #142 · email draft saved</div>
              <div style={{ color: "#5BB8A6", marginTop: 12 }}>kotwal score: 78/100 (B) · openssf scorecard: 7.8</div>
            </div>
          </div>
        </Rv>
      </div>
    </section>
  );
}

// ─── Trust strip ─────────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    { label: "OpenSSF Scorecard", note: "compatible scoring" },
    { label: "22 SAST patterns", note: "SQLi · XSS · cmd inj · crypto" },
    { label: "16 secret patterns", note: "AWS · GitHub · Slack · JWT" },
    { label: "6 ecosystems", note: "Python · Node · Flutter · Go · Gradle" },
    { label: "Bandit + Semgrep", note: "industry-standard SAST" },
    { label: "OSV.dev CVE feed", note: "live vuln database" },
  ];
  return (
    <section
      style={{
        padding: "48px 32px",
        borderTop: `1px solid ${C.bdr}`,
        borderBottom: `1px solid ${C.bdr}`,
        background: C.bgW,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Rv>
          <p
            style={{
              fontFamily: F.m,
              fontSize: 10,
              letterSpacing: 3,
              color: C.inkM,
              textTransform: "uppercase",
              marginBottom: 22,
              textAlign: "center",
            }}
          >
            Built on
          </p>
        </Rv>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 24,
          }}
        >
          {items.map((it, i) => (
            <Rv key={i} delay={i * 0.04}>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: F.d,
                    fontSize: 17,
                    color: C.ink,
                    fontWeight: 500,
                    margin: "0 0 4px",
                  }}
                >
                  {it.label}
                </p>
                <p
                  style={{
                    fontFamily: F.m,
                    fontSize: 10.5,
                    color: C.inkM,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  {it.note}
                </p>
              </div>
            </Rv>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How it works ────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      n: "01",
      en: "Point",
      dv: "लक्ष्य",
      title: "Point Kotwal at your repo or live URL.",
      body: "One command. No agents to install on your servers, no SaaS account to set up. Kotwal reads your repo via the GitHub API and probes your URL like any external attacker would.",
      code: "kotwal --repo my-org/my-app --url https://app.example.com",
    },
    {
      n: "02",
      en: "Scan",
      dv: "जाँच",
      title: "Six sub-agents do their thing.",
      body: "Chowkidar scans code. Jasoos pen-tests the live deployment. Mukhbir checks SSL and headers. Darogha verifies compliance. Sipahi audits mobile builds. The AI layer triages false positives and writes fix code.",
      code: "chowkidar · jasoos · mukhbir · darogha · sipahi · harkara",
    },
    {
      n: "03",
      en: "Ship",
      dv: "तैनात",
      title: "Get a report, an email draft, and a PR with the fix.",
      body: "Branded DOCX with severity charts and evidence screenshots. HTML email draft (never auto-sent). A PR in your repo containing the actual remediation code — written by Claude Code, in the context of your codebase.",
      code: "reports/audit.docx · email_draft.json · PR #142",
    },
  ];
  return (
    <section id="how" style={{ padding: "120px 32px", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Rv>
          <SL text="How it works" />
        </Rv>
        <Rv delay={0.05}>
          <h2
            style={{
              fontFamily: F.d,
              fontSize: "clamp(30px, 4vw, 44px)",
              lineHeight: 1.15,
              color: C.ink,
              fontWeight: 500,
              margin: "0 0 56px",
              maxWidth: 720,
            }}
          >
            From <span style={{ fontStyle: "italic", color: C.maroon }}>repo</span> to{" "}
            <span style={{ fontStyle: "italic", color: C.maroon }}>fix-PR</span> in one command.
          </h2>
        </Rv>

        {steps.map((s, i) => (
          <Rv key={i} delay={i * 0.08}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) minmax(0,1.6fr)",
                gap: 48,
                paddingBottom: 40,
                marginBottom: 40,
                borderBottom: i < steps.length - 1 ? `1px solid ${C.bdr}` : "none",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: F.m,
                    fontSize: 11,
                    color: C.maroon,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {s.n}
                </div>
                <h3
                  style={{
                    fontFamily: F.d,
                    fontSize: 32,
                    color: C.ink,
                    fontWeight: 500,
                    margin: "0 0 6px",
                    fontStyle: "italic",
                  }}
                >
                  <DvH en={s.en} dv={s.dv} />
                </h3>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: F.b,
                    fontSize: 19,
                    color: C.ink,
                    fontWeight: 400,
                    lineHeight: 1.4,
                    margin: "0 0 14px",
                  }}
                >
                  {s.title}
                </p>
                <p
                  style={{
                    fontFamily: F.b,
                    fontSize: 15,
                    color: C.inkS,
                    fontWeight: 300,
                    lineHeight: 1.65,
                    margin: "0 0 16px",
                  }}
                >
                  {s.body}
                </p>
                <code
                  style={{
                    fontFamily: F.m,
                    fontSize: 12,
                    color: C.plum,
                    background: C.maroonL,
                    padding: "6px 10px",
                    borderRadius: 3,
                    display: "inline-block",
                  }}
                >
                  {s.code}
                </code>
              </div>
            </div>
          </Rv>
        ))}
      </div>
    </section>
  );
}

// ─── Sub-agents grid ─────────────────────────────────────────────────
function SubAgents() {
  type Agent = {
    en: string;
    dv: string;
    role: string;
    body: string;
    Icon: typeof Shield;
  };
  const agents: Agent[] = [
    {
      en: "Chowkidar",
      dv: "चौकीदार",
      role: "Night watchman",
      body: "Scans repos for 16 secret patterns, PII, dependency CVEs across 6 ecosystems, 22 SAST rules, branch protection, and docs compliance.",
      Icon: Code2,
    },
    {
      en: "Jasoos",
      dv: "जासूस",
      role: "Intelligence spy",
      body: "Pen-tests live deployments — SQLi, XSS, CSRF, clickjacking, IDOR, file upload, session flaws — with evidence screenshots via Playwright.",
      Icon: Globe,
    },
    {
      en: "Mukhbir",
      dv: "मुख़बिर",
      role: "Informer",
      body: "Watches uptime, response latency, SSL cert expiry (CRITICAL <7d), and security headers (HSTS, CSP, X-Frame-Options).",
      Icon: Activity,
    },
    {
      en: "Darogha",
      dv: "दरोग़ा",
      role: "Inspector",
      body: "Verifies branch protection rules, secret scanning, Dependabot, CODEOWNERS, SECURITY.md, and team assignments across your GitHub org.",
      Icon: ScrollText,
    },
    {
      en: "Sipahi",
      dv: "सिपाही",
      role: "Foot-soldier",
      body: "Mobile SAST for Flutter/Dart + Android/iOS — print() in release, debug keystore, missing networkSecurityConfig, NSAllowsArbitraryLoads, secure storage.",
      Icon: Smartphone,
    },
    {
      en: "Harkara",
      dv: "हरकारा",
      role: "Royal courier",
      body: "Carries staging deploy requests through a 9-phase lifecycle: validate → pre-flight → plan → execute → verify → log → on-failure rollback.",
      Icon: Send,
    },
  ];
  return (
    <section
      id="agents"
      style={{
        padding: "120px 32px",
        background: C.bgW,
        borderTop: `1px solid ${C.bdr}`,
        borderBottom: `1px solid ${C.bdr}`,
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Rv>
          <SL text="Sub-agents" />
        </Rv>
        <Rv delay={0.05}>
          <h2
            style={{
              fontFamily: F.d,
              fontSize: "clamp(30px, 4vw, 44px)",
              lineHeight: 1.15,
              color: C.ink,
              fontWeight: 500,
              margin: "0 0 18px",
              maxWidth: 760,
            }}
          >
            Six specialists.{" "}
            <span style={{ fontStyle: "italic", color: C.maroon }}>One Kotwal</span> in charge.
          </h2>
        </Rv>
        <Rv delay={0.1}>
          <p
            style={{
              fontFamily: F.b,
              fontSize: 16,
              color: C.inkS,
              fontWeight: 300,
              maxWidth: 640,
              lineHeight: 1.6,
              margin: "0 0 56px",
            }}
          >
            Named after medieval Indian city security roles. Each one does a single
            job well; the Kotwal orchestrator merges their findings and handles every
            outbound report.
          </p>
        </Rv>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {agents.map((a, i) => (
            <Rv key={i} delay={i * 0.05}>
              <AgentCard {...a} />
            </Rv>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentCard({
  en,
  dv,
  role,
  body,
  Icon,
}: {
  en: string;
  dv: string;
  role: string;
  body: string;
  Icon: typeof Shield;
}) {
  const [h, setH] = useState(false);
  return (
    <article
      aria-labelledby={`agent-${en.toLowerCase()}-name`}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: C.bg,
        border: `1px solid ${h ? C.maroon : C.bdr}`,
        borderRadius: 6,
        padding: "26px 24px 24px",
        transition: "all 0.3s",
        transform: h ? "translateY(-2px)" : "translateY(0)",
        boxShadow: h ? "0 18px 36px -18px rgba(129,22,34,0.22)" : "none",
        cursor: "default",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <Icon size={20} color={C.maroon} strokeWidth={1.4} />
        <span
          style={{
            fontFamily: F.m,
            fontSize: 9,
            letterSpacing: 2,
            color: C.inkM,
            textTransform: "uppercase",
          }}
        >
          {role}
        </span>
      </div>
      <h3
        id={`agent-${en.toLowerCase()}-name`}
        style={{
          fontFamily: F.d,
          fontSize: 24,
          color: C.ink,
          fontWeight: 500,
          margin: "0 0 4px",
        }}
      >
        {en}
      </h3>
      <p
        lang="hi"
        style={{
          fontFamily: F.dv,
          fontSize: 14,
          color: C.maroon,
          margin: "0 0 14px",
          fontWeight: 500,
          letterSpacing: 0.5,
        }}
      >
        {dv}
      </p>
      <p
        style={{
          fontFamily: F.b,
          fontSize: 13.5,
          color: C.inkS,
          fontWeight: 300,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {body}
      </p>
    </article>
  );
}

// ─── Sample report CTA ───────────────────────────────────────────────
function SampleReport() {
  return (
    <section style={{ padding: "120px 32px" }}>
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: 48,
          alignItems: "center",
        }}
      >
        <Rv>
          <div>
            <SL text="See it before you buy" />
            <h2
              style={{
                fontFamily: F.d,
                fontSize: "clamp(28px, 3.6vw, 40px)",
                lineHeight: 1.15,
                color: C.ink,
                fontWeight: 500,
                margin: "0 0 18px",
              }}
            >
              A real Kotwal report — anonymized.
            </h2>
            <p
              style={{
                fontFamily: F.b,
                fontSize: 16,
                color: C.inkS,
                fontWeight: 300,
                lineHeight: 1.65,
                margin: "0 0 24px",
              }}
            >
              Branded DOCX. Severity charts. Evidence screenshots from Playwright.
              OpenSSF Scorecard breakdown. Per-finding remediation code generated by
              Claude Code in the context of the target repo.
            </p>
            <GhostBtn href={SAMPLE_REPORT_URL} external={false}>
              <FileText size={13} /> Download sample (PDF)
            </GhostBtn>
          </div>
        </Rv>

        <Rv delay={0.1}>
          <div
            style={{
              background: C.bgW,
              border: `1px solid ${C.bdr}`,
              borderRadius: 8,
              padding: 28,
              boxShadow: "0 24px 60px -28px rgba(26,26,36,0.2)",
            }}
          >
            <div
              style={{
                fontFamily: F.m,
                fontSize: 9,
                letterSpacing: 3,
                color: C.maroon,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Kotwal · Security audit report
            </div>
            <div
              style={{
                fontFamily: F.d,
                fontSize: 22,
                color: C.ink,
                fontWeight: 500,
                marginBottom: 18,
              }}
            >
              my-org / my-app
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 18,
              }}
            >
              <Stat label="Kotwal Score" value="78" sub="Grade B" />
              <Stat label="OpenSSF" value="7.8" sub="of 10" />
              <Stat label="Critical" value="3" sub="confirmed" color={C.red} />
              <Stat label="High" value="7" sub="confirmed" color={C.orange} />
            </div>
            <div
              style={{
                fontFamily: F.m,
                fontSize: 10,
                color: C.inkM,
                lineHeight: 1.7,
                paddingTop: 14,
                borderTop: `1px solid ${C.bdr}`,
              }}
            >
              SECTION 5 · FINDINGS<br />
              <span style={{ color: C.red }}>CRIT-001</span> SQL injection in /api/login<br />
              <span style={{ color: C.red }}>CRIT-002</span> Hardcoded AWS key in .env.example<br />
              <span style={{ color: C.orange }}>HIGH-001</span> Missing CSP header
            </div>
          </div>
        </Rv>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  sub,
  color = C.maroon,
}: {
  label: string;
  value: string;
  sub: string;
  color?: string;
}) {
  return (
    <div style={{ background: C.bg, padding: "14px 16px", borderRadius: 4 }}>
      <div
        style={{
          fontFamily: F.m,
          fontSize: 9,
          color: C.inkM,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: F.d,
          fontSize: 28,
          color,
          fontWeight: 500,
          lineHeight: 1.1,
          marginTop: 2,
        }}
      >
        {value}
      </div>
      <div style={{ fontFamily: F.m, fontSize: 9, color: C.inkM, marginTop: 2 }}>
        {sub}
      </div>
    </div>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────
function Pricing() {
  return (
    <section
      id="pricing"
      style={{
        padding: "120px 32px",
        background: C.bgDark,
        color: C.bgW,
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Rv>
          <p
            style={{
              fontFamily: F.m,
              fontSize: 10,
              letterSpacing: 4,
              color: C.orange,
              textTransform: "uppercase",
              marginBottom: 14,
              textAlign: "center",
            }}
          >
            Launch pricing
          </p>
        </Rv>
        <Rv delay={0.05}>
          <h2
            style={{
              fontFamily: F.d,
              fontSize: "clamp(30px, 4vw, 44px)",
              lineHeight: 1.15,
              color: C.bgW,
              fontWeight: 500,
              margin: "0 auto 14px",
              maxWidth: 720,
              textAlign: "center",
            }}
          >
            One price.{" "}
            <span style={{ fontStyle: "italic", color: C.orange }}>No subscription.</span>
          </h2>
        </Rv>
        <Rv delay={0.1}>
          <p
            style={{
              fontFamily: F.b,
              fontSize: 16,
              color: "rgba(245,241,232,0.6)",
              fontWeight: 300,
              maxWidth: 560,
              lineHeight: 1.6,
              margin: "0 auto 56px",
              textAlign: "center",
            }}
          >
            Pay once. Run unlimited audits on your laptop. Your code never leaves your
            machine. The AI layer uses your existing Claude Code subscription.
          </p>
        </Rv>

        <div style={{ maxWidth: 460, margin: "0 auto" }}>
          <PriceCard
            tier="Standard"
            dv="मानक"
            price="29"
            note="Launch price · one-time"
            features={[
              "All 6 sub-agents — Chowkidar, Jasoos, Mukhbir, Darogha, Sipahi, Harkara",
              "Unlimited audits, runs locally on your laptop",
              "AI triage + remediation (uses your Claude Code subscription)",
              "DOCX, HTML, Markdown, JSON reports",
              "Auto-PR with the fix code in your repo",
              "Lifetime updates — every release, free",
            ]}
            cta="Buy on Gumroad"
            highlighted
          />
        </div>
      </div>
    </section>
  );
}

function PriceCard({
  tier,
  dv,
  price,
  note,
  features,
  cta,
  highlighted = false,
}: {
  tier: string;
  dv: string;
  price: string;
  note: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: highlighted ? "rgba(245,134,52,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${highlighted ? C.orange : "rgba(255,255,255,0.1)"}`,
        borderRadius: 8,
        padding: "32px 28px",
        transition: "all 0.3s",
        transform: h ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <h3
          style={{
            fontFamily: F.d,
            fontSize: 22,
            color: C.bgW,
            fontWeight: 500,
            margin: 0,
          }}
        >
          {tier}
        </h3>
        <span style={{ fontFamily: F.dv, fontSize: 16, color: C.orange, fontWeight: 500 }}>
          {dv}
        </span>
      </div>
      <p
        style={{
          fontFamily: F.m,
          fontSize: 11,
          color: "rgba(245,241,232,0.5)",
          margin: "0 0 22px",
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        {note}
      </p>
      <div style={{ display: "flex", alignItems: "baseline", marginBottom: 28 }}>
        <span style={{ fontFamily: F.d, fontSize: 56, color: C.bgW, fontWeight: 500, lineHeight: 1 }}>
          ${price}
        </span>
        <span
          style={{
            fontFamily: F.m,
            fontSize: 12,
            color: "rgba(245,241,232,0.5)",
            marginLeft: 10,
          }}
        >
          USD
        </span>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
        {features.map((f, i) => (
          <li
            key={i}
            style={{
              fontFamily: F.b,
              fontSize: 13.5,
              color: "rgba(245,241,232,0.85)",
              fontWeight: 300,
              marginBottom: 10,
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              lineHeight: 1.5,
            }}
          >
            <Check size={14} color={C.orange} style={{ flexShrink: 0, marginTop: 3 }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={GUMROAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          fontFamily: F.m,
          fontSize: 12,
          padding: "13px 0",
          textAlign: "center",
          background: highlighted ? C.orange : "transparent",
          color: highlighted ? C.bgDark : C.bgW,
          border: `1px solid ${highlighted ? C.orange : "rgba(255,255,255,0.2)"}`,
          borderRadius: 3,
          textDecoration: "none",
          letterSpacing: 0.5,
          textTransform: "uppercase",
          fontWeight: 500,
          transition: "all 0.3s",
        }}
      >
        {cta} →
      </a>
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────
function FAQ() {
  const items = [
    {
      q: "Do I need a Claude API key?",
      a: "No. Kotwal's AI layer runs through your local `claude` CLI from Anthropic. If you have a Claude Code subscription, you already have everything. No API keys, no extra billing.",
    },
    {
      q: "Does my code leave my machine?",
      a: "No. Kotwal runs locally. Source code stays on your laptop. The only outbound traffic is to OSV.dev for CVE lookups (just package names + versions), the GitHub API for repo metadata, and your target URL for pen-testing.",
    },
    {
      q: "What languages and frameworks does it support?",
      a: "Code audit (Chowkidar) covers Python, JavaScript/TypeScript, Java, Kotlin. Dependencies cover Python, Node, Flutter, Android (Gradle + Version Catalog), Go. Mobile SAST (Sipahi) covers Flutter/Dart + Android/iOS. Frappe/ERPNext-specific patterns included.",
    },
    {
      q: "Will it auto-merge PRs or send emails without my approval?",
      a: "No. Auto-fix is opt-in (--remediate flag). Emails are saved as drafts you preview in a browser before approving with `kotwal send-vapt-email`. Nothing is sent or merged without an explicit y/N from you.",
    },
    {
      q: "Why is it $29? Is this really one-time?",
      a: "Yes — $29 is launch pricing while we get the first hundred customers. After that it goes up. Pay once, get every future release free. No subscription, no usage limits, no hidden tiers.",
    },
    {
      q: "Who's behind Kotwal?",
      a: "Doot Workspaces — same team behind CloudSaathi (fractional DevOps for startups). Kotwal runs in production at Dhwani RIS, a 100+ engineer Indian dev shop, scanning their NGO and government sector codebases.",
    },
  ];
  return (
    <section style={{ padding: "120px 32px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <Rv>
          <SL text="Questions" />
        </Rv>
        <Rv delay={0.05}>
          <h2
            style={{
              fontFamily: F.d,
              fontSize: "clamp(30px, 4vw, 44px)",
              lineHeight: 1.15,
              color: C.ink,
              fontWeight: 500,
              margin: "0 0 48px",
            }}
          >
            Frequently asked.
          </h2>
        </Rv>
        {items.map((it, i) => (
          <Rv key={i} delay={i * 0.04}>
            <FAQRow {...it} />
          </Rv>
        ))}
      </div>
    </section>
  );
}

function FAQRow({ q, a }: { q: string; a: string }) {
  // Native HTML5 disclosure widget — keyboard accessible, screen-reader
  // friendly, no JS state needed. The `+` icon rotates via the
  // `details[open]` CSS attribute selector in index.css.
  return (
    <details
      className="faq-row"
      style={{
        borderBottom: `1px solid ${C.bdr}`,
        padding: "20px 0",
      }}
    >
      <summary
        style={{
          listStyle: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          outline: "none",
        }}
      >
        <h3
          style={{
            fontFamily: F.d,
            fontSize: 19,
            color: C.ink,
            fontWeight: 500,
            margin: 0,
          }}
        >
          {q}
        </h3>
        <span
          className="faq-icon"
          aria-hidden="true"
          style={{
            fontFamily: F.m,
            fontSize: 18,
            color: C.maroon,
            transition: "transform 0.3s",
            display: "inline-block",
          }}
        >
          +
        </span>
      </summary>
      <p
        style={{
          fontFamily: F.b,
          fontSize: 14.5,
          color: C.inkS,
          fontWeight: 300,
          lineHeight: 1.7,
          margin: "14px 0 0",
        }}
      >
        {a}
      </p>
    </details>
  );
}

// ─── Final CTA ───────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section
      style={{
        padding: "100px 32px",
        background: C.maroonL,
        borderTop: `1px solid ${C.bdr}`,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Rv>
          <Sparkles
            size={28}
            color={C.maroon}
            strokeWidth={1.4}
            style={{ marginBottom: 16 }}
          />
        </Rv>
        <Rv delay={0.05}>
          <h2
            style={{
              fontFamily: F.d,
              fontSize: "clamp(30px, 4vw, 44px)",
              lineHeight: 1.15,
              color: C.ink,
              fontWeight: 500,
              margin: "0 0 18px",
            }}
          >
            Ship safer code{" "}
            <span style={{ fontStyle: "italic", color: C.maroon }}>this week</span>.
          </h2>
        </Rv>
        <Rv delay={0.1}>
          <p
            style={{
              fontFamily: F.b,
              fontSize: 17,
              color: C.inkS,
              fontWeight: 300,
              lineHeight: 1.6,
              margin: "0 0 32px",
            }}
          >
            One-time $29 launch price. No subscription. Your data stays on your laptop.
            Your Claude Code subscription powers the AI. Refund if it doesn't pay for
            itself in 30 days.
          </p>
        </Rv>
        <Rv delay={0.16}>
          <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <PrimaryBtn href={GUMROAD_URL}>
              <Terminal size={13} /> Buy Kotwal — $29
            </PrimaryBtn>
            <GhostBtn href={GITHUB_URL}>
              <Github size={13} /> See on GitHub
            </GhostBtn>
          </div>
        </Rv>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        padding: "44px 32px 28px",
        background: C.bg,
        borderTop: `1px solid ${C.bdr}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 32,
            marginBottom: 32,
          }}
        >
          <div style={{ maxWidth: 320 }}>
            <Logo size={17} />
            <p
              style={{
                fontFamily: F.b,
                fontSize: 12,
                color: C.inkM,
                lineHeight: 1.6,
                fontWeight: 300,
                margin: "12px 0 8px",
              }}
            >
              AI security agent for your repo and live deployment. Powered by Claude
              Code. A product by Doot Workspaces.
            </p>
            <p
              style={{
                fontFamily: F.dv,
                fontSize: 11,
                color: C.maroon,
                opacity: 0.55,
                letterSpacing: 0.5,
              }}
            >
              सतर्कता · पारदर्शिता · सुरक्षा
            </p>
          </div>

          <div style={{ display: "flex", gap: 44 }}>
            <FooterCol
              title="Product"
              links={[
                ["How it works", "#how"],
                ["Sub-agents", "#agents"],
                ["Pricing", "#pricing"],
                ["Sample report", SAMPLE_REPORT_URL],
              ]}
            />
            <FooterCol
              title="Connect"
              links={[
                ["GitHub", GITHUB_URL],
                ["Email", `mailto:${EMAIL_ADDRESS}`],
                ["CloudSaathi", PARENT_SITE],
              ]}
            />
          </div>
        </div>

        <div
          style={{
            paddingTop: 22,
            borderTop: `1px solid ${C.bdr}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontFamily: F.m, fontSize: 10, color: C.inkM, letterSpacing: 1 }}>
            © {new Date().getFullYear()} Doot Workspaces · Kotwal is a product, not a service
          </p>
          <p style={{ fontFamily: F.m, fontSize: 10, color: C.inkM, letterSpacing: 1 }}>
            New Delhi, India · Globally delivered
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p
        style={{
          fontFamily: F.m,
          fontSize: 9,
          color: C.inkM,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        {title}
      </p>
      {links.map(([label, href]) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          style={{
            display: "block",
            fontFamily: F.b,
            fontSize: 12,
            color: C.inkS,
            marginBottom: 6,
            fontWeight: 300,
            textDecoration: "none",
          }}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────
export default function KotwalSite() {
  return (
    <>
      <Helmet>
        <title>Kotwal — AI security agent for your repo and live deployment</title>
        <meta
          name="description"
          content="Kotwal scans your code, pen-tests your deployment, and writes the fix as a PR. Powered by Claude Code. $99 one-time."
        />
      </Helmet>
      <Nav />
      <main style={{ background: C.bg }}>
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <SubAgents />
        <SampleReport />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
