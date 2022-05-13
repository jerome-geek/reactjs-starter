/// <reference types="react-scripts" />

type Nullable<T> = T | null;

enum ORDER_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC',
}

enum ORDER_BY {
    RECOMMEND = 'RECOMMEND',
    REGISTER_YMDT = 'REGISTER_YMDT',
    RATING = 'RATING',
    BEST_REVIEW = 'BEST_REVIEW',
}

enum BY {
    SALE_YMD = 'SALE_YMD',
    ADMIN_SETTING = 'ADMIN_SETTING',
    POPULAR = 'POPULAR',
    RECOMMENDATION = 'RECOMMENDATION',
    DISCOUNTED_PRICE = 'DISCOUNTED_PRICE',
}

enum SALE_STATUS {
    READY_ONSALE = 'READY_ONSALE', // 판매대기, 판매중 상품만 조회
    ONSALE = 'ONSALE', // 판매중인 상품만 조회
    RESERVATION_AND_ONSALE = 'RESERVATION_AND_ONSALE', // 예약판매중인 상품과 판매중인 상품만 조회
}

enum INQUIRY_TYPE {
    PRODUCT = 'PRODUCT',
    DELIVERY = 'DELIVERY',
    CANCEL = 'CANCEL',
    RETURN = 'RETURN',
    EXCHANGE = 'EXCHANGE',
    REFUND = 'REFUND',
    OTHER = 'OTHER',
}

enum SEARCH_TYPE {
    ALL = 'ALL',
    CONTENT = 'CONTENT',
    PRODUCT_NAME = 'PRODUCT_NAME',
}

enum PAGE_TYPE {
    MAIN = 'MAIN', // 메인페이지
    CATEGORY = 'CATEGORY', // 전시카테고리
    EVENT = 'EVENT', // 기획전
    PRODUCT = 'PRODUCT', // 상품
}

enum BEST_REVIEW_YN {
    Y, // 우수 상품평
    N, // 일반 상품평
    NULL, // 전체
}

enum MY_REVIEW_YN {
    Y, // 내 상품평
    N, // 전체 상품평
}

enum HAS_ATTACHMENT_FILE {
    Y, // 파일 첨부
    N, // 파일 미첨부
    ALL, // 빈값
}

enum REPORT_REASON_CODE {
    COPYRIGHT = 'COPYRIGHT',
    SLANDER = 'SLANDER',
}

interface Sort {
    orderBy: ORDER_BY;
    orderDirection: ORDER_DIRECTION;
}

interface Paging {
    pageNumber: Number;
    pageSize: Number;
    hasTotalCount: Boolean;
}

interface SearchDate {
    startYmd: string;
    endYmd: string;
}
