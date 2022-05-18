import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

import Main from 'pages/Main';
import Login from 'pages/Member/Login';
import NotFound from 'pages/NotFound';
import Loader from 'components/shared/Loader';
import Header from 'components/shared/Header';
import Footer from 'components/shared/Footer';
import { useMall } from 'hooks';

const App: FC = () => {
    const [data, isLoading] = useMall();

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Header />
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Main />} />
                            <Route path='/member/login' element={<Login />} />
                            <Route path='/*' element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                    <Footer />
                </>
            )}
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    );
};

export default App;
