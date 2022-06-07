import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { profile } from 'api/member';
import { useTypedSelector } from 'state/reducers';
import { setProfile } from 'state/slices/memberSlice';
import { isEmptyObject } from 'utils';
import { useLocation } from 'react-router-dom';
import { shallowEqual } from 'react-redux';

const useMember = () => {
    // TODO: 1.멤버정보가 있는지 확인
    const { token, member } = useTypedSelector(({ token, member }) => ({
        token,
        member,
    }));

    // TODO: 토큰이 유효하면 회원정보를 받아온다(expiryTime으로 비교)
    const { data, isSuccess } = useQuery(
        'member',
        async () => await profile.getProfile(token.accessToken),
        {
            enabled: isEmptyObject(member),
            onError: () => {},
        },
    );

    const dispatch = useDispatch();
    useEffect(() => {
        if (isSuccess) {
            dispatch(setProfile(data.data));
        }
    }, [data?.data, isSuccess, dispatch]);

    return member;
};

export default useMember;
