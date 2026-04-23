import type { LoadingProps } from "../../types";
import React from "react";

export default function Loading({ msg }: LoadingProps): React.JSX.Element {
  return (
    <div style={{
      marginTop: 16,
      padding: 16,
      borderRadius: 10,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid var(--border)",
      color: "var(--sub)",
      textAlign: "center",
      animation: "pulse 1.2s infinite"
    }}>
      <div style={{ fontSize: "1.2rem", marginBottom: 8 }}>⏳ {msg}</div>
      <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>This may take a minute depending on audio length...</div>
    </div>
  );
}