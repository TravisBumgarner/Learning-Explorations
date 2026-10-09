import { Button, Stack, TextField, Typography } from "@mui/material";
import { type FormEvent, useState } from "react";
import type { Names } from "./useMe";

const ProfileForm = ({ onSubmit }: { onSubmit: (names: Names) => Promise<void> }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    onSubmit({ first_name: firstName, last_name: lastName }).catch(() => setError("Couldn't save your name. Try again."));
  };

  return (
    <Stack component="form" onSubmit={submit} spacing={2} sx={{ width: 320 }}>
      <Typography variant="h5">Finish setting up your account</Typography>
      <TextField label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      <TextField label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained">Save</Button>
    </Stack>
  );
};

export default ProfileForm;
