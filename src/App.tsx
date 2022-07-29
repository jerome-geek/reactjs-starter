import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

import Main from 'pages/Main';
import MemberRouter from 'router/MemberRouter';
import MyPageRouter from 'router/MyPageRouter';
import ProductRouter from 'router/ProductRouter';
import ManualRouter from 'router/ManualRouter';
import GolfCourseRouter from 'router/GolfCourseRouter';
import GuestRouter from 'router/GuestRouter';
import EtcRouter from 'router/EtcRouter';
import EventRouter from 'router/EventRouter';
import Manager from 'pages/Manager';
import NotFound from 'pages/NotFound';
import Loader from 'components/shared/Loader';
import Footer from 'components/shared/Footer';
import PrivateRoute from 'hoc/PrivateRoute';
import Cart from 'pages/Cart/Cart';
import OrderRouter from 'router/OrderRouter';
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
                            <Route
                                path='/product/*'
                                element={<ProductRouter />}
                            />
                            <Route
                                path='/manual/*'
                                element={<ManualRouter />}
                            />
                            <Route
                                path='/golf-course/*'
                                element={<GolfCourseRouter />}
                            />
                            <Route path='/order/*' element={<OrderRouter />} />
                            <Route path='/guest/*' element={<GuestRouter />} />
                            <Route path='/etc/*' element={<EtcRouter />} />
                            <Route path='/event/*' element={<EventRouter />} />
                            <Route path='/manager' element={<Manager />} />
                            <Route path='/*' element={<NotFound />} />
                            <Route path='/cart' element={<Cart />} />
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
