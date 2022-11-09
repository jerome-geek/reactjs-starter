import { Routes, Route } from 'react-router-dom';

import Notice from 'pages/Etc/Notice';
import NoticeDetail from 'pages/Etc/NoticeDetail';
import Faq from 'pages/Etc/Faq';
import Agency from 'pages/Etc/Agency';
import NotFound from 'pages/NotFound';

const EtcRouter = () => {
    return (
        <Routes>
            <Route path='notice' element={<Notice />} />
            <Route path='notice/:articleNo' element={<NoticeDetail />} />
            <Route path='faq' element={<Faq />} />
            <Route path='agency' element={<Agency />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default EtcRouter;
