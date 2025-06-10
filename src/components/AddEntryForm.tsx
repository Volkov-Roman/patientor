import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { EntryWithoutId, HealthCheckRating } from "../types";

interface Props {
  onSubmit: (entry: EntryWithoutId) => void;
  onCancel: () => void;
  error?: string;
}

const AddEntryForm = ({ onSubmit, onCancel, error }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: healthCheckRating as HealthCheckRating
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6">Add New Entry</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField label="Description" fullWidth value={description} onChange={({ target }) => setDescription(target.value)} />
      <TextField label="Date" type="date" fullWidth value={date} onChange={({ target }) => setDate(target.value)} InputLabelProps={{ shrink: true }} />
      <TextField label="Specialist" fullWidth value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
      <TextField label="HealthCheckRating (0–3)" fullWidth type="number" inputProps={{ min: 0, max: 3 }} value={healthCheckRating} onChange={({ target }) => setHealthCheckRating(Number(target.value))} />

      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">Add</Button>
        <Button variant="outlined" onClick={onCancel} sx={{ ml: 2 }}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default AddEntryForm;
