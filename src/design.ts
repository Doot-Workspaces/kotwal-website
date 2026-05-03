// Kotwal design tokens — sibling aesthetic to CloudSaathi (warm cream + serif/sans + Devanagari)
// with Kotwal's authority palette (maroon primary, orange accent, plum secondary).

export const C = {
  bg: "#F5F1E8",        // warm cream — primary background
  bgW: "#FDFBF7",       // lighter cream — cards
  bgDark: "#1A1A24",    // near-black — terminal / contrast sections
  ink: "#1A1A24",       // primary text
  inkS: "#4A4A58",      // secondary text
  inkM: "#8A8A96",      // muted text
  maroon: "#811622",    // primary accent — Kotwal brand
  maroonD: "#5C0F18",   // darker maroon — hover states
  maroonL: "#F1E1E3",   // light maroon — soft fills
  orange: "#F58634",    // accent — alerts, highlights
  plum: "#53435B",      // secondary — quiet detail
  bdr: "#D4CBBB",       // warm border
  green: "#2D6A4F",     // success / patched
  red: "#B5574E",       // critical
} as const;

export const F = {
  d: "'Playfair Display', Georgia, serif",
  b: "'Outfit', system-ui, sans-serif",
  m: "'IBM Plex Mono', 'Courier New', monospace",
  dv: "'Noto Sans Devanagari', 'Outfit', sans-serif",
} as const;

export const SITE_URL = "https://kotwal.cloudsaathi.com";
export const GITHUB_URL = "https://github.com/Doot-Workspaces/kotwal";
export const GUMROAD_URL = "https://cloudsaathi.gumroad.com/l/kotwal";
export const EMAIL_ADDRESS = "connect@cloudsaathi.com";
export const PARENT_SITE = "https://cloudsaathi.com";

// Sample report — placeholder until first signed PDF lives at this path
export const SAMPLE_REPORT_URL = "/sample-report.pdf";
