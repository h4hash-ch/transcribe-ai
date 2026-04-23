import type { StyleSelectorProps } from "../../types";

export default function StyleSelector({ style, setStyle }: StyleSelectorProps) {
  return (
    <div style={{background:"var(--card)",padding:24,borderRadius:16,marginTop:20}}>
      <div style={{display:"flex",gap:10}}>
        <button
          onClick={() => setStyle("plain")}
          style={{
            flex:1,
            padding:12,
            borderRadius:10,
            border:`1px solid ${style==="plain"?"var(--accent2)":"var(--border)"}`,
            background: style==="plain" ? "#1e1535" : "transparent",
            color: style==="plain" ? "var(--accent2)" : "var(--sub)"
          }}
        >
          📄 Plain
        </button>

        <button
          onClick={() => setStyle("lyrics")}
          style={{
            flex:1,
            padding:12,
            borderRadius:10,
            border:`1px solid ${style==="lyrics"?"var(--accent2)":"var(--border)"}`,
            background: style==="lyrics" ? "#1e1535" : "transparent",
            color: style==="lyrics" ? "var(--accent2)" : "var(--sub)"
          }}
        >
          🎵 Lyrics
        </button>
      </div>
    </div>
  );
}