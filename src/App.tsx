import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useTranslation } from 'react-i18next';

import Main from 'pages/Main';
import NotFound from 'pages/NotFound';
import Header from 'components/shared/Header';
import Footer from 'components/shared/Footer';
import Login from 'pages/Member/Login';
import mall from 'api/mall';

const App: FC = () => {
    const { data, isLoading } = useQuery('mallInfo', async () =>
        mall.getMall(),
    );

    const { t } = useTranslation('main');

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
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
