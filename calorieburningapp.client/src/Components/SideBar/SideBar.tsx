import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to="ManageEntries" className="bar-item">Week Overview</Link>
      <div className='line'/>
      <br/>
      <Link to="/Leaderboard/Streaks" className="bar-item">Streaks Leaderboarder</Link>
      <div className='line'/>
      <br/>
      <Link to="/Leaderboard/Calories" className="bar-item">Calories Leaderboarder</Link>
      <div className='line'/>
      <br/>
    </div>
  );
};

export default SideBar;