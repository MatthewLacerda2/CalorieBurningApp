import React from 'react';
import SideBar from '../../../Components/SideBar/SideBar';
import Expandable from '../../../Components/Expandable/Expandable';

const UserPage: React.FC = () => {

  const titulo: string = "Praia de Ipanema - caminhando";
  const contento: string[] = [
    "Duration: 70min",
    "Calories: 150",
    "Date: 26/3",
    "Time: 9:00pm"
  ];

  return (
    <div>
      <SideBar></SideBar>
      <Expandable headline={titulo} content={contento} />
      <Expandable headline={titulo} content={contento} />
      <Expandable headline={titulo} content={contento} />
    </div>
  );
}

export default UserPage;