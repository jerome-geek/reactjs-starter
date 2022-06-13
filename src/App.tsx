import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

import MyPageRouter from 'router/MyPageRouter';
import MemberRouter from 'router/MemberRouter';
import Main from 'pages/Main';
import NotFound from 'pages/NotFound';
import Loader from 'components/shared/Loader';
import Footer from 'components/shared/Footer';
import SignUpTerms from 'pages/Member/SignUpTerms';
import SignUpInput from 'pages/Member/SignUpInput';
import SignUpCompleted from 'pages/Member/SignUpCompleted';
import PrivateRoute from 'hoc/PrivateRoute';
import mall from 'api/mall';
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
                                path='/signup/term'
                                element={<SignUpTerms />}
                            />
                            <Route
                                path='/signup/input'
                                element={<SignUpInput />}
                            />
                            <Route
                                path='/signup/signUpCompleted'
                                element={<SignUpCompleted />}
                            />
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
