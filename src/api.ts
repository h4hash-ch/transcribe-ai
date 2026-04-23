/**
 * API integration for Transcribe AI
 * Backend URL is configured via environment variables (VITE_BACKEND_URL)
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export async function transcribeAudio(file: Blob | File) {
  const fd = new FormData();
  fd.append("audio", file);

  const res = await fetch(`${BACKEND_URL}/transcribe`, {
    method: "POST",
    body: fd
  });

  if (!res.ok) throw new Error(`Server error: ${res.status}`);

  const data = await res.json();

  if (data.error) throw new Error(data.error);

  if (!data.text || typeof data.text !== "string") {
    throw new Error("Invalid response format from server");
  }

  return data.text;
}