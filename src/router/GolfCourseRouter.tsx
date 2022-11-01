import { Routes, Route } from 'react-router-dom';

import GolfCourseDetail from 'pages/GolfCourse/GolfCourseDetail';
import GolfCourseList from 'pages/GolfCourse/GolfCourseList';
import GolfCourseRequest from 'pages/GolfCourse/GolfCourseRequest';
import NotFound from 'pages/NotFound';

const GolfCourseRouter = () => (
    <Routes>
        <Route path='list' element={<GolfCourseList />} />
        <Route path='detail/:productNo' element={<GolfCourseDetail />} />
        <Route path='request' element={<GolfCourseRequest />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
);

export default GolfCourseRouter;
