import Centered from "./Centered";
import Colors from "./Colors";
import Logout from "./Logout";
import ProfileForm from "./ProfileForm";
import type { Me, Names } from "./useMe";

/** What a signed-in user sees: the profile form on first login, a welcome after. */
const Home = ({ me, saveNames }: { me: Me; saveNames: (names: Names) => Promise<void> }) => {
  const hasName = Boolean(me.first_name || me.last_name);

  return (
    <Centered>
      {hasName ? <h1>You're logged in, {me.first_name} {me.last_name}!</h1> : <ProfileForm onSubmit={saveNames} />}
      {hasName && <Colors />}
      <Logout />
    </Centered>
  );
};

export default Home;
