import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Icon, Button, Container } from 'semantic-ui-react'

import { useStateValue, setPatientData, setPatientDiagnosis, addPatientEntry } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Entry, newEntry, Diagnosis } from '../types';
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal/index';


const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [modalEntryForm, setModalEntryForm] = React.useState<boolean | true>();
  const [error, setError] = React.useState<string | undefined>();
  const [ { PatientData, PatientDiagnosis },  dispatch ] = useStateValue();

  const setErrorMessage = (message: string) => {
    setError(message);
    setModalEntryForm(false);

    setTimeout(() => {
      setError(undefined)
    } ,5500);
  };

  React.useEffect(() => {
    const getPatientData = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientData(patient));
        setPatient(patient);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.response.data.message);
      }
    }

    const getPatientDiagnosis = async () => {
      try {
        const { data: PatientDiagnosis } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setPatientDiagnosis(PatientDiagnosis));
      } catch (error) {
        console.log(error);
      }
    }

    if (PatientData[id]) {
      setPatient(PatientData[id]);
    } else {
      getPatientData();
    }

    if (!Object.values(PatientDiagnosis).length) {
      getPatientDiagnosis();
    }

  }, [dispatch, id, PatientData, PatientDiagnosis]);

  const getPatientGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      default:
        return 'genderless';
    }
  };

  const onSubmit = async (values: newEntry) => {
    try {
      const { data: newEntryData } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      dispatch(addPatientEntry(newEntryData, id));
      setModalEntryForm(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data);
    }
  };

  const onCancel = (): void => {
    setModalEntryForm(false);
  };

  const boxContainer = {
    padding: '10px',
    marginBottom: '1rem',
    boxShadow: '2px 2px 5px 1px rgba(0,0,0,0.75)',
  }

  if (!patient) return <div>Loading patient details, please wait ...</div>;

  return (
    <div>
      {error
        ? (
          <Container style={boxContainer}>
            <p>{error}</p>
          </Container>
        )
        : null
      }
      <h2>{patient.name} <Icon name={ getPatientGenderIcon(patient.gender) }/></h2>
      <p><strong>SSN:</strong> {patient.ssn}</p>
      <p><strong>Occupation:</strong> {patient.occupation}</p>
      <Button onClick={() => { modalEntryForm ? setModalEntryForm(false) : setModalEntryForm(true) }} >
        Add New Entry
      </Button>

      {
        modalEntryForm
          ? (<AddEntryModal modalOpen={modalEntryForm} onSubmit={onSubmit} onClose={onCancel} error={error} />)
          : null
      }

      {patient.entries.length > 0 && (
        <div>
          <h3>Patient entries</h3>
          {
            patient.entries.map((entry: Entry) => {
              return ( <EntryDetails key={entry.id} entry={entry} /> );
            })
          }
        </div>
      )}

    </div>
  )
};

export default PatientPage;
