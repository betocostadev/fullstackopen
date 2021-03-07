import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { newEntry } from '../types'
import HealthCheckForm from './HealthCheckForm';

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
          ? <div>
            <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
            </div>
          : null
        }
      </Modal.Content>
    </Modal>
  )
};

export default AddEntryModal;
