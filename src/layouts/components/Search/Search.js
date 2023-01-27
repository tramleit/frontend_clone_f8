import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { CgSearch } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';
import { BiLoaderCircle } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import useDebounce from '~/hooks/useDebounce';
import { searchByName } from '~/services/apiSearch';

import styles from './Search.module.scss';
import SearchResult from './SearchResult';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');

    const [dataSearch, setDataSearch] = useState([]);

    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    const debounced = useDebounce(searchValue, 600);

    useEffect(() => {
        if (!debounced.trim()) {
            return;
        }

        if (debounced.length > 1) {
            setLoading(true);

            const fetchApi = async () => {
                const result = await searchByName(debounced, 'all');

                setLoading(false);
                if (result.statusCode === 0) {
                    setDataSearch(result.data);
                }
            };
            fetchApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    const handleClearInput = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div className={cx('body')}>
            <Tippy
                visible={showResult && searchValue !== ''}
                interactive
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <div className={cx('wrapper-search')}>
                            <div className={cx('search-header')}>
                                {loading ? (
                                    <BiLoaderCircle className={cx('icon-loading')} />
                                ) : (
                                    <FaSearch className={cx('icon-search-result')} />
                                )}
                                <p>
                                    {dataSearch.length < 1
                                        ? `Không có kết quả nào ${searchValue === '' ? '' : `cho '${searchValue}'`}`
                                        : `Kết quả cho '${searchValue}'`}
                                </p>
                            </div>

                            {dataSearch.map((data, index) => (
                                <SearchResult
                                    key={index}
                                    data={data}
                                    index={index}
                                    handleHideResult={handleHideResult}
                                    searchValue={searchValue}
                                />
                            ))}
                        </div>
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
