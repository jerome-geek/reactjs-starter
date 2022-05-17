enum AUTH_TYPE {
    NONE = 'NONE',
    SMS = 'SMS',
    EMAIL = 'EMAIL',
    MOBILE = 'MOBILE',
}

enum CERTIFICATED_USAGE {
    FIND_ID = 'FIND_ID',
    FIND_PASSWORD = 'FIND_PASSWORD',
    CHANGE_MOBILE_NO = 'CHANGE_MOBILE_NO',
    RELEASE_DORMANT = 'RELEASE_DORMANT',
    ADMIN = 'ADMIN',
    JOIN = 'JOIN',
    JOIN_URI = 'JOIN_URI',
    CHANGE_ID = 'CHANGE_ID',
    ADMIN_SECONDARY = 'ADMIN_SECONDARY',
    CHANGE_EMAIL = 'CHANGE_EMAIL',
}

enum PLATFORM_TYPE {
    PC = 'PC',
    MOBILE_WEB = 'MOBILE_WEB',
    AOS = 'AOS',
    IOS = 'IOS',
}

enum OPEN_ID_PROVIDER {
    NCP_NAVER = 'ncp_naver',
    NCP_KAKAO = 'ncp_kakao',
    NCP_LINE = 'ncp_line',
    NCP_FACEBOOK = 'ncp_facebook',
    NCP_PAYCO = 'ncp_payco',
}

enum ORDER_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC',
}

