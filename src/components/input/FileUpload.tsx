import React, { useState } from "react";
import type { FileUploadProps } from "../../types";

export default function FileUpload({ onFile }: FileUploadProps): React.JSX.Element {
  const [fname, setFname] = useState("");
  const [drag, setDrag] = useState(false);

  function pick(f: File | null): void {
    if (!f) return;
    setFname("✅ " + f.name);
    onFile(f);
  }

  return (
    <div
      onClick={() => (document.getElementById("tai-file") as HTMLInputElement)?.click()}
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files[0];
        if (f?.type.startsWith("audio/")) pick(f);
      }}
      style={{
        border:`2px dashed ${drag?"var(--accent)":"var(--border)"}`,
        borderRadius:12,padding:"40px 20px",textAlign:"center",cursor:"pointer"
      }}
    >
      <div style={{fontSize:"2.5rem"}}>🎵</div>
      <p style={{color:"var(--sub)"}}>Click or drag & drop</p>

      {fname && <div style={{color:"var(--accent2)"}}>{fname}</div>}

      <input
        id="tai-file"
        type="file"
        accept="audio/*"
        style={{display:"none"}}
        onChange={e => pick(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}