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
