"use client";
import { useState } from "react";
import { Navigation, type TabKey } from "../components/Navigation";
import Planner from "../components/Planner";
import ThumbnailStudio from "../components/ThumbnailStudio";
import BulkMetadata from "../components/BulkMetadata";
import RSSMonitor from "../components/RSSMonitor";
import SearchWidget from "../components/SearchWidget";
import Uploader from "../components/Uploader";

export default function Page() {
  const [tab, setTab] = useState<TabKey>("planner");

  return (
    <div>
      <div className="header">
        <h1>YouTube Automation</h1>
        <a className="small" href="https://agentic-f1102a1c.vercel.app" target="_blank" rel="noreferrer">Production URL</a>
      </div>
      <Navigation active={tab} onChange={setTab} />
      <div style={{ marginTop: 16 }}>
        {tab === "planner" && <Planner />}
        {tab === "thumbnail" && <ThumbnailStudio />}
        {tab === "bulk" && <BulkMetadata />}
        {tab === "rss" && <RSSMonitor />}
        {tab === "search" && <SearchWidget />}
        {tab === "uploader" && <Uploader />}
      </div>
    </div>
  );
}
