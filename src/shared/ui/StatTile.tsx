import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Pressable,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import type { LucideIcon } from "lucide-react-native";
import { palette, radius, motion, outline } from "../designSystem";
import { Text } from "./Text";

type Tone = "light" | "teal" | "cobalt" | "slate";

interface Props {
  label: string;
  value: string;
  icon?: LucideIcon;
  hint?: string;
  /** A signed change annotation, e.g. "+42 this month". */
  delta?: string;
  deltaTone?: "success" | "danger" | "tertiary";
  tone?: Tone;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * StatTile — a single metric. Engineered look: flat surface, hairline border,
 * the number set in Geist Mono tabular figures, an uppercase micro-label, and
 * an optional signed delta. One accent tone (`slate`/`teal`/`cobalt` all map to
 * the ink/accent fill) is reserved for a single north-star tile — the rest stay
 * neutral so colour never becomes decoration.
 */
export function StatTile({
  label,
  value,
  icon: Icon,
  hint,
  delta,
  deltaTone = "tertiary",
  tone = "light",
  onPress,
  style,
}: Props) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  const dark = tone !== "light";
  const fill =
    tone === "slate"
      ? palette.ink[900]
      : dark
        ? palette.accent[600]
        : palette.surface.primary;
  const valueColor = dark ? "#FFFFFF" : palette.text.primary;
  const labelColor = dark ? "rgba(255,255,255,0.70)" : palette.text.tertiary;
  const iconColor = dark ? "#FFFFFF" : palette.accent[600];
  const iconBg = dark ? "rgba(255,255,255,0.14)" : palette.accent[50];
  const deltaColor = dark
    ? "rgba(255,255,255,0.80)"
    : deltaTone === "success"
      ? palette.success.text
      : deltaTone === "danger"
        ? palette.danger.text
        : palette.text.tertiary;

  const inner = (
    <>
      <View style={styles.top}>
        <Text
          variant="overline"
          style={{
            color: labelColor,
            flex: 1,
            marginRight: 8,
            letterSpacing: 0.8,
          }}
          numberOfLines={2}
        >
          {label}
        </Text>
        {Icon ? (
          <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
            <Icon size={15} color={iconColor} strokeWidth={2} />
          </View>
        ) : null}
      </View>
      <View>
        <Text
          variant="display-sm"
          numeric
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{ color: valueColor }}
        >
          {value}
        </Text>
        {delta || hint ? (
          <Text
            variant="label-sm"
            numeric={!!delta}
            style={{ color: deltaColor, marginTop: 6, letterSpacing: 0 }}
            numberOfLines={1}
          >
            {delta || hint}
          </Text>
        ) : null}
      </View>
    </>
  );

  const body = (
    <View
      style={[
        styles.tile,
        {
          backgroundColor: fill,
          borderColor: dark ? "transparent" : outline.color,
        },
        style,
      ]}
    >
      {inner}
    </View>
  );

  if (!onPress) return body;

  return (
    <Animated.View style={[animStyle, style ? undefined : { flex: 1 }]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => scale.set(withSpring(0.98, motion.spring.crisp))}
        onPressOut={() => scale.set(withSpring(1, motion.spring.gentle))}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: outline.width,
    padding: 18,
    minHeight: 116,
    justifyContent: "space-between",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
});
