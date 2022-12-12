import { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { CgSearch } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';
import { BiLoaderCircle } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import SearchItem from '~/components/SearchItem';
import Popper from '~/components/Popper';
import useDebounce from '~/hooks/useDebounce';
import * as apiRequest from '~/redux/apiRequest';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const inputRef = useRef();
    const debounced = useDebounce(searchValue, 600);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        if (debounced.length > 1) {
            setLoading(true);

            const fetchApi = async () => {
                const result = await apiRequest.search(debounced, dispatch);

                if (!result) {
                    setSearchResult([]);
                    setLoading(false);
                } else {
                    setSearchResult(result);
                    setLoading(false);
                }
            };
            fetchApi();
        }
    }, [debounced]);

    const handleClearInput = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div className={cx('body')}>
            <Tippy
                interactive
                visible={showResult && searchValue !== ''}
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <Popper>
                            <div className={cx('search-header')}>
                                {loading ? (
                                    <BiLoaderCircle className={cx('icon-loading')} />
                                ) : (
                                    <FaSearch className={cx('icon-search-result')} />
                                )}
                                <p>
                                    {searchResult.length < 1
                                        ? `Không có kết quả nào ${searchValue === '' ? '' : `cho '${searchValue}'`}`
                                        : `Kết quả cho '${searchValue}'`}
                                </p>
                            </div>
                            {searchResult.length < 1 ? (
                                Fragment
                            ) : (
                                <div className={cx('search-heading')}>
                                    <h4>KHÓA HỌC</h4>
                                    <Link to={`/search/${searchValue}`}>Xem thêm</Link>
                                </div>
                            )}
                            {searchResult.map((course) => (
                                <SearchItem key={course._id} data={course} />
                            ))}
                        </Popper>
                    </div>
                )}
            >
                <div className={cx('block-search')}>
                    <div className={cx('icon-search')}>
                        <CgSearch />
                    </div>
                    <input
                        className={cx('input-search')}
                        placeholder="Tìm kiếm khóa học, bài viết, video, ..."
                        value={searchValue}
                        ref={inputRef}
                        spellCheck={false}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    <div className={cx('icon-clear')}>{!!searchValue && <MdClear onClick={handleClearInput} />}</div>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
