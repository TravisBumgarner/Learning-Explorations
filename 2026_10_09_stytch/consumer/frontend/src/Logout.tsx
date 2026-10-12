import { useStytch } from "@stytch/react";
import { useCallback } from "react";

const Logout = () => {
  const stytch = useStytch();

  const logout = useCallback(() => {
    stytch.session.revoke();
  }, [stytch]);

  return <button onClick={logout}>Logout</button>;
};

export default Logout;
