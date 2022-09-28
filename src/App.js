import './App.scss';
import './assets/boxicons-2.1.2/css/boxicons.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './config/Routers';
import Navigation from './pages/Navigation/Navigation';

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    {publicRoutes.map((route, i) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={i}
                                path={route.path}
                                element={
                                    <div className="wrapper">
                                        {route.path !== '/login' &&
                                            route.path !== '/register' &&
                                            route.path !== '/forgot-password' &&
                                            route.path !== '/forgot-password/confirm' && <Navigation />}
                                        <div className="page">
                                            <Page />
                                        </div>
                                    </div>
                                }
                            />
                        );
                    })}
                    {/* kjkjk */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
