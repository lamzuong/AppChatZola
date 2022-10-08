/* eslint-disable react-hooks/rules-of-hooks */
import Home from '../pages/Home';
import Profilepage from '../pages/ProfilePage';
import Friends from '../pages/Friends';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ConfirmPassword from '../pages/ConfirmPassword/ConfirmPassword';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/t/:id', component: Home },
    { path: '/friends', component: Friends },
    { path: '/profile', component: Profilepage },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/forgot-password/confirm', component: ConfirmPassword },
];

export { publicRoutes };
