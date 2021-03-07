import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_PATIENT_DATA';
      payload: Patient;
    }
  | {
    type: 'SET_PATIENT_DIAGNOSIS';
    payload: Diagnosis[];
  }
  | {
    type: 'ADD_PATIENT_ENTRY';
    payload: Entry;
    patient: string;
  }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'SET_PATIENT_DATA':
      return {
        ...state,
          PatientData: {
          ...state.PatientData,
          [action.payload.id]: action.payload
        }
      };
    case 'SET_PATIENT_DIAGNOSIS':
      return {
        ...state,
        PatientDiagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ [diagnosis.code]: diagnosis, ...memo }), {}
          )
        }
      };
    case 'ADD_PATIENT_ENTRY':
      const patientToAddEntry = state.PatientData[action.patient];
      patientToAddEntry.entries.push(action.payload);
      return {
        ...state,
        PatientData: {
          ...state.PatientData,
          [action.patient]: patientToAddEntry
        }
      };
    default:
      return state;
  }
};

export const setPatientData = (patient: Patient): Action => {
  return { type: 'SET_PATIENT_DATA', payload: patient };
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: patientListFromApi };
};

export const addPatient = (patient: Patient): Action => {
  return { type: 'ADD_PATIENT', payload: patient };
};

export const setPatientDiagnosis = (diagnosisCodes: Diagnosis[]): Action => {
  return { type: 'SET_PATIENT_DIAGNOSIS', payload: diagnosisCodes };
};

export const addPatientEntry = (entry: Entry, patient: string): Action => {
  return { type: 'ADD_PATIENT_ENTRY', payload: entry, patient}
}
