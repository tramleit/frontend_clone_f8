import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { Fragment, useEffect } from 'react';
import Loading from '~/components/Loading';
import Notification from '~/components/Notification';
import './App.css';
import { refreshUser } from './services/apiAuth';
import { loginSuccess } from './redux/reducer/authReducer';
import { createAxios } from './redux/createInstance';

function App() {
    const isLoading = useSelector((state) => state.modun.loading?.status);

    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

    useEffect(() => {
        if (window.performance) {
            if (performance.navigation.type === 1) {
                if (currentUser) {
                    const fetchApi = async () => {
                        await refreshUser(dispatch, currentUser.accessToken, axiosJWT);
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
