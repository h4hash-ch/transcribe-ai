import { useState } from "react";
import { transcribeAudio } from "./api";

import Header from "./components/layout/Header";
import InputCard from "./components/input/InputCard";
import StyleSelector from "./components/ui/StyleSelector";
import ResultBox from "./components/output/ResultBox";
import Loading from "./components/ui/Loading";
import Toast from "./components/ui/Toast";
import FooterNote from "./components/layout/FooterNote";

import { formatLyrics } from "./utils/formatLyrics";
import type { Tab, OutputStyle } from "./types";
import React from "react";

export default function App(): React.JSX.Element {
  const [tab, setTab] = useState<Tab>("mic");
  const [outputStyle, setOutputStyle] = useState<OutputStyle>("plain");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  async function doTranscribe(): Promise<void> {

    if (tab === "upload") {
      if (!uploadedFile) {
        setToast("Please upload an audio file");
        return;
      }

      setLoading(true);

      try {
        const text = await transcribeAudio(uploadedFile);

        setResult(
          outputStyle === "lyrics"
            ? formatLyrics(text)
            : text
        );

      } catch (err: any) {
        setToast(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "'Segoe UI', system-ui, sans-serif"
    }}>
      <Header />

      <div style={{ maxWidth: 680, margin: "0 auto", padding: 20 }}>
        {toast && <Toast msg={toast} />}

        <InputCard
          tab={tab}
          setTab={(t) => {
            setTab(t);
            setResult("");
          }}
          onMicTranscript={(text) => {
            const formatted =
              outputStyle === "lyrics"
                ? formatLyrics(text)
                : text;

            setResult(formatted);
          }}
          onMicProcessingStart={() => setLoading(true)}
          onMicProcessingEnd={() => setLoading(false)}
          onFile={setUploadedFile}
        />

        <StyleSelector style={outputStyle} setStyle={setOutputStyle} />

        <button
          onClick={() => { doTranscribe(); }}
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 12,
            background: "linear-gradient(135deg,var(--accent),#5b3fd4)",
            border: "none",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: "pointer",
            marginTop: 10
          }}
        >
          ✨ Transcribe Now
        </button>

        {loading && <Loading msg="Processing..." />}

        {result && (
          <ResultBox
            text={result}
            onClear={() => setResult("")}
            onToast={setToast}
          />
        )}

        <FooterNote />
      </div>
    </div>
  );
}