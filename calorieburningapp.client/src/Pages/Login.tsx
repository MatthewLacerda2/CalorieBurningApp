import React, { useState } from 'react';
import Card from '../Components/Card/Card';
import '../Style/FormularyStyle.css';

const Login: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Card title = "Login">
        
        <form onSubmit={handleSubmit}>
            
            <div className='input-container'>
                <label className='babel'>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} required className='input-area'/>
            </div>
            <div className='input-container'>
                <label className='babel'>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} required className='input-area'/>
            </div>
            <br></br>
            <button style={{ backgroundColor: 'green' }} type="submit">Login</button>
        </form>
    
    </Card>
  );
};

export default Login;
