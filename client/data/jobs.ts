import type { JobPosting } from "@shared/api";

export const JOBS: JobPosting[] = [
  {
    id: "job-1",
    title: "Frontend Engineer (React)",
    company: "NovaTech",
    location: "Remote",
    type: "Remote",
    role: "Frontend Engineer",
    tags: ["React", "TypeScript", "UI", "Tailwind"],
    description:
      "Build elegant, accessible UIs in React. Collaborate with design and product to ship delightful experiences.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "job-2",
    title: "Backend Engineer (Node.js)",
    company: "DataForge",
    location: "Bengaluru, IN",
    type: "Full-time",
    role: "Backend Engineer",
    tags: ["Node.js", "Postgres", "API", "Cloud"],
    description:
      "Design resilient services, craft clean APIs, and optimize DB queries for scale.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "job-3",
    title: "Full Stack Developer",
    company: "Skyline",
    location: "Hyderabad, IN",
    type: "Full-time",
    role: "Full Stack Developer",
    tags: ["React", "Node.js", "AWS", "CI/CD"],
    description:
      "Own features end-to-end across the stack. From data models to polished UIs.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "job-4",
    title: "Data Analyst",
    company: "InsightLabs",
    location: "Gurugram, IN",
    type: "Contract",
    role: "Data Analyst",
    tags: ["SQL", "Python", "Dashboards", "ETL"],
    description:
      "Transform data into insights. Build dashboards and reports to inform business decisions.",
    postedAt: new Date().toISOString(),
  },
];

export function findJobsByRole(role: string) {
  const key = role.toLowerCase();
  return JOBS.filter((j) => j.role.toLowerCase().includes(key));
}
