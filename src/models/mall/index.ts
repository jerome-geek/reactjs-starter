import {
    ACCUMULATION_DISPLAY_FORMAT_TYPE,
    ACCUMULATION_GIVE_POINT,
    AUTHENTICATION_TIME_TYPE,
    AUTHENTICATION_TYPE,
    BOARD_DISPLAY_TYPE,
    COUNTRY_CD,
    IMAGE_DISPLAY_TYPE,
    INTRO_REDIRECTION_TYPE,
    ORDER_STATUS_TYPE,
    PRODUCT_ACCUMULATION_BASIS_TYPE,
} from 'models';
import { Category, MultiLevelCategory } from 'models/display';
import { InquiryType } from 'models/manage';

// 접속 URL
export interface Url {
    // PC 접속 URL (example: http://test.e-ncp.com)
    pc: string;
    // 안드로이드 마켓 URL (example: http://and.com/aa23)
    android: string;
    // 모바일웹 접속 URL (example: http://test.e-ncp.com)
    mobile: string;
    // 앱스토어 URL (example: http://ios.com/aa23)
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

// 서비스 센터 정보
export interface ServiceCenter {
    // 서비스센터 이메일 (example: test@test.com)
    email: string;
    // 서비스센터 전화번호 (example: 010-1111-1111)
    phoneNo: string;
}

// 인트로 페이지 설정정보
export interface IntroRedirection {
    // 인트로 페이지 PC 웹 설정정보 (example: ONLY_MEMBER)
    pc: INTRO_REDIRECTION_TYPE;
    // 인트로 페이지 모바일 웹 설정정보 (example: ONLY_ADULT)
    mobile: INTRO_REDIRECTION_TYPE;
}

// 쇼핑몰 정보
export interface Mall {
    // 커머스 상점번호 (example: 1234)
    godoSno: string;
    // 쇼핑몰명 (example: 테스트 쇼핑몰)
    mallName: string;
    // 인트로 페이지 설정정보
    introRedirection: IntroRedirection;
    // 쇼핑몰 서비스 국가 (example: KR)
    countryCode: COUNTRY_CD;
    // 쇼핑몰 생성일 (example: yyyy-MM-dd HH:mm:ss)
    createdDateTime: string;
    // 등급
    grades: Grade[];
    // 서비스센터 정보
    serviceCenter: ServiceCenter;
    escrowLogo: {
        // 로고 노출에 필요한 HTML 코드 (이니시스만 반환됨) (example: <div>LOGO</div>)
        logoHtml: string;
        // TODO: PG_TYPE 타입 확인 필요
        // PG사 (example: KCP)
        pgType: string;
        // 에스크로 이미지 노출여부 (example: true)
        exposure: boolean;
    };
    // 접속 URL
    url: Url;
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

// 주문상태 목록
export interface OrderStatusType {
    // TODO: 타입 타이핑 추가 필요
    // 주문상태 명칭 (입금대기)
    label: string;
    // 주문상태 값 (example: DEPOSIT_WAIT)
    value: ORDER_STATUS_TYPE;
}

// 은행 목록
export interface BankType {
    // TODO: 타입 타이핑 추가 필요
    // KCP 은행 관리코드 (example: 04)
    kcpCode: string;
    // TODO: 타입 타이핑 추가 필요
    // 은행 코드 (example: 004)
    code: string;
    // TODO: 타입 타이핑 추가 필요
    // 은행명 (example: 국민은행)
    name: string;
    // 은행 영문 관리명 (example: KB)
    value: string;
}

// 게시판 카테고리 정보
export interface BoardCategoryInfo {
    // 게시판 카테고리 번호 (example: 1)
    categoryNo: number;
    // 게시판 카테고리 명칭 (example: 질문)
    label: string;
}

export interface BoardsCategory {
    // 썸네일 이미지 사용 여부 (example: true)
    thumbnailUsed: boolean;
    // 답글 작성 가능 여부 (example: false)
    replied: boolean;
    // 회원 작성 가능 여부 (example: false)
    memberWrite: boolean;
    // 게시판 사용 여부 (example: true)
    used: boolean;
    // 비밀글 작성 가능 여부 (example: false)
    secreted: boolean;
    // 게시판 이름 (example: 자유게시판)
    boardName: string;
    // 비회원 작성 가능 여부 (example: false)
    guestWrite: boolean;
    // 리스트 이미지 유형 (example: NOT_USED)
    imageDisplayType: IMAGE_DISPLAY_TYPE;
    // 게시판 노출 유형 (example: LIST)
    displayType: BOARD_DISPLAY_TYPE;
    // 카테고리 사용 여부 (example: true)
    categoryUsed: boolean;
    // 첨부파일 사용 여부 (example: false)
    attachmentUsed: boolean;
    // 게시판 ID (example: freeboard)
    boardId: string;
    // 게시판 카테고리 정보
    categories: BoardCategoryInfo[];

