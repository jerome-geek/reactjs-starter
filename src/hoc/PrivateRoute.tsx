import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTypedSelector } from 'state/reducers';
import paths from 'const/paths';
import { isEmptyObject } from 'utils';

/*
 예)  option: null -> 누구나 출입이 가능한 페이지 (home)
             true -> 로그인한 유저만 출입이 가능한 페이지
             false -> 로그인한 유저는 출입이 불가능한 페이지
*/
const PrivateRoute = ({
    children,
    option = null,
}: {
    children: JSX.Element;
    option?: Nullable<boolean>;
}) => {
    const location = useLocation();

    const { member } = useTypedSelector(({ member }) => ({
        member,
    }));

    const navigate = useNavigate();

    useLayoutEffect(() => {
        // TODO: 로그인됐을때는?
        if (isEmptyObject(member)) {
            option
                ? navigate(paths.LOGIN, { state: { from: location } })
                : navigate(paths.MAIN);
        }
    }, [location, navigate, option, member]);

    return children;
};

export default PrivateRoute;
