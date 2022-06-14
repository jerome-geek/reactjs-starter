export interface CouponsParams {
    endYmd?: string;
    pageNumber: number;
    pageSize: number;
    startYmd?: string;
    usable: boolean | null;
}

export type TargetParams = Pick<CouponsParams, 'pageNumber' | 'pageSize'>;

export interface IssuableCouponResponse {
    couponNo: number;
    couponName: string;
    couponType: string;
    couponTargetType: string;
    allianceRefererType: any;
    discountInfo: DiscountInfo;
    dateInfo: DateInfo;
    useConstraint: UseConstraint;
    issueConstraint: IssueConstraint;
    couponStatus: CouponStatus;
    downloadable: boolean;
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
