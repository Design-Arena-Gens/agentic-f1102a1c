"use client";
export default function Uploader() {
  return (
    <div className="card">
      <div className="header"><h2>Uploader (Optional)</h2></div>
      <p>
        This demo does not perform authenticated uploads out of the box. To enable YouTube uploads,
        configure Google OAuth and server-side upload code. For most automation, use Bulk Metadata,
        Planner, Thumbnail Studio, and RSS Monitor without credentials.
      </p>
      <p className="small">To enable uploads, see README section "Enable YouTube Uploads".</p>
    </div>
  );
}
