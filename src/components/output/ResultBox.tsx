import type { ResultBoxProps } from "../../types";
import React from "react";

export default function ResultBox({ text, onClear, onToast }: ResultBoxProps): React.JSX.Element {
  function copy(): void {
    navigator.clipboard.writeText(text).then(() => onToast("Copied!"));
  }

  function download(): void {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    a.download = "transcription.txt";
    a.click();
  }

  return (
    <div style={{
  background:"var(--card)",
  border:"1px solid var(--border)",
  borderRadius:16,
  padding:24,
  marginTop:20
}}>
  <div style={{
    background:"#0d0d18",
    border:"1px solid var(--border)",
    borderRadius:10,
    padding:16,
    whiteSpace:"pre-wrap"
  }}>
    {text}
  </div>

  <div style={{
  display: "flex",
  gap: 10,
  marginTop: 14
}}>
  <button onClick={copy} className="result-btn">
    📋 Copy
  </button>

  <button onClick={download} className="result-btn">
    ⬇️ Download
  </button>

  <button onClick={onClear} className="result-btn danger">
    🗑️ Clear
  </button>
</div>
</div>
  );
}