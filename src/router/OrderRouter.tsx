import { Route, Routes } from 'react-router-dom';

import Sheet from 'pages/Order/Sheet';
import NotFound from 'pages/NotFound';

const OrderRouter = () => (
    <Routes>
        <Route path='sheet/:orderSheetNo' element={<Sheet />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
);

export default OrderRouter;
