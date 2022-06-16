import { Routes, Route } from 'react-router-dom';

import Faq from 'pages/Etc/Faq';
import NotFound from 'pages/NotFound';

const EtcRouter = () => {
    return (
        <Routes>
            <Route path='faq' element={<Faq />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default EtcRouter;
