import { Route, Routes } from 'react-router-dom';

import ManualDetail from 'pages/Manual/ManualDetail';
import ManualList from 'pages/Manual/ManualList';
import NotFound from 'pages/NotFound';

const ManualRouter = () => (
    <Routes>
        <Route path='list' element={<ManualList />} />
        <Route path='detail/:productNo' element={<ManualDetail />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
);

export default ManualRouter;
