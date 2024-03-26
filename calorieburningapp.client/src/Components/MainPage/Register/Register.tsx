import React from 'react';
import Card from '../../Card/Card';
import '../../../Styles/FormularyStyle.css';

interface LoginProps {
  toggleForm: () => void;
}

const Register: React.FC<LoginProps> = ({ toggleForm }) => {
  const handleLogin = () => {
    // Implemente a funcionalidade de login
  };

  return (
    <Card title="Register">
      <div className="login-form">
          <input className='input-text' style={{ width: '20em' }} type="email" placeholder="Email" />
          <input className='input-text' style={{ width: '20em' }} type="password" placeholder="Password" />
          <p></p>
          <button className="send-button" style={{ width: '105px', fontSize: '20px' }} onClick={handleLogin}>Register</button>
          <p></p>
          <button className="send-button" style={{ width: '85px', backgroundColor: 'blue' }} onClick={toggleForm}>Login</button>          
      </div>
    </Card>
  );
};

export default Register;