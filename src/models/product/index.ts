import {
    CRITERION,
    DELIVERY_CONDITION_TYPE,
    DISCOUNTED_COMPARISON,
    ORDER_DIRECTION,
    PRODUCT_BY,
    PRODUCT_DIRECTION,
    PRODUCT_SALE_STATUS,
    SHIPPING_AREA_TYPE,
} from 'models';

export interface BrandsParams {
    filter?: { name?: string; categoryNo?: number };
    pageNumber?: number;
    pageSize?: number;
    hasTotalCount?: boolean;
    fromDB?: boolean;
    sort?: { criterion?: CRITERION; direction?: PRODUCT_DIRECTION };
}

export interface ProductsParams {
    deliveryTemplateNo: number;
    hasOptionValues?: boolean;
    pageSize?: number;
    pageNumber?: number;
    productSort?: {
        criterion?: CRITERION;
        direction?: PRODUCT_DIRECTION;
    };
}

export interface RestockParams {
    optionNos: number[];
    privacyInfoAgreement: boolean;
    name: string;
    phone: string;
}

export interface GroupCodeParams {
    groupManagementCodes: string[];
    saleStatus?: PRODUCT_SALE_STATUS;
    isSoldOut?: boolean;
}

export interface ProductSearchParams {
    filter?: {
        discountedPrices?: number;
        keywords?: string;
        keywordInResult?: string;
        discountedComparison?: DISCOUNTED_COMPARISON;
        deliveryConditionType?: DELIVERY_CONDITION_TYPE;
        saleStatus?: PRODUCT_SALE_STATUS;
        soldout?: boolean;
        totalReviewCount?: boolean;
        familyMalls?: boolean;
        productManagementCd?: string;
        excludeMallProductNo?: number;
        includeMallProductNo?: number;
    };
    order?: {
        by?: PRODUCT_BY;
        direction?: ORDER_DIRECTION;
        soldoutPlaceEnd?: boolean;
    };
    categoryNos?: number;
    brandNos?: number;
    partnerNo?: number;
    clientKey?: string;
    pageNumber?: number;
    pageSize?: number;
    onlySaleProduct?: boolean;
    hasMaxCouponAmt?: boolean;
    hasTotalCount?: boolean;
    hasOptionValues?: boolean;
    includeSummaryInfo?: boolean;
    shippingAreaType?: SHIPPING_AREA_TYPE;
}

export interface ProductsSearchResponse {
    totalCount: number;
    pageCount: number;
    minPrice: number;
    maxPrice: number;
    items: ProductItem[];
    brands: Brand[];
    depth1Categories: Category[];
    depth2Categories: Category[];
    depth3Categories: any[];
    depth4Categories: any[];
    depth5Categories: any[];
    multiLevelCategories: Category[];
    clickUrlPrefix: null;
    displayableStock: boolean;
}

export interface Brand {
    brandNo: number;
    brandName: string;
    brandNameKo: string;
    brandNameEn: string;
    brandNameType: string;
    count: number;
}

export interface Category {
    categoryNo: number;
    count: number;
    displayOrder: number;
    label: string;
    parentCategoryNo: number;
    childCategories?: Category[];
}

export interface ProductItem {
    optionValues: OptionValue[];
    shippingArea: string;
    frontDisplayYn: boolean;
    urlDirectDisplayYn: boolean;
    salePeriodType: string;
    saleStartYmdt: Date;
    saleEndYmdt: Date;
    totalReviewCount: number;
    stockCnt: number;
    salePrice: number;
    immediateDiscountUnitType: string;
    immediateDiscountAmt: number;
    displayCategoryNos: string;
    productNo: number;
    productName: string;
    searchProductId: string;
    brandName: string;
    reviewRating: number;
    groupManagementCode: null;
    groupManagementCodeName: null;
    minSalePrice: number;
    maxSalePrice: number;
    maxDiscountAmount: number;
    brandNameKo: string;
    brandNameEn: string;
    brandNameType: string;
    couponTag: string;
    partnerName: string;
    saleCnt: number;
    deliveryConditionType: string;
    brandNo: number;
    registerYmdt: Date;
    additionDiscountAmt: number;
    additionDiscountUnitType: string;
    adult: boolean;
    couponDiscountAmt: number;
    enableCoupons: boolean;
    hasCoupons: HasCoupons;
    imageUrls: string[];
    listImageUrls: string[];
    mainBestProductYn: boolean;
    mainStockCnt: number;
    maxCouponAmt: number;
    productSalePeriodType: null;
    reservationData: null;
    sectionProductEndYmdt: null;
    sectionProductStartYmdt: null;
    stickerLabels: null;
    liked: boolean;
    contentsIfPausing: string;
    productType: string;
    productNameEn: string;
    promotionText: null;
    saleStatusType: string;
    hsCode: string;
    stickerInfos: any[];
    likeCount: number;
    productManagementCd: string;
    isSoldOut: boolean;
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
    optionValue: string;
    stockCnt: number;
}
