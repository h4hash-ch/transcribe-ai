import React from "react";
import MicRecorder from "./MicRecorder";
import FileUpload from "./FileUpload";
import type { InputCardProps } from "../../types";

export default function InputCard({
  tab,
  setTab,
  onMicTranscript,
  onMicProcessingStart,
  onMicProcessingEnd,
  onFile
}: InputCardProps): React.JSX.Element {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 24,
        marginBottom: 20
      }}
    >
      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button
          onClick={() => setTab("mic")}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: tab === "mic" ? "var(--accent)" : "transparent",
            color: tab === "mic" ? "#fff" : "var(--sub)",
            cursor: "pointer"
          }}
        >
          🎤 Record Mic
        </button>

        <button
          onClick={() => setTab("upload")}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: tab === "upload" ? "var(--accent)" : "transparent",
            color: tab === "upload" ? "#fff" : "var(--sub)",
            cursor: "pointer"
          }}
        >
          📁 Upload File
        </button>
      </div>

      {/* 🔥 THIS WAS MISSING */}
      {tab === "mic" ? (
        <MicRecorder
          onTranscript={onMicTranscript}
          onProcessingStart={onMicProcessingStart}
          onProcessingEnd={onMicProcessingEnd}
        />
      ) : (
        <FileUpload onFile={onFile} />
      )}
    </div>
  );
}