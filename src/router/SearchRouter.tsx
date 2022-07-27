import { Routes, Route } from 'react-router-dom';

import Search from 'pages/Search';

const SearchRouter = () => (
    <Routes>
        <Route path='/:query' element={<Search />} />
    </Routes>
);

export default SearchRouter;
