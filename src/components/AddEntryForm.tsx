import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel
} from "@mui/material";
import { EntryWithoutId, HealthCheckRating } from "../types";

interface Props {
  onSubmit: (entry: EntryWithoutId) => void;
  onCancel: () => void;
  error?: string;
}

const AddEntryForm = ({ onSubmit, onCancel, error }: Props) => {
  const [type, setType] = useState<"HealthCheck" | "Hospital" | "OccupationalHealthcare">("HealthCheck");
  
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  
  // health check
  const [healthCheckRating, setHealthCheckRating] = useState(0);

  // hospital
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // occupational
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");


  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (type === "HealthCheck") {
      onSubmit({
        type,
        description,
        date,
        specialist,
        healthCheckRating: healthCheckRating as HealthCheckRating
      });
    } else if (type === "Hospital") {
      onSubmit({
        type,
        description,
        date,
        specialist,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
      });
    } else if (type === "OccupationalHealthcare") {
      const entry: EntryWithoutId = {
        type,
        description,
        date,
        specialist,
        employerName
      };
      if (sickLeaveStart && sickLeaveEnd) {
        entry.sickLeave = {
          startDate: sickLeaveStart,
          endDate: sickLeaveEnd
        };
      }
      onSubmit(entry);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6">Add New Entry</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <InputLabel sx={{ mt: 2 }}>Type</InputLabel>
      <Select
        fullWidth
        value={type}
        onChange={({ target }) => setType(target.value as typeof type)}
      >
        <MenuItem value="HealthCheck">HealthCheck</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
      </Select>

      <TextField label="Description" fullWidth value={description} onChange={({ target }) => setDescription(target.value)} sx={{ mt: 2 }} />
      <TextField label="Date" type="date" fullWidth value={date} onChange={({ target }) => setDate(target.value)} InputLabelProps={{ shrink: true }} />
      <TextField label="Specialist" fullWidth value={specialist} onChange={({ target }) => setSpecialist(target.value)} />

      {type === "HealthCheck" && (
        <TextField
          label="HealthCheckRating (0–3)"
          type="number"
          fullWidth
          inputProps={{ min: 0, max: 3 }}
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
          sx={{ mt: 2 }}
        />
      )}

      {type === "Hospital" && (
        <>
          <TextField label="Discharge Date" type="date" fullWidth value={dischargeDate} onChange={({ target }) => setDischargeDate(target.value)} InputLabelProps={{ shrink: true }} sx={{ mt: 2 }} />
          <TextField label="Discharge Criteria" fullWidth value={dischargeCriteria} onChange={({ target }) => setDischargeCriteria(target.value)} />
        </>
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <TextField label="Employer Name" fullWidth value={employerName} onChange={({ target }) => setEmployerName(target.value)} sx={{ mt: 2 }} />
          <TextField label="Sick Leave Start" type="date" fullWidth value={sickLeaveStart} onChange={({ target }) => setSickLeaveStart(target.value)} InputLabelProps={{ shrink: true }} />
          <TextField label="Sick Leave End" type="date" fullWidth value={sickLeaveEnd} onChange={({ target }) => setSickLeaveEnd(target.value)} InputLabelProps={{ shrink: true }} />
        </>
      )}

      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">Add</Button>
        <Button variant="outlined" onClick={onCancel} sx={{ ml: 2 }}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default AddEntryForm;
