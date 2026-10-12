import { Box, Button, Stack, Typography } from "@mui/material";
import { type FormEvent, useState } from "react";
import EveryoneColors from "./EveryoneColors";
import { useColors } from "./useColors";

/** Pick a favorite color to save, and see the saved ones as a grid of swatches. */
const Colors = () => {
  const { colors, addColor } = useColors();
  const [hex, setHex] = useState("#1976d2");
  const [error, setError] = useState<string | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    addColor(hex).catch(() => setError("Couldn't save that color. Try again."));
  };

  return (
    <Stack spacing={2} sx={{ width: 320 }}>
      <Typography variant="h5">Favorite colors</Typography>
      <Stack component="form" onSubmit={submit} direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <input type="color" aria-label="Color" value={hex} onChange={(e) => setHex(e.target.value)} />
        <Button type="submit" variant="contained">Add</Button>
      </Stack>
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1 }}>
        {colors.map((color) => (
          <Box key={color.id} title={color.hex} sx={{ aspectRatio: "1", borderRadius: 1, border: 1, borderColor: "divider", bgcolor: color.hex }} />
        ))}
      </Box>
      <EveryoneColors refreshKey={colors.length} />
    </Stack>
  );
};

export default Colors;
