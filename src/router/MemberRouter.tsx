import { Routes, Route } from 'react-router-dom';

import Login from 'pages/Member/Login';
import FindId from 'pages/Member/FindId';
import FindPassword from 'pages/Member/FindPassword';
import Join from 'pages/Member/Join';
import JoinAgreement from 'pages/Member/JoinAgreement';
import JoinCompleted from 'pages/Member/JoinCompleted';
import NotFound from 'pages/NotFound';

const MemberRouter = () => {
    return (
        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='find-id' element={<FindId />} />
            <Route path='find-password' element={<FindPassword />} />
            <Route path='join-agreement' element={<JoinAgreement />} />
            <Route path='join' element={<Join />} />
            <Route path='join-completed' element={<JoinCompleted />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default MemberRouter;
