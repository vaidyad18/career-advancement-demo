import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Resume } from "@shared/api";

function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function smartCap(s: string) {
  return s
    .split(/[,\s]+/)
    .filter(Boolean)
    .map((t) => t[0]?.toUpperCase() + t.slice(1).toLowerCase())
    .join(" ");
}

function generateSummary(role: string, skills: string[]) {
  const s = skills.slice(0, 6);
  const lead = `Results-driven ${role}`;
  const body = ` with a track record of delivering high-quality, accessible, and scalable solutions.`;
  const tail = s.length
    ? ` Strengths include ${s.map((x) => x.toLowerCase()).join(", ")} with a focus on impact and collaboration.`
    : " Passionate about continuous learning and measurable outcomes.";
  return lead + body + tail;
}

function generateExperienceSummary(role: string, company: string) {
  return `Led ${role.toLowerCase()} initiatives at ${company}, improving key metrics by 15-30% through iterative delivery, cross-functional collaboration, and rigorous quality standards.`;
}

type Props = {
  onSaved?: (resume: Resume) => void;
};

export default function ResumeBuilder({ onSaved }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Frontend Engineer");
  const [location, setLocation] = useState("Remote");
  const [skills, setSkills] = useState("React, TypeScript, Tailwind, Testing");
  const [summary, setSummary] = useState("");
  const [expCompany, setExpCompany] = useState("NovaTech");
  const [expTitle, setExpTitle] = useState("Frontend Engineer");
  const [expStart, setExpStart] = useState("2022-01");
  const [expEnd, setExpEnd] = useState("Present");
  const [expSummary, setExpSummary] = useState("");

  const valid = useMemo(
    () => fullName && email && role && summary && expCompany && expTitle,
    [fullName, email, role, summary, expCompany, expTitle],
  );

  useEffect(() => {
    if (!summary && role) setSummary(generateSummary(role, skills.split(",")));
  }, []);

  const save = () => {
    const resume: Resume = {
      id: uid("cv"),
      fullName: smartCap(fullName.trim()),
      email: email.trim(),
      phone: phone.trim(),
      role: role.trim(),
      location: location.trim(),
      skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      summary: summary.trim(),
      experience: [
        {
          company: expCompany.trim(),
          title: expTitle.trim(),
          start: expStart,
          end: expEnd,
          summary:
            expSummary || generateExperienceSummary(expTitle, expCompany),
        },
      ],
    };
    const key = "ica.resumes";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(key, JSON.stringify([resume, ...prev]));
    onSaved?.(resume);
  };

  return (
    <Card id="resume-builder" className="shadow-sm">
      <CardHeader>
        <CardTitle>Create ATS-friendly Resume</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g., Alex Sharma"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98xxxxxxxx"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Frontend Engineer"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Remote / City"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Skills (comma separated)
            </label>
            <Input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, TypeScript, ..."
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Professional Summary</label>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setSummary(generateSummary(role, skills.split(",")))
              }
            >
              Generate with AI
            </Button>
          </div>
          <Textarea
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company</label>
            <Input
              value={expCompany}
              onChange={(e) => setExpCompany(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={expTitle}
              onChange={(e) => setExpTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Start</label>
            <Input
              type="month"
              value={expStart}
              onChange={(e) => setExpStart(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">End</label>
            <Input
              value={expEnd}
              onChange={(e) => setExpEnd(e.target.value)}
              placeholder="YYYY-MM or Present"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Experience Summary</label>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setExpSummary(generateExperienceSummary(expTitle, expCompany))
              }
            >
              Generate with AI
            </Button>
          </div>
          <Textarea
            rows={3}
            value={expSummary}
            onChange={(e) => setExpSummary(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button disabled={!valid} onClick={save}>
            Save Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
