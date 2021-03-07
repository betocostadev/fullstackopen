import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

import { Field, Formik, Form } from 'formik';
import { useStateValue } from '../state';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { newHospitalEntry } from '../types';

interface Props {
  onSubmit: (values: newHospitalEntry) => void;
  onCancel: () => void;
}

const HospitalForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ PatientDiagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={(values: newHospitalEntry) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (!values.discharge.criteria) {
          errors.discharge = requiredError;
        }
        if (!values.discharge.date) {
          errors.discharge = requiredError;
        }
        return errors;
      }}
    >
      {({ dirty, isValid, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(PatientDiagnosis)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HospitalForm;
