import React from "react";

export default function FooterNote(): React.JSX.Element {
  return (
    <div style={{fontSize:12,color:"gray",textAlign:"center",marginTop:30}}>
      <p>🚀 Transcribe audio files or record from your microphone</p>
      <p style={{marginTop:8}}>💬 Supports all languages · 🎯 Powered by OpenAI Whisper</p>
    </div>
  );
}