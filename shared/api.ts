/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Domain models
export interface Resume {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  location?: string;
  skills: string[];
  summary: string;
  experience: Array<{
    company: string;
    title: string;
    start: string; // YYYY-MM
    end?: string; // YYYY-MM or "Present"
    summary: string;
  }>;
  education?: Array<{
    school: string;
    degree: string;
    year: string;
  }>;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  role: string; // primary role keyword
  tags: string[];
  description: string;
  postedAt: string; // ISO date
}

export interface Application {
  id: string;
  job: JobPosting;
  resumeId: string;
  status: "Applied" | "In Review" | "Interview" | "Rejected" | "Offer";
  date: string; // ISO date
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
}

export interface Quiz {
  role: string;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  role: string;
  answers: { questionId: string; choiceIndex: number; correct: boolean }[];
  score: number;
  total: number;
  date: string; // ISO date
}
