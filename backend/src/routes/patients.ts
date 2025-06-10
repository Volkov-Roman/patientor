import express from 'express';
import { Response } from 'express';
import { z } from 'zod';
import { NonSensitivePatient } from "../types";
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientService.getPatientById(id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/', (_req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(_req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(id, newEntry);
    res.json(updatedPatient);
  } catch (error: unknown) {
      let message = "Invalid entry data";
      if (error instanceof Error) {
        message += `: ${error.message}`;
      }
      res.status(400).send({ error: message });
  }
});

export default router;
