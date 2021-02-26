import React from 'react';

interface ContentProps {
  courseParts: {
    name: string,
    exerciseCount: number
  }[]
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <main>
      { courseParts.map((cp => <p key={cp.name}>{cp.name} {cp.exerciseCount}</p>)) }
    </main>
  )
};

export default Content;
