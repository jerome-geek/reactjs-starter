import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Main from 'pages/Main';
import NotFound from 'pages/NotFound';
import Header from 'components/shared/Header';
import Footer from 'components/shared/Footer';
import Login from 'pages/Member/Login';
import SignUpTerms from 'pages/Member/SignUpTerms';
import SignUpInput from 'pages/Member/SignUpInput';
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
                    <BrowserRouter>
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
