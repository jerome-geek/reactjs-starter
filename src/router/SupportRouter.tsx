import { Route, Routes } from 'react-router-dom';

import Inquiry from 'pages/Contact/Inquiry';
import NotFound from 'pages/NotFound';

const SupportRouter = () => (
    <Routes>
        <Route path='/inquiry' element={<Inquiry />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
);

export default SupportRouter;
