import { Products, StytchLogin } from '@stytch/react';

const config = {
  products: [Products.emailMagicLinks, Products.oauth],
  sessionOptions: {
    sessionDurationMinutes: 60,
  },
};

const LoginOrSignup = () => {
  return <StytchLogin config={config} />;
};

export default LoginOrSignup;