import patients from '../../data/patients';

import { NonSensitiveDiaryEntry, PatientEntry } from '../types';

const getPatientEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonsensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  getPatientEntries,
  getNonsensitiveEntries
};
