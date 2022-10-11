import {
    AUTH_TYPE,
    OPEN_ID_TERM,
    SEX,
    SHOPBY_TERMS_TYPES,
    VC_TERMS_TYPES,
} from 'models';

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
    joinTermsAgreements?: SHOPBY_TERMS_TYPES | VC_TERMS_TYPES[]; // TODO: 회원가입 API 분리시 타입 재정의 필요
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
    countryCd?: string;
    groupNo?: number;
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
export interface ProfileResponse {
    mallName: string;
    memberNo: number;
    memberGradeName: string;
    memberGroupNames: string;
    memberGroups: MemberGroup[];
    memberName: string;
    memberId: string;
    mobileNo: string;
    telephoneNo: string;
    memberStatus: string;
    memberType: string;
    principalCertificated: boolean;
    certificationType: any;
    birthday: string;
    sex: string;
    email: string;
    zipCd: string;
    address: string;
    detailAddress: string;
    jibunAddress: string;
    jibunDetailAddress: string;
    nickname: string;
    joinTypeName: string;
    joinYmdt: string;
    lastLoginYmdt: string;
    lastLoginIp: string;
    loginCount: number;
    pushNotificationAgreed: boolean;
    pushNotificationAgreeYmdt: string;
    pushNotificationDisagreeYmdt: any;
    smsAgreed: boolean;
    smsAgreeYmdt: string;
    smsDisagreeYmdt: any;
    directMailAgreed: boolean;
    directMailAgreeYmdt: string;
    directMailDisagreeYmdt: any;
    countryCd: string;
    oauthIdNo: string;
    additionalInfo: string;
    adultCertificated: boolean;
    adultCertificatedYmdt: string;
    refundBank: string;
    refundBankAccount: string;
    refundBankDepositorName: string;
    agreedTerms: string[];
    agreedTermsInfos: AgreedTermsInfo[];
    providerType: string;
    providerTypes: string[];
    businessName: any;
    registrationNo: any;
}

export interface MemberGroup {
    memberGroupNo: number;
    memberGroupName: string;
    memberGroupDescription: string;
}

export interface AgreedTermsInfo {
    termsType: string;
    agreementYmdt: string;
}
