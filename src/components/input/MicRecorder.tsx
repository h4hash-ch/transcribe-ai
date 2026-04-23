import { useRef, useState } from "react";
import React from "react";
import type { MicRecorderProps } from "../../types";
import { transcribeAudio } from "../../api";

export default function MicRecorder({
  onTranscript,
  onProcessingStart,
  onProcessingEnd
}: MicRecorderProps): React.JSX.Element {
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState("Click to start recording");
  const [secs, setSecs] = useState(0);

  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const tmrRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function start(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });

        setStatus("Processing with AI...");
        onProcessingStart?.();

        try {
          const text = await transcribeAudio(blob);
          onTranscript(text);
          setStatus("✅ Transcription ready!");
        } catch (err: any) {
          console.error("Transcription error:", err);
          setStatus(`❌ ${err.message || "Failed to transcribe"}`);
        } finally {
          onProcessingEnd?.();
        }
      };

      mediaRecorder.start();
      mediaRef.current = mediaRecorder;

      setRecording(true);
      setSecs(0);
      setStatus("Recording… click to stop");

      tmrRef.current = setInterval(() => setSecs(s => s + 1), 1000);

    } catch {
      alert("Microphone access denied");
    }
  }

  function stop(): void {
    mediaRef.current?.stop();
    mediaRef.current = null;

    if (tmrRef.current) clearInterval(tmrRef.current);

    setRecording(false);
  }

  const m = Math.floor(secs / 60);
  const sc = secs % 60;

  return (
    <div style={{ textAlign: "center", padding: "10px 0" }}>
      <button
        onClick={() => (recording ? stop() : start())}
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          fontSize: "2rem",
          background: recording
            ? "linear-gradient(135deg,var(--red),#dc2626)"
            : "linear-gradient(135deg,var(--accent),#5b3fd4)",
        }}
      >
        {recording ? "⏹️" : "🎤"}
      </button>

      <div style={{ color: "var(--sub)", marginTop: 12, fontSize: ".9rem" }}>
        {status}
      </div>

      {recording && (
        <div style={{
          fontSize: "1.4rem",
          fontWeight: 700,
          color: "var(--accent2)",
          marginTop: 8
        }}>
          {m}:{sc.toString().padStart(2, "0")}
        </div>
      )}
    </div>
  );
}