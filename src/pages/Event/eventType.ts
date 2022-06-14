export interface EventDetailResponse {
    eventNo: number;
    label: string;
    urlType: string;
    url: string;
    displayPeriodType: string;
    startYmdt: string;
    endYmdt: string;
    pcImageUrl: string;
    mobileimageUrl: string;
    tag: string;
    categoryNos: number[];
    section: Section[];
    coupon: Coupon;
    top: Top;
    orders: string[];
    promotionText: string;
    eventYn: string;
}

export interface Section {
    label: string;
    imageUrl: string;
    pcPerRow: number;
    mobilePerRow: number;
    displayOrder: number;
    displayableStock: boolean;
    products: Product[];
}

export interface Product {
    productNo: number;
    productName: string;
    productNameEn: string;
    promotionText: string;
    salePrice: number;
    immediateDiscountAmt: number;
    immediateDiscountUnitType: string;
    additionDiscountAmt: number;
    additionDiscountUnitType: string;
    minSalePrice: number;
    maxSalePrice: number;
    maxDiscountAmount: number;
    liked: boolean;
    likeCount: number;
    partnerName: string;
    reviewRating: number;
    totalReviewCount: number;
    deliveryConditionType: string;
    saleCnt: number;
    stockCnt: number;
    mainStockCnt: number;
    brandNo: number;
    brandName: string;
    brandNameEn: string;
    brandNameKo: string;
    brandNameType: string;
    stickerInfos: StickerInfo[];
    stickerLabels: string[];
    adult: boolean;
    salePeriodType: string;
    saleStartYmdt: string;
    saleEndYmdt: string;
    saleStatusType: string;
    reservationData: ReservationData;
    imageUrls: string[];
    listImageUrls: string[];
    hasCoupons: HasCoupons;
    couponTag: string;
    maxCouponAmt: number;
    couponDiscountAmt: number;
    registerYmdt: string;
    contentsIfPausing: string;
    optionValues: OptionValue[];
    displayCategoryNos: string;
    searchProductId: string;
    frontDisplayYn: boolean;
    urlDirectDisplayYn: boolean;
    productManagementCd: string;
    hsCode: string;
    productSalePeriodType: any;
    sectionProductStartYmdt: any;
    sectionProductEndYmdt: any;
    enableCoupons: boolean;
}

export interface StickerInfo {
    type: string;
    label: string;
}

export interface ReservationData {
    reservationStartYmdt: string;
    reservationEndYmdt: string;
    reservationDeliveryYmdt: string;
    reservationStockCnt: number;
}

export interface HasCoupons {
    product: boolean;
    brand: boolean;
    category: boolean;
    partner: boolean;
    event: boolean;
}

export interface OptionValue {
    mallProductNo: number;
    stockCnt: number;
    optionValue: string;
}

export interface Coupon {
    coupons: Coupon2[];
    guideImageUrl: string;
    issuedImageUrl: string;
    alreadyIssuedImageUrl: string;
    beforeIssueImageUrl: string;
    soldOutImageUrl: string;
    dateExpiredImageUrl: string;
}

export interface Coupon2 {
    couponNo: number;
    couponName: string;
    couponType: string;
    couponTargetType: string;
    allianceRefererType: string;
    downloadable: boolean;
    imageUrl: string;
    discountInfo: DiscountInfo;
    dateInfo: DateInfo;
    useConstraint: UseConstraint;
    issueConstraint: IssueConstraint;
    couponStatus: CouponStatus;
}

export interface DiscountInfo {
    fixedAmt: boolean;
    discountAmt: number;
    discountRate: number;
    maxDiscountAmt: number;
    freeDelivery: boolean;
    useOtherCoupon: boolean;
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
    minSalePrice: number;
    maxSalePrice: number;
    minDeliveryAmt: number;
    limitPayType: string;
    usablePlatformTypes: string[];
}

export interface IssueConstraint {
    memberGradeName: string;
    issuablePlatformTypes: string[];
    dailyIssueLimit: boolean;
    dailyIssueLimitCnt: number;
    issuePerPersonLimit: boolean;
    issuePerPersonLimitCnt: number;
    dailyIssuePerPersonLimitCnt: number;
}

export interface CouponStatus {
    totalIssuableCnt: number;
    totalIssuedCnt: number;
    totalIssuedCntToday: number;
    issuableCnt: number;
    myIssuedCnt: number;
    myIssuedCntToday: number;
}

export interface Top {
    pc: Pc;
    mobile: Mobile;
}

export interface Pc {
    url: string;
    type: string;
}

export interface Mobile {
    url: string;
    type: string;
}
