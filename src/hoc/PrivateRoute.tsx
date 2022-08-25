import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useMember } from 'hooks';
import paths from 'const/paths';

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
    const navigate = useNavigate();

    const { member } = useMember();

    useEffect(() => {
        if (!member && option) {
            navigate(paths.LOGIN, { state: { from: location } });
        }

        if (member && !option) {
            navigate(paths.MAIN);
        }
    }, [location, navigate, option, member]);

    return children;
};

export default PrivateRoute;
