import { Typography } from "@mui/material";
import Centered from "./Centered";
import Colors from "./Colors";
import Logout from "./Logout";
import ProfileForm from "./ProfileForm";
import { useMe } from "./useMe";

/** What a signed-in user sees: the profile form on first login, a welcome after. */
const Home = () => {
  const { me, saveNames } = useMe();
  const hasName = Boolean(me?.first_name || me?.last_name);

  return (
    <Centered>
      {me === null && <Typography>Loading…</Typography>}
      {me && !hasName && <ProfileForm onSubmit={saveNames} />}
      {me && hasName && <h1>You're logged in, {me.first_name} {me.last_name}!</h1>}
      {me && hasName && <Colors />}
      <Logout />
    </Centered>
  );
};

export default Home;
