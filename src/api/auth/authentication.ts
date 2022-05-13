import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { getPlatform } from 'utils';

export enum AUTH_TYPE {
    SMS = 'SMS',
    EMAIL = 'EMAIL',
}

export enum CERTIFICATED_USAGE {
    FIND_ID = 'FIND_ID',
    FIND_PASSWORD = 'FIND_PASSWORD',
    CHANGE_MOBILE_NO = 'CHANGE_MOBILE_NO',
    RELEASE_DORMANT = 'RELEASE_DORMANT',
    ADMIN = 'ADMIN',
    JOIN = 'JOIN',
    JOIN_URI = 'JOIN_URI',
    CHANGE_ID = 'CHANGE_ID',
    ADMIN_SECONDARY = 'ADMIN_SECONDARY',
    CHANGE_EMAIL = 'CHANGE_EMAIL',
}

export enum PLATFORM_TYPE {
    PC = 'PC',
    MOBILE_WEB = 'MOBILE_WEB',
    AOS = 'AOS',
    IOS = 'IOS',
}

export enum OPEN_ID_PROVIDER {
    NCP_NAVER = 'ncp_naver',
    NCP_KAKAO = 'ncp_kakao',
    NCP_LINE = 'ncp_line',
    NCP_FACEBOOK = 'ncp_facebook',
    NCP_PAYCO = 'ncp_payco',
}

interface CertificatedNumber {
    type: AUTH_TYPE;
    usage: CERTIFICATED_USAGE;
    certificatedNumber: string;
    memberNo?: number;
    notiAccount?: string;
    memberName: string;
}

interface CheckBizmallBody {
    companyNo: number;
    name: string;
    idNo: string;
}

interface CertificatedNumberViaEmail<T> {
    usage: T;
    email: string;
    certificatedNumber: string;
    memberName: string;
    uri: string;
}

interface CertificatedNumberViaSMS<T> {
    usage: T;
    mobileNo: string;
    key: string;
    memberName: string;
}

interface OpenIdAccessToken {
    provider: OPEN_ID_PROVIDER;
    code: string;
    openAccessToken: string;
    redirectUri: string;
    state: string;
    platformType: PLATFORM_TYPE;
}

interface AccessTokenBody {
    memberId: string;
    password: string;
    keepLogin: Boolean;
    captcha?: string;
    provider?: string;
}

const authentication = {
    checkCertificatedNumber: ({
        type,
        usage,
        certificatedNumber,
        memberNo,
        notiAccount,
    }: Omit<CertificatedNumber, 'memberName'>): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/authentications',
            data: {
                type,
                usage,
                certificatedNumber,
                memberNo,
                notiAccount,
            },
        }),

    sendCertificatedNumber: ({
        type,
        usage,
        memberNo,
        notiAccount,
        memberName,
    }: Omit<
        CertificatedNumber,
        'certificatedNumber'
    >): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/authentications',
            data: {
                type,
                usage,
                memberNo,
                notiAccount,
                memberName,
            },
        }),

    checkBizmallAuth: ({
        companyNo,
        name,
        idNo,
    }: CheckBizmallBody): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/authentications/bizmall',
            data: { companyNo, name, idNo },
        }),

    checkCertificatedNumberViaEmail: ({
        usage,
        email,
        certificatedNumber,
    }: Omit<
        CertificatedNumberViaEmail<
            Omit<
                CERTIFICATED_USAGE,
                | 'CHANGE_MOBILE_NO'
                | 'ADMIN'
                | 'JOIN'
                | 'CHANGE_ID'
                | 'ADMIN_SECONDARY'
                | 'CHANGE_EMAIL'
            >
        >,
        'memberName' | 'uri'
    >): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/authentications/email',
            data: {
                usage,
                email,
                certificatedNumber,
            },
        }),

    sendCertificatedNumberViaEmail: ({
        usage,
        email,
        memberName,
        uri,
    }: Omit<
        CertificatedNumberViaEmail<CERTIFICATED_USAGE>,
        'certificatedNumber'
    >): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/authentications/email',
            data: { usage, email, memberName, uri },
        }),

    checkCertificatedNumberViaSMS: ({
        usage,
        mobileNo,
        key,
    }: Omit<
        CertificatedNumberViaSMS<
            Omit<
                CERTIFICATED_USAGE,
                | 'ADMIN'
                | 'JOIN_URI'
                | 'CHANGE_ID'
                | 'ADMIN_SECONDARY'
                | 'CHANGE_EMAIL'
            >
        >,
        'memberName'
    >): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/authentications/sms',
            data: { usage, mobileNo, key },
        }),

    sendCertificatedNumberViaSMS: ({
        usage,
        mobileNo,
        memberName,
    }: Omit<
        CertificatedNumberViaSMS<CERTIFICATED_USAGE>,
        'key'
    >): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/authentications/sms',
            data: {
                usage,
                mobileNo,
                memberName,
            },
        }),

    checkOpenIdLoginUrl: ({
        provider,
        redirectUri,
        state,
    }: Pick<
        OpenIdAccessToken,
        'provider' | 'redirectUri' | 'state'
    >): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/oauth/login-url',
            data: { provider, redirectUri, state },
        }),

    issueOpenIdAccessToken: ({
        provider,
        code,
        openAccessToken,
        redirectUri,
        state,
        platformType = getPlatform(),
    }: OpenIdAccessToken): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/oauth/openid',
            data: {
                provider,
                code,
                openAccessToken,
                redirectUri,
                state,
                platformType,
            },
        }),

    getAccessToken: ({
        memberId,
        password,
        keepLogin = false,
        provider,
    }: AccessTokenBody): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/oauth/token',
            data: { memberId, password, keepLogin, provider },
        }),

    deleteAccessToken: (): Promise<AxiosResponse> => {
        return request({
            method: 'DELETE',
            url: '/oauth/token',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        });
    },

    getOpenIdAccessToken: (): Promise<AxiosResponse> => {
        return request({
            method: 'GET',
            url: '/openid/token',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        });
    },
};

export default authentication;
