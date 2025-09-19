import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Application, QuizAttempt } from "@shared/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function useLocal<T>(key: string, fallback: T) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const COLORS = ["#6E59F4", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

export default function DashboardCharts() {
  const attempts = useLocal<QuizAttempt[]>("ica.quizAttempts", []);
  const apps = useLocal<Application[]>("ica.applications", []);

  const scoreSeries = useMemo(() => {
    return attempts
      .slice()
      .reverse()
      .map((a) => ({
        date: new Date(a.date).toLocaleDateString(),
        score: Math.round((a.score / a.total) * 100),
      }));
  }, [attempts]);

  const appsByStatus = useMemo(() => {
    const map = new Map<string, number>();
    apps.forEach((a) => map.set(a.status, (map.get(a.status) || 0) + 1));
    return Array.from(map.entries()).map(([status, count]) => ({
      status,
      count,
    }));
  }, [apps]);

  const roleSplit = useMemo(() => {
    const m = new Map<string, number>();
    apps.forEach((a) => m.set(a.job.role, (m.get(a.job.role) || 0) + 1));
    return Array.from(m.entries()).map(([name, value]) => ({ name, value }));
  }, [apps]);

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Quiz Scores Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreSeries} margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} tickCount={6} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#6E59F4"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Applications by Status</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={appsByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="xl:col-span-3">
        <CardHeader>
          <CardTitle>Applications by Role</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie dataKey="value" data={roleSplit} outerRadius={110} label>
                {roleSplit.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
