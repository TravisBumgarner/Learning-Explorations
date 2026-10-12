import { useStytch } from "@stytch/react";
import { useCallback, useEffect, useState } from "react";

export type Me = { id: number; username: string; email: string; first_name: string; last_name: string };
export type Names = Pick<Me, "first_name" | "last_name">;

/** Loads the current user from the API and exposes a way to update their names. */
export const useMe = () => {
  const stytch = useStytch();
  const [me, setMe] = useState<Me | null>(null);

  // Read the JWT at request time: it is short-lived and the SDK refreshes it.
  const request = useCallback(async (init?: RequestInit): Promise<Me> => {
    const tokens = stytch.session.getTokens();
    const response = await fetch("/api/me/", {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens?.session_jwt}`,
      },
    });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
  }, [stytch]);

  useEffect(() => {
    request()
      .then(setMe)
      .catch((error) => console.error("Error fetching authenticated endpoint:", error));
  }, [request]);

  const saveNames = useCallback(
    (names: Names) => request({ method: "PATCH", body: JSON.stringify(names) }).then(setMe),
    [request],
  );

  return { me, saveNames };
};
