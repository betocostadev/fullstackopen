import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { PatientEntry, NewPatientEntry, PublicPatient } from '../types';

const getPatientEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonsensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getPublicPatientEntry = (id: string): PublicPatient | undefined => {
  return patients.find((patient) => patient.id === id);
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
  getPublicPatientEntry,
  addPatient
};
