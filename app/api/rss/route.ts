import { NextRequest } from "next/server";
import { parseStringPromise } from "xml2js";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get("channelId");
  if (!channelId) return Response.json({ error: "Missing channelId" }, { status: 400 });

  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
  const r = await fetch(rssUrl, { next: { revalidate: 60 } });
  if (!r.ok) {
    return Response.json({ error: `Upstream ${r.status}` }, { status: 502 });
  }
  const xml = await r.text();
  try {
    const parsed = await parseStringPromise(xml);
    const entries = parsed.feed.entry || [];
    const videos = entries.map((e: any) => ({
      id: e["yt:videoId"][0],
      title: e.title[0],
      published: e.published[0],
      link: e.link[0].$.href,
    }));
    return Response.json({ videos });
  } catch (e: any) {
    return Response.json({ error: "Failed to parse RSS" }, { status: 500 });
  }
}
