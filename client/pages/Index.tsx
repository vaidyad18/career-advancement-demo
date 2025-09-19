import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-8 md:p-12">
        <div className="max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">ATS-ready</Badge>
            <Badge>AI-assisted</Badge>
            <Badge variant="secondary">Minimal & Elegant</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Intelligent Career Advancement Platform for Professional Development
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Build ATS-friendly resumes, discover role-matched jobs, and validate skills with tailored quizzes — all in one beautiful dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild><Link to="/resume">Create Resume</Link></Button>
            <Button asChild variant="secondary"><Link to="/jobs">Find Jobs</Link></Button>
            <Button asChild variant="ghost"><Link to="/tests">Take Test</Link></Button>
            <Button asChild variant="ghost"><Link to="/dashboard">Open Dashboard</Link></Button>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">ATS-friendly Resumes</h3>
          <p className="mt-2 text-sm text-muted-foreground">Clean structure, smart wording, and AI-assisted summaries.</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Role-matched Jobs</h3>
          <p className="mt-2 text-sm text-muted-foreground">See jobs aligned to your role, apply in a click.</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Quizzes & Insights</h3>
          <p className="mt-2 text-sm text-muted-foreground">Validate skills with quick quizzes and track progress.</p>
        </div>
      </section>
    </div>
  );
}
