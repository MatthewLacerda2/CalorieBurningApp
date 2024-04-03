import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import MainPage from "./MainPage";
import NotFoundPage from "./NotFoundPage";
import UserPage from "./Pages/User/UserPage/UserPage";
import ManageEntriesPage from "./Pages/User/ManageEntriesPage/ManageEntriesPage";
import LeaderboardPage from "./Pages/Leaderboard/LeaderboardPage";
import SettingsPage from "./Pages/User/SettingsPage/SettingsPage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/User">
          <Route index element={<UserPage />} />
          <Route path="ManageEntries" element={<ManageEntriesPage />} />
          <Route path="Settings" element={<SettingsPage />} />
        </Route>
        <Route path="/Leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
