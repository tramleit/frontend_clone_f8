import { useEffect } from 'react';

function Learning() {
    useEffect(() => {
        document.title = 'Lộ trình học lập trình cho người mới tại F8';
    });
    return <div>Learning</div>;
}

export default Learning;
