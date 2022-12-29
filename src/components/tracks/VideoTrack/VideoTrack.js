import classNames from 'classnames/bind';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoTrack.module.scss';

const cx = classNames.bind(styles);

function VideoTrack({ status }) {
    const [played, setPlayed] = useState(0);
    console.log('played: ', played);

    const handleGetTotalTimeVideo = (data) => {
        console.log('data: ', data);
    };

    return (
        <div className={status ? cx('wrapper') : cx('wrapper', 'active')}>
            <div className={cx('player-wrap')}>
                <div className={cx('player')}>
                    <ReactPlayer
                        width="100%"
                        height="100%"
                        playing
                        controls
                        onProgress={(progress) => setPlayed(progress.playedSeconds)}
                        onDuration={handleGetTotalTimeVideo}
                        light="https://i.ytimg.com/vi/-jV06pqjUUc/maxresdefault.jpg"
                        url="https://www.youtube.com/watch?v=-jV06pqjUUc"
                    />
                </div>
            </div>
        </div>
    );
}

export default VideoTrack;
