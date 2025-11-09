"use client";
import { useEffect, useState } from "react";

type Video = { id: string; title: string; published: string; link: string };

export default function RSSMonitor() {
  const [channelId, setChannelId] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!channelId) return;
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/rss?channelId=${encodeURIComponent(channelId)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch RSS");
      setVideos(data.videos as Video[]);
    } catch (e: any) {
      setError(e.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("yt_channel_id") || "";
    if (id) { setChannelId(id); }
  }, []);

  useEffect(() => {
    if (channelId) localStorage.setItem("yt_channel_id", channelId);
  }, [channelId]);

  return (
    <div className="card">
      <div className="header"><h2>RSS Monitor</h2></div>
      <label>Channel ID (not handle). Example: UC_x5XG1OV2P6uZZ5FSM9Ttw</label>
      <div className="flex">
        <input className="input" value={channelId} onChange={(e) => setChannelId(e.target.value)} placeholder="Enter channelId" />
        <button className="button" onClick={load} disabled={!channelId || loading}>{loading ? "Loading..." : "Load"}</button>
      </div>
      {error && <p className="small" style={{color:'#fca5a5'}}>{error}</p>}
      <div className="grid" style={{marginTop: 12}}>
        {videos.map((v) => (
          <div key={v.id} className="grid-6 card">
            <a href={v.link} target="_blank" rel="noreferrer"><strong>{v.title}</strong></a>
            <p className="small">{new Date(v.published).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
