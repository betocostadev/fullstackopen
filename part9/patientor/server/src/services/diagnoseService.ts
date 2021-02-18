import diagnoses from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const getDiagnoseEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

export default {
  getDiagnoseEntries
};
