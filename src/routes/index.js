import Home from '~/pages/Home';
import Learning from '~/pages/Learning';
import Courses from '~/pages/Courses';
import Blog from '~/pages/Blog';

// Public router
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/learning', component: Learning },
    { path: '/courses', component: Courses },
    { path: '/blog', component: Blog },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
