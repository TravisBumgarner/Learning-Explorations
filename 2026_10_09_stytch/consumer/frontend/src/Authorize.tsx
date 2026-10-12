import { IdentityProvider } from "@stytch/react";
import Centered from "./Centered";

/** Where client apps (e.g. Color Colors) send users to approve "Log in with Consumer". */
const Authorize = () => (
  <Centered>
    <IdentityProvider />
  </Centered>
);

export default Authorize;
