/**
 * ClassConnect Pro Design System — "Meridian" (2026).
 *
 * Rebuilt against how award-winning product teams (Linear, Vercel, Stripe,
 * Mercury, Notion) actually design — and deliberately away from the
 * "AI-generated" statistical mean (Inter + purple gradient + three rounded
 * cards). The rules:
 *   • ONE accent (a considered indigo), used for meaning — never decoration.
 *   • Monochrome, warm-neutral "paper" base; aggressive contrast, nothing muddy.
 *   • Real, engineered typeface (Geist) + Geist Mono tabular numerals for data.
 *   • Hairline borders + restrained elevation (no heavy or coloured shadows).
 *   • Tighter radii (de-rounded), and generous whitespace ("enough, then more").
 *   • Status colour (green/amber/red) is reserved strictly for status.
 *
 * Token *structure* is unchanged so the shared/ui kit and every screen keep
 * working — only the values change. Legacy aliases (`cobalt`, `teal`, `violet`)
 * all map to the single accent so old two-colour decoration collapses to one.
 */

// The single accent — a considered indigo (deliberate, not "default blue").
const accentRamp = {
  900: "#1E1B4B",
  800: "#282261",
  700: "#362FA0",
  600: "#4338CA", // primary action / active nav / links
  500: "#4F46E5",
  400: "#6366F1", // focus ring
  300: "#A5B4FC",
  200: "#C7D2FE",
  100: "#E0E7FF",
  50: "#EEF0FF",
} as const;

// Warm-neutral "paper" ink — high contrast, a hair of warmth (not cold blue-grey).
const inkRamp = {
  900: "#1A1714",
  800: "#292524",
  700: "#44403C",
  600: "#57534E",
  500: "#78716C",
  400: "#A8A29E",
  300: "#D6D3D1",
  200: "#E7E5E4",
  100: "#F5F4F2",
  50: "#FAFAF9",
} as const;

export const palette = {
  ink: inkRamp,

  // Single accent. Legacy aliases collapse two-colour decoration into one.
  accent: accentRamp,
  cobalt: accentRamp,
  teal: accentRamp,
  violet: accentRamp,

  neutral: {
    0: "#FFFFFF",
    50: "#FAFAF9",
    100: "#F5F4F2",
    200: "#E7E5E4",
    300: "#D6D3D1",
    400: "#A8A29E",
    500: "#78716C",
    600: "#57534E",
    700: "#44403C",
    800: "#292524",
    900: "#1A1714",
  },

  surface: {
    primary: "#FFFFFF", // cards, sheets
    secondary: "#FBFAF9", // app canvas (warm paper)
    tertiary: "#F5F4F2",
    raised: "#FFFFFF",
    sunken: "#F0EEEB",
    dark: "#1A1714",
    darkRaised: "#26221E",
  },

  text: {
    primary: "#1A1714",
    secondary: "#44403C",
    tertiary: "#78716C",
    disabled: "#A8A29E",
    inverse: "#FFFFFF",
    accent: "#4338CA",
    link: "#4338CA",
  },

  border: {
    subtle: "#F0EEEB",
    default: "#E5E2DE", // warm hairline
    strong: "#D6D3D1",
    focus: "#6366F1",
    dark: "#292524",
  },

  // Semantic status — reserved strictly for status (icon + label always paired).
  success: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" }, // present / paid / pass
  warning: { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A" }, // low attendance / due soon
  danger: { bg: "#FEF2F2", text: "#B91C1C", border: "#FECACA" }, // absent / overdue / fail
  info: { bg: "#EEF0FF", text: "#4338CA", border: "#C7D2FE" }, // announcement / notice (= accent)
} as const;

// Engineered type — Geist for UI, Geist Mono for numerals/data (tabular).
export const fonts = {
  sans: {
    "400": "Geist_400Regular",
    "500": "Geist_500Medium",
    "600": "Geist_600SemiBold",
    "700": "Geist_700Bold",
  },
  mono: {
    "400": "GeistMono_400Regular",
    "500": "GeistMono_500Medium",
    "600": "GeistMono_600SemiBold",
  },
} as const;

export const spacing = {
  "0": 0,
  px: 1,
  "0.5": 2,
  "1": 4,
  "1.5": 6,
  "2": 8,
  "2.5": 10,
  "3": 12,
  "3.5": 14,
  "4": 16,
  "5": 20,
  "6": 24,
  "7": 28,
  "8": 32,
  "9": 36,
  "10": 40,
  "12": 48,
  "14": 56,
  "16": 64,
  "20": 80,
} as const;

// De-rounded — sharp, engineered corners (was up to 28).
export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  "2xl": 14,
  "3xl": 16,
  full: 9999,
} as const;

