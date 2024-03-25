import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage';
import NotFoundPage from './NotFoundPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;