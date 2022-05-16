import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from 'pages/Main';
import NotFound from 'pages/NotFound';
import GlobalStyle from 'styles/global-styles';
import Header from 'components/shared/Header';
import Footer from 'components/shared/Footer';
import Login from 'pages/Member/Login';

const App: FC = () => {
    return (
        <>
            <GlobalStyle />
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
    );
};

export default App;
