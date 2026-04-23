import type { UsageBarProps } from "../../types";
import React from "react";

const FREE_LIMIT = 3;

export default function UsageBar({ usedCount, isPremium }: UsageBarProps): React.JSX.Element {
  const rem = Math.max(0, FREE_LIMIT - usedCount);

  const dotColor = (i: number): string =>
    isPremium ? "var(--accent2)" : i < usedCount ? "var(--accent)" : "var(--border)";

  return (
    <div style={{background:"#0d0d18",borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",border:"1px solid var(--border)",marginBottom:20}}>
      <div style={{display:"flex",gap:6}}>
        {([0,1,2] as const).map(i => (
          <div key={i} style={{width:12,height:12,borderRadius:"50%",background:dotColor(i),transition:".3s"}} />
        ))}
      </div>
      <div style={{fontSize:".8rem",color:isPremium?"var(--accent2)":"var(--sub)",fontWeight:isPremium?600:400}}>
        {isPremium
          ? "⚡ Pro — Unlimited transcriptions"
          : rem > 0
            ? `${rem} free transcription${rem !== 1 ? "s" : ""} remaining`
            : "Free limit reached — upgrade to continue"}
      </div>
    </div>
  );
}