import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Overview" },
  { to: "/resume", label: "Resumes" },
  { to: "/jobs", label: "Jobs" },
  { to: "/tests", label: "Tests" },
];

export default function DashboardSidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="sticky top-20 h-[calc(100vh-6rem)] w-full rounded-xl border bg-card p-4 lg:w-64">
      <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dashboard</div>
      <nav className="grid gap-1">
        {items.map((i) => (
          <Link
            key={i.to}
            to={i.to}
            className={cn(
              "rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
              pathname === i.to ? "bg-primary/10 text-foreground" : "text-muted-foreground",
            )}
          >
            {i.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
