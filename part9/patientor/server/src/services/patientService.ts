import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { PatientEntry, NewPatientEntry, Entry, newEntry, PublicPatient } from '../types';

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

const addEntry = (newEntry: newEntry, patientID: string): Entry => {
  const id: string = uuidv4();
  const entryToAdd = { ...newEntry, id };

  patients.forEach((patient) => {
    if (patient.id === patientID) {
      patient.entries.push(entryToAdd);
      return patient;
    }
    return patient;
  });

  return entryToAdd;
};

export default {
  getPatientEntries,
  getNonsensitiveEntries,
  getPublicPatientEntry,
  addPatient,
  addEntry
};
