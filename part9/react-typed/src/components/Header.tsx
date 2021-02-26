import React from 'react';
interface HeaderProps {
  courseName: string;
}

const Header: React.FC<HeaderProps> = ({ courseName }) => {
  return (
    <header>
      <h1>{courseName}</h1>
    </header>
  )
}

export default Header;
