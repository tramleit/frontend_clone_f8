import Home from '~/pages/Home';
import Learning from '~/pages/Learning';
import Courses from '~/pages/Courses';
import Blog from '~/pages/Blog';
import Login from '~/layouts/components/Login';
import Register from '~/layouts/components/Register';
import Profile from '~/pages/Profile/Profile';
import Settings from '~/pages/Settings';

// Public router
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/learning', component: Learning },
    { path: '/courses', component: Courses },
    { path: '/blog', component: Blog },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/@:username', component: Profile },
    { path: '/settings', component: Settings },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
