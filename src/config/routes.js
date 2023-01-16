const routes = {
    home: '/',
    learning: '/learning',
    learningRoute: '/learning/:slug',
    courses: '/courses',
    tracks: '/courses/:slug',
    blog: '/blog',
    post: '/blog/:slug',
    newPost: '/new-post',
    login: '/login',
    register: '/register',
    profile: '/@:nickname',
    settings: '/settings',
    search: '/search',
    searchSlug: '/search/:slug',
    myCourses: '/my-courses',
    bookmark: '/me/bookmark/posts',
    myPost: '/me/posts/:tab',
};

export default routes;
