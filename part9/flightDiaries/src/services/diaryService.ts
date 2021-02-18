import diaries from '../../data/diaries';
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

import { DiaryEntry } from '../types';

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};
