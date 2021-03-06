import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { AUTH_TYPE } from 'models';
import {
    AddressBody,
    DormancyBody,
    DuplicateMemberParams,
    FindIdBody,
    FindIdByCertificationParams,
    FindPasswordBody,
    PasswordBody,
    ProfileBody,
    SignUpByOpenIdBody,
    UpdatePasswordParams,
    UpdateProfileIdBody,
} from 'models/member';
import { tokenStorage } from 'utils/storage';

const profile = {
    getProfile: (): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/profile',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    updateProfile: ({
        birthday,
        address,
        certificated,
        smsAgreed,
        sex,
        smsAuthKey,
        memberName,
        jibunAddress,
        zipCd,
        mobileNo,
        pushNotificationAgreed,
        refundBank,
        currentPassword,
        refundBankDepositorName,
        password,
        telephoneNo,
        directMailAgreed,
        joinTermsAgreements,
        additionalInfo,
        nickname,
        detailAddress,
        refundBankAccount,
        email,
        jibunDetailAddress,
    }: Omit<
        ProfileBody,
        | 'firstName'
        | 'lastName'
        | 'openIdAccessToken'
        | 'ci'
        | 'recommenderId'
        | 'countryCd'
        | 'groupNo'
        | 'memberId'
    >): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/profile',
            data: {
                birthday,
                address,
                certificated,
                smsAgreed,
                sex,
                smsAuthKey,
                memberName,
                jibunAddress,
                zipCd,
                mobileNo,
                pushNotificationAgreed,
                refundBank,
                currentPassword,
                refundBankDepositorName,
                password,
                telephoneNo,
                directMailAgreed,
                joinTermsAgreements,
                additionalInfo,
                nickname,
                detailAddress,
                refundBankAccount,
                email,
                jibunDetailAddress,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 400 error "API ?????? ?????? ??????."
    createProfile: ({
        birthday,
        address,
        certificated,
        smsAgreed,
        sex,
        memberName,
        jibunAddress,
        zipCd,
        mobileNo,
        pushNotificationAgreed,
        password,
        telephoneNo,
        directMailAgreed,
        joinTermsAgreements,
        nickname,
        detailAddress,
        email,
        jibunDetailAddress,
        firstName,
        lastName,
        openIdAccessToken,
        ci,
        recommenderId,
        countryCd,
        groupNo,
        memberId,
    }: Omit<
        ProfileBody,
        | 'currentPassword'
        | 'refundBankDepositorName'
        | 'refundBank'
        | 'refundBankAccount'
        | 'additionalInfo'
        | 'smsAuthKey'
    >): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/profile',
            data: {
                birthday,
                address,
                certificated,
                smsAgreed,
                sex,
                memberName,
                jibunAddress,
                zipCd,
                mobileNo,
                pushNotificationAgreed,
                password,
                telephoneNo,
                directMailAgreed,
                joinTermsAgreements,
                nickname,
                detailAddress,
                email,
                jibunDetailAddress,
                firstName,
                lastName,
                openIdAccessToken,
                ci,
                recommenderId,
                countryCd,
                groupNo,
                memberId,
            },
        }),

    deleteProfile: ({ reason }: { reason?: string }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile',
            params: { reason },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    updateProfileAddress: ({
        zipCd,
        streetAddress,
        streetAddressDetail,
        jibunAddress,
        jibunAddressDetail,
    }: AddressBody): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/profile/address',
            data: {
                zipCd,
                streetAddress,
                streetAddressDetail,
                jibunAddress,
                jibunAddressDetail,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO certificationNumber, key ?????? 400 error
    updatePasswordByCertificationNo: ({
        findMethod,
        certificationNumber,
        newPassword,
        key,
        memberId,
    }: UpdatePasswordParams & {
        findMethod: AUTH_TYPE;
    }): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/profile/change-password-after-cert',
            data: {
                findMethod,
                certificationNumber,
                newPassword,
                key,
                memberId,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 400 error
    checkPassword: ({
        password,
    }: Pick<ProfileBody, 'password'>): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/profile/check-password',
            data: { password },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO ?????? ????????? ????????? ?????? ?????? message: "????????? ???????????? ?????? ????????????."
    getDormantAccount: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/dormancy',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO ?????? ????????? ????????? ?????? ?????? message: "????????? ???????????? ?????? ????????????."
    releaseDormancyAccount: ({
        certificationNumber,
        mobileNo,
        authType,
        email,
    }: DormancyBody): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/profile/dormancy',
            data: {
                certificationNumber,
                mobileNo,
                authType,
                email,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO ??????????????? ?????? ?????????????????? ???????????? 400 error ??? message: ??????????????? ???????????? ????????????. ?????? ??????
    withDrawByPassword: ({
        reason,
        password,
    }: {
        reason?: string;
        password?: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/profile/expel',
            data: {
                reason,
                password,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 200??? ????????? data??? ??? ????????? ???
    findId: ({
        findMethod,
        certificationNo,
        memberName,
        mobileNo,
        key,
        email,
    }: FindIdBody): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/profile/find-id',
            data: {
                findMethod,
                certificationNo,
                memberName,
                mobileNo,
                key,
                email,
            },
        }),

    // TODO 400 error  ?????? ????????? ???????????? ????????????
    findPassword: ({
        memberId,
        uri,
        content,
        authType,
        inputType,
        receiveType,
    }: FindPasswordBody): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/profile/find-password',
            data: {
                memberId,
                uri,
                content,
                authType,
                inputType,
                receiveType,
            },
        }),

    getGrade: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/grade',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO certificationNumber ??????
    findIdByCertification: ({
        companyNo,
        memberName,
        mobileNo,
        email,
        ci,
        certificationNumber,
    }: FindIdByCertificationParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/id',
            params: {
                companyNo,
                memberName,
                mobileNo,
                email,
                ci,
                certificationNumber,
            },
        }),

    // TODO certificationNumber ??????
    updateId: ({
        updatesEmail,
        currentMemberId,
        newMemberId,
        certificationNumber,
    }: UpdateProfileIdBody): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/profile/id',
            data: {
                updatesEmail,
                currentMemberId,
                newMemberId,
                certificationNumber,
            },
        }),

    getLeakageStatus: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/leakage',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 400 error message: ??????????????? ???????????? ????????????.
    getNonMaskingMember: ({
        password,
    }: Pick<ProfileBody, 'password'>): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/profile/non-masking',
            data: { password },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO certificated ??????
    signUpByOpenId: ({
        birthday,
        address,
        certificated,
        smsAgreed,
        sex,
        jibunAddress,
        memberName,
        zipCd,
        mobileNo,
        pushNotificationAgreed,
        telephoneNoo,
        joinTermsAgreements,
        directMailAgreed,
        nickname,
        detailAddress,
        email,
        jibunDetailAddress,
    }: SignUpByOpenIdBody): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/profile/openid',
            data: {
                birthday,
                address,
                certificated,
                smsAgreed,
                sex,
                jibunAddress,
                memberName,
                zipCd,
                mobileNo,
                pushNotificationAgreed,
                telephoneNoo,
                joinTermsAgreements,
                directMailAgreed,
                nickname,
                detailAddress,
                email,
                jibunDetailAddress,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 400 error message: ??????????????? ??????????????????.
    updatePassword: ({
        currentPassword,
        newPassword,
        willChangeNextTime,
    }: PasswordBody): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/profile/password',
            data: {
                currentPassword,
                newPassword,
                willChangeNextTime,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO key ??????
    updateProfileByCertification: ({
        key,
    }: {
        key: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/profile/rename',
            data: { key },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO CI ?????? 400 error message: ???????????? [ci] ??? ?????????????????????.
    checkDuplicateCI: ({ ci }: { ci: string }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/ci/exists',
            params: { ci },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    checkDuplicateEmail: ({
        email,
    }: {
        email: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/email/exist',
            params: { email },
        }),

    sendUpdateIdEmail: ({ url }: { url: string }): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/profile/id/email',
            data: { url },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    checkDuplicateId: ({
        memberId,
    }: {
        memberId: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/id/exist',
            params: { memberId },
        }),

    checkDuplicateMobileNo: ({
        mobileNo,
    }: {
        mobileNo: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/mobile/exist',
            params: { mobileNo },
        }),

    checkDuplicateNickname: ({
        nickname,
    }: {
        nickname: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/nickname/exist',
            params: { nickname },
        }),

    // TODO 400 error message: ?????? ????????? ???????????? ????????????.
    getMaskingAccountInfo: ({
        memberId,
    }: {
        memberId: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/password/search-account',
            params: { memberId },
        }),

    // TODO ?????? memberId ??? data ?????? param?????? ?????? ???????????? test ??????
    sendUpdatePasswordEmail: ({
        memberId,
        content,
        url,
    }: Pick<FindPasswordBody, 'memberId' | 'content'> & {
        url: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/profile/password/sending-email-with-url',
            data: {
                memberId,
                content,
                url,
            },
        }),

    checkDuplicateMemberByEmail: ({
        memberId,
        memberName,
        email,
    }: Omit<DuplicateMemberParams, 'mobileNo'>): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/member/equals/with-email',
            params: { memberId, memberName, email },
        }),

    checkDuplicateMemberByMobile: ({
        memberId,
        memberName,
        mobileNo,
    }: Omit<DuplicateMemberParams, 'email'>): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/member/equals/with-mobile',
            params: { memberId, memberName, mobileNo },
        }),

    // TODO key ??? ??????
    updatePasswordByCertificationKey: ({
        newPassword,
        key,
    }: Omit<
        UpdatePasswordParams,
        'certificationNumber' | 'memberId'
    >): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/profile/password/no-authentication/after-certification',
            data: { newPassword, key },
        }),

    updatePasswordByEmailCertification: ({
        certificationNumber,
        memberId,
        newPassword,
    }: Omit<UpdatePasswordParams, 'key'>): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/profile/password/no-authentication/certificated-by-email',
            data: { certificationNumber, memberId, newPassword },
        }),

    updatePasswordBySMSCertification: ({
        certificationNumber,
        memberId,
        newPassword,
    }: Omit<UpdatePasswordParams, 'key'>): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/profile/password/no-authentication/certificated-by-sms',
            data: { certificationNumber, memberId, newPassword },
        }),
};

export default profile;
