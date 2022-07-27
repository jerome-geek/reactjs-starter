import { Routes, Route } from 'react-router-dom';

import Search from 'pages/Search';
import NotFound from 'pages/NotFound';

const SearchRouter = () => (
    <Routes>
        <Route path='' element={<Search />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
);

export default SearchRouter;
