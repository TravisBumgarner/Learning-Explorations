import { useStytch, useStytchSession } from "@stytch/react";
import { useEffect } from "react";
import Centered from "./Centered";
import Home from "./Home";
import LoginOrSignup from "./Login";

export default function App() {
  const { session } = useStytchSession();
  const stytch = useStytch();

  useEffect(() => {
    stytch.authenticateByUrl({ session_duration_minutes: 60 });
  }, []);

  console.log(session)

  return session ? <Home /> : (
    <Centered>
      <LoginOrSignup />
    </Centered>
  )
}
