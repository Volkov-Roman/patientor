import { z } from 'zod';
import { NewPatientEntry, Gender } from './types';

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

export default toNewPatientEntry;
