import { AxiosResponse } from 'axios';

import request from 'api/core';

interface AddressParams {
    pageNumber?: Number;
    pageSize?: Number;
    keyword: String;
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
