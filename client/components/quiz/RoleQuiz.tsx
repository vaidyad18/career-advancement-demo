import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { QuizAttempt, Resume } from "@shared/api";
import { getQuizForRole } from "@/data/quizzes";

function useFirstRole(): string {
  try {
    const resumes: Resume[] = JSON.parse(
      localStorage.getItem("ica.resumes") || "[]",
    );
    return resumes[0]?.role || "Frontend Engineer";
  } catch {
    return "Frontend Engineer";
  }
}

function uid(prefix = "quiz") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function saveAttempt(attempt: QuizAttempt) {
  const key = "ica.quizAttempts";
  const prev = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify([attempt, ...prev]));
}

export default function RoleQuiz() {
  const defaultRole = useFirstRole();
  const [role, setRole] = useState(defaultRole);
  const quiz = useMemo(() => getQuizForRole(role), [role]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<QuizAttempt | null>(null);

  const submit = () => {
    if (!quiz) return;
    const evals = quiz.questions.map((q) => {
      const choiceIndex = answers[q.id];
      return {
        questionId: q.id,
        choiceIndex,
        correct: choiceIndex === q.answerIndex,
      };
    });
    const score = evals.filter((e) => e.correct).length;
    const attempt: QuizAttempt = {
      id: uid(),
      role,
      answers: evals,
      score,
      total: quiz.questions.length,
      date: new Date().toISOString(),
    };
    saveAttempt(attempt);
    setSubmitted(attempt);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Role-based Quiz</CardTitle>
          <input
            className="h-10 w-56 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!quiz && (
          <p className="text-muted-foreground">
            No quiz available for this role.
          </p>
        )}
        {quiz && (
          <div className="space-y-6">
            {quiz.questions.map((q, idx) => (
              <div key={q.id} className="rounded-lg border p-4">
                <p className="font-medium">
                  Q{idx + 1}. {q.prompt}
                </p>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {q.choices.map((c, i) => (
                    <label
                      key={i}
                      className="flex cursor-pointer items-center gap-2 rounded-md border p-2 hover:bg-accent"
                    >
                      <input
                        type="radio"
                        name={q.id}
                        className="accent-primary"
                        checked={answers[q.id] === i}
                        onChange={() =>
                          setAnswers((s) => ({ ...s, [q.id]: i }))
                        }
                      />
                      <span className="text-sm">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <Button onClick={submit}>Submit</Button>
            </div>
            {submitted && (
              <div className="rounded-lg border p-4">
                <p className="font-medium">
                  Score: {submitted.score}/{submitted.total} (
                  {Math.round((submitted.score / submitted.total) * 100)}%)
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
