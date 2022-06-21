import { Routes, Route } from 'react-router-dom';

import GuestLogin from 'pages/Guest/GuestLogin';
import GuestOrder from 'pages/Guest/GuestOrder';
import GuestOrderDetail from 'pages/Guest/GuestOrderDetail';
import NotFound from 'pages/NotFound';

const GuestRouter = () => (
    <Routes>
        <Route path='login' element={<GuestLogin />} />
        <Route path='order' element={<GuestOrder />} />
        <Route
            path='order/detail/:guestOrderNo'
            element={<GuestOrderDetail />}
        />
        <Route path='*' element={<NotFound />} />
    </Routes>
);

export default GuestRouter;
