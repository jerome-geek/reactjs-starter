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
