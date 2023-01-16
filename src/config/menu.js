import routes from './routes';

const menu = [
    [
        {
            title: 'Trang cá nhân',
            path: 'profile',
        },
    ],
    [
        {
            title: 'Viết blog',
            path: routes.newPost,
        },
        {
            title: 'Bài viết của tôi',
            path: routes.drafts,
        },
    ],
    [
        {
            title: 'Bài viết đã lưu',
            path: routes.bookmark,
        },
    ],
    [
        {
            title: 'Cài đặt',
            path: routes.settings,
        },
        {
            title: 'Đăng xuất',
            path: null,
        },
    ],
];

export default menu;
