import { vcRequest } from 'api/core';
import { AxiosResponse } from 'axios';
import {
    VC_CLAUSE_CD,
    VC_CONFIRM_METHOD_CD,
    VC_MEMBER_ACCOUNT_CD,
    VC_MEMBER_CD,
    VC_MEMBER_STATUS_CD,
    VC_NATION_CD,
    VC_SERVICE_CD,
} from 'models';

interface MemberJoinBody {
    mbId: string;
    mbPassword: string;
    mbName: string;
    mbSexCd?: 'M' | 'F' | 'N';
    mbBirth: string;
    mbEmail?: string;
    mbHpNo: string;
    mbNationality: 'USA' | 'JPN' | 'KOR';
    mbSocialYn: 'Y' | 'N';
    mbAccountGbnCd: VC_MEMBER_ACCOUNT_CD;
    mbGbnCd: VC_MEMBER_CD;
    serviceGbnCd: VC_SERVICE_CD;
    joinIp?: string;
    mbTelNo?: string;
    mbZip?: string;
    mbAddr1?: string;
    mbAddr2?: string;
    mbEngName?: string;
    mbJpnName?: string;
    mbNickName?: string;
    mbHomePageUrl?: string;
    socialProvider?: string;
    socialIdentifier?: string;
    social_access_token?: string;
    apple_audience?: string;
    apple_client_id?: string;
    profileUrl?: string;
    photoUrl?: string;
    displayName?: string;
    clauseList: {
        clauseSeq: number;
        agreeYn: 'Y' | 'N';
    }[];
}

interface UpdateMemberBody {
    mbPassword?: string;
    mbName?: string;
    mbSexCd?: string;
    mbBirth?: string;
    mbEmail?: string;
    mbHpNo?: string;
    mbNationality?: string;
    mbGbnCd: VC_MEMBER_CD;
    mbTelNo?: string;
    mbZip?: string;
    mbAddr1?: string;
    mbAddr2?: string;
    mbEngName?: string;
    mbJpnName?: string;
    mbNickName?: string;
    mbHomePageUrl?: string;
}

interface FindPasswordParams {
    mbId: string;
    mbHpNo: string;
    nationCd: VC_NATION_CD;
    confirmMethodCd: VC_CONFIRM_METHOD_CD;
}

interface GetClausesParams {
    serviceGbnCd: VC_SERVICE_CD;
    nationCd: VC_NATION_CD;
}

interface JoinResponse extends MemberIntegrationResponse {
    access_token: string;
    expires_in: string;
    id_token: string;
    refresh_token: string;
    scope: string;
}

interface LoginResponse extends MemberIntegrationResponse {
    mbNo: number;
    mbId: string;
    mbName: string;
    mbEmail: string;
    mbHpNo: string;
    vc_uid: string;
    vse_uid: string;
    access_token: string;
    expires_in: string;
    id_token: string;
    refresh_token: string;
    scope: string;
}

interface Clause {
    clauseSeq: number;
    clauseGbnCd: VC_CLAUSE_CD;
    clauseGbnNm: string;
    clauseVersion: string;
    agreeYn: string;
    clauseContent: string;
    agreeMandatoryYn: 'Y' | 'N';
    clauseUrl: string;
    mandatoryTitle: string;
    mandatoryPurpose: string;
    mandatoryItem: string;
    mandatoryTerm: string;
}

interface GetMemberInfoResponse extends MemberIntegrationResponse {
    memberInfo: {
        mbNo: number;
        mbId: string;
        mbName: string;
        mbSexCd: 'M' | 'F' | 'N';
        mbBirth: string;
        mbEmail: string;
        mbHpNo: string;
        mbNationality: VC_NATION_CD;
        mbSocialYn: 'Y' | 'N';
        mbExistYn: 'Y' | 'N';
        mbAccountGbnCd: VC_MEMBER_ACCOUNT_CD;
        mbGbnCd: VC_MEMBER_CD;
        mbTelNo: string;
        mbZip: string;
        mbAddr1: string;
        mbAddr2: string;
        mbEngName: string;
        mbJpnName: string;
        mbNickName: string;
        mbHomePageUrl: string;
        vc_uid: string;
        vse_uid: string;
    };
    clauseList: Clause[];
    serviceList: {
        serviceGbnCd: VC_SERVICE_CD;
        serviceGbnNm: string;
        mbStatusCd: VC_MEMBER_STATUS_CD;
        mbStatusNm: string;
        mbClauseAgreeYn: 'Y' | 'N';
        restDate: string;
    }[];
}

