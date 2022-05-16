import { AxiosResponse } from 'axios';

import request from 'api/core';

interface AddressParams {
    pageNumber?: number;
    pageSize?: number;
    keyword: string;
}

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
