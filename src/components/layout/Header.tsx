import React from "react";

export default function Header(): React.JSX.Element {
  return (
    <div style={{textAlign:"center",padding:"60px 20px 40px",background:"radial-gradient(ellipse at top,#1e1535 0%,var(--bg) 60%)"}}>
      <div style={{fontSize:"2rem",fontWeight:800,background:"linear-gradient(135deg,var(--accent),var(--accent2))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
        🎙️ TranscribeAI
      </div>
      <p style={{color:"var(--sub)",marginTop:8,fontSize:"1rem"}}>Turn audio into text or lyrics instantly</p>
      <span style={{display:"inline-block",background:"#1e1535",border:"1px solid var(--accent)",color:"var(--accent2)",fontSize:".75rem",padding:"4px 12px",borderRadius:20,marginTop:16}}>
        ✨ Free & Unlimited as long as using this project locally
      </span>
    </div>
  );
}