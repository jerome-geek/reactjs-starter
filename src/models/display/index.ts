export interface CategoryProductReviewsParams {
    hasAttachmentFile: Boolean;
    categoryDepth: Number;
    categoryNo: Number;
    productName: String;
    brandName: String;
    bestReviewYn: BEST_REVIEW_YN;
    myReviewYn: MY_REVIEW_YN;
}

export interface ProductReviewsParams {
    hasAttachmentFile: HAS_ATTACHMENT_FILE;
    bestReviewYn: BEST_REVIEW_YN;
}

export interface ProductReviewBody {
    optionNo: Number;
    orderOptionNo: Number;
    content: String;
    rate: Number;
    urls: String[];
    extraJson: String;
}

export interface ReportProductReviewBody {
    reportReasonCd: REPORT_REASON_CODE;
    content: String;
}

export interface MyProductReviewsParams {
    startYmd: String;
    endYmd: String;
    bestReviewYn: BEST_REVIEW_YN;
    searchType: SEARCH_TYPE;
    searchKeyword: String;
}

export interface MyReviewableProductsParams {
    startDate: String;
    endDate: String;
    productName: String;
    productNo: Number;
    orderNo: String;
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
    eventNo: string;
    order: string;
    soldout: boolean;
    saleStatus: string;
}

export interface Events {
    keyword: string;
    eventTitle: string;
    categoryNos: number;
    productNos: number;
    onlyIngStatus: boolean;
}

export interface skinBanners {
    skinCode: string;
    bannerGroupCodes: string;
}
