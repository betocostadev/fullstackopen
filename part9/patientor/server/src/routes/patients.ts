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

router.get('/:id', (req, res) => {
  try {
    const id: string = req.params.id;
    const patient = patientService.getPublicPatientEntry(id);
    return res.json(patient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return res.status(404).send({ error: 404, message: 'No patient with provided ID' });
  }
})

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
