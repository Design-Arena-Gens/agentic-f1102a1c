import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const key = process.env.YOUTUBE_API_KEY;
  if (!q) return Response.json({ error: "Missing q" }, { status: 400 });
  if (!key) return Response.json({ error: "Server missing YOUTUBE_API_KEY" }, { status: 400 });

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", "12");
  url.searchParams.set("q", q);
  url.searchParams.set("key", key);

  const r = await fetch(url, { next: { revalidate: 60 } });
  if (!r.ok) {
    return Response.json({ error: `Upstream ${r.status}` }, { status: 502 });
  }
  const data = await r.json();
  const items = (data.items || []).map((it: any) => ({
    id: it.id.videoId,
    title: it.snippet.title,
    channelTitle: it.snippet.channelTitle,
    publishedAt: it.snippet.publishedAt,
  }));
  return Response.json({ items });
}
