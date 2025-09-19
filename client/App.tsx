import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const queryClient = new QueryClient();

function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">IA</span>
            <span className="text-lg">Intelligent Career Advancement</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" className={cn("px-3")}>
              <Link to="/">Home</Link>
            </Button>
            <Button asChild variant="ghost" className={cn("px-3")}>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <a
              className="ml-2 hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:inline-block"
              href="#resume-builder"
            >
              Build Resume
            </a>
          </nav>
        </div>
      </header>
      <main className="container py-10">
        <Outlet />
      </main>
      <footer className="border-t py-8 text-sm text-muted-foreground">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} Intelligent Career Advancement Platform</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
