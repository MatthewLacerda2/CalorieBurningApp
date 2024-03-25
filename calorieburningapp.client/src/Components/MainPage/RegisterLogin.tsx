import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterLogin.css';
import Card from '../Card/Card';
import '../../Styles/FormularyStyle.css'

const RegisterLogin: React.FC = () => {
  const handleLogin = () => {
    // Handle login functionality
  };

  return (
    <div className="register-login">
      <div className="main-content">
        <h1>Burn Calories with Calories Furnace!</h1>
        <p className="subtext">Write your exercises</p>
        <p className="subtext">Manage your entries</p>
        <p className="subtext">Compete!</p>
      </div>
      <Card title="Login">
        <div className="login-form">
            <input className='input-text'  style={{ width: '20em' }}  type="email" placeholder="Email" />
            <input className='input-text' style={{ width: '20em' }}  type="password" placeholder="Password" />
            <br/>
            <button className="send-button" style={{ width: '285px', fontSize: '20px' }} onClick={handleLogin}>Login</button>
            <Link to="/Register">
            <p/>
            <button className="send-button" style={{ backgroundColor: 'blue' }}>Register</button>
            </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterLogin;
