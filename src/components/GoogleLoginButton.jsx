import { useEffect } from "react";

export default function GoogleLoginButton() {

  console.log("CLIENT ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!window.google) {
      console.error("Google script not loaded.");
      return;
    }

    if (!clientId) {
      console.error("Missing VITE_GOOGLE_CLIENT_ID");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-btn"),
      { theme: "filled_blue", size: "large", width: "100%" }
    );
  }, []);

  const handleCredentialResponse = (response) => {
    console.log("Google credential:", response.credential);
  };

  return <div id="google-signin-btn"></div>;
}
