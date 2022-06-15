import {
    BEST_REVIEW_YN,
    BY,
    HAS_ATTACHMENT_FILE,
    INQUIRY_TYPE,
    MY_REVIEW_YN,
    ORDER_DIRECTION,
    PAGE_TYPE,
    REPORT_REASON_CODE,
    SALE_STATUS,
    SEARCH_TYPE,
} from 'models';

export interface CategoryProductReviewsParams {
    hasAttachmentFile: boolean;
    categoryDepth: number;
    categoryNo: number;
    productName: string;
    brandName: string;
    bestReviewYn: BEST_REVIEW_YN;
    myReviewYn: MY_REVIEW_YN;
}

export interface ProductReviewsParams {
    hasAttachmentFile: HAS_ATTACHMENT_FILE;
    bestReviewYn: BEST_REVIEW_YN;
}

export interface ProductReviewBody {
    optionNo: number;
    orderOptionNo: number;
    content: string;
    rate: number;
    urls: string[];
    extraJson: string;
}

export interface ReportProductReviewBody {
    reportReasonCd: REPORT_REASON_CODE;
    content: string;
}

export interface MyProductReviewsParams {
    startYmd: string;
    endYmd: string;
    bestReviewYn: BEST_REVIEW_YN;
    searchType: SEARCH_TYPE;
    searchKeyword: string;
}

export interface MyReviewableProductsParams {
    startDate: string;
    endDate: string;
    productName: string;
    productNo: number;
    orderNo: string;
}

export interface ProductInquiry {
    parentInquiryNo: number;
    title: string;
    content: string;
    secreted: boolean;
    type: INQUIRY_TYPE;
    email: string;
}

export interface ProductInquirySearch {
    searchType: string;
    searchKeyword: string;
    answered: boolean;
    isMyInquiries: boolean;
}

export interface ProductSection {
    sectionNo: string;
    sectionId: string;
    by: BY;
    direction: ORDER_DIRECTION;
    soldout: boolean;
    saleStatus: SALE_STATUS;
    hasOptionValues: boolean;
}

export interface DesignPopup {
    displayUrl?: string;
    parameter?: string;
}

export interface Popup {
    pageType: PAGE_TYPE;
    targetNo: number;
}

export interface Event {
    order: string;
    soldout: boolean;
    saleStatus: string;
}

export interface Events {
    keyword?: string;
    eventTitle: string;
    categoryNos?: number;
    productNos: number;
    onlyIngStatus: boolean;
}

export interface skinBanners {
    skinCode: string;
    bannerGroupCodes: string;
}
