import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import Loading from '~/components/Loading';
import { refreshUser } from './services/apiAuth';
import Notification from '~/components/Notification';
import CommentModal from './components/CommentModal';
import { logoutSuccess } from './redux/reducer/authReducer';
import './App.css';

function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.modun.loading.status);
    const { status } = useSelector((state) => state.modun.modalComment);
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        if (window.performance) {
            if (performance.navigation.type === 1) {
                if (currentUser) {
                    const fetchApi = async () => {
                        const result = await refreshUser(dispatch, currentUser.accessToken);

                        if (result.statusCode !== 0) {
                            dispatch(logoutSuccess());
                            window.location.href = '/login';
                            window.location.reload();
                        }
                    };
                    fetchApi();
                }
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            <div className="App">
                {isLoading && <Loading />}
                <Notification />

                {status && <CommentModal />}

                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
