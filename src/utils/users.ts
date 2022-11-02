import { isBoolean } from '@fxts/core';

import { tokenStorage } from 'utils/storage';

const isLogin = () => {
    const accessToken = tokenStorage.getAccessToken();

    return isBoolean(
        accessToken?.accessToken && accessToken?.expiry > new Date().getTime(),
    );
};

export { isLogin };
