import {
    faBookOpen,
    faUser,
    faHouse,
    faRoad,
    faLightbulb,
    faNewspaper,
    faBookmark,
    faInfoCircle,
    faUsers,
    faLaptopCode,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
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

export const menuMobile = [
    [
        {
            icon: faUser,
            title: 'Trang cá nhân',
            path: 'profile',
        },
        {
            icon: faBookOpen,
            title: 'Khóa học của tôi',
            path: routes.myCourses,
        },
    ],
    [
        {
            icon: faHouse,
            title: 'Tranh chủ',
            path: routes.home,
        },
        {
            icon: faRoad,
            title: 'Lộ trình',
            path: routes.learning,
        },
        {
            icon: faLightbulb,
            title: 'Khóa học',
            path: routes.courses,
        },
        {
            icon: faNewspaper,
            title: 'Blog',
            path: routes.blog,
        },
    ],
    [
        {
            icon: faBookmark,
            title: 'Bài viết đã lưu',
            path: routes.bookmark,
        },
    ],
    [
        {
            icon: faInfoCircle,
            title: 'Giới thiệu',
            path: 'about-us',
        },
        {
            icon: faUsers,
            title: 'Cơ hội việc làm',
            path: 'careers',
        },
        {
            icon: faLaptopCode,
            title: 'Cài đặt',
            sub: [
                {
                    title: 'Cài đặt tài khoản',
                    path: '/settings/personal',
                },
                {
                    title: 'Bảo mật vài đăng nhập',
                    path: '/settings/security',
                },
                {
                    title: 'Quản lý tiếp thị liên kết',
                    sub: [],
                },
            ],
        },
    ],
    [
        {
            icon: faRightFromBracket,
            title: 'Đăng xuất',
            path: null,
        },
    ],
];

export default menu;
