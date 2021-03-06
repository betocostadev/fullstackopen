/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatientEntry, Gender, Entry,  HospitalEntry,
  OccupationalHealthCareEntry, HealthCheckEntry, BaseEntry, DiagnoseEntry } from './types';

// TYPE GUARDS
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isBaseEntry = (entry: any): entry is BaseEntry => {
  if (entry.diagnosisCodes) {
    if (!parseDiagnosisCodes(entry.diagnosisCodes)) {
      throw new Error(`Incorrect Diagnosis Code`);
    }
  }

  if (!entry || !isString(entry.id) || !isString(entry.description) || !isDate(entry.date) ||  !isString(entry.specialist)) {
    throw new Error('Incorrect id, description, date or specialist');
  }

  return entry;
};

const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  if (entry.discharge && Object.keys(entry.discharge).includes('date') && Object.keys(entry.discharge).includes('criteria')) {
    if (!isString(entry.discharge.criteria) || !isDate(entry.discharge.date)) {
      throw new Error('Incorrect information');
    } else {
      return true;
    }
  }
  return false;
};

const isOccupationalHealthCareEntry = (entry: any): entry is OccupationalHealthCareEntry => {
  if (entry.employerName) {
    if (entry.sickLeave) {
      if (Object.keys(entry.sickLeave).includes('startDate')
        && Object.keys(entry.sickLeave).includes('endDate')) {
        if (!isDate(entry.sickLeave.startDate) || !isDate(entry.sickLeave.endDate)) {
          throw new Error('Incorrect Date for Sick Leave');
        } else {
          return true;
        }
      }
    }
    return true;
  }
  return false;
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  if (entry.healthCheckRating === undefined && !isString(entry.healthCheckRating)) {
    return false;
  }
  return entry;
};

// PARSERS
const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${String(name)}`);
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${String(date)}`);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing SSN: ${String(ssn)}`);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${String(gender)}`);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing Occupation: ${String(occupation)}`);
  }
  return occupation;
};

const parseDiagnosisCodes = (diagnosisCodes: any): diagnosisCodes is Array<DiagnoseEntry['code']> => {
  return diagnosisCodes.every((diagnosisCode: any) => isString(diagnosisCode));
};

const parseEntry = (entries: any): Entry[] => {
  if (!entries) {
    throw new Error(`Incorrect or mission Entries: ${String(entries)}`);
  }

  return entries.map((entry: any) => {
    if (!isBaseEntry(entry)) {
      throw new Error(`Not a base entry ${entry}`);
    }
    if (isHospitalEntry(entry)) {
      return entry;
    } else if (isOccupationalHealthCareEntry(entry)) {
      return entry;
    } else if (isHealthCheckEntry(entry)) {
      return entry;
    } else {
      throw new Error(`Not a known entry.`);
    }
  });
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntry(object.entries)
  };
};

export default toNewPatientEntry;
