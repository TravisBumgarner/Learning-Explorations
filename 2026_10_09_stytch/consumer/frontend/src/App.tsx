import { useEffect, useState } from "react";

type User = { id: number; username: string; email: string; name: string };
type State = { status: "loading" } | { status: "anonymous" } | { status: "authenticated"; user: User };

export default function App() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    fetch("/api/me/")
      .then(async (res) => {
        if (res.status === 401) return setState({ status: "anonymous" });
        if (!res.ok) throw new Error(`Unexpected ${res.status}`);
        setState({ status: "authenticated", user: await res.json() });
      })
      .catch(() => setState({ status: "anonymous" }));
  }, []);

  return (
    <main style={{ fontFamily: "system-ui", maxWidth: 480, margin: "4rem auto" }}>
      <h1>Consumer</h1>
      {state.status === "loading" && <p>Loading…</p>}
      {state.status === "anonymous" && (
        <p>Not signed in.</p>
      )}
      {state.status === "authenticated" && (
        <>
          <p>
            Signed in as <b>{state.user.name || state.user.email || state.user.username}</b>
          </p>
          <pre>{JSON.stringify(state.user, null, 2)}</pre>
        </>
      )}
    </main>
  );
}
