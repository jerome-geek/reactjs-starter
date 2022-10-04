import {
    COUPON_TARGET_TYPES,
    COUPON_TYPES,
    PAY_TYPE,
    USABLE_PLATFORMS,
} from 'models';

export interface CouponsParams {
    endYmd?: string;
    pageNumber: number;
    pageSize: number;
    startYmd?: string;
    usable: boolean | null;
}

export type TargetParams = Pick<CouponsParams, 'pageNumber' | 'pageSize'>;

export interface IssuableCouponResponse {
    couponNo: number; // 쿠폰 번호
    couponName: string; // 쿠폰 이름
    couponType: COUPON_TYPES; // 쿠폰 종류
    couponTargetType: COUPON_TARGET_TYPES; // 쿠폰 대상 종류
    allianceRefererType: any; // deprecated(더 이상 제공하지 않는 개체항목입니다) 제휴 방문처 타입
    discountInfo: DiscountInfo;
    dateInfo: DateInfo;
    useConstraint: UseConstraint;
    issueConstraint: IssueConstraint;
    couponStatus: CouponStatus;
    downloadable: boolean; // 다운로드 가능여부 (true: 다운로드 가능 / false: 다운로드 불가능)
}

export interface DiscountInfo {
    fixedAmt: boolean;
    discountAmt: number;
    discountRate: any;
    maxDiscountAmt: any;
    freeDelivery: boolean;
    useOtherCoupon: boolean;
    useCartCoupon: boolean;
    useProductCoupon: boolean;
    skippedAccumulationAmt: boolean;
}

export interface DateInfo {
    issueStartYmdt: string;
    issueEndYmdt: string;
    issueStartHour: number;
    issueEndHour: number;
    issueDaysOfWeek: string;
}

export interface UseConstraint {
    useEndYmdt: string;
    useDays: number;
    minSalePrice: number;
    maxSalePrice: number;
    minDeliveryAmt: number;
    limitPayType: any;
    usablePlatformTypes: string[];
}

export interface IssueConstraint {
    memberGradeName: string;
    memberGradeNames: string[];
    memberGroupNames: string[];
    issuablePlatformTypes: string[];
    dailyIssueLimit: boolean;
    dailyIssueLimitCnt: number;
    issuePerPersonLimit: boolean;
    issuePerPersonLimitCnt: number;
    dailyIssuePerPersonLimitCnt: number;
    channelTypes: any;
}

export interface CouponStatus {
    totalIssuableCnt: number;
    totalIssuedCnt: number;
    totalIssuedCntToday: number;
    issuableCnt: number;
    myIssuedCnt: number;
    myIssuedCntToday: number;
}

export interface getCouponResponse {
    items: Coupon[];
    totalCount: number;
}

export interface Coupon {
    reason: string; // 쿠폰 생성 사유 (example: 행사)
    discountRate: number; // 할인율 (example: 1)
    discountAmt: number; // 할인금액 (example: 5000)
    couponName: string; // 쿠폰 명 (example: 5월 기획전 쿠폰)
    couponIssueNo: number; // 쿠폰 발급 번호 (example: 1)
    minSalePrice: number; // 최소판매금액기준 (example: 10000)
    freeDelivery: boolean; // 배송비무료여부 (example: false)
    maxDiscountAmt: number; // 최대할인금액(정률에서) (example: 10000)
    used: boolean; // 사용여부 (true: 사용함 / false: 사용하지 않음) (example: false)
    useEndYmdt: Date; // 사용종료일 (example: yyyy-MM-dd HH:mm:ss)
    cartCouponUsable: boolean; // 장바구니 쿠폰 사용 가능여부 (true: 사용 가능 / false: 사용 불가능) (example: true)
    couponType: COUPON_TYPES; // 쿠폰 유형 (example: PRODUCT)
    productCouponUsable: boolean; // 상품쿠폰 사용 가능여부 (true: 사용 가능 / false: 사용 불가능) (example: true)
    issueYmdt: Date; // 발급일 (example: yyyy-MM-dd HH:mm:ss)
    fixedAmt: boolean; // 정액 여부 (true: 정액 / false: 정률) (example: true)
    limitPayTypes: Nullable<PAY_TYPE[]>; // 사용가능 결제수단 리스트 (example: [PAYCO, NAVER_PAY, CREDIT_CARD, REALTIME_ACCOUNT_TRANSFER, VIRTUAL_ACCOUNT, ESCROW_REALTIME_ACCOUNT_TRANSFER, ESCROW_VIRTUAL_ACCOUNT])
    limitPayType: Nullable<PAY_TYPE>; // 사용가능 결제수단 (example: PAYCO)
    useYmdt: Nullable<Date>; // 사용일시 (example: yyyy-MM-dd HH:mm:ss)
    couponNo: number; // 쿠폰 번호 (example: 1)
    couponTargetType: COUPON_TARGET_TYPES; // 할인쿠폰 대상 타입 (example: PRODUCT)
    skipsAccumulation: boolean; // 적립금 적립 불가 여부 (true: 적립 불가능 / false: 적립 가능) (example: true)
    otherCouponUsable?: boolean; // deprecated(더 이상 제공하지 않는 개체항목입니다) 선택된 쿠폰 외 다른 쿠폰 사용 가능여부 (true: 사용 가능 / false: 사용 불가능) (example: true)
    usablePlatforms: USABLE_PLATFORMS[]; // 사용가능 플랫폼 (example: PC,MOBILE_WEB,MOBILE_APP)
    minDeliveryAmt: Nullable<number>; // 배송비쿠폰일경우 최소 배송비 (example: 2500)
    maxSalePrice: number; // 최대판매금액기준 (example: 30000)
    fiexdAmt: boolean; // deprecated(더 이상 제공하지 않는 개체항목입니다) 정액 여부 (true: 정액 / false: 정률) (example: true)
    memberGradeNames: Nullable<string[]>; // 사용 가능 회원 등급 (example: [VIP, VVIP])
    memberGroupNames: Nullable<string[]>; // 사용 가능 회원 그룹 (example: [임원, 직원])
}
