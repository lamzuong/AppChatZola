import './App.scss';
import './assets/boxicons-2.1.2/css/boxicons.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Profilepage from './pages/ProfilePage';
import Friends from './pages/Friends';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ConfirmPassword from './pages/ConfirmPassword/ConfirmPassword';
import Navigation from './pages/Navigation/Navigation';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Loading from './components/Loading/Loading';
import LoginFirst from './pages/LoginFirst/LoginFirst';

function App() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <div className="wrapper">
                            {user ? (
                                <>
                                    <Navigation />

                                    <div className="page">
                                        <Home />
                                    </div>
                                </>
                            ) : (
                                <Navigate to="/login" replace />
                            )}
                        </div>
                    }
                />
                <Route
                    exact
                    path="/t/:id"
                    element={
                        <div className="wrapper">
                            {user ? (
                                <>
                                    <Navigation />
                                    <div className="page">
                                        <Home />
                                    </div>
                                </>
                            ) : (
                                <Navigate to="/login" replace />
                            )}
                        </div>
                    }
                />
                <Route
                    path="/friends"
                    element={
                        <div className="wrapper">
                            <Navigation />
                            <div className="page">
                                <Friends />
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <div className="wrapper">
                            <Navigation />
                            <div className="page">
                                <Profilepage />
                            </div>
                        </div>
                    }
                />
                <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/forgot-password/confirm" element={<ConfirmPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
