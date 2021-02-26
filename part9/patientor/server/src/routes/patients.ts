import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

// router.get('/', (_req, res) => {
//   res.send(patientService.getPatientEntries());
// });

router.get('/', (_req, res) => {
  res.send(patientService.getNonsensitiveEntries());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = patientService.addPatient({
    name, dateOfBirth, ssn, gender, occupation
  });
  res.json(newPatientEntry)
});

// router.post('/', (_req, res) => {
//   res.send('Saving a patient!');
// });

export default router;