// TODO: 체크 필요
enum PRODUCT_DIRECTION {
    DESC_DELIVERY_FEIGN_CLIENT = 'DESCDeliveryFeignClient',
    DESC = 'DESC',
    ASC = 'ASC',
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

// TODO: 체크 필요
export enum PRODUCT_SALE_STATUS {
    ONSALE = 'ONSALE', // 판매중 상품만 조회
    ALL_CONDITIONS = 'ALL_CONDITIONS', // 전체 판매 상태 조회
    READY_ON_SALE = 'READY_ONSALE', // 판매대기와 판매중 상품 조회
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

enum SEX {
    MALE = 'M',
    FEMALE = 'F',
}

enum TERM {
    PI_COLLECTION_AND_USE_OPTIONAL = 'PI_COLLECTION_AND_USE_OPTIONAL',
    PI_PROCESS_CONSIGNMENT = 'PI_PROCESS_CONSIGNMENT',
    PI_THIRD_PARTY_PROVISION = 'PI_THIRD_PARTY_PROVISION',
}

enum OPEN_ID_TERM {
    PERSONAL_PROCESS_CONSIGNMENT = 'PERSONAL_PROCESS_CONSIGNMENT',
    PERSONAL_THIRD_PARTY_PROVISION = 'PERSONAL_THIRD_PARTY_PROVISION',
}

enum ORDER_REQUEST_TYPE {
    ALL = 'ALL',
    CLAIM = 'CLAIM',
    NORMAL = 'NORMAL',
    DEPOSIT_WAIT = 'DEPOSIT_WAIT',
    PAY_DONE = 'PAY_DONE',
    PRODUCT_PREPARE = 'PRODUCT_PREPARE',
    DELIVERY_PREPARE = 'DELIVERY_PREPARE',
    DELIVERY_ING = 'DELIVERY_ING',
    DELIVERY_DONE = 'DELIVERY_DONE',
    BUY_CONFIRM = 'BUY_CONFIRM',
    CANCEL_DONE = 'CANCEL_DONE',
    RETURN_DONE = 'RETURN_DONE',
    EXCHANGE_DONE = 'EXCHANGE_DONE',
    PAY_WAIT = 'PAY_WAIT',
    PAY_CANCEL = 'PAY_CANCEL',
    PAY_FAIL = 'PAY_FAIL',
    DELETE = 'DELETE',
    EXCHANGE_WAIT = 'EXCHANGE_WAIT',
    REFUND_DONE = 'REFUND_DONE',
}

enum CASH_RECEIPT_ISSUE_PURPOSE_TYPE {
    INCOME_TAX_DEDUCTION = 'INCOME_TAX_DEDUCTION',
    PROOF_EXPENDITURE = 'PROOF_EXPENDITURE',
}

enum CLAIM_TYPE {
    CANCEL = 'CANCEL',
    RETURN = 'RETURN',
    EXCHANGE = 'EXCHANGE',
    NONE = 'NONE',
}

enum COUNTRY_CD {
    AX = 'AX',
    AD = 'AD',
    AU = 'AU',
    AT = 'AT',
    BH = 'BH',
    BE = 'BE',
    BZ = 'BZ',
    BR = 'BR',
    BN = 'BN',
    BG = 'BG',
    CA = 'CA',
    ES_CANARY = 'ES_CANARY',
    CL = 'CL',
    CN = 'CN',
    CO = 'CO',
    CR = 'CR',
    CY = 'CY',
    CZ = 'CZ',
    DK = 'DK',
    EC = 'EC',
    EG = 'EG',
    SV = 'SV',
    EE = 'EE',
    FR = 'FR',
    GF = 'GF',
    DE = 'DE',
    GR = 'GR',
    GL = 'GL',
    GU = 'GU',
    GT = 'GT',
    GG = 'GG',
    GY = 'GY',
    HK = 'HK',
    HU = 'HU',
    IS = 'IS',
    ID = 'ID',
    IE = 'IE',
    JP = 'JP',
    JE = 'JE',
    JO = 'JO',
    KR = 'KR',
    KW = 'KW',
    LV = 'LV',
    LB = 'LB',
    LI = 'LI',
    LT = 'LT',
    LU = 'LU',
    MO = 'MO',
    PT_MADEIRA = 'PT_MADEIRA',
    MY = 'MY',
    NL = 'NL',
    NZ = 'NZ',
    GB_NORTHERN_ISLAND = 'GB_NORTHERN_ISLAND',
    NO = 'NO',
    PY = 'PY',
    PE = 'PE',
    PL = 'PL',
    PT = 'PT',
    RO = 'RO',
    RU = 'RU',
    SM = 'SM',
    SA = 'SA',
    GB_SCOTLAND = 'GB_SCOTLAND',
    SG = 'SG',
    SK = 'SK',
    SI = 'SI',
    ES = 'ES',
    CH = 'CH',
    TW = 'TW',
    TH = 'TH',
    TR = 'TR',
    AE = 'AE',
    GB = 'GB',
    US = 'US',
    U2 = 'U2',
    UY = 'UY',
    VN = 'VN',
    GB_WALES = 'GB_WALES',
    YE = 'YE',
    HR = 'HR',
    MT = 'MT',
    FI = 'FI',
    SE = 'SE',
}

enum REPLY_TYPE {
    EMAIL = 'EMAIL',
    SMS = 'SMS',
}

enum CRITERION {
    PRODUCT_COUNT = 'PRODUCT_COUNT',
    RECENT_PRODUCT = 'RECENT_PRODUCT',
}

enum DISCOUNTED_COMPARISON {
    GT = 'GT',
    LTE = 'LTE',
    GTE = 'GTE',
    EQ = 'EQ',
    BETWEEN = 'BETWEEN',
}

enum DELIVERY_CONDITION_TYPE {
    FREE = 'FREE',
    CONDITIONAL = 'CONDITIONAL',
    FIXED_FEE = 'FIXED_FEE',
}

enum PRODUCT_BY {
    POPULAR = 'POPULAR',
    SALE_YMD = 'SALE_YMD',
    DISCOUNTED_PRICE = 'DISCOUNTED_PRICE',
    REVIEW = 'REVIEW',
    SALE_CNT = 'SALE_CNT',
    RECENT_PRODUCT = 'RECENT_PRODUCT',
    MD_RECOMMEND = 'MD_RECOMMEND',
    LIKE_CNT = 'LIKE_CNT',
}

enum SHIPPING_AREA_TYPE {
    PARTNER = 'PARTNER',
    MALL = 'MALL',
}

enum CHANNEL_TYPE {
    NAVER_EP = 'NAVER_EP',
    DANAWA = 'DANAWA',
    ENURI = 'ENURI',
    WONDER = 'WONDER',
    COOCHA = 'COOCHA',
    FACEBOOK = 'FACEBOOK',
}

export {
    AUTH_TYPE,
    CERTIFICATED_USAGE,
    PLATFORM_TYPE,
    OPEN_ID_PROVIDER,
    ORDER_DIRECTION,
    PRODUCT_DIRECTION,
    ORDER_BY,
    BY,
    SALE_STATUS,
    INQUIRY_TYPE,
    SEARCH_TYPE,
    PAGE_TYPE,
    BEST_REVIEW_YN,
    MY_REVIEW_YN,
    HAS_ATTACHMENT_FILE,
    REPORT_REASON_CODE,
    SEX,
    TERM,
    OPEN_ID_TERM,
    ORDER_REQUEST_TYPE,
    CASH_RECEIPT_ISSUE_PURPOSE_TYPE,
    CLAIM_TYPE,
    COUNTRY_CD,
    REPLY_TYPE,
    CRITERION,
    DISCOUNTED_COMPARISON,
    DELIVERY_CONDITION_TYPE,
    PRODUCT_BY,
    SHIPPING_AREA_TYPE,
    CHANNEL_TYPE,
};
