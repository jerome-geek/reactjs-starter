import { Routes, Route } from 'react-router-dom';

import GuestLogin from 'pages/Guest/GuestLogin';
import GuestOrderDetail from 'pages/Guest/GuestOrderDetail';
import NotFound from 'pages/NotFound';
import PATHS from 'const/paths';

const GuestRouter = () => {
    return (
        <Routes>
            <Route path={PATHS.GUEST_LOGIN} element={<GuestLogin />} />
            <Route
                path={`${PATHS.GUEST_ORDER_DETAIL}/:guestOrderNo`}
                element={<GuestOrderDetail />}
            />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default GuestRouter;
