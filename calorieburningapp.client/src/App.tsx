import { Route, Routes } from 'react-router-dom';
import './App.css'
import MainPage from './MainPage';
import Login from './Pages/Login';
import NotFoundPage from './NotFoundPage';
import Header from './Components/Header/Header';

function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element = {<MainPage/>}/>
                <Route path="/User">
                    <Route index element={<UserPage/>}/>
                    <Route path="UserSettings" element={<UserSettingsPage/>}/>
                </Route>
                <Route path="/Login" element={<Login/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    )
}

export default App;