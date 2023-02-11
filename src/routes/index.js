import config from '~/config';

import Home from '~/pages/Home';
import Learning from '~/pages/Learning';
import Courses from '~/pages/Courses';
import Blog from '~/pages/Blog';
import Login from '~/layouts/components/Login';
import Register from '~/layouts/components/Register';
import Profile from '~/pages/Profile/Profile';
import Settings from '~/pages/Settings';
import Tracks from '~/pages/Tracks';
import NewPost from '~/pages/NewPost';
import Posts from '~/pages/Posts';
import LearningPath from '~/pages/Learning/LearningPath';
import Search from '~/pages/Search';
import NotFound from '~/pages/NotFound';
import MyCourses from '~/pages/MyCourses';
import BookMark from '~/pages/BookMark';
import MyPost from '~/pages/MyPost';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.learning, component: Learning },
    { path: config.routes.learningPath, component: LearningPath },
    { path: config.routes.courses, component: Courses },
    { path: config.routes.tracks, component: Tracks, layout: null },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.blogTopic, component: Blog },
    { path: config.routes.post, component: Posts },
    { path: config.routes.newPost, component: NewPost, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.settings, component: Settings },
    { path: config.routes.search, component: Search },
    { path: config.routes.searchSlug, component: Search },
    { path: config.routes.myCourses, component: MyCourses },
    { path: config.routes.bookmark, component: BookMark },
    { path: config.routes.myPost, component: MyPost },
    { path: '*', component: NotFound, layout: null },
];

export { publicRoutes };
