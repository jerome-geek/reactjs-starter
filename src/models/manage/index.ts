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

export interface GroupByState {
    state: string;
    count: number;
}

export interface Item {
    address: string;
    detailAddress: string;
    roadAddress: string;
    roadAddressExtra: string;
    jibunAddress: string;
    relatedJibun: string;
    zipCode: string;
    oldZipCode: string;
}

export interface AddressResponse {
    totalCount: number;
    groupByStates: GroupByState[];
    items: Item[];
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

export interface BoardCategory {
    categoryNo: number;
    label: string;
}

export interface BoardList {
    totalCount: number;
    items: BoardListItem[];
}

export interface BoardListItem {
    articleNo: number;
    title: string;
    imageUrl: string;
    viewCnt: number;
    categoryNo: number;
    categoryLabel: string;
    registerName: string;
    registerYmdt: Date;
    registerNo: number;
    registerType: string;
    modifierName: string;
    modifyYmdt: null;
    modifierNo: null;
    modifierType: null;
    secreted: boolean;
    repliedCnt: number;
    replied: boolean;
    notice: boolean;
    attached: boolean;
    recommendCount: number;
    tags: string[];
}

export interface BoardDetailState {
    boardNo: string;
    articleNo: string;
}

export interface BoardDetail {
    articleNo: number;
    title: string;
    content: string;
    imageUrl: string;
    viewCnt: number;
    categoryNo: number;
    categoryLabel: string;
    attachments: string[];
    registerName: string;
    registerGroupNames: null;
    registerYmdt: string;
    registerNo: number;
    registerType: string;
    modifierName: string;
    modifyYmdt: string;
    modifierNo: null;
    modifierType: string;
    memberId: string;
    modifiable: boolean;
    childArticles: number[];
    secreted: boolean;
    notice: boolean;
    parentArticle: number;
    recommendCount: number;
    tags: string[];
}
