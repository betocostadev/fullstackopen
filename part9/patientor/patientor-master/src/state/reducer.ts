import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_DATA";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
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
    case "ADD_PATIENT":
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