    // 게시판 번호 (example: 1)
    boardNo: number;
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

// 쇼핑몰 계좌 정보
export interface BankAccountInfo {
    // 계좌번호 (example: 123456789)
    bankAccount: string;
    // 예금주명 (example: 커머스)
    bankDepositorName: string;
    // 은행명 (example: 우리은행)
    bankName: string;
}

// 회원 가입 설정
export interface MemberJoinConfig {
    // 생년월일 필수 여부 (example: NOT_USED)
    birthday: string;
    // 비밀번호 필수 여부 (example: NOT_USED)
    password: string;
    // 주소 필수 여부 (example: NOT_USED)
    address: string;
    // 국적 필수 여부 (example: NOT_USED)
    nationality: string;
    // 성별 필수 여부 (example: NOT_USED)
    sex: string;
    // 닉네임 필수 여부 (example: NOT_USED)
    nickname: string;
    // 회원명 필수 여부 (example: NOT_USED)
    memberName: string;
    // 휴대전화번호 필수 여부 (example: NOT_USED)
    mobileNo: string;
    // 전화번호 필수 여부 (example: NOT_USED)
    phoneNo: string;
    // 이메일 필수 여부 (example: NOT_USED)
    email: string;
    // 아이디 필수 여부 (example: NOT_USED)
    memberId: string;
}

// 상품평 적립금 상세정보
export interface ReviewsAccumulationDetail {
    // 포토 상품평 적립금 (example: 150)
    photoReviewsAccumulation: number;
    // 포토 상품평 글자수 (example: 10)
    photoReviewsLength: number;
    // 상품평 글자수 (example: 10)
    reviewsLength: number;
    // 상품평 적립금 (example: 100)
    reviewsAccumulation: number;
}

// 적립금 설정 정보
export interface AccumulationConfig {
    // 적립금 만료 알림 사용여부 (example: false)
    useExpireNotification: boolean;
    // 회원가입 적립금 사용여부 (example: false)
    useSignUpAccumulation: boolean;
    // 운영자 메모 (example: 적립금 지급)
    adminMemo: string;
    // 적립금 단위 (example: 포인트)
    accumulationUnit: string;
    // 적립금 지급 시점 (example: AFTER_A_WEEK)
    accumulationGivePoint: ACCUMULATION_GIVE_POINT;
    // 적립금 기본 적립률 (example: 10)
    accumulationRate: number;
    // 적립금 사용 최대 적립금 제한 여부 (example: false)
    limitMaxRate: boolean;
    // 적립금 사용 최소 상품금액 제한 여부 (example: false)
    limitMinProductPrice: boolean;
    // 적립금 사용 최소 적립금 (example: 1000)
    accumulationUseMinPrice: number;
    // 적립금 노출 설정 (example: FIXED_AMT)
    accumulationDisplayFormatType: ACCUMULATION_DISPLAY_FORMAT_TYPE;
    // 상품평 적립금 상세정보
    reviewsAccumulationDetail: ReviewsAccumulationDetail;
    // 적립금 만료 알림 시점 (day 기준) (example: 30)
    expireNotificationPoint: number;
    // 적립금 유효기간 (month 기준) (example: 3)
    accumulationValidPeriod: number;
    // 상품 적립 사용여부 (example: false)
    useProductAccumulation: boolean;
    // 적립금 사용 최대비율 (example: false)
    excludingReservePayAccumulation: boolean;
    // 적립금 사용 최소 적립금 제한 여부 (example: false)
    limitMinPrice: boolean;
    // 적립금 사용 최소 상품금액 (example: 5000)
    accumulationUseMinProductPrice: number;
    // 회원가입 적립금 (example: 1000)
    signUpAccumulation: number;
    // 적립금 사용 최대비율 (example: 100)
    accumulationUseMaxRate: number;
    // 상품평 적립금 사용여부 (example: false)
    useReviewsAccumulation: boolean;
    // 상품 금액 기준 설정 (example: null)
    productAccumulationBasisType: Nullable<PRODUCT_ACCUMULATION_BASIS_TYPE>;
    // 적립금명 (example: 구매 적립금)
    accumulationName: string;
    // 쿠폰할인 결제시 적립금 지급 제외여부 (example: false)
    excludingReservePayCoupon: boolean;
    // 회원 적립 사용여부 (example: false)
    useMemberAccumulation: boolean;
}

export interface CartConfig {
    cartEquivalentOptionUnitType: string;
    storageMaxQuantity: number;
    storagePeriod: number;
    storagePeriodNoLimit: boolean;
}

// 	쇼핑몰 회원 인증 수단
export interface MallJoinConfig {
    // 쇼핑몰 회원 인증 수단 (example: SMS_OCCUPANCY_AUTHENTICATION)
    authenticationType: AUTHENTICATION_TYPE;
    // 쇼핑몰 회원 인증 시점 example: JOIN_TIME)
    authenticationTimeType: AUTHENTICATION_TIME_TYPE;
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
    // 회원 가입 설정
    memberJoinConfig: MemberJoinConfig;
    // 1:1문의 유형 목록
    inquiryType: InquiryType[];
    // 쇼핑몰 계좌 정보
    bankAccountInfo: BankAccountInfo;
    // 은행 목록
    bankType: BankType[];
    // 주문상태 목록
    orderStatusType: OrderStatusType[];
    // 쇼핑몰 정보
    mall: Mall;

    productInquiryType: ProductInquiryType[];
    productReviewReportType: ProductReviewReportType[];
    claimReasonType: ClaimReasonType[];
    claimStatusType: ClaimStatusType[];
    serviceBasicInfo: ServiceBasicInfo;
    cartConfig: CartConfig;
    openIdJoinConfig: OpenIdJoinConfig;
    externalServiceConfig?: any;
    termsConfig: TermsConfig;

    // 쇼핑몰 회원 인증 수단
    mallJoinConfig: MallJoinConfig;
    // 적립금 설정 정보
    accumulationConfig: AccumulationConfig;
    // 카테고리 정보
    categories: Category;
    // 쇼핑몰 계좌 정보 목록
    bankAccountInfos: BankAccountInfo[];
    // 게시판 카테고리 목록
    boardsCategories: BoardsCategory[];
}
