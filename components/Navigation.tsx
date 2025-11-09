"use client";
import { useState } from "react";

export type TabKey =
  | "planner"
  | "thumbnail"
  | "bulk"
  | "rss"
  | "search"
  | "uploader";

export function Navigation(props: {
  active: TabKey;
  onChange: (t: TabKey) => void;
}) {
  const tabs: { key: TabKey; label: string }[] = [
    { key: "planner", label: "Content Planner" },
    { key: "thumbnail", label: "Thumbnail Studio" },
    { key: "bulk", label: "Bulk Metadata" },
    { key: "rss", label: "RSS Monitor" },
    { key: "search", label: "Search" },
    { key: "uploader", label: "Uploader" },
  ];
  return (
    <div className="nav">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={"tab" + (props.active === t.key ? " active" : "")}
          onClick={() => props.onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
