import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to="WeekOverview" className="bar-item">Week Overview</Link>
      <div className='line'/>
      <br/>
      <Link to="EmployeesSchedules" className="bar-item">Employees Schedules</Link>
      <div className='line'/>
      <br/>
      <Link to="RegisterClient" className="bar-item">Register Client</Link>
      <div className='line'/>
      <br/>
      <Link to="RegisterEmployee" className="bar-item">Register Employee</Link>
      <div className='line'/>
      <br/>
      <Link to="RegisterSecretary" className="bar-item">Register Secretary</Link>
      <div className='line'/>
    </div>
  );
};

export default SideBar;