import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardCharts from "@/components/dashboard/Charts";
import type { Resume, Application, QuizAttempt } from "@shared/api";

function useLocalStorageList<T>(key: string, initial: T[]) {
  const [list, setList] = useState<T[]>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T[]) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(list));
  }, [key, list]);
  return [list, setList] as const;
}

export default function Dashboard() {
  const [resumes] = useLocalStorageList<Resume>("ica.resumes", []);
  const [applications] = useLocalStorageList<Application>("ica.applications", []);
  const [attempts] = useLocalStorageList<QuizAttempt>("ica.quizAttempts", []);

  const stats = useMemo(() => {
    const applied = applications.length;
    const tests = attempts.length;
    const avg = attempts.length
      ? Math.round(
          attempts.reduce((a, b) => a + Math.round((b.score / b.total) * 100), 0) /
            attempts.length,
        )
      : 0;
    return { resumes: resumes.length, applied, tests, avg };
  }, [resumes, applications, attempts]);

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    try {
      return JSON.parse(localStorage.getItem("ica.sidebarCollapsed") || "false");
    } catch {
      return false;
    }
  });
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "ica.sidebarCollapsed" && e.newValue) {
        try {
          setSidebarCollapsed(JSON.parse(e.newValue));
        } catch {}
      }
    };
    const onCustom = (e: Event) => {
      const ce = e as CustomEvent<boolean>;
      if (typeof ce.detail === "boolean") setSidebarCollapsed(ce.detail);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("ica:sidebar-collapsed", onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ica:sidebar-collapsed", onCustom as EventListener);
    };
  }, []);

  return (
    <div className={cn("grid gap-6", sidebarCollapsed ? "lg:grid-cols-[4rem,1fr]" : "lg:grid-cols-[16rem,1fr]")}>
      <DashboardSidebar />
      <div className="space-y-8">
        <section>
          <h1 className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">Overview</h1>
          <p className="mt-2 text-muted-foreground">
            Track resumes, job applications, and quiz performance at a glance.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/10 to-transparent">
            <CardHeader>
              <CardTitle>Resumes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.resumes}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-500/10 to-transparent">
            <CardHeader>
              <CardTitle>Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.applied}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-500/10 to-transparent">
            <CardHeader>
              <CardTitle>Tests Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.tests}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-fuchsia-500/10 to-transparent">
            <CardHeader>
              <CardTitle>Avg Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.avg}%</p>
            </CardContent>
          </Card>
        </section>

        <DashboardCharts />

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Created Resumes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumes.length === 0 && (
                <p className="text-muted-foreground">No resumes yet.</p>
              )}
              {resumes.map((r) => (
                <div key={r.id} className="rounded-lg border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{r.fullName}</p>
                      <p className="text-sm text-muted-foreground">{r.role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>{r.role}</Badge>
                      <Badge variant="secondary">{r.location || "Remote"}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applied Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {applications.length === 0 && (
                <p className="text-muted-foreground">No applications yet.</p>
              )}
              {applications.map((a) => (
                <div key={a.id} className="rounded-lg border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{a.job.title}</p>
                      <p className="text-sm text-muted-foreground">{a.job.company} · {a.job.location}</p>
                    </div>
                    <Badge variant="secondary">{a.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Quiz Attempts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {attempts.length === 0 && (
                <p className="text-muted-foreground">No attempts yet.</p>
              )}
              {attempts.map((t) => (
                <div key={t.id} className="rounded-lg border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{t.role} Quiz</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(t.date).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {t.score}/{t.total} correct
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Math.round((t.score / t.total) * 100)}%
                      </p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex flex-wrap gap-2">
                    {t.answers.map((ans, i) => (
                      <Badge
                        key={i}
                        variant={ans.correct ? "default" : "destructive"}
                      >
                        Q{i + 1}: {ans.correct ? "✓" : "✕"}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
