import { z } from 'zod';
import { NewPatientEntry, Gender, Diagnosis, EntryWithoutId, HealthCheckRating } from './types';

const newPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(z.any())
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientSchema.parse(object);
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const getString = (object: unknown, field: string): string => {
  if (
    !object ||
    typeof object !== "object" ||
    !(field in object) ||
    typeof (object as Record<string, unknown>)[field] !== "string"
  ) {
    throw new Error(`Incorrect or missing ${field}`);
  }

  return (object as Record<string, unknown>)[field] as string;
};

const getOptionalString = (object: unknown, field: string): string | undefined => {
  if (
    !object ||
    typeof object !== "object" ||
    !(field in object)
  ) {
    return undefined;
  }

  const value = (object as Record<string, unknown>)[field];
  return typeof value === "string" ? value : undefined;
};

const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
  if (
    !object ||
    typeof object !== "object" ||
    !("healthCheckRating" in object)
  ) {
    throw new Error("Missing healthCheckRating");
  }

  const value = (object as Record<string, unknown>)["healthCheckRating"];

  if (
    typeof value !== "number" ||
    !Object.values(HealthCheckRating).includes(value)
  ) {
    throw new Error("Invalid healthCheckRating");
  }

  return value as HealthCheckRating;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Incorrect or missing data");
  }

  const entry = object as { type: string };

  switch (entry.type) {
    case "Hospital":
      return {
        type: "Hospital",
        description: getString(object, "description"),
        date: getString(object, "date"),
        specialist: getString(object, "specialist"),
        diagnosisCodes: parseDiagnosisCodes(object),
        discharge: {
          date: getString(object, "discharge.date"),
          criteria: getString(object, "discharge.criteria"),
        }
      };
    case "OccupationalHealthcare": {
      const startDate = getOptionalString(object, "sickLeave.startDate");
      const endDate = getOptionalString(object, "sickLeave.endDate");
    
      return {
        type: "OccupationalHealthcare",
        description: getString(object, "description"),
        date: getString(object, "date"),
        specialist: getString(object, "specialist"),
        employerName: getString(object, "employerName"),
        diagnosisCodes: parseDiagnosisCodes(object),
        sickLeave: startDate && endDate
          ? { startDate, endDate }
          : undefined,
      };
    }
    case "HealthCheck":
      return {
        type: "HealthCheck",
        description: getString(object, "description"),
        date: getString(object, "date"),
        specialist: getString(object, "specialist"),
        diagnosisCodes: parseDiagnosisCodes(object),
        healthCheckRating: parseHealthCheckRating(object)
      };
    default:
      throw new Error(`Unsupported entry type: ${entry.type}`);
  }
};

export default toNewPatientEntry;
