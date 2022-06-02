import { AxiosResponse } from 'axios';

import request from 'api/core';
import { OAuthBegin } from 'models/order';
import { getPlatform } from 'utils';

const OAuthCallback = {
    openLoginPage: ({
        clientId,
        provider,
        nextUrl,
        platform,
        state,
    }: Omit<OAuthBegin, 'code'>): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/oauth/begin',
            params: {
                clientId,
                provider,
                nextUrl,
                platform,
                state,
            },
            headers: {},
        }),

    issueOpenIdAccessToken: ({
        clientId,
        provider,
        code,
        state,
        nextUrl,
    }: Omit<OAuthBegin, 'platform'>): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/oauth/callback',
            params: { clientId, provider, code, state, nextUrl },
            headers: {},
        }),
};

export default OAuthCallback;
