import { COUPON_TARGET_TYPES, COUPON_TYPES } from 'models';

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

export interface IssueCouponResponse {
    items: Coupon[];
    totalCount: number;
}

export interface Coupon {
    couponIssueNo: number;
    couponName: string;
    couponNo: number;
    couponType: COUPON_TYPES;
    discountAmt: number;
    discountRate: number;
    fixedAmt: boolean;
    issueYmdt: Date;
    limitPayType: null;
    maxDiscountAmt: number;
    maxSalePrice: number;
    minSalePrice: number;
    otherCouponUsable: boolean;
    cartCouponUsable: boolean;
    productCouponUsable: boolean;
    skipsAccumulation: boolean;
    usablePlatforms: string[];
    useEndYmdt: Date;
    useYmdt: Nullable<Date>;
    used: boolean;
    couponTargetType: string;
    memberGradeNames: null;
    memberGroupNames: null;
    freeDelivery: boolean;
    minDeliveryAmt: null;
    fiexdAmt: boolean;
    reason: Nullable<string>;
}
