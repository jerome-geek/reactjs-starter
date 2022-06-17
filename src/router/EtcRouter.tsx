import { Routes, Route } from 'react-router-dom';

import Faq from 'pages/Etc/Faq';
import NotFound from 'pages/NotFound';
import Notice from 'pages/Etc/Notice';
import NoticeDetail from 'pages/Etc/NoticeDetail';

const EtcRouter = () => {
    return (
        <Routes>
            <Route path='notice' element={<Notice />} />
            <Route path='notice/:articleNo' element={<NoticeDetail />} />
            <Route path='faq' element={<Faq />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default EtcRouter;
