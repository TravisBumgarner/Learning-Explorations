import { Box } from "@mui/material";
import LoginOrSignup from "./Login";
import { useStytch, useStytchSession } from "@stytch/react";
import { useCallback, useEffect } from "react";
import stytch from "@stytch/react";

const Logout = () => {
  const stytch = useStytch();

  const logout = useCallback(() => {
    stytch.session.revoke();
  }, [stytch]);

  return <button onClick={logout}>Logout</button>;
}

const Authed = () => {
  const stytch = useStytch();

  useEffect(() => {
    const tokens = stytch.session.getTokens();
    if (!tokens) return;

    fetch("/api/me/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.session_jwt}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Authenticated response:", data);
      })
      .catch((error) => {
        console.error("Error fetching authenticated endpoint:", error);
      });
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <h1>You're logged in!</h1>
      <Logout />
    </Box>
  );
}

export default function App() {
  const { session } = useStytchSession();
  const stytch = useStytch();

  useEffect(() => {
    stytch.authenticateByUrl({ session_duration_minutes: 60 });
  }, []);

  console.log(session)

  return session ? <Authed /> : (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <LoginOrSignup />
    </Box>
  )
}
