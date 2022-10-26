import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

import Main from 'pages/Main';
import PrivateRoute from 'hoc/PrivateRoute';
import ScrollToTop from 'hoc/ScrollToTop';
import DefaultLayout from 'components/Layout/DefaultLayout';

const MemberRouter = React.lazy(() => import('router/MemberRouter'));
const JoinCompleted = React.lazy(() => import('pages/Member/JoinCompleted'));
const MyPageRouter = React.lazy(() => import('router/MyPageRouter'));
const ProductRouter = React.lazy(() => import('router/ProductRouter'));
const ManualRouter = React.lazy(() => import('router/ManualRouter'));
const GolfCourseRouter = React.lazy(() => import('router/GolfCourseRouter'));
const OrderRouter = React.lazy(() => import('router/OrderRouter'));
const GuestRouter = React.lazy(() => import('router/GuestRouter'));
const EtcRouter = React.lazy(() => import('router/EtcRouter'));
const EventRouter = React.lazy(() => import('router/EventRouter'));
const Manager = React.lazy(() => import('pages/Manager'));
const Cart = React.lazy(() => import('pages/Cart/Cart'));
const SearchRouter = React.lazy(() => import('router/SearchRouter'));
const SupportRouter = React.lazy(() => import('router/SupportRouter'));
const NotFound = React.lazy(() => import('pages/NotFound'));

const App: FC = () => {
    return (
        <>
            <BrowserRouter>
                <DefaultLayout>
                    <ScrollToTop>
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
                                path='/member/join-completed'
                                element={<JoinCompleted />}
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
                            <Route path='/cart' element={<Cart />} />
                            <Route
                                path='/search/*'
                                element={<SearchRouter />}
                            />
                            <Route
                                path='/support/*'
                                element={<SupportRouter />}
                            />
                            <Route path='/*' element={<NotFound />} />
                        </Routes>
                    </ScrollToTop>
                </DefaultLayout>
            </BrowserRouter>
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </>
    );
};

export default React.memo(App);
