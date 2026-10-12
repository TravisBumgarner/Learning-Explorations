import { useStytch, useStytchSession } from "@stytch/react";
import { useCallback, useEffect, useState } from "react";

export type Me = { id: number; username: string; email: string; first_name: string; last_name: string };
export type Names = Pick<Me, "first_name" | "last_name">;
export type MeState = { status: "loading" } | { status: "anonymous" } | { status: "authenticated"; me: Me };

/**
 * Loads the current user from the API and exposes a way to update their names.
 * The API accepts either login: a Stytch session JWT (sent as a header) or the
 * Django session cookie set by "Log in with Color Colors" (sent automatically).
 */
export const useMe = () => {
  const stytch = useStytch();
  const { session } = useStytchSession();
  const [state, setState] = useState<MeState>({ status: "loading" });

  // Read the JWT at request time: it is short-lived and the SDK refreshes it.
  const request = useCallback(async (init?: RequestInit): Promise<Me | null> => {
    const tokens = stytch.session.getTokens();
    const response = await fetch("/api/me/", {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(tokens ? { Authorization: `Bearer ${tokens.session_jwt}` } : {}),
      },
    });
    if (response.status === 401) return null;
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
  }, [stytch]);

  const apply = useCallback((me: Me | null) => {
    setState(me ? { status: "authenticated", me } : { status: "anonymous" });
  }, []);

  // Refetch whenever the Stytch session appears or goes away.
  useEffect(() => {
    request()
      .then(apply)
      .catch((error) => {
        console.error("Error fetching authenticated endpoint:", error);
        setState({ status: "anonymous" });
      });
  }, [request, apply, session?.session_id]);

  const saveNames = useCallback(
    (names: Names) => request({ method: "PATCH", body: JSON.stringify(names) }).then(apply),
    [request, apply],
  );

  return { state, saveNames };
};
