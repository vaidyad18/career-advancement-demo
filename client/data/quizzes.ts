import type { Quiz } from "@shared/api";

export const QUIZZES: Quiz[] = [
  {
    role: "Frontend Engineer",
    questions: [
      {
        id: "fe-q1",
        prompt: "Which CSS unit adapts based on the root font size?",
        choices: ["px", "em", "rem", "%"],
        answerIndex: 2,
      },
      {
        id: "fe-q2",
        prompt: "What does React's useMemo primarily optimize?",
        choices: [
          "Avoid re-rendering components",
          "Memoize expensive computations",
          "Cache API responses",
          "Bundle splitting",
        ],
        answerIndex: 1,
      },
      {
        id: "fe-q3",
        prompt: "Which attribute improves image loading performance?",
        choices: ["alt", "srcset", "loading=\"lazy\"", "title"],
        answerIndex: 2,
      },
    ],
  },
  {
    role: "Backend Engineer",
    questions: [
      {
        id: "be-q1",
        prompt: "Which HTTP status code represents 'Created'?",
        choices: ["200", "201", "202", "204"],
        answerIndex: 1,
      },
      {
        id: "be-q2",
        prompt: "What is an idempotent HTTP method?",
        choices: ["POST", "GET", "PATCH", "CONNECT"],
        answerIndex: 1,
      },
      {
        id: "be-q3",
        prompt: "Best way to prevent SQL injection?",
        choices: [
          "Escape strings manually",
          "Use parameterized queries",
          "Disable user input",
          "Use MD5 hashing",
        ],
        answerIndex: 1,
      },
    ],
  },
];

export function getQuizForRole(role: string) {
  return QUIZZES.find((q) => q.role.toLowerCase() === role.toLowerCase());
}
