const routes = {
    home: '/',
    learning: '/learning',
    learningRoute: '/learning/:slug',
    courses: '/courses',
    tracks: '/courses/:slug',
    blog: '/blog',
    blogTopic: '/blog/topic/:slug',
    post: '/blog/:slug',
    newPost: '/new-post',
    login: '/login',
    register: '/register',
    profile: '/@:username',
    settings: '/settings',
    search: '/search',
    searchSlug: '/search/:slug',
    myCourses: '/my-courses',
    bookmark: '/me/bookmark/posts',
    myPost: '/me/posts/:tab',
    drafts: '/me/posts/drafts',
    topic: '/topic',
};

export default routes;
