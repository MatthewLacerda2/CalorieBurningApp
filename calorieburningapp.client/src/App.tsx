import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import MainPage from './MainPage';
import LoginPage from './Pages/LoginPage';
import NotFoundPage from './NotFoundPage';
import UserPage from './Pages/User/UserPage/UserPage';
import ManageEntriesPage from './Pages/User/ManageEntriesPage/ManageEntriesPage';
import StreaksPage from './Pages/Leaderboard/Streaks/StreaksPage';
import CaloriesPage from './Pages/Leaderboard/CaloriesPage/CaloriesPage';

function App() {
    return (
        <div>
            <Header/>
            <Routes>                
                <Route path="/" element={<MainPage/>} />
                <Route path="/Login" element={<LoginPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/User">
                    <Route index element={<UserPage/>}/>
                    <Route path="ManageEntries" element={<ManageEntriesPage/>}/>
                </Route>
                <Route path="/Leaderboard">
                    <Route path="Streaks" element={<StreaksPage/>}/>
                    <Route path="Calories" element={<CaloriesPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;