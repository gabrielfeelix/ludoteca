import React, { useEffect } from "react";
import "./Toast.css";

export const Toast = ({
  message,
  variant = "info",
  onClose,
  durationMs = 3500
}) => {
  useEffect(() => {
    if (!durationMs) return;
    const id = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(id);
  }, [durationMs, onClose]);

  return (
    <div className={`toast toast--${variant}`} role="status" aria-live="polite">
      <span>{message}</span>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Fechar">
        ×
      </button>
    </div>
  );
};

