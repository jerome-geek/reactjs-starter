import { AUTH_TYPE, OPEN_ID_TERM, SEX, TERM } from 'models';

export interface ProfileBody {
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
    countryCd: string;
    groupNo: number;
    memberId: string;
}

export interface AddressBody {
    zipCd: string;
    streetAddress: string;
    streetAddressDetail: string;
    jibunAddress: string;
    jibunAddressDetail: string;
}

export interface PasswordBody {
    currentPassword: string;
    newPassword: string;
    willChangeNextTime: boolean;
}

export interface DormancyBody {
    certificationNumber: string;
    mobileNo: string;
    authType: AUTH_TYPE;
    email: string;
}

export interface FindIdBody {
    findMethod: AUTH_TYPE;
    certificationNo?: string;
    memberName?: string;
    mobileNo: string;
    key: string;
    email: string;
}

export interface FindPasswordBody {
    memberId: string;
    uri: string;
    content?: string;
    authType: string;
    inputType: string;
    receiveType: string;
}

export interface FindIdByCertificationParams {
    companyNo?: number;
    memberName?: string;
    mobileNo?: string;
    email?: string;
    ci?: string;
    certificationNumber?: string;
}

export interface UpdateProfileIdBody {
    updatesEmail: boolean;
    currentMemberId: string;
    newMemberId: string;
    certificationNumber: string;
}

export interface SignUpByOpenIdBody {
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

export interface DuplicateMemberParams {
    memberId: string;
    memberName: string;
    email: string;
    mobileNo: string;
}

export interface UpdatePasswordParams {
    newPassword: string;
    memberId: string;
    key: string;
    certificationNumber: string;
}
