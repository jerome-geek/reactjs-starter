import { Route, Routes } from 'react-router-dom';

import Inquiry from 'pages/Support/Inquiry';
import MyInquiry from 'pages/Support/MyInquiry';
import NotFound from 'pages/NotFound';

const SupportRouter = () => (
    <Routes>
        <Route path='/inquiry' element={<Inquiry />} />
        <Route path='/inquiry/:inquiryNo' element={<Inquiry />} />
        <Route path='/inquiry/:orderNo' element={<Inquiry />} />
        <Route path='/my-inquiry' element={<MyInquiry />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
);

export default SupportRouter;
