import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import { Icon } from 'semantic-ui-react'

import { useStateValue, setPatientData } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Entry } from '../types';
import EntryDetails from '../components/EntryDetails';


const PatientPage: React.FC = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>();
  const [redirect, setRedirect] = React.useState(false);
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [error, setError] = React.useState<String | undefined>();
  const [ { PatientData },  dispatch ] = useStateValue();

  const setErrorMessage = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(undefined)
      setRedirect(true)
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

    if (PatientData[id]) {
      setPatient(PatientData[id]);
    } else {
      getPatientData();
    }

  }, [dispatch, id, PatientData]);

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

  if (error) return <h3>Sorry, there was an error: {error} </h3>;

  if (redirect) {
    setRedirect(false);
    setTimeout(() => {
      history.push('/');
    }, 0);
  }

  if (!patient) return <div>Loading patient details, please wait ...</div>;

  return (
    <div>
      <h2>{patient.name} <Icon name={ getPatientGenderIcon(patient.gender) }/></h2>
      <p><strong>SSN:</strong> {patient.ssn}</p>
      <p><strong>Occupation:</strong> {patient.occupation}</p>

      {patient.entries.length > 0 && (
        <div>
          <h3>Patient entries</h3>
          {
            patient.entries.map((entry: Entry) => {
              return ( <EntryDetails entry={entry} /> );
            })
          }
        </div>
      )}

    </div>
  )
};

export default PatientPage;
