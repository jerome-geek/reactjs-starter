import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

import MyPageRouter from 'router/MyPageRouter';
import MemberRouter from 'router/MemberRouter';
import GuestRouter from 'router/GuestRouter';
import EtcRouter from 'router/EtcRouter';
import EventRouter from 'router/EventRouter';
import Main from 'pages/Main';
import NotFound from 'pages/NotFound';
import Loader from 'components/shared/Loader';
import Footer from 'components/shared/Footer';
import PrivateRoute from 'hoc/PrivateRoute';
import { useMall } from 'hooks';

const App: FC = () => {
    const [data, isLoading] = useMall();

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Main />} />
                            <Route
                                path='/member/*'
                                element={
                                    <PrivateRoute option={false}>
                                        <MemberRouter />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path='/my-page/*'
                                element={
                                    <PrivateRoute option={true}>
                                        <MyPageRouter />
                                    </PrivateRoute>
                                }
                            />
                            <Route path='/guest/*' element={<GuestRouter />} />
                            <Route path='/etc/*' element={<EtcRouter />} />
                            <Route path='/event/*' element={<EventRouter />} />
                            <Route path='/*' element={<NotFound />} />
                        </Routes>
                        <Footer />
                    </BrowserRouter>
                </>
            )}
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    );
};

export default App;
