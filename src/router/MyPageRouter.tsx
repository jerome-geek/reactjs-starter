import { Route, Routes } from 'react-router-dom';

import MyPageIndex from 'pages/MyPage/Index';
import OrderList from 'pages/MyPage/OrderList';
import OrderDetail from 'pages/MyPage/OrderDetail';
import Products from 'pages/MyPage/Products';
import NotFound from 'pages/NotFound';

const MyPageRouter = () => (
    <Routes>
        <Route path='index' element={<MyPageIndex />} />
        <Route path='order/list' element={<OrderList />} />
        <Route path='order/detail/:orderNo' element={<OrderDetail />} />
        <Route path='products' element={<Products />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
);

export default MyPageRouter;
