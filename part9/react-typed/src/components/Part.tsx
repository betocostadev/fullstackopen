import React from 'react';
import { CoursePart } from '../types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const partSelector =  (part: CoursePart) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Group project count: {part.groupProjectCount}</p>
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
          <p><a href={part.exerciseSubmissionLink}>Exercise submissions</a></p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  return partSelector(part);
};

export default Part;
