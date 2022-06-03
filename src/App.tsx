import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useTranslation } from 'react-i18next';

import Main from 'pages/Main';
import Login from 'pages/Member/Login';
import NotFound from 'pages/NotFound';
import Loader from 'components/shared/Loader';
import Header from 'components/shared/Header';
import Footer from 'components/shared/Footer';
import SignUpTerms from 'pages/Member/SignUpTerms';
import SignUpInput from 'pages/Member/SignUpInput';
import SignUpCompleted from 'pages/Member/SignUpCompleted';
import mall from 'api/mall';
import { useMall } from 'hooks';

const App: FC = () => {
    const [data, isLoading] = useMall();

    const { t } = useTranslation('main');

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <BrowserRouter>
                        <Header />
                        {t('hello')}
                        <Routes>
                            <Route path='/' element={<Main />} />
                            <Route path='/member/login' element={<Login />} />
                            <Route path='/*' element={<NotFound />} />
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
