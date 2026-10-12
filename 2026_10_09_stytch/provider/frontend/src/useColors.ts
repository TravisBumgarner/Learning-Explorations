import { useStytch } from "@stytch/react";
import { useCallback, useEffect, useState } from "react";

export type Color = { id: number; hex: string };
export type PersonColors = { id: number; first_name: string; last_name: string; authed_from: string; colors: Color[] };

const useRequest = (path: string) => {
  const stytch = useStytch();

  // Read the JWT at request time: it is short-lived and the SDK refreshes it.
  // No JWT means a "Log in with Consumer" login, which rides on the Django session cookie.
  return useCallback(async (init?: RequestInit) => {
    const tokens = stytch.session.getTokens();
    const response = await fetch(path, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(tokens ? { Authorization: `Bearer ${tokens.session_jwt}` } : {}),
      },
    });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
  }, [stytch, path]);
};

/** Loads the current user's favorite colors and exposes a way to add one. */
export const useColors = () => {
  const request = useRequest("/api/colors/");
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    request()
      .then(setColors)
      .catch((error) => console.error("Error fetching colors:", error));
  }, [request]);

  const addColor = useCallback(
    (hex: string) =>
      request({ method: "POST", body: JSON.stringify({ hex }) }).then((color: Color) =>
        setColors((current) => (current.some((c) => c.id === color.id) ? current : [...current, color])),
      ),
    [request],
  );

  return { colors, addColor };
};

/** Loads every known user with where they authed in from and their favorite colors, reloading whenever `refreshKey` changes. */
export const useEveryoneColors = (refreshKey: unknown) => {
  const request = useRequest("/api/colors/everyone/");
  const [people, setPeople] = useState<PersonColors[]>([]);

  useEffect(() => {
    request()
      .then(setPeople)
      .catch((error) => console.error("Error fetching everyone's colors:", error));
  }, [request, refreshKey]);

  return people;
};
