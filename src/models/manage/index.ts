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

export interface ArticleParams extends Paging {
    // 검색어 (Example : keyword)
    keyword?: string;
    // 검색 유형 (Example : ALL)
    searchType?: SEARCH_TYPE;
    // 게시판 카테고리 (Example: 1)
    categoryNo?: number;
    // 조회일 시작일(yyyy-MM-dd, default: 3개월) (Example : YYYY-MM-DD)
    startYmd?: string;
    // 조회일 종료일(yyyy-MM-dd, default: 오늘) (Example : YYYY-MM-DD)
    endYmd?: string;
    // 답글도 리스트에 같이 조회할지 여부 (false: 답글 미포함(default), true: 답글 포함) (Example : false)
    withReplied?: boolean;
    // 최신 순 정렬 여부 (Example : DESC)
    direction?: ORDER_DIRECTION;
    // 본인이 작성한 글만 조회 여부(false: 전체 조회(default), true: 본인 글만 조회) (Example : true)
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

export interface InquiriesResponse {
    totalCount: number;
    items: InquiryItem[];
}

export interface InquiryItem {
    inquiryNo: number;
    orderNo: string;
    productNo: number;
    productName: string;
    inquiryTitle: string;
    inquiryContent: string;
    answerSmsSend: boolean;
    answerEmailSend: boolean;
    registerNo: number;
    registerYmdt: string;
    inquiryStatus: INQUIRY_STATUS;
    inquiryType: InquiryType;
    answer: Answer;
    imageUrls: any[];
    originalImageUrls: any[];
    issuerName: string;
}

// 1:1 문의 유형 목록
export interface InquiryType {
    // 1:1문의 유형 번호 (example: 6276)
    inquiryTypeNo: number;
    // 1:1문의 유형 이름 (example: 네이버페이문의)
    inquiryTypeName: string;
    // 1:1문의 유형 설명 (example: 네이버페이 사용 시 네이버페이를 통해서 접수되는 문의가 연동되는 유형입니다.)
    inquiryTypeDescription: string;
}

export interface Answer {
    answerNo: number;
    answerContent: string;
    answerRegisterYmdt: string;
}
