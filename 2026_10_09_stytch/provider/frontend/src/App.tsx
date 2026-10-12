import { useStytch, useStytchSession } from "@stytch/react";
import { useEffect } from "react";
import Authorize from "./Authorize";
import Centered from "./Centered";
import Home from "./Home";
import LoginOrSignup from "./Login";

const AUTHORIZE_PATH = "/oauth/authorize";
const RETURN_TO_KEY = "provider_return_to";

export default function App() {
  const { session } = useStytchSession();
  const stytch = useStytch();
  const onAuthorizePage = window.location.pathname === AUTHORIZE_PATH;

  useEffect(() => {
    stytch.authenticateByUrl({ session_duration_minutes: 60 });
  }, []);

  // Logging in lands on "/", so remember the authorize request and resume it after login.
  // localStorage (not sessionStorage) because a magic link opens in a new tab.
  useEffect(() => {
    if (onAuthorizePage) {
      if (session) localStorage.removeItem(RETURN_TO_KEY);
      else localStorage.setItem(RETURN_TO_KEY, window.location.pathname + window.location.search);
      return;
    }
    const returnTo = localStorage.getItem(RETURN_TO_KEY);
    if (session && returnTo) {
      localStorage.removeItem(RETURN_TO_KEY);
      window.location.replace(returnTo);
    }
  }, [session, onAuthorizePage]);

  console.log(session)

  if (session && onAuthorizePage) return <Authorize />;

  return session ? <Home /> : (
    <Centered>
      <LoginOrSignup />
    </Centered>
  )
}
