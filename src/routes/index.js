import Home from '~/pages/Home';
import Learning from '~/pages/Learning';
import Courses from '~/pages/Courses';
import Blog from '~/pages/Blog';
import Login from '~/layouts/components/Login';
import Register from '~/layouts/components/Register';
import HomeAdmin from '~/admin/pages/HomeAdmin';
import LoginAdmin from '~/admin/layouts/components/LoginAdmin';

// Public router
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/learning', component: Learning },
    { path: '/courses', component: Courses },
    { path: '/blog', component: Blog },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },

    { path: '/admin', component: HomeAdmin, layout: null },
    { path: '/admin/login', component: LoginAdmin, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
