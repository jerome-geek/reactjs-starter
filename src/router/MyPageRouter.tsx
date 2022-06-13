import { Route, Routes } from 'react-router-dom';

import MyPageIndex from 'pages/MyPage/Index';
import NotFound from 'pages/NotFound';

const MyPageRouter = () => {
    return (
        <Routes>
            <Route path='index' element={<MyPageIndex />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default MyPageRouter;
