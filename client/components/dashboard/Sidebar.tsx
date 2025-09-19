import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Resume, Application, QuizAttempt } from "@shared/api";

function useLocal<T>(key: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      setData(raw ? (JSON.parse(raw) as T) : fallback);
    } catch {
      setData(fallback);
    }
  }, [key]);
  return data;
}

export default function DashboardSidebar() {
  const resumes = useLocal<Resume[]>("ica.resumes", []);
  const apps = useLocal<Application[]>("ica.applications", []);
  const attempts = useLocal<QuizAttempt[]>("ica.quizAttempts", []);

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return JSON.parse(localStorage.getItem("ica.sidebarCollapsed") || "false");
    } catch {
      return false;
    }
  });
  useEffect(() => {
    localStorage.setItem("ica.sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const widthClass = collapsed ? "lg:w-16" : "lg:w-64";

  const resumeItems = useMemo(() => resumes.slice(0, 6), [resumes]);
  const appItems = useMemo(() => apps.slice(0, 6), [apps]);
  const attemptItems = useMemo(() => attempts.slice(0, 6), [attempts]);

  return (
    <aside
      className={cn(
        "sticky top-20 h-[calc(100vh-6rem)] w-full rounded-xl border bg-card p-3 transition-[width]",
        widthClass,
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2 px-1">
        <div className={cn("text-xs font-semibold uppercase tracking-wide text-muted-foreground", collapsed && "sr-only")}>Snapshot</div>
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-sm hover:bg-accent"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      <div className="h-[calc(100%-2.75rem)] overflow-auto pr-1">
        {/* Resumes */}
        <section className="mb-4">
          <div className={cn("mb-2 px-2 text-xs font-medium text-muted-foreground", collapsed && "sr-only")}>Resumes</div>
          <ul className="space-y-2">
            {resumeItems.map((r) => (
              <li key={r.id} className="rounded-md border p-2 text-xs">
                <div className={cn("font-medium", collapsed && "truncate")}>{r.fullName}</div>
                {!collapsed && (
                  <div className="text-muted-foreground">{r.role} · {r.location || "Remote"}</div>
                )}
              </li>
            ))}
            {resumeItems.length === 0 && (
              <li className={cn("px-2 text-xs text-muted-foreground", collapsed && "sr-only")}>No resumes yet</li>
            )}
          </ul>
        </section>

        {/* Applications */}
        <section className="mb-4">
          <div className={cn("mb-2 px-2 text-xs font-medium text-muted-foreground", collapsed && "sr-only")}>Applications</div>
          <ul className="space-y-2">
            {appItems.map((a) => (
              <li key={a.id} className="rounded-md border p-2 text-xs">
                <div className={cn("font-medium", collapsed && "truncate")}>{a.job.title}</div>
                {!collapsed && (
                  <div className="text-muted-foreground">{a.job.company} · {a.status}</div>
                )}
              </li>
            ))}
            {appItems.length === 0 && (
              <li className={cn("px-2 text-xs text-muted-foreground", collapsed && "sr-only")}>No applications yet</li>
            )}
          </ul>
        </section>

        {/* Tests */}
        <section>
          <div className={cn("mb-2 px-2 text-xs font-medium text-muted-foreground", collapsed && "sr-only")}>Tests</div>
          <ul className="space-y-2">
            {attemptItems.map((t) => (
              <li key={t.id} className="rounded-md border p-2 text-xs">
                <div className={cn("font-medium", collapsed && "truncate")}>{t.role} Quiz</div>
                {!collapsed && (
                  <div className="text-muted-foreground">{Math.round((t.score / t.total) * 100)}% · {new Date(t.date).toLocaleDateString()}</div>
                )}
              </li>
            ))}
            {attemptItems.length === 0 && (
              <li className={cn("px-2 text-xs text-muted-foreground", collapsed && "sr-only")}>No attempts yet</li>
            )}
          </ul>
        </section>
      </div>
    </aside>
  );
}