export const outline = { width: 1, color: "#E5E2DE" } as const;

export const typography = {
  display: {
    large: {
      fontSize: 42,
      lineHeight: 46,
      fontWeight: "700" as const,
      letterSpacing: -1.2,
    },
    medium: {
      fontSize: 32,
      lineHeight: 38,
      fontWeight: "700" as const,
      letterSpacing: -0.9,
    },
    small: {
      fontSize: 26,
      lineHeight: 32,
      fontWeight: "600" as const,
      letterSpacing: -0.6,
    },
  },
  heading: {
    h1: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: "700" as const,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: "600" as const,
      letterSpacing: -0.4,
    },
    h3: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "600" as const,
      letterSpacing: -0.3,
    },
    h4: {
      fontSize: 14,
      lineHeight: 19,
      fontWeight: "600" as const,
      letterSpacing: -0.15,
    },
  },
  body: {
    large: { fontSize: 16, lineHeight: 26, fontWeight: "400" as const },
    default: { fontSize: 14, lineHeight: 22, fontWeight: "400" as const },
    small: { fontSize: 13, lineHeight: 19, fontWeight: "400" as const },
  },
  label: {
    large: {
      fontSize: 14,
      lineHeight: 19,
      fontWeight: "600" as const,
      letterSpacing: -0.1,
    },
    medium: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "600" as const,
      letterSpacing: 0,
    },
    small: {
      fontSize: 11,
      lineHeight: 15,
      fontWeight: "600" as const,
      letterSpacing: 0.2,
    },
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500" as const,
    letterSpacing: 0.1,
  },
  // Micro uppercase eyebrow — a signature of engineered UIs (Linear/Stripe).
  overline: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600" as const,
    letterSpacing: 1.4,
    textTransform: "uppercase" as const,
  },
} as const;

// Restrained elevation — hairline border does the work; shadow only whispers.
const soft = (y: number, radius: number, opacity: number, elev: number) => ({
  shadowColor: "#1A1714",
  shadowOffset: { width: 0, height: y },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation: elev,
});

export const shadows = {
  none: {},
  xs: soft(1, 2, 0.04, 1),
  sm: soft(1, 3, 0.05, 2),
  md: soft(2, 8, 0.06, 3),
  lg: soft(6, 20, 0.08, 6),
  xl: soft(12, 30, 0.1, 10),
} as const;

export const elevation = {
  base: shadows.xs,
  raised: shadows.sm,
  floating: shadows.md,
  overlay: shadows.lg,
} as const;

export const motion = {
  duration: { fast: 140, medium: 220, slow: 360 },
  spring: {
    gentle: { damping: 20, stiffness: 190 },
    default: { damping: 22, stiffness: 230 },
    bouncy: { damping: 15, stiffness: 210 },
    crisp: { damping: 26, stiffness: 320 },
  },
} as const;

/**
 * Gradients — deliberately minimal. No decorative sweeps. A single restrained
 * accent pair for the login canvas, and a dark ink surface for the (formerly
 * violet) AI/insight layer so it reads premium & monochrome, not "AI slop".
 */
export const gradients = {
  hero: ["#4338CA", "#362FA0"] as const, // login only
  teal: ["#4338CA", "#362FA0"] as const,
  cobalt: ["#4338CA", "#362FA0"] as const,
  ai: ["#26221E", "#1A1714"] as const, // dark ink insight panel (monochrome)
  light: ["#FFFFFF", "#FBFAF9"] as const,
  mist: ["#FBFAF9", "#F5F4F2"] as const,
} as const;

export const glass = {
  light: {
    backgroundColor: "rgba(255,255,255,0.14)",
    borderColor: "rgba(255,255,255,0.24)",
    borderWidth: 1,
  },
  lighter: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
  },
  dark: {
    backgroundColor: "rgba(26,23,20,0.30)",
    borderColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
  },
} as const;

export const layout = {
  screenPadding: 24,
  cardPadding: 22,
  sectionGap: 32,
  itemGap: 12,
  sidebarWidth: 260,
  sidebarCollapsedWidth: 76,
  tabBarHeight: 72,
  tabBarClearance: 96,
  chipHeight: 34,
  chipRowHeight: 44,
  contentMaxWidth: 1160,
  wideBreakpoint: 900,
} as const;
