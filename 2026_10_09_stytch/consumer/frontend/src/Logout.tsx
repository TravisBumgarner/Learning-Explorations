import { useStytch } from "@stytch/react";
import { useCallback } from "react";

const Logout = () => {
  const stytch = useStytch();

  // End whichever login is active: the Stytch session and/or the "Log in with Color Colors" one.
  const logout = useCallback(async () => {
    if (stytch.session.getTokens()) await stytch.session.revoke();
    await fetch("/api/auth/logout/", { method: "POST" });
    window.location.assign("/");
  }, [stytch]);

  return <button onClick={logout}>Logout</button>;
};

export default Logout;
