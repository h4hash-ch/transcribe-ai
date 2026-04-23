import type { ToastProps } from "../../types";
import React, { useEffect, useState } from "react";

export default function Toast({ msg }: ToastProps): React.JSX.Element {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, [msg]);

  if (!visible) return <></>;

  return (
    <div style={{
      position: "fixed",
      bottom: 20,
      left: "50%",
      transform: "translateX(-50%)",
      background: "#1e1535",
      border: "1px solid var(--accent2)",
      color: "white",
      padding: "10px 16px",
      borderRadius: 10,
      zIndex: 9999,
      fontSize: "0.9rem",
      boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
    }}>
      {msg}
    </div>
  );
}