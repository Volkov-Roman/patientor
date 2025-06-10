import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatientEntry, EntryWithoutId } from '../types';
import { v4 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find(p => p.id === id);
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: (uuid as () => string)(),
    ...patient
  };

  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Patient | undefined => {
  const patient = patientsData.find(p => p.id === id);
  if (!patient) return undefined;

  const newEntry = {
    ...entry,
    id: uuid(),
  };

  patient.entries.push(newEntry);
  return patient;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  getPatientById,
  addEntry
};
