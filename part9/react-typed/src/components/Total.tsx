import React from 'react';

const Total: React.FC<{exercisesTotal: number}> = ({ exercisesTotal }) => {
  return (
    <p>Total number of exercises: {exercisesTotal}</p>
  )
}

export default Total;
