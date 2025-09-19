import ResumeBuilder from "@/components/resume/ResumeBuilder";

export default function ResumePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Create Resume</h1>
        <p className="mt-2 text-muted-foreground">
          Build an ATS-friendly resume with optional AI assistance.
        </p>
      </header>
      <ResumeBuilder />
    </div>
  );
}
