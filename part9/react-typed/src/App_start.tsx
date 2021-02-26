import React from 'react';
import './App.css';

const App: React.FC = () => {
  interface WelcomeProps {
    name: string;
  }

  const Welcome: React.FC<WelcomeProps> = (props) => {
    return <h1>Hello, {props.name}</h1>;
  };

  // const Welcome: React.FC<{ name: string }> = ({ name }) => (
  //   <h1>Hello, {name}</h1>
  // );

  return (
    <div className="App">
      <header>
        <Welcome name="Sara" />
      </header>
    </div>
  );
}

export default App;
