import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { newEntry } from '../types'
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalForm from './OccupationalForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: newEntry) => void;
  error?: string;
}


const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [entryType, setEntryType] = React.useState<String | 'HealthCheckEntry'>();

  if (!entryType) {
    setEntryType('HealthCheckEntry');
  }

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new patient</Modal.Header>
      <Modal.Content>
        <div style={{ marginBottom: '1rem'}}>
          <p>Please select the Entry type</p>
          <select onChange={(e) => setEntryType(e.target.value)}>
            <option value="HealthCheckEntry">Health check</option>
            <option value="HospitalEntry">Hospital</option>
            <option value="OccupationalHealthcareEntry">Occupational HealthCare</option>
          </select>
        </div>

        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}

        {
          entryType === "HealthCheckEntry"
          ? <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
          : entryType === "HospitalEntry"
          ? <HospitalForm onSubmit={onSubmit} onCancel={onClose} />
          : entryType === "OccupationalHealthcareEntry"
          ? <OccupationalForm onSubmit={onSubmit} onCancel={onClose} />
          : null
        }
      </Modal.Content>
    </Modal>
  )
};

export default AddEntryModal;
