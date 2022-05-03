import { AxiosResponse } from 'axios';

import request from 'api/core';

const mall = {
    getMall: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/malls' }),
    getMallPartners: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/malls/partners' }),
    getSslInfo: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/malls/ssl' }),
};

export default mall;
