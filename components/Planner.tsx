"use client";
import { useMemo, useState } from "react";

function generateIdeas(keyword: string, count: number): string[] {
  const base = keyword.trim();
  if (!base) return [];
  const patterns = [
    `Top 10 ${base} tips you must know`,
    `${base} for beginners: complete walkthrough`,
    `I tried ${base} so you don't have to`,
    `${base} myths busted (with data)`,
    `${base} in 2025: what's new?`,
    `The ultimate ${base} guide (step-by-step)`,
    `Avoid these ${base} mistakes`,
    `${base} on a budget: pro results`,
    `${base} explained in 10 minutes`,
    `Underrated ${base} tools and tricks`
  ];
  const out: string[] = [];
  for (let i = 0; i < count; i++) out.push(patterns[i % patterns.length]);
  return Array.from(new Set(out));
}

function generateDescription(title: string, keywords: string[]): string {
  const lines = [
    title,
    "",
    "In this video you'll learn:",
    "- Key strategies that actually work",
    "- Common pitfalls and how to avoid them",
    "- A simple 3-step framework you can reuse",
    "",
    "Chapters:",
    "00:00 Intro",
    "00:30 Why this matters",
    "02:00 Step-by-step",
    "08:00 Examples",
    "10:00 Wrap-up",
    "",
    `Keywords: ${keywords.join(", ")}`,
  ];
  return lines.join("\n");
}

function suggestTags(base: string): string[] {
  const core = base.toLowerCase().split(/\s+/).filter(Boolean);
  const extras = ["tutorial", "guide", "tips", "2025", "how to", "beginners", "advanced", "workflow", "productivity"];
  return Array.from(new Set([...core, ...extras])).slice(0, 15);
}

export default function Planner() {
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(10);
  const ideas = useMemo(() => generateIdeas(keyword, count), [keyword, count]);

  const [selectedTitle, setSelectedTitle] = useState("");
  const tags = useMemo(() => suggestTags(keyword), [keyword]);
  const description = useMemo(() => generateDescription(selectedTitle || (ideas[0] || ""), tags), [selectedTitle, ideas, tags]);

  return (
    <div className="card">
      <div className="header">
        <h2>Content Planner</h2>
      </div>
      <div className="grid">
        <div className="grid-6">
          <label>Keyword or Topic</label>
          <input className="input" placeholder="e.g. YouTube automation" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </div>
        <div className="grid-6">
          <label>Number of ideas</label>
          <input className="input" type="number" min={5} max={50} value={count} onChange={(e) => setCount(parseInt(e.target.value || "10", 10))} />
        </div>
        <div className="grid-12">
          <hr />
        </div>
        <div className="grid-6">
          <h3>Ideas</h3>
          <div className="flex-col">
            {ideas.map((t) => (
              <button key={t} className={"button ghost" + (selectedTitle === t ? " active" : "")} onClick={() => setSelectedTitle(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className="grid-6">
          <h3>Selected</h3>
          <input className="input" value={selectedTitle} onChange={(e) => setSelectedTitle(e.target.value)} placeholder="Choose an idea or edit" />
          <label>Suggested Tags</label>
          <div className="flex" style={{flexWrap: 'wrap'}}>
            {tags.map((t) => (
              <span key={t} className="tab">{t}</span>
            ))}
          </div>
          <label>Description</label>
          <textarea className="textarea mono" value={description} onChange={()=>{}} readOnly />
        </div>
      </div>
    </div>
  );
}
