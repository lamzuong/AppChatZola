import Home from '../pages/Home';
import Profilepage from '../pages/ProfilePage';
import Friends from '../pages/Friends';
import Login from '../pages/Login/Login';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/t/:id', component: Home },
    { path: '/friends', component: Friends },
    { path: '/profile', component: Profilepage },
    { path: '/login', component: Login },
];

export { publicRoutes };
