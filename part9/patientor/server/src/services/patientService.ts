import patients from '../../data/patients';
const { v4: uuidv4 } = require('uuid');

import { NonSensitiveDiaryEntry, PatientEntry, NewPatientEntry } from '../types';

const getPatientEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonsensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {

  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatientEntries,
  getNonsensitiveEntries,
  addPatient
};
