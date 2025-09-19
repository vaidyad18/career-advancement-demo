import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { JobPosting, Resume, Application } from "@shared/api";
import { JOBS, findJobsByRole } from "@/data/jobs";

function useResumes(): Resume[] {
  try {
    return JSON.parse(localStorage.getItem("ica.resumes") || "[]");
  } catch {
    return [];
  }
}

function saveApplication(entry: Application) {
  const key = "ica.applications";
  const prev = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify([entry, ...prev]));
}

function uid(prefix = "app") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

type Props = { activeRole?: string };

export default function JobBoard({ activeRole }: Props) {
  const resumes = useResumes();
  const role = activeRole || resumes[0]?.role || "Frontend Engineer";
  const [query, setQuery] = useState(role);

  useEffect(() => setQuery(role), [role]);

  const jobs = useMemo(() => {
    const base = query ? findJobsByRole(query) : JOBS;
    return base.slice(0, 6);
  }, [query]);

  const apply = (job: JobPosting) => {
    const resumeId = resumes[0]?.id;
    const entry: Application = {
      id: uid(),
      job,
      resumeId: resumeId || "",
      status: "Applied",
      date: new Date().toISOString(),
    };
    saveApplication(entry);
    alert(`Applied to ${job.title} at ${job.company}`);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Matching Jobs</CardTitle>
          <input
            className="h-10 w-56 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Filter by role..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {jobs.map((j) => (
          <div key={j.id} className="rounded-lg border p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium">{j.title}</p>
                <p className="text-sm text-muted-foreground">
                  {j.company} · {j.location} · {j.type}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {j.tags.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button onClick={() => apply(j)}>Apply</Button>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <p className="text-muted-foreground">No jobs found for this role.</p>
        )}
      </CardContent>
    </Card>
  );
}
