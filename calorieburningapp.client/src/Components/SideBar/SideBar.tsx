import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to="ManageEntries" className="bar-item">
        Manage Entries
      </Link>
      <div className="line" />
      <br />
      <Link to="/Leaderboard" className="bar-item">
        Leaderboarders
      </Link>
      <div className="line" />
      <br />
      <Link to="/Settings" className="bar-item">
        Settings
      </Link>
      <div className="line" />
      <br />
    </div>
  );
};

export default SideBar;
