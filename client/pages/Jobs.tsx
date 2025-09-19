import JobBoard from "@/components/jobs/JobBoard";

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
        <p className="mt-2 text-muted-foreground">
          Browse and apply to jobs matched to your resume role.
        </p>
      </header>
      <JobBoard />
    </div>
  );
}
