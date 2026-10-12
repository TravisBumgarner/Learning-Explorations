import { Typography } from "@mui/material";
import { useStytch } from "@stytch/react";
import { useEffect } from "react";
import Centered from "./Centered";
import Home from "./Home";
import LoginOrSignup from "./Login";
import { useMe } from "./useMe";

export default function App() {
  const stytch = useStytch();
  const { state, saveNames } = useMe();

  useEffect(() => {
    stytch.authenticateByUrl({ session_duration_minutes: 60 });
  }, []);

  if (state.status === "authenticated") return <Home me={state.me} saveNames={saveNames} />;

  return (
    <Centered>
      {state.status === "loading" ? <Typography>Loading…</Typography> : <LoginOrSignup />}
    </Centered>
  )
}
