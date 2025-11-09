"use client";
import { useState } from "react";

type Result = { id: string; title: string; channelTitle: string; publishedAt: string };

export default function SearchWidget() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  const search = async () => {
    if (!q.trim()) return;
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      setResults(data.items as Result[]);
    } catch (e: any) {
      setError(e.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="header"><h2>Search (YouTube API)</h2></div>
      <div className="flex">
        <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search videos" />
        <button className="button" onClick={search} disabled={loading}>{loading ? "Searching..." : "Search"}</button>
      </div>
      {error && <p className="small" style={{color:'#fca5a5'}}>{error}</p>}
      <div className="grid" style={{marginTop: 12}}>
        {results.map((r) => (
          <div key={r.id} className="grid-6 card">
            <strong>{r.title}</strong>
            <p className="small">{r.channelTitle} ? {new Date(r.publishedAt).toLocaleDateString()}</p>
            <a target="_blank" rel="noreferrer" href={`https://youtu.be/${r.id}`}>Open on YouTube</a>
          </div>
        ))}
      </div>
      <p className="small">Requires server env `YOUTUBE_API_KEY`.</p>
    </div>
  );
}
