import React from 'react';
import './MainPage.css';
import Card from './Components/Card/Card';

const MainPage: React.FC = () => {
  return (
    <div className="main-content">
      <h1 className="tete">Calories furnace!</h1>
      <p className="subtitle">Your Calories Burning App!</p>
      
      <br/>
      
      <div style={{ display: 'flex' }}>
        <Card
          title="Build your Streaks!"
          items={["Make sure to do an exercise every day!"]}
        />
        <Card
          title="Have Fun!"
          items={["Easily check your progress and live a healthy life"]}
        />
        <Card
          title="Register Entries"
          items={["Write your Exercises and save them quick and easy!"]}
        />        
      </div>
    </div>
  );
};

export default MainPage;