interface GetClausesResponse extends MemberIntegrationResponse {
    clauseList: Clause[];
}

interface RefershTokenResponse extends MemberIntegrationResponse {
    access_token: string;
    expires_in: string;
    id_token: string;
    refresh_token: string;
    scope: string;
    vse_uid: string;
}

const BASE_URL = 'http://3.39.37.100:8080';

const member = {
    join: (body: MemberJoinBody): Promise<AxiosResponse<JoinResponse>> => {
        return vcRequest({
            method: 'POST',
            baseURL: BASE_URL,
            url: '/members/new-member',
            data: body,
        });
    },

    checkId: (params: {
        mbId: string;
    }): Promise<AxiosResponse<MemberIntegrationResponse>> => {
        return vcRequest({
            method: 'GET',
            baseURL: BASE_URL,
            url: '/members/id',
            params: { mbId: params.mbId },
        });
    },

    login: (body: {
        apple_audience?: string;
        apple_client_id?: string;
        email: string;
        password: string;
        provider?: string;
        social_access_token?: string;
        serviceGbnCd: VC_SERVICE_CD;
        mbLastLoginIp: string;
    }): Promise<AxiosResponse<LoginResponse>> => {
        return vcRequest({
            method: 'POST',
            baseURL: BASE_URL,
            url: '/token',
            data: body,
        });
    },

    getMemberInfo: (params: {
        serviceGbnCd: VC_SERVICE_CD;
    }): Promise<AxiosResponse<GetMemberInfoResponse>> => {
        return vcRequest({
            method: 'GET',
            baseURL: BASE_URL,
            url: '/members/info',
            data: params,
        });
    },

    /**
     * 회원정보 수정
     * - header 정보 내 Authorization 값을 참고하여 토큰 검증
     * - 토큰 검증 시 아이디(이메일) 추출
     * - 수정/삭제 된 내용만 처리함(변경되지 않는 Key 제외하고 요청, key 값이 ""일 경우 삭제로 간주)
     *
     * @param body
     * @returns
     */
    updateMemberInfo: (
        body: UpdateMemberBody,
    ): Promise<AxiosResponse<MemberIntegrationResponse>> => {
        return vcRequest({
            method: 'PUT',
            baseURL: BASE_URL,
            url: '/members/info',
            data: body,
        });
    },

    /**
     * 비밀번호 찾기
     *
     * @param params
     * @returns
     */
    findPassword: (
        params: FindPasswordParams,
    ): Promise<AxiosResponse<MemberIntegrationResponse>> => {
        return vcRequest({
            method: 'GET',
            baseURL: BASE_URL,
            url: '/members/pw',
            params,
        });
    },

    /**
     * 약관 조회
     *
     * @param params
     * @returns
     */
    getClauses: (
        params: GetClausesParams,
    ): Promise<AxiosResponse<GetClausesResponse>> => {
        return vcRequest({
            method: 'GET',
            baseURL: BASE_URL,
            url: '/members/info',
            params,
        });
    },

    /**
     * 비밀번호 변경
     *
     * @param body
     * @returns
     */
    updatePassword: (body: {
        oldPassword: string;
        newPassword: string;
    }): Promise<AxiosResponse<MemberIntegrationResponse>> => {
        return vcRequest({
            method: 'PUT',
            baseURL: BASE_URL,
            url: '/members/pw',
            data: body,
        });
    },

    /**
     * 서비스 가입 & 탈퇴
     *
     * @param body
     * @returns
     */
    changeService: (body: {
        socialProvider?: string;
        socialIdentifier?: string;
        socialAccessToken?: string;
        client_id?: string;
        client_secret?: string;
        facebook_uid?: string;
        serviceList: {
            serviceGbnCd: VC_SERVICE_CD;
            mbStatusCd: VC_MEMBER_STATUS_CD;
        }[];
    }): Promise<AxiosResponse<MemberIntegrationResponse>> => {
        return vcRequest({
            method: 'POST',
            baseURL: BASE_URL,
            url: '/service',
            data: body,
        });
    },

    refreshToken: (
        body: RefershTokenResponse,
    ): Promise<AxiosResponse<MemberIntegrationResponse>> => {
        return vcRequest({
            method: 'POST',
            baseURL: BASE_URL,
            url: '/token/refresh',
            data: body,
        });
    },
};

export default member;
