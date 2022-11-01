import { Navigate } from 'react-router-dom';

import { isLogin } from 'utils/users';
import PATHS from 'const/paths';

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
    if (!isLogin() && option) {
        return <Navigate to={PATHS.LOGIN} replace />;
    }

    if (isLogin() && !option) {
        return <Navigate to={PATHS.MAIN} replace />;
    }

    return children;
};

export default PrivateRoute;
