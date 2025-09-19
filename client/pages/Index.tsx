import ResumeBuilder from "@/components/resume/ResumeBuilder";
import JobBoard from "@/components/jobs/JobBoard";
import RoleQuiz from "@/components/quiz/RoleQuiz";
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
            <a href="#resume-builder" className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Create Resume</a>
            <Button asChild variant="secondary"><Link to="/dashboard">Open Dashboard</Link></Button>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <ResumeBuilder />
        <div className="grid gap-6">
          <JobBoard />
          <RoleQuiz />
        </div>
      </div>
    </div>
  );
}
