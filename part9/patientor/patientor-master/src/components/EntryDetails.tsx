import React from 'react';
import { Entry, HospitalEntry, OccupationalHealthCareEntry,  HealthCheckEntry } from '../types';

import { Container, Icon } from 'semantic-ui-react';

const boxContainer = {
  padding: '10px',
  marginBottom: '1rem',
  boxShadow: '2px 2px 5px 1px rgba(0,0,0,0.75)',
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div style={boxContainer}>
      <Container>
        <h3>{entry.date} <Icon name="hospital" size="big" /></h3>
        <p><em>{entry.description}</em></p>
        <p><em>{entry.specialist}</em></p>
        <h4>Discharge</h4>
        <p>Date: {entry.discharge?.date}</p>
        <p>Criteria: {entry.discharge?.criteria}</p>

        {entry.diagnosisCodes && (
          <div>
            <h4>Diagnosis Codes</h4>
            <ul>
              { entry.diagnosisCodes && entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>) }
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
};

const OccupationalHealthCare: React.FC<{ entry: OccupationalHealthCareEntry; }> = ({ entry }) => {
  return (
    <div style={boxContainer}>
      <Container>
        <h3>{entry.date} <Icon name="user doctor" size="big" /></h3>
        <p><em>{entry.description}</em></p>
        <p><em>{entry.specialist}</em></p>
        <h4>Employer Name</h4>
        <p>{entry.employerName}</p>
        {entry.sickLeave && (
          <div>
            <p>Sick Leave</p>
            <p>{entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>
          </div>
        )}
        {entry.diagnosisCodes && (
          <div>
            <h4>Diagnosis Codes</h4>
            <ul>
              { entry.diagnosisCodes && entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>) }
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div style={boxContainer}>
      <Container>
        <h3>{entry.date} <Icon name="medkit" size="big" /></h3>
        <p><em>{entry.description}</em></p>
        <p><em>{entry.specialist}</em></p>
        {entry.diagnosisCodes && (
          <div>
            <h4>Diagnosis Codes</h4>
            <ul>
              { entry.diagnosisCodes && entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>) }
            </ul>
          </div>
        )}
        { entry.healthCheckRating === 0 && ( <Icon name="heart" color="green" size="large" /> ) }
        {
          (entry.healthCheckRating === 1 || entry.healthCheckRating === 2)
            && ( <Icon name="heart" color="yellow" size="large" />)
        }
        { entry.healthCheckRating === 3 && ( <Icon name="heart" color="red" size="large" /> ) }
      </Container>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthCare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
