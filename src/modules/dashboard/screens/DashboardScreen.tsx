import React from "react";
import { View, useWindowDimensions } from "react-native";
import {
  Users,
  UserRound,
  Sparkles,
  CalendarCheck2,
  Wallet,
  BookOpen,
  ClipboardList,
  Boxes,
  BarChart3,
  MessageSquare,
  Building2,
  ReceiptText,
  ArrowUpRight,
} from "lucide-react-native";
import { useAuthStore } from "@shared/store/useAuthStore";
import { useDashboardSummary } from "@modules/dashboard/hooks/useDashboard";
import { useSectionNav } from "@navigation/AppNavigator";
import { palette, radius } from "@shared/designSystem";
import {
  Screen,
  Text,
  VStack,
  HStack,
  Card,
  StatTile,
  Button,
} from "@shared/ui";

/** The platform's modules — a quiet overview of what's inside. */
const MODULES: { icon: typeof Users; label: string }[] = [
  { icon: Building2, label: "Institute, Team & Roles" },
  { icon: BookOpen, label: "Courses, Batches & Timetable" },
  { icon: UserRound, label: "Admissions & Student Records" },
  { icon: CalendarCheck2, label: "Attendance & Parent Alerts" },
  { icon: Wallet, label: "Fees, Payments & Receipts" },
  { icon: BookOpen, label: "Learning · Assignments · Quizzes" },
  { icon: ClipboardList, label: "Exams, Marks & Report Cards" },
  { icon: MessageSquare, label: "Communication & Parent App" },
  { icon: Boxes, label: "Inventory, Assets & HR/Payroll" },
  { icon: BarChart3, label: "AI Analytics, Reports & Exec" },
];

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  const cols = width >= 1100 ? 4 : 2;
  const user = useAuthStore((s) => s.user);
  const organization = useAuthStore((s) => s.organization);
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const go = useSectionNav();
  const { data, isLoading, refetch, isRefetching } = useDashboardSummary();

  const role = user?.role ?? "staff";
  const isPortal = role === "parent" || role === "student";
  const p = data?.people;
  const todayPct = data?.attendance?.todayPercent;
  const fees = data?.fees;
  const money = (paise?: number | null) =>
    paise == null
      ? "—"
      : "₹" +
        (paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const billed = (fees?.collected ?? 0) + (fees?.pending ?? 0);
  const collPct =
    billed > 0 ? Math.round(((fees?.collected ?? 0) / billed) * 100) : null;

  const tiles: {
    label: string;
    value: string;
    icon: typeof Users;
    delta?: string;
    deltaTone?: "success" | "danger" | "tertiary";
  }[] = [
    { label: "Students", value: String(p?.students ?? 0), icon: UserRound },
    {
      label: "Attendance today",
      value: todayPct != null ? `${todayPct}%` : "—",
      icon: CalendarCheck2,
    },
    {
      label: "Fees collected",
      value: money(fees?.collected),
      icon: Wallet,
      delta: collPct != null ? `${collPct}% of billed` : undefined,
      deltaTone: "success",
    },
    { label: "Pending fees", value: money(fees?.pending), icon: ReceiptText },
  ];
  const tileWidth = `${100 / cols}%` as const;

  return (
    <Screen
      overline={greeting()}
      title={user?.firstName ? `Hello, ${user.firstName}` : "Dashboard"}
      subtitle={organization?.name || "ClassConnect Pro"}
      refreshing={isRefetching || isLoading}
      onRefresh={refetch}
      right={
        isAdmin() ? (
          <HStack gap={8}>
            <Button
              label="Team"
              variant="secondary"
              size="sm"
              fullWidth={false}
              onPress={() => go("Team")}
            />
            <Button
              label="Settings"
              variant="secondary"
              size="sm"
              fullWidth={false}
              onPress={() => go("Settings")}
            />
          </HStack>
        ) : undefined
      }
    >
      {!isPortal ? (
        <>
          {/* North-star + supporting KPIs. First tile is featured (dark). */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginHorizontal: -6,
            }}
          >
            {tiles.map((t, i) => (
              <View key={t.label} style={{ width: tileWidth, padding: 6 }}>
                <StatTile
                  label={t.label}
                  value={t.value}
                  icon={t.icon}
                  tone={i === 0 ? "slate" : "light"}
                  delta={t.delta}
                  deltaTone={t.deltaTone}
                />
              </View>
            ))}
          </View>

          <InsightPanel
            body="Attendance trends, fee forecasts and at-risk student alerts are computed from your live data."
            onOpen={isAdmin() ? () => go("Executive") : undefined}
          />

          <Text
            variant="overline"
            tone="tertiary"
            style={{ marginTop: 32, marginBottom: 14 }}
          >
            Platform
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginHorizontal: -6,
            }}
          >
            {MODULES.map((m) => (
              <View
                key={m.label}
                style={{ width: cols >= 4 ? "50%" : "100%", padding: 6 }}
              >
                <Card padded>
                  <HStack gap={12} align="center">
                    <View style={styles.modIcon}>
                      <m.icon
                        size={17}
                        color={palette.accent[600]}
                        strokeWidth={2}
                      />
                    </View>
                    <Text variant="label-lg" tone="primary" numberOfLines={1}>
                      {m.label}
                    </Text>
                  </HStack>
                </Card>
              </View>
            ))}
          </View>
        </>
      ) : (
        <>
          <Card>
            <VStack gap={6}>
              <Text variant="overline" tone="accent">
                {roleLabel(role)} portal
              </Text>
              <Text variant="h3" tone="primary">
                Welcome to {organization?.name || "your institute"}
              </Text>
              <Text variant="body-sm" tone="secondary">
                Attendance, fees, learning and progress updates appear across
                the sections in the sidebar as your institute posts them.
              </Text>
            </VStack>
          </Card>
          <InsightPanel body="Personalised progress summaries will appear here as academic data is recorded." />
        </>
      )}
    </Screen>
  );
}

function InsightPanel({ body, onOpen }: { body: string; onOpen?: () => void }) {
  return (
    <View style={styles.insight}>
      <HStack gap={14} align="flex-start">
        <View style={styles.insightIcon}>
          <Sparkles size={18} color={palette.accent[300]} strokeWidth={2} />
        </View>
        <VStack gap={4} flex={1}>
          <Text variant="label-lg" tone="inverse">
            AI Insights
          </Text>
          <Text variant="body-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
            {body}
          </Text>
          {onOpen ? (
            <Button
              label="Open Executive & AI"
              variant="secondary"
              size="sm"
              fullWidth={false}
              rightIcon={
                <ArrowUpRight
                  size={15}
                  color={palette.text.primary}
                  strokeWidth={2}
                />
              }
              onPress={onOpen}
              style={{ marginTop: 10 }}
            />
          ) : null}
        </VStack>
      </HStack>
    </View>
  );
}

const styles = {
  insight: {
    marginTop: 20,
    backgroundColor: palette.surface.dark,
    borderRadius: radius.lg,
    padding: 20,
  },
  insightIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: "rgba(255,255,255,0.10)",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  modIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: palette.accent[50],
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
};

function roleLabel(role: string) {
  switch (role) {
    case "admin":
      return "Administrator";
    case "teacher":
      return "Teacher";
    case "parent":
      return "Parent";
    case "student":
      return "Student";
    default:
      return "Staff";
  }
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
