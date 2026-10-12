import { useStytch } from "@stytch/react";
import { useEffect, useState } from "react";

export type Service = { name: string; url: string; connected: boolean };

/** Loads the apps that offer "Log in with Consumer" and whether the current user has connected each. */
export const useServices = () => {
  const stytch = useStytch();
  const [services, setServices] = useState<Service[] | null>(null);

  useEffect(() => {
    const tokens = stytch.session.getTokens();
    fetch("/api/services/", { headers: { Authorization: `Bearer ${tokens?.session_jwt}` } })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        return response.json();
      })
      .then(setServices)
      .catch((error) => console.error("Error fetching services:", error));
  }, [stytch]);

  return services;
};
