import { AxiosResponse } from 'axios';

import request from 'api/core';
import { AddressParams } from 'models/manage';

const address = {
    searchAddress: ({
        pageNumber,
        pageSize,
        keyword,
    }: AddressParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/addresses/search',
            params: { pageNumber, pageSize, keyword },
        }),
};

export default address;
