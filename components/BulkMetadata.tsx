"use client";
import { useMemo, useRef, useState } from "react";
import Papa from "papaparse";

type Row = { title: string; description: string; tags: string };

export default function BulkMetadata() {
  const [rows, setRows] = useState<Row[]>([
    { title: "Example Video", description: "Description here", tags: "tutorial,guide" },
  ]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const headers = ["title", "description", "tags"] as const;

  const csv = useMemo(() => {
    return Papa.unparse(rows, { columns: headers as unknown as string[] });
  }, [rows]);

  const importCSV = (file?: File) => {
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const data = (res.data as any[]).map((r) => ({
          title: (r.title || "").toString(),
          description: (r.description || "").toString(),
          tags: (r.tags || "").toString(),
        }));
        setRows(data);
      },
    });
  };

  const downloadCSV = () => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `metadata-${Date.now()}.csv`;
    a.click();
  };

  const addRow = () => setRows((r) => [...r, { title: "", description: "", tags: "" }]);

  return (
    <div className="card">
      <div className="header"><h2>Bulk Metadata</h2></div>
      <div className="flex">
        <button className="button" onClick={addRow}>Add Row</button>
        <button className="button secondary" onClick={downloadCSV}>Export CSV</button>
        <button className="button ghost" onClick={() => fileInputRef.current?.click()}>Import CSV</button>
        <input type="file" accept=".csv" ref={fileInputRef} style={{display: 'none'}} onChange={(e) => importCSV(e.target.files?.[0] || undefined)} />
      </div>
      <div style={{overflowX: 'auto', marginTop: 12}}>
        <table className="mono" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h} style={{ textAlign: 'left', borderBottom: '1px solid #233', padding: 8 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: 8 }}>
                  <input className="input" value={row.title} onChange={(e) => setRows((r)=>{ const copy=[...r]; copy[i] = {...copy[i], title: e.target.value}; return copy; })} />
                </td>
                <td style={{ padding: 8 }}>
                  <textarea className="textarea" value={row.description} onChange={(e) => setRows((r)=>{ const copy=[...r]; copy[i] = {...copy[i], description: e.target.value}; return copy; })} />
                </td>
                <td style={{ padding: 8 }}>
                  <input className="input" value={row.tags} onChange={(e) => setRows((r)=>{ const copy=[...r]; copy[i] = {...copy[i], tags: e.target.value}; return copy; })} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="small">Tip: Tags should be comma-separated.</p>
    </div>
  );
}
