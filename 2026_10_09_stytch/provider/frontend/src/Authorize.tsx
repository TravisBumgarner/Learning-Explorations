import { IdentityProvider } from "@stytch/react";
import Centered from "./Centered";

/** Where client apps (e.g. Consumer) send users to approve "Log in with Color Colors". */
const Authorize = () => (
  <Centered>
    <IdentityProvider />
  </Centered>
);

export default Authorize;
