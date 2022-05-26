import { ORDER_DIRECTION, SEARCH_TYPE } from 'models';
import { INQUIRY_SEARCH_TYPE } from 'models/index';

type INQUIRY_STATUS = 'ISSUED' | 'ASKED' | 'IN_PROGRESS' | 'ANSWERED';

type INQUIRY_STATUSES =
    | `${INQUIRY_STATUS}`
    | `${INQUIRY_STATUS},${INQUIRY_STATUS}`
    | `${INQUIRY_STATUS},${INQUIRY_STATUS},${INQUIRY_STATUS}`
    | `${INQUIRY_STATUS},${INQUIRY_STATUS},${INQUIRY_STATUS},${INQUIRY_STATUS}`;

type PAGE_TYPE = 'CART';

export type PAGE_TYPES =
    | `${PAGE_TYPE}`
    | `${PAGE_TYPE},${PAGE_TYPE}`
    | `${PAGE_TYPE},${PAGE_TYPE},${PAGE_TYPE}`;

export interface AddressParams {
    pageNumber?: number;
    pageSize?: number;
    keyword: string;
}

export interface ArticleParams {
    pageNumber?: number;
    pageSize?: number;
    hasTotalCount?: boolean;
    keyword?: string;
    searchType?: SEARCH_TYPE;
    categoryNo?: number;
    startYmd?: string; // default 3개월
    endYmd?: string; // default 오늘
    withReplied?: boolean;
    direction?: ORDER_DIRECTION;
    isMine?: boolean;
}

export interface ImagesType {
    originalFileName: string;
    uploadedFileName: string;
}

export interface PostArticleParams {
    images: ImagesType[];
    password: string;
    articleTitle: string;
    imageUrls: string[];
    parentBoardArticleNo: number;
    articleContent: string;
    boardCategoryNo: number;
    secreted: boolean;
    tags?: string[];
    guestName: string;
}

export interface InquiryTypes {
    inquiryTypeNo?: number;
    inquiryStatus?: INQUIRY_STATUS;
    inquiryStatuses?: INQUIRY_STATUSES;
    keyword?: string;
    searchType?: INQUIRY_SEARCH_TYPE;
}

export interface WriteInquiry {
    originalFileName?: string[];
    inquiryTitle?: string;
    answerEmailSendYn?: boolean;
    uploadedFileName?: string[];
    orderNo?: string;
    captcha?: string;
    inquiryTypeNo?: number;
    answerSmsSendYn?: boolean;
    inquiryContent?: string;
    email?: string;
    productNo?: number;
}
