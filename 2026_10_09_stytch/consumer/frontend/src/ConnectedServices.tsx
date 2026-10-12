import { Button, Card, CardActions, CardContent, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useServices } from "./useServices";

/** Dashboard of apps the user can log in to with this account, split by whether they have yet. */
const ConnectedServices = () => {
  const services = useServices();
  const [tab, setTab] = useState<"unconnected" | "connected">("unconnected");
  const shown = services?.filter((service) => service.connected === (tab === "connected"));

  return (
    <Stack spacing={2} sx={{ width: 320 }}>
      <Typography variant="h5">Connected services</Typography>
      <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="fullWidth">
        <Tab value="unconnected" label="Unconnected" />
        <Tab value="connected" label="Connected" />
      </Tabs>
      {!shown && <Typography>Loading…</Typography>}
      {shown?.length === 0 && <Typography color="text.secondary">Nothing here.</Typography>}
      {shown?.map((service) => (
        <Card key={service.url} variant="outlined">
          <CardContent>
            <Typography variant="h6">{service.name}</Typography>
            <Typography color="text.secondary">{service.url}</Typography>
          </CardContent>
          <CardActions>
            {service.connected
              ? <Button href={service.url}>Open</Button>
              : <Button href={`${service.url}/api/auth/login/`}>Connect</Button>}
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
};

export default ConnectedServices;
