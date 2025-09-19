import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function QuickLauncher() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
      <Button asChild className="shadow-lg">
        <Link to="/resume">Create Resume</Link>
      </Button>
      <Button asChild variant="secondary" className="shadow-lg">
        <Link to="/jobs">Find Jobs</Link>
      </Button>
      <Button asChild variant="ghost" className="shadow-lg">
        <Link to="/tests">Take Test</Link>
      </Button>
    </div>
  );
}

export default function Index() {
  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-8 md:p-14">
        <div className="max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">ATS-ready</Badge>
            <Badge>AI-assisted</Badge>
            <Badge variant="secondary">Minimal & Elegant</Badge>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Intelligent Career Advancement Platform for Professional Development
          </h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-xl">
            Build ATS-friendly resumes, discover role-matched jobs, and validate
            skills with tailored quizzes — all in one beautiful dashboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/resume">Start with Resume</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/jobs">Explore Jobs</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/tests">Try a Quiz</Link>
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border p-6">
          <h3 className="text-lg font-semibold">ATS-friendly Resumes</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Clean structure, smart wording, and AI-assisted summaries.
          </p>
        </div>
        <div className="rounded-2xl border p-6">
          <h3 className="text-lg font-semibold">Role-matched Jobs</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            See jobs aligned to your role, apply in a click.
          </p>
        </div>
        <div className="rounded-2xl border p-6">
          <h3 className="text-lg font-semibold">Quizzes & Insights</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Validate skills with quick quizzes and track progress.
          </p>
        </div>
      </section>

      <section className="grid items-start gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border p-8">
          <h3 className="text-2xl font-bold">Three steps to your next role</h3>
          <ol className="mt-6 space-y-4">
            <li className="flex gap-4">
              <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </span>
              <div>
                <p className="font-medium">Craft an ATS-perfect resume</p>
                <p className="text-sm text-muted-foreground">
                  Enter details manually and let AI refine your summary and
                  experience blurbs.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </span>
              <div>
                <p className="font-medium">Apply to role-matched jobs</p>
                <p className="text-sm text-muted-foreground">
                  We surface openings aligned to your resume’s role for focused
                  applications.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </span>
              <div>
                <p className="font-medium">Validate skills with quizzes</p>
                <p className="text-sm text-muted-foreground">
                  Take quick tests to benchmark your skills and track progress
                  in the dashboard.
                </p>
              </div>
            </li>
          </ol>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link to="/resume">Create Resume</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border p-8">
          <h3 className="text-2xl font-bold">Why candidates choose us</h3>
          <ul className="mt-6 grid gap-3 text-sm text-muted-foreground">
            <li>• Clean, ATS-friendly formatting out of the box</li>
            <li>• AI assistance for compelling summaries</li>
            <li>• Role-first job discovery for signal over noise</li>
            <li>• Lightweight quizzes for instant feedback</li>
            <li>• Private, local-first prototype (no sign-in required)</li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border p-8">
        <h3 className="text-2xl font-bold">FAQs</h3>
        <div className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is the resume ATS-compatible?</AccordionTrigger>
              <AccordionContent>
                Yes. We focus on structure, readability, and keyword clarity for
                Applicant Tracking Systems.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do you match jobs?</AccordionTrigger>
              <AccordionContent>
                We filter openings by your resume role and tags to surface
                relevant postings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Are quizzes customizable?</AccordionTrigger>
              <AccordionContent>
                Quizzes are role-based and concise, designed for quick skill
                checks and progress tracking.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How is my data stored?</AccordionTrigger>
              <AccordionContent>
                This prototype stores data locally in your browser
                (localStorage). You can clear it anytime. We can connect a
                database later if needed.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <QuickLauncher />
    </div>
  );
}
