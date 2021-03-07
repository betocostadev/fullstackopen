import express from 'express';
import patientService from '../services/patientService';
import patientUtils from '../utils';

const router = express.Router();

// router.get('/', (_req, res) => {
//   res.send(patientService.getPatientEntries());
// });

router.get('/', (_req, res) => {
  res.send(patientService.getNonsensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id: string = req.params.id;
  const patient = patientService.getPublicPatientEntry(id);
  if (patient) {
    return res.json(patient);
  } else {
    return res.status(404).send({ error: 404, message: 'No patient with provided ID' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = patientUtils.toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);

    res.json(addedEntry);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = patientUtils.toNewEntry(req.body);
    const patientId = req.params.id;
    const addedEntry = patientService.addEntry(newEntry, patientId);
    console.log('received entry');
    console.log(addedEntry);
    res.json(addedEntry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// router.post('/', (_req, res) => {
//   res.send('Saving a patient!');
// });

export default router;
