import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

// router.get('/', (_req, res) => {
//   res.send(patientService.getPatientEntries());
// });

router.get('/', (_req, res) => {
  res.send(patientService.getNonsensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);

    res.json(addedEntry);
  } catch (error) {
     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

// router.post('/', (_req, res) => {
//   res.send('Saving a patient!');
// });

export default router;
