import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

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
  const id: string = uuidv4();

  const newPatientEntry = {
    id: id,
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
