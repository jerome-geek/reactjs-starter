import { useNavigate } from 'react-router-dom';
import { shallowEqual } from 'react-redux';

import { useAppDispatch, useTypedSelector } from 'state/reducers';
import { reset } from 'state/slices/memberSlice';
import { tokenStorage } from 'utils/storage';
import { authentication } from 'api/auth';
import PATHS from 'const/paths';

const useMember = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const onLoginClick = () => navigate(PATHS.LOGIN);

    const onLogOutClick = async () => {
        try {
            await authentication.deleteAccessToken();
            tokenStorage.clear();
            dispatch(reset());
        } catch (error) {
            // TODO: ERROR 처리 필요
        }
        window.location.href = '/';
    };

    return { member, onLoginClick, onLogOutClick };
};

export default useMember;
