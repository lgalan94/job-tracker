import { useEffect } from "react";

export default function useGoogle(clientId, callback) {
  useEffect(() => {
    if (!clientId) return;

    // Load Google script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      /* global google */
      google.accounts.id.initialize({
        client_id: clientId,
        callback,
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [clientId, callback]);
}
