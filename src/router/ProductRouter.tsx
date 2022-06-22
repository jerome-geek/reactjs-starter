import { Route, Routes } from 'react-router-dom';

import ProductList from 'pages/Product/ProductList';
import ProductDetail from 'pages/Product/ProductDetail';
import NotFound from 'pages/NotFound';

const ProductRouter = () => (
    <Routes>
        <Route path='product/list' element={<ProductList />} />
        <Route path='product/detail:/productNo' element={<ProductDetail />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
);

export default ProductRouter;
