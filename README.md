# YouTube Automation Dashboard

Plan content, design thumbnails, bulk-edit metadata via CSV, monitor channel uploads via RSS, and search videos (when `YOUTUBE_API_KEY` is configured). Built with Next.js and deployable to Vercel.

## Quick Start

```bash
npm install
npm run build
npm start
# open http://localhost:3000
```

## Features
- Content Planner: generate titles, descriptions, tags from a topic
- Thumbnail Studio: client-side Canvas editor with PNG export (1280×720)
- Bulk Metadata: CSV import/edit/export for title/description/tags
- RSS Monitor: fetch latest uploads for a channel via public RSS
- Search (API): proxy to YouTube Data API v3 (requires `YOUTUBE_API_KEY`)

## Environment Variables
- `YOUTUBE_API_KEY` (optional): enables server-side `/api/search` proxy.

Set in `.env.local` for local, or as project env vars on Vercel.

```
YOUTUBE_API_KEY=your_key_here
```

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm start` – run production server locally

## API Endpoints
- `GET /api/search?q=term` – searches YouTube videos via API key
- `GET /api/rss?channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw` – returns latest uploads from RSS

## Enable YouTube Uploads (Optional)
This starter ships without OAuth upload enabled. To add uploads:
1. Create a Google Cloud project, enable YouTube Data API v3
2. Create OAuth client (Web), set authorized redirect to your domain
3. Implement server-side upload using `googleapis` with OAuth tokens
4. Securely store tokens (e.g., encrypted KV) and call uploads from a server route

## Deploy to Vercel
- Ensure `VERCEL_TOKEN` is available in CI/local shell
- Run: `vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-f1102a1c`

## Notes
- RSS monitor uses YouTube public RSS feed and requires only a channel ID.
- Search requires a server key; never expose keys to the browser.
