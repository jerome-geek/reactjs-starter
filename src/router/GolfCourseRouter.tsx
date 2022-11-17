import { Routes, Route } from 'react-router-dom';

import GolfCourseDetail from 'pages/GolfCourse/GolfCourseDetail';
import GolfCourseList from 'pages/GolfCourse/GolfCourseList';
import GolfCourseLayout from 'pages/GolfCourse/Layout';
import GolfCourseRequest from 'pages/GolfCourse/Request';
import GolfCourseResult from 'pages/GolfCourse/Result';
import NotFound from 'pages/NotFound';

const GolfCourseRouter = () => (
    <Routes>
        <Route path='list' element={<GolfCourseList />} />
        <Route path='detail/:productNo' element={<GolfCourseDetail />} />
        <Route path='request' element={<GolfCourseLayout />}>
            {/* 골프코스 요청하기 */}
            <Route path='main' element={<GolfCourseRequest />} />
            {/* 골프코스 요청결과 */}
            <Route path='result' element={<GolfCourseResult />} />
        </Route>
        <Route path='*' element={<NotFound />} />
    </Routes>
);

export default GolfCourseRouter;
