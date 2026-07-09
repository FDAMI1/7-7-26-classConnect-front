/** Text — all typography routes through here for a consistent type system. */
import React from "react";
import { Text as RNText, TextStyle, StyleProp } from "react-native";
import { typography, palette, fonts } from "../designSystem";

type Variant =
  | "display-lg"
  | "display-md"
  | "display-sm"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body-lg"
  | "body"
  | "body-sm"
  | "label-lg"
  | "label"
  | "label-sm"
  | "caption"
  | "overline";

type Tone =
  | "primary"
  | "secondary"
  | "tertiary"
  | "disabled"
  | "inverse"
  | "accent"
  | "link"
  | "danger"
  | "success"
  | "warning";

interface Props {
  variant?: Variant;
  tone?: Tone;
  weight?: "400" | "500" | "600" | "700";
  align?: "left" | "center" | "right";
  /** Render in Geist Mono with tabular numerals — for numbers, IDs, money, data. */
  numeric?: boolean;
  numberOfLines?: number;
  adjustsFontSizeToFit?: boolean;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const variantMap = {
  "display-lg": typography.display.large,
  "display-md": typography.display.medium,
  "display-sm": typography.display.small,
  h1: typography.heading.h1,
  h2: typography.heading.h2,
  h3: typography.heading.h3,
  h4: typography.heading.h4,
  "body-lg": typography.body.large,
  body: typography.body.default,
  "body-sm": typography.body.small,
  "label-lg": typography.label.large,
  label: typography.label.medium,
  "label-sm": typography.label.small,
  caption: typography.caption,
  overline: typography.overline,
} as const;

const toneMap: Record<Tone, string> = {
  primary: palette.text.primary,
  secondary: palette.text.secondary,
  tertiary: palette.text.tertiary,
  disabled: palette.text.disabled,
  inverse: palette.text.inverse,
  accent: palette.text.accent,
  link: palette.text.link,
  danger: palette.danger.text,
  success: palette.success.text,
  warning: palette.warning.text,
};

const clampMono = (w: "400" | "500" | "600" | "700") =>
  w === "700" ? "600" : w;

export function Text({
  variant = "body",
  tone = "primary",
  weight,
  align,
  numeric,
  numberOfLines,
  adjustsFontSizeToFit,
  style,
  children,
}: Props) {
  const base = variantMap[variant];
  // Resolve the effective weight, then bind the matching Geist face — with
  // static per-weight fonts the family (not fontWeight) drives the rendered
  // weight, so it must be set explicitly.
  const w = (weight ||
    (base as { fontWeight?: string }).fontWeight ||
    "400") as "400" | "500" | "600" | "700";
  const fontFamily = numeric ? fonts.mono[clampMono(w)] : fonts.sans[w];

  return (
    <RNText
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      style={[
        base,
        { color: toneMap[tone], fontFamily },
        numeric
          ? { fontVariant: ["tabular-nums"] as TextStyle["fontVariant"] }
          : undefined,
        weight ? { fontWeight: weight } : undefined,
        align ? { textAlign: align } : undefined,
        style,
      ]}
    >
      {children}
    </RNText>
  );
}
