import React, { useState } from 'react';
import './Components/MainPage/MainPage.css';
import Register from './Components/MainPage/Register/Register';
import Login from './Components/MainPage/Login/Login';

const MainPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="main-container">
      <div className="left-section">
        <h1>Burn Calories with Calories Furnace!</h1>
        <p className="subtext">Write your exercises</p>
        <p className="subtext">Manage your entries</p>
        <p className="subtext">Compete!</p>
      </div>
      <div className="right-section">
        {isLogin ? <Login toggleForm={toggleForm} /> : <Register toggleForm={toggleForm} />}
      </div>
    </div>
  );
}

export default MainPage;
