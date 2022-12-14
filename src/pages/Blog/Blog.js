import { useEffect } from 'react';

function Blog() {
    useEffect(() => {
        document.title = 'Danh sách bài viết về lĩnh vực IT';
    });
    return <div>Blog</div>;
}

export default Blog;
