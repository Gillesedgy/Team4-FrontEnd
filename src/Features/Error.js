import React, { useState, useEffect } from "react";
import "./Error.css";

export default function Error({ message, type }) {
  const [showError, SetShowError] = useState(true);

  // Error message will auto close after 2sec
  useEffect(() => {
    const timer = setTimeout(() => {
      SetShowError(false);
    }, 2000);
    return clearTimeout(timer);
  }, []);

  if (!showError) {
    return null;
  }

  return (
    <div className={`popup-message${type}`}>
      <div className="message">{message}</div>
    </div>
  );
}
