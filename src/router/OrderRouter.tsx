import { Route, Routes } from 'react-router-dom';

import Sheet from 'pages/Order/Sheet';
import Complete from 'pages/Order/Complete';
import OrderAgreement from 'pages/Order/OrderAgreement';
import NotFound from 'pages/NotFound';

const OrderRouter = () => (
    <Routes>
        <Route path='sheet/:orderSheetNo' element={<Sheet />} />
        <Route path='complete' element={<Complete />} />
        <Route path='agreement' element={<OrderAgreement />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
);

export default OrderRouter;
