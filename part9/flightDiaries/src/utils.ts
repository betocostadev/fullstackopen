/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewDiaryEntry, Visibility, Weather } from './types';

// TYPE GUARDS
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};

const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

// PARSERS
// Date below will not be used since we are using dates as strings data.
// const parseDate = (date: any): Date => {
//   if (!date || !isDate(date)) {
//     throw new Error(`Incorrect or missing date: ${date}`)
//   }
//   return date;
// }

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${String(date)}`);
  }
  return date;
};

const parseComment = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error(`Incorrect or missing comment: ${String(comment)}`);
  }
  return comment;
};

const parseWeather = (weather: any): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error(`Incorrect or missing weather: ${String(weather)}`);
  }
  return weather;
};

const parseVisibility = (visibility: any): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error(`Incorrect or missing visibility: ${String(visibility)}`);
  }
  return visibility;
};

// Added this interface to avoid using any for the toNewDiaryEntry function.
// it gets the request.body that express will send as "any", but creating this interface solved the issue.
interface expectedReqBody {
  date: string;
  comment: string;
  weather: string;
  visibility: string;
}

const toNewDiaryEntry = (object: expectedReqBody): NewDiaryEntry => {
  return {
    date: parseDate(object.date),
    comment: parseComment(object.comment),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility)
  };
};

export default toNewDiaryEntry;
