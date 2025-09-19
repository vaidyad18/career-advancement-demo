import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Resume, Application, QuizAttempt } from "@shared/api";

function useLocalCount<T = unknown>(key: string) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      const arr = raw ? (JSON.parse(raw) as T[]) : [];
      setCount(Array.isArray(arr) ? arr.length : 0);
    } catch {
      setCount(0);
    }
  }, [key]);
  return count;
}

export default function DashboardSidebar() {
  const resumeCount = useLocalCount<Resume>("ica.resumes");
  const appCount = useLocalCount<Application>("ica.applications");
  const attemptCount = useLocalCount<QuizAttempt>("ica.quizAttempts");

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("ica.sidebarCollapsed") || "false",
      );
    } catch {
      return false;
    }
  });
  useEffect(() => {
    localStorage.setItem("ica.sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const widthClass = collapsed ? "lg:w-16" : "lg:w-64";

  return (
    <aside
      className={cn(
        "sticky top-20 h-[calc(100vh-6rem)] w-full rounded-xl border bg-card p-3 transition-[width]",
        widthClass,
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2 px-1">
        <div
          className={cn(
            "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
            collapsed && "sr-only",
          )}
        >
          Snapshot
        </div>
        <button
          type="button"
          onClick={() =>
            setCollapsed((v) => {
              const next = !v;
              try {
                window.dispatchEvent(
                  new CustomEvent("ica:sidebar-collapsed", { detail: next }),
                );
              } catch {}
              return next;
            })
          }
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-sm hover:bg-accent"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      <div className="h-[calc(100%-2.75rem)] space-y-3 overflow-auto pr-1">
        <section className="rounded-lg border p-3">
          <div className="text-xs text-muted-foreground">Resumes</div>
          <div className="mt-1 text-2xl font-bold">{resumeCount}</div>
          {!collapsed && (
            <Button asChild size="sm" className="mt-2 w-full">
              <Link to="/resume">View all</Link>
            </Button>
          )}
        </section>
        <section className="rounded-lg border p-3">
          <div className="text-xs text-muted-foreground">Applications</div>
          <div className="mt-1 text-2xl font-bold">{appCount}</div>
          {!collapsed && (
            <Button
              asChild
              size="sm"
              className="mt-2 w-full"
              variant="secondary"
            >
              <Link to="/jobs">View all</Link>
            </Button>
          )}
        </section>
        <section className="rounded-lg border p-3">
          <div className="text-xs text-muted-foreground">Tests</div>
          <div className="mt-1 text-2xl font-bold">{attemptCount}</div>
          {!collapsed && (
            <Button asChild size="sm" className="mt-2 w-full" variant="ghost">
              <Link to="/tests">View all</Link>
            </Button>
          )}
        </section>
      </div>
    </aside>
  );
}
