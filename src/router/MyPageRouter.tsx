import { Route, Routes } from 'react-router-dom';

import MyPageIndex from 'pages/MyPage/Index';
import Info from 'pages/MyPage/Info';
import OrderList from 'pages/MyPage/OrderList';
import OrderDetail from 'pages/MyPage/OrderDetail';
import Products from 'pages/MyPage/Products';
import Coupons from 'pages/MyPage/Coupons';
import Accumulation from 'pages/MyPage/Accumulation';
import Password from 'pages/MyPage/Password';
import Withdrawal from 'pages/MyPage/Withdrawal';
import NotFound from 'pages/NotFound';
import Claim from 'pages/MyPage/Claim';
import RoundAnalysisLayout from 'pages/MyPage/RoundAnyalysis/Layout';
import RoundAnalysisMain from 'pages/MyPage/RoundAnyalysis/Main';
import RoundAnalysisInfo from 'pages/MyPage/RoundAnyalysis/Info';
import RoundAnalysisStatistics from 'pages/MyPage/RoundAnyalysis/Statistics';
import RoundAnalysisInfoDetail from 'pages/MyPage/RoundAnyalysis/InfoDetail';

const MyPageRouter = () => (
    <Routes>
        <Route path='index' element={<MyPageIndex />} />
        <Route path='info' element={<Info />} />
        <Route path='order/list' element={<OrderList />} />
        <Route path='order/detail/:orderNo' element={<OrderDetail />} />
        <Route path='products' element={<Products />} />
        <Route path='coupons' element={<Coupons />} />
        <Route path='accumulation' element={<Accumulation />} />
        <Route path='round-analysis' element={<RoundAnalysisLayout />}>
            <Route path='main' element={<RoundAnalysisMain />} />
            <Route path='info' element={<RoundAnalysisInfo />} />
            <Route path='info/:roundNo' element={<RoundAnalysisInfoDetail />} />
            <Route path='statistics' element={<RoundAnalysisStatistics />} />
        </Route>
        <Route path='password' element={<Password />} />
        <Route path='withdrawal' element={<Withdrawal />} />
        <Route path='claim/:type' element={<Claim />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
);

export default MyPageRouter;
