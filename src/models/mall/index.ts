import { MultiLevelCategory } from 'models/display';

export interface Url {
    pc: string;
    mobile: string;
    android: string;
    ios: string;
}

export interface EvaluationCondition {
    minimumCount: number;
    minimumPayment: number;
}

export interface ReserveAutoSupplying {
    used: boolean;
    amount: number;
    type: string;
}

export interface ReserveBenefit {
    used: boolean;
    reserveRate: number;
}

export interface Grade {
    used: boolean;
    label: string;
    description: string;
    evaluationCondition: EvaluationCondition;
    reserveAutoSupplying: ReserveAutoSupplying;
    reserveBenefit: ReserveBenefit;
    coupons: any[];
    pointRate: number;
    gradeDescription: string;
    accumulationRate: number;
    minOrderCnt: number;
    minOrderAmt: number;
}

export interface ServiceCenter {
    email: string;
    phoneNo: string;
}

export interface IntroRedirection {
    pc: string;
    mobile: string;
}

export interface Mall {
    mallName: string;
    url: Url;
    grades: Grade[];
    serviceCenter: ServiceCenter;
    countryCode: string;
    introRedirection: IntroRedirection;
    godoSno?: any;
    createdDateTime: string;
    escrowLogo?: any;
}

export interface ProductInquiryType {
    label: string;
    value: string;
}

export interface ProductReviewReportType {
    label: string;
    value: string;
}

export interface ClaimReasonType {
    label: string;
    value: string;
}

export interface ClaimStatusType {
    label: string;
    value: string;
}

export interface OrderStatusType {
    label: string;
    value: string;
}

export interface BankType {
    value: string;
    name: string;
    code: string;
    kcpCode: string;
}

export interface Categories {
    multiLevelCategories: MultiLevelCategory[];
    flatCategories: any[];
}

export interface Category {
    categoryNo: number;
    label: string;
}

export interface BoardsCategory {
    boardNo: number;
    boardId?: any;
    boardName: string;
    categories: Category[];
    memberWrite: boolean;
    guestWrite: boolean;
    secreted: boolean;
    replied: boolean;
    used: boolean;
    thumbnailUsed: boolean;
    categoryUsed: boolean;
    displayType: string;
    imageDisplayType: string;
    attachmentUsed: boolean;
}

export interface ServiceBasicInfo {
    companyName: string;
    businessRegistrationNo: string;
    representativeName: string;
    businessType: string;
    businessCondition: string;
    representPhoneNo: string;
    representEmail: string;
    faxNo: string;
    onlineMarketingBusinessDeclarationNo: string;
    zipCd: string;
    address: string;
    addressDetail: string;
    jibunAddress: string;
    jibunAddressDetail: string;
    privacyManagerName: string;
    privacyManagerPhoneNo: string;
    plan: string;
}

export interface BankAccountInfo {
    bankName: string;
    bankAccount: string;
    bankDepositorName: string;
}

export interface BankAccountInfo2 {
    bankName: string;
    bankAccount: string;
    bankDepositorName: string;
}

export interface MemberJoinConfig {
    memberId: string;
    birthday: string;
    password: string;
    sex: string;
    memberName: string;
    email: string;
    nickname: string;
    address: string;
    phoneNo: string;
    mobileNo: string;
    nationality: string;
}

export interface ReviewsAccumulationDetail {
    reviewsLength: number;
    reviewsAccumulation: number;
    photoReviewsLength: number;
    photoReviewsAccumulation: number;
}

export interface AccumulationConfig {
    useProductAccumulation: boolean;
    useMemberAccumulation: boolean;
    accumulationRate: number;
    accumulationName: string;
    accumulationDisplayFormatType: string;
    accumulationUnit: string;
    accumulationGivePoint: string;
    accumulationValidPeriod: number;
    useExpireNotification: boolean;
    expireNotificationPoint: number;
    productAccumulationBasisType: string;
    useSignUpAccumulation: boolean;
    signUpAccumulation: number;
    useReviewsAccumulation: boolean;
    reviewsAccumulationDetail: ReviewsAccumulationDetail;
    limitMinProductPrice: boolean;
    accumulationUseMinProductPrice: number;
    limitMinPrice: boolean;
    accumulationUseMinPrice: number;
    limitMaxRate: boolean;
    accumulationUseMaxRate: number;
    excludingReservePayAccumulation: boolean;
    excludingReservePayCoupon: boolean;
    adminMemo: string;
}

export interface CartConfig {
    cartEquivalentOptionUnitType: string;
    storageMaxQuantity: number;
    storagePeriod: number;
    storagePeriodNoLimit: boolean;
}

export interface MallJoinConfig {
    authenticationType: string;
    authenticationTimeType: string;
}

export interface OpenIdJoinConfig {
    authenticationType: string;
    authenticationTimeType: string;
    providers: any[];
}

export interface TermsConfig {
    fairLogoUrl?: any;
    fairLogoUsed: boolean;
}

export interface MallResponse {
    mall: Mall;
    inquiryType: any[];
    productInquiryType: ProductInquiryType[];
    productReviewReportType: ProductReviewReportType[];
    claimReasonType: ClaimReasonType[];
    claimStatusType: ClaimStatusType[];
    orderStatusType: OrderStatusType[];
    bankType: BankType[];
    categories: Categories;
    boardsCategories: BoardsCategory[];
    serviceBasicInfo: ServiceBasicInfo;
    bankAccountInfo: BankAccountInfo;
    bankAccountInfos: BankAccountInfo2[];
    memberJoinConfig: MemberJoinConfig;
    accumulationConfig: AccumulationConfig;
    cartConfig: CartConfig;
    mallJoinConfig: MallJoinConfig;
    openIdJoinConfig: OpenIdJoinConfig;
    externalServiceConfig?: any;
    termsConfig: TermsConfig;
}
