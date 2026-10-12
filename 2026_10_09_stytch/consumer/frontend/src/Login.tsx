import { Button, Stack } from '@mui/material';
import { Products, StytchLogin } from '@stytch/react';

const config = {
  products: [Products.emailMagicLinks, Products.oauth],
  sessionOptions: {
    sessionDurationMinutes: 60,
  },
};

const LoginOrSignup = () => {
  return (
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <StytchLogin config={config} />
      <Button variant="outlined" href="/api/auth/login/">Log in with Color Colors</Button>
    </Stack>
  );
};

export default LoginOrSignup;
