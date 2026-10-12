import { Box, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { useEveryoneColors } from "./useColors";

/** Every known user, one row each: where they authed in from and their swatches. */
const EveryoneColors = ({ refreshKey }: { refreshKey: unknown }) => {
  const people = useEveryoneColors(refreshKey);

  return (
    <Stack sx={{ width: 320 }}>
      <Typography variant="h5">Everyone's favorite colors</Typography>
      <List>
        {people.map((person) => (
          <ListItem key={person.id} disableGutters>
            <ListItemText primary={`${person.first_name} ${person.last_name}`} secondary={`Authed in from ${person.authed_from.join(", ")}`} />
            <Stack direction="row" spacing={0.5}>
              {person.colors.map((color) => (
                <Box key={color.id} title={color.hex} sx={{ width: 20, height: 20, borderRadius: 1, border: 1, borderColor: "divider", bgcolor: color.hex }} />
              ))}
            </Stack>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default EveryoneColors;
