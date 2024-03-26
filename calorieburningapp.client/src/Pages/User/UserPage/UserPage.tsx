import React from 'react';
import SideBar from '../../../Components/SideBar/SideBar';
import Expandable from '../../../Components/Expandable/Expandable';
import Card from '../../../Components/Card/Card';
import ExerciseFormulary from '../../../Components/ExerciseEntry/ExerciseFormulary';

const UserPage: React.FC = () => {

  const titulo: string = "Praia de Ipanema - caminhando";
  const contento: string[] = [
    "Duration: 70min",
    "Calories: 150",
    "Date: 26/3",
    "Time: 9:00pm"
  ];

  const calWarning: string = `Reach 300cal to mark a streak for the day!`;
  const streakInfo: string = `Current Streak: 0 Longest Streak: 0`
  const totalCals: string = `Total calories Burnt: 0`;

  return (
    <div>
      <SideBar></SideBar>
      <div>
        <Card title="Username" items={[calWarning, streakInfo, totalCals]} children={<ExerciseFormulary/>}/>
      </div>
      <div>
        
        <Expandable headline={titulo} content={contento} />
        <Expandable headline={titulo} content={contento} />
        <Expandable headline={titulo} content={contento} />
        <Expandable headline={titulo} content={contento} />
        <Expandable headline={titulo} content={contento} />
      </div>
    </div>
  );
}

export default UserPage;