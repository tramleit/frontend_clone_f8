import { useEffect } from 'react';

function Courses() {
    useEffect(() => {
        document.title = 'Danh sách các khóa học lập trình tại F8';
    });
    return <div>Courses</div>;
}

export default Courses;
