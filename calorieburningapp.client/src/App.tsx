import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage';
import NotFoundPage from './NotFoundPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;