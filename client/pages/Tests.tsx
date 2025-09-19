import RoleQuiz from "@/components/quiz/RoleQuiz";

export default function TestsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Role-based Tests</h1>
        <p className="mt-2 text-muted-foreground">
          Take quizzes tailored to your job role and track performance.
        </p>
      </header>
      <RoleQuiz />
    </div>
  );
}
