import { Diagnosis, Entry } from "../types";
import { assertNever } from "../utils";
import HealthRatingBar from "./HealthRatingBar";
import { Card, Typography } from "@mui/material";
import { Favorite, Work, LocalHospital } from "@mui/icons-material";

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Card variant="outlined" style={{ margin: "1em 0", padding: "1em" }}>
          <Typography variant="body1">
            <b>{entry.date}</b> <LocalHospital fontSize="small" />
          </Typography>
          <Typography>{entry.description}</Typography>
          <Typography variant="body2">diagnose by {entry.specialist}</Typography>
          {entry.diagnosisCodes?.map(code => {
            const diagnosis = diagnoses.find(d => d.code === code);
            return (
              <Typography key={code} variant="body2">
                {code} {diagnosis?.name}
              </Typography>
            );
          })}
        </Card>
      );
    case "OccupationalHealthcare":
      return (
        <Card variant="outlined" style={{ margin: "1em 0", padding: "1em" }}>
          <Typography variant="body1">
            <b>{entry.date}</b> <Work fontSize="small" /> {entry.employerName}
          </Typography>
          <Typography>{entry.description}</Typography>
          <Typography variant="body2">diagnose by {entry.specialist}</Typography>
          {entry.diagnosisCodes?.map(code => {
            const diagnosis = diagnoses.find(d => d.code === code);
            return (
              <Typography key={code} variant="body2">
                {code} {diagnosis?.name}
              </Typography>
            );
          })}
        </Card>
      );
    case "HealthCheck":
      return (
        <Card variant="outlined" style={{ margin: "1em 0", padding: "1em" }}>
          <Typography variant="body1">
            <b>{entry.date}</b> <Favorite fontSize="small" />
          </Typography>
          <Typography>{entry.description}</Typography>
          <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
          <Typography variant="body2">diagnose by {entry.specialist}</Typography>
          {entry.diagnosisCodes?.map(code => {
            const diagnosis = diagnoses.find(d => d.code === code);
            return (
              <Typography key={code} variant="body2">
                {code} {diagnosis?.name}
              </Typography>
            );
          })}
        </Card>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
