import config from '~/config';
import Home from '~/pages/Home';
import Blog from '~/pages/Blog';
import Posts from '~/pages/Posts';
import MyPost from '~/pages/MyPost';
import Tracks from '~/pages/Tracks';
import Search from '~/pages/Search';
import Profile from '~/pages/Profile';
import NewPost from '~/pages/NewPost';
import Courses from '~/pages/Courses';
import Learning from '~/pages/Learning';
import Settings from '~/pages/Settings';
import NotFound from '~/pages/NotFound';
import BookMark from '~/pages/BookMark';
import MyCourses from '~/pages/MyCourses';
import Login from '~/layouts/components/Login';
import Register from '~/layouts/components/Register';
import LearningPath from '~/pages/Learning/LearningPath';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.post, component: Posts },
    { path: '*', component: NotFound, layout: null },
    { path: config.routes.myPost, component: MyPost },
    { path: config.routes.search, component: Search },
    { path: config.routes.blogTopic, component: Blog },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.courses, component: Courses },
    { path: config.routes.settings, component: Settings },
    { path: config.routes.searchSlug, component: Search },
    { path: config.routes.bookmark, component: BookMark },
    { path: config.routes.learning, component: Learning },
    { path: config.routes.myCourses, component: MyCourses },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.learningPath, component: LearningPath },
    { path: config.routes.tracks, component: Tracks, layout: null },
    { path: config.routes.newPost, component: NewPost, layout: null },
    { path: config.routes.register, component: Register, layout: null },
];

export { publicRoutes };
