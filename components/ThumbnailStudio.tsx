"use client";
import { useEffect, useRef, useState } from "react";

export default function ThumbnailStudio() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [title, setTitle] = useState("Automation Secrets");
  const [bgColor, setBgColor] = useState("#0b1120");
  const [fgColor, setFgColor] = useState("#ffffff");
  const [accent, setAccent] = useState("#3b82f6");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (image) {
      const img = new Image();
      img.onload = () => {
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.globalAlpha = 0.6;
        ctx.drawImage(img, (canvas.width - w)/2, (canvas.height - h)/2, w, h);
        ctx.globalAlpha = 1;
        drawText();
      };
      img.src = image;
    } else {
      drawText();
    }

    function drawText() {
      if (!ctx) return;
      const c = canvasRef.current;
      if (!c) return;
      const padding = 40;
      ctx.fillStyle = fgColor;
      ctx.font = `bold 96px Inter, Arial, sans-serif`;
      ctx.textBaseline = "top";
      const words = title.split(/\s+/);
      let line = "";
      let y = padding;
      for (const word of words) {
        const test = (line + " " + word).trim();
        const width = ctx.measureText(test).width;
        if (width > c.width - padding*2) {
          ctx.fillText(line, padding, y);
          y += 110;
          line = word;
        } else {
          line = test;
        }
      }
      if (line) ctx.fillText(line, padding, y);

      // accent bar
      ctx.fillStyle = accent;
      ctx.fillRect(padding, c.height - 30 - padding, c.width - padding*2, 30);
    }
  }, [title, bgColor, fgColor, accent, image]);

  const onFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const download = () => {
    const url = canvasRef.current?.toDataURL("image/png");
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `thumbnail-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="card">
      <div className="header"><h2>Thumbnail Studio</h2></div>
      <div className="grid">
        <div className="grid-6">
          <label>Title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="grid" style={{marginTop: 8}}>
            <div className="grid-6">
              <label>Background</label>
              <input className="input" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </div>
            <div className="grid-6">
              <label>Text Color</label>
              <input className="input" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
            </div>
            <div className="grid-6">
              <label>Accent</label>
              <input className="input" type="color" value={accent} onChange={(e) => setAccent(e.target.value)} />
            </div>
            <div className="grid-6">
              <label>Background Image</label>
              <input className="input" type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} />
            </div>
          </div>
          <div className="flex" style={{marginTop: 12}}>
            <button className="button" onClick={download}>Download PNG</button>
            <button className="button secondary" onClick={() => setImage(null)}>Clear Image</button>
          </div>
        </div>
        <div className="grid-6">
          <canvas ref={canvasRef} style={{width: '100%', borderRadius: 8, border: '1px solid #233'}} />
        </div>
      </div>
    </div>
  );
}
