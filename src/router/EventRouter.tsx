import { Routes, Route } from 'react-router-dom';

import EventDetail from 'pages/Event/EventDetail';
import EventList from 'pages/Event/EventList';
import NotFound from 'pages/NotFound';

const EventRouter = () => {
    return (
        <Routes>
            <Route path='/list' element={<EventList />} />
            <Route path='/detail/:eventNo' element={<EventDetail />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default EventRouter;
