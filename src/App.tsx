import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

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

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='/member/login' element={<Login />} />
                        <Route path='/*' element={<NotFound />} />
                    </Routes>
                    <Footer />
                </>
            )}
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    );
};

export default App;
