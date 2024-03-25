import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Components/Header/Header';
import Login from './Login';
import MainPage from './MainPage';
import UserPage from './Pages/User/UserPage/UserPage';
import ManageEntries from './Pages/User/ManageEntriesPage/ManageEntries';
import CaloriesPage from './Pages/Leaderboard/CaloriesPage/CaloriesPage';
import StreaksPage from './Pages/Leaderboard/StreaksPage/StreaksPage';
import NotFoundPage from './NotFoundPage';

function App() {
    return (
        <div>
            <Header/>
            <Route path="/Login" element={<Login/>}/>
            <Routes>
                <Route path="/" element = {<MainPage/>}/>
                <Route path="/User">
                    <Route index element={<UserPage/>}/>
                    <Route path="ManageEntries" element={<ManageEntries/>}/>
                </Route>
                <Route path="/Leaderboard">
                    <Route path="Streaks" element={<CaloriesPage/>}/>
                    <Route path="Calories" element={<StreaksPage/>}/>
                </Route>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    )
}

export default App;