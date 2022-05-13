import { Axios, AxiosResponse } from 'axios';

import request from 'api/core';
import { defaultHeaders } from 'api/core';

export enum SEX {
    MALE = 'M',
    FEMALE = 'F',
}

export enum TERM {
    PI_COLLECTION_AND_USE_OPTIONAL = 'PI_COLLECTION_AND_USE_OPTIONAL',
    PI_PROCESS_CONSIGNMENT = 'PI_PROCESS_CONSIGNMENT',
    PI_THIRD_PARTY_PROVISION = 'PI_THIRD_PARTY_PROVISION',
}

export enum OPEN_ID_TERM {
    PERSONAL_PROCESS_CONSIGNMENT = 'PERSONAL_PROCESS_CONSIGNMENT',
    PERSONAL_THIRD_PARTY_PROVISION = 'PERSONAL_THIRD_PARTY_PROVISION',
}

export enum AUTH_TYPE {
    NONE = 'NONE',
    SMS = 'SMS',
    EMAIL = 'EMAIL',
}

interface ProfileBody {
    birthday?: string;
    address?: string;
    certificated?: boolean;
    smsAgreed?: boolean;
    sex?: SEX;
    smsAuthKey?: string;
    memberName?: string;
    jibunAddress?: string;
    zipCd?: string;
    mobileNo?: string;
    pushNotificationAgreed?: boolean;
    refundBank?: string;
    currentPassword: string;
    refundBankDepositorName?: string;
    password?: string;
    telephoneNo?: string;
    directMailAgreed?: boolean;
    joinTermsAgreements?: TERM[];
    additionalInfo?: string;
    nickname?: string;
    detailAddress?: string;
    refundBankAccount?: string;
    email?: string;
    jibunDetailAddress?: string;
    firstName?: string;
    lastName?: string;
    openIdAccessToken?: string;
    ci?: string;
    recommenderId?: string;
}

interface AddressBody {
    zipCd: string;
    streetAddress: string;
    streetAddressDetail: string;
    jibunAddress: string;
    jibunAddressDetail: string;
}

interface PasswordBody {
    currentPassword: string;
    newPassword: string;
    willChangeNextTime: boolean;
}

interface DormancyBody {
    certificationNumber: string;
    mobileNo: string;
    authType: AUTH_TYPE;
    email: string;
}

interface FindIdBody {
    findMethod: AUTH_TYPE;
    certificationNo?: string;
    memberName?: string;
    mobileNo: string;
    key: string;
    email: string;
}

interface FindPasswordBody {
    memberId: string;
    uri: string;
    content?: string;
    authType: string;
    inputType: string;
    receiveType: string;
}

interface FindIdByCertificationParams {
    companyNo?: number;
    memberName?: string;
    mobileNo?: string;
    email?: string;
    ci?: string;
    certificationNumber?: string;
}

interface UpdateProfileIdBody {
    updatesEmail: boolean;
    currentMemberId: string;
    newMemberId: string;
    certificationNumber: string;
}

interface SignUpByOpenIdBody {
    birthday?: string;
    address?: string;
    certificated?: boolean;
    smsAgreed?: boolean;
    sex?: string;
    jibunAddress?: string;
    memberName?: string;
    zipCd?: number;
    mobileNo?: string;
    pushNotificationAgreed?: boolean;
    telephoneNoo?: string;
    joinTermsAgreements?: OPEN_ID_TERM;
    directMailAgreed?: boolean;
    nickname?: string;
    detailAddress?: string;
    email?: string;
    jibunDetailAddress?: string;
}

interface DuplicateMemberParams {
    memberId: string;
    memberName: string;
    email: string;
    mobileNo: string;
}

interface UpdatePasswordParams {
    newPassword: string;
    memberId: string;
    key: string;
    certificationNumber: string;
}

const profile = {
    getProfile: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

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
        'firstName' | 'lastName' | 'openIdAccessToken' | 'ci' | 'recommenderId'
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

    // TODO 400 error "API 호출 중복 오류."
    createProfile: ({
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
        firstName,
        lastName,
        openIdAccessToken,
        ci,
        recommenderId,
    }: Omit<
        ProfileBody,
        'currentPassword' | 'refundBankDepositorName' | 'refundBank'
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
                smsAuthKey,
                memberName,
                jibunAddress,
                zipCd,
                mobileNo,
                pushNotificationAgreed,
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
                firstName,
                lastName,
                openIdAccessToken,
                ci,
                recommenderId,
            },
        }),

    deleteProfile: (reason?: string): Promise<AxiosResponse> =>
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

    // TODO certificationNumber, key 모름 400 error
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

    // TODO 휴면 회원이 아니라 확인 불가 message: "회원의 상태값을 확인 바랍니다."
    getDormancyAccount: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/dormancy',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 휴면 회원이 아니라 확인 불가 message: "회원의 상태값을 확인 바랍니다."
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

    // TODO 비밀번호를 맞게 입력했음에도 불구하고 400 error 와 message: 비밀번호가 올바르지 않습니다. 라고 나옴
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

    // TODO 200은 뜨지만 data가 빈 배열로 옴
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

    // TODO 400 error  해당 회원이 존재하지 않습니다
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

    // TODO certificationNumber 모름
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

    // TODO certificationNumber 모름
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

    getLeakageWhether: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/leakage',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO 400 error message: 비밀번호가 일치하지 않습니다.
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

    // TODO certificated 모름
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

    // TODO 400 error message: 비밀번호를 입력해주세요.
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

    // TODO key 모름
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

    // TODO CI 모름 400 error message: 파라미터 [ci] 이 누락되었습니다.
    checkDuplicateCI: ({ CI }: { CI: string }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/ci/exists',
            params: { CI },
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

    // TODO 400 error message: 해당 회원이 존재하지 않습니다.
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

    // TODO 이하 memberId 를 data 혹은 param으로 받는 함수들은 test 필요
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

    // TODO key 값 모름
    updatePasswordAfterCertification: ({
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

    updatePasswordAfterEmailCertification: ({
        certificationNumber,
        memberId,
        newPassword,
    }: Omit<UpdatePasswordParams, 'key'>): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/profile/password/no-authentication/certificated-by-email',
            data: { certificationNumber, memberId, newPassword },
        }),

    updatePasswordAfterSMSCertification: ({
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
