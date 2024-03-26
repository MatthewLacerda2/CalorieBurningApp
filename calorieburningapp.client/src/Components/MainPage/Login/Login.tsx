import React from 'react';
import Card from '../../Card/Card';
import '../../../Styles/FormularyStyle.css';

interface LoginProps {
  toggleForm: () => void;
}

const Login: React.FC<LoginProps> = ({ toggleForm }) => {
  const handleLogin = () => {
    // Implemente a funcionalidade de login
  };

  return (
    <Card title="Login">
      <div className="login-form">
          <input className='input-text' style={{ width: '20em' }} type="email" placeholder="Email" />
          <input className='input-text' style={{ width: '20em' }} type="password" placeholder="Password" />
          <button className="send-button" style={{ width: '285px', fontSize: '20px' }} onClick={handleLogin}>Login</button>
          <button className="send-button" style={{ backgroundColor: 'blue' }} onClick={toggleForm}>Register</button>
      </div>
    </Card>
  );
};

export default Login;
