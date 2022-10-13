// 필수 여부
enum REQUIRED_TYPE {
    // 사용함
    USED = 'USED',
    // 필수
    REQUIRED = 'REQUIRED',
    // 사용안함
    NOT_USED = 'NOT_USED',
}

// 리스트 이미지 유형
enum IMAGE_DISPLAY_TYPE {
    // 사용 안함
    NOT_USED = 'NOT_USED',
    // 첨부파일 사용
    ATTACHMENT = 'ATTACHMENT',
    // 상품 이미지 사용
    PRODUCT = 'PRODUCT',
}

// 게시판 노출 유형
enum BOARD_DISPLAY_TYPE {
    // 리스트형
    LIST = 'LIST',
    // 카드형
    CARD = 'CARD',
    // 댓글형
    REPLY = 'REPLY',
    // 문의형
    INQUIRY = 'INQUIRY',
}

// 인트로 페이지 설정정보
enum INTRO_REDIRECTION_TYPE {
    // 사용안함
    NONE = 'NONE',
    // 접속 불가
    NO_ACCESS = 'NO_ACCESS',
    // 회원 인증
    ONLY_MEMBER = 'ONLY_MEMBER',
    // 성인 인증
    ONLY_ADULT = 'ONLY_ADULT',
}

// 상품 금액 기준 설정
enum PRODUCT_ACCUMULATION_BASIS_TYPE {
    // 판매가
    SALE_PRICE = 'SALE_PRICE',
    // 판매가 ± 옵션가
    SALE_STANDARD_PRICE = 'SALE_STANDARD_PRICE',
    // 판매가 ± 옵션가 - 프로모션할인
    SALE_PROMOTION_PRICE = 'SALE_PROMOTION_PRICE',
    // 할인적용가
    DISCOUNTED_PRICE = 'DISCOUNTED_PRICE',
    // 할인적용가 ± 옵션가
    DISCOUNTED_STANDARD_PRICE = 'DISCOUNTED_STANDARD_PRICE',
    // 할인적용가 ± 옵션가 - 프로모션할인
    DISCOUNTED_PROMOTION_PRICE = 'DISCOUNTED_PROMOTION_PRICE',
}

// 적립금 노출 설정
enum ACCUMULATION_DISPLAY_FORMAT_TYPE {
    // 정액 단일표시
    FIXED_AMT = 'FIXED_AMT',
    // 정률(%) 단일표시 (ex 2%)
    FIXED_RATE = 'FIXED_RATE',
    // 정률 정액 동시표시
    FIRST_FIXED_RATE = 'FIRST_FIXED_RATE',
    // 정액 정률 동시표시
    FIRST_FIXED_AMT = 'FIRST_FIXED_AMT',
}

// 적립금 지급 시점
enum ACCUMULATION_GIVE_POINT {
    // 즉시적립
    IMMEDIATE = 'IMMEDIATE',
    // 익일
    NEXTDAY = 'NEXTDAY',
    // 2일
    DAY_AFTER_TOMMOROW = 'DAY_AFTER_TOMMOROW',
    // 7일
    AFTER_A_WEEK = 'AFTER_A_WEEK',
    // 14일
    AFTER_TWO_WEEK = 'AFTER_TWO_WEEK',
    // 20일
    AFTER_TWENTY_DAYS = 'AFTER_TWENTY_DAYS',
    // 30일
    AFTER_THIRTY_DAYS = 'AFTER_THIRTY_DAYS',
    // 익월
    NEXT_MONTH = 'NEXT_MONTH',
}

// 쇼핑몰 회원 인증 수단
enum AUTHENTICATION_TYPE {
    // 휴대폰 본인 인증
    AUTHENTICATION_BY_PHONE = 'AUTHENTICATION_BY_PHONE',
    // SMS 비점유 인증
    SMS_AUTHENTICATION = 'SMS_AUTHENTICATION',
    // SMS 점유 인증
    SMS_OCCUPANCY_AUTHENTICATION = 'SMS_OCCUPANCY_AUTHENTICATION',
    // EMAIL 인증
    AUTHENTICATION_BY_EMAIL = 'AUTHENTICATION_BY_EMAIL',
    // 인증 없음
    NOT_USED = 'NOT_USED',
}

// 쇼핑몰 회원 인증 시점
enum AUTHENTICATION_TIME_TYPE {
    // 회원가입 시 인증
    JOIN_TIME = 'JOIN_TIME',
    // 최초 상품 구매 시 인증
    PAYMENT_TIME = 'PAYMENT_TIME',
    // 가입 완료 후 바로 인증
    AFTER_JOIN_TIME = 'AFTER_JOIN_TIME',
    // 인증하지 않음
    NONE = 'NONE',
}

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
enum PRODUCT_SALE_STATUS {
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
// 주문상태 값
enum ORDER_STATUS_TYPE {
    // 입금대기
    DEPOSIT_WAIT = 'DEPOSIT_WAIT',
    // 결제완료
    PAY_DONE = 'PAY_DONE',
    // 상품준비중
    PRODUCT_PREPARE = 'PRODUCT_PREPARE',
    // 배송준비중
    DELIVERY_PREPARE = 'DELIVERY_PREPARE',
    // 배송중
    DELIVERY_ING = 'DELIVERY_ING',
    // 배송완료
    DELIVERY_DONE = 'DELIVERY_DONE',
    // 구매확정
    BUY_CONFIRM = 'BUY_CONFIRM',
    // 취소완료
    CANCEL_DONE = 'CANCEL_DONE',
    // 반품완료
    RETURN_DONE = 'RETURN_DONE',
    // 교환완료
    EXCHANGE_DONE = 'EXCHANGE_DONE',
    // 결제대기
    PAY_WAIT = 'PAY_WAIT',
    // 결제포기
    PAY_CANCEL = 'PAY_CANCEL',
    // 결제실패
    PAY_FAIL = 'PAY_FAIL',
    // 삭제
    DELETE = 'DELETE',
    // 교환대기
    EXCHANGE_WAIT = 'EXCHANGE_WAIT',
    // 환불완료
    REFUND_DONE = 'REFUND_DONE',
}

// (현금영수증) 발급용도
enum CASH_RECEIPT_ISSUE_PURPOSE_TYPE {
    // 소득공제용
    INCOME_TAX_DEDUCTION = 'INCOME_TAX_DEDUCTION',
    // 지출증빙용
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

enum INQUIRY_SEARCH_TYPE {
    ALL = 'ALL',
    TITLE = 'TITLE',
    CONTENT = 'CONTENT',
}

enum RESPONSIBLE_OBJECT_TYPE {
    BUYER = 'BUYER',
    SELLER = 'SELLER',
}

enum CLAIM_REASON_TYPE {
    CHANGE_MIND = 'CHANGE_MIND',
    DEFECTIVE_PRODUCT = 'DEFECTIVE_PRODUCT',
    WRONG_DELIVERY = 'WRONG_DELIVERY',
    OUT_OF_STOCK_SYSTEM = 'OUT_OF_STOCK_SYSTEM',
    CANCEL_BEFORE_PAY = 'CANCEL_BEFORE_PAY',
    WRONG_PRODUCT_DETAIL = 'WRONG_PRODUCT_DETAIL',
    DELAY_DELIVERY = 'DELAY_DELIVERY',
    OTHERS_SELLER = 'OTHERS_SELLER',
    OTHERS_BUYER = 'OTHERS_BUYER',
    OUT_OF_STOCK = 'OUT_OF_STOCK',
}

enum RETURN_WAY_TYPE {
    SELLER_COLLECT = 'SELLER_COLLECT',
    BUYER_DIRECT_RETURN = 'BUYER_DIRECT_RETURN',
}

enum DELIVERY_COMPANY_TYPE {
    CJ = 'CJ',
    POST = 'POST',
    HANJIN = 'HANJIN',
    GTX = 'GTX',
    LOOTTE = 'LOTTE',
    KGB = 'KGB',
    LOGEN = 'LOGEN',
    GSI = 'GSI',
    KGL = 'KGL',
    INTRAS = 'INTRAS',
    UPS = 'UPS',
    CHUNIN = 'CHUNIL',
    KDEXP = 'KDEXP',
    HDEXP = 'HDEXP',
    ILYANG = 'ILYANG',
    POST_EMS = 'POST_EMS',
    DAESIN = 'DAESIN',
    CVS = 'CVS',
    DHL = 'DHL',
    FEDEX = 'FEDEX',
    GSM = 'GSM',
    WARPEX = 'WARPEX',
    WIZWA = 'WIZWA',
    ACI = 'ACI',
    PANTOS = 'PANTOS',
    CJ_INTERNATIONAL = 'CJ_INTERNATIONAL',
    TNT = 'TNT',
    CU = 'CU',
    KUNYOUNG = 'KUNYOUNG',
    LOTTE_INTERNATIONAL = 'LOTTE_INTERNATIONAL',
    HONAM = 'HONAM',
    HANIPS = 'HANIPS',
    IPARCEL = 'IPARCEL',
    SLX = 'SLX',
    USPS = 'USPS',
    WONDERS = 'WONDERS',
    REGISTPOST = 'REGISTPOST',
    DHLDE = 'DHLDE',
    EZUSA = 'EZUSA',
    SWGEXP = 'SWGEXP',
    DAEWOON = 'DAEWOON',
    DODOFLEX = 'DODOFLEX',
    NH_LOGIS = 'NH_LOGIS',
    ETC = 'ETC',
}

// 은행 영문 관리명
enum BANK {
    // 미확인은행
    ANONYMOUS = 'ANONYMOUS',
    // 산업은행
    KDB = 'KDB',
    // 기업은행
    IBK = 'IBK',
    // 국민은행
    KB = 'KB',
    // 외환은행
    KEB = 'KEB',
    // 수협
    SUHYUP = 'SUHYUP',
    // 수출입은행
    KEXIM = 'KEXIM',
    // NH농협은향
    NH = 'NH',
    // 지역농축협
    NHLOCAL = 'NHLOCAL',
    // 우리은행
    WOORI = 'WOORI',
    // SC제일은행
    SC = 'SC',
    // 한국씨티은행
    CITY = 'CITY',
    // 대구은행
    DAEGU = 'DAEGU',
    // 부산은행
    PUSAN = 'PUSAN',
    // 광주은행
    GWANGJU = 'GWANGJU',
    // 제주은행
    JEJU = 'JEJU',
    // 전북은행
    JEONBUK = 'JEONBUK',
    // 경남은행
    GYEONGNAM = 'GYEONGNAM',
    // 새마을금고
    KFCC = 'KFCC',
    // 신협
    CU = 'CU',
    // 상호저축은행
    SANGHO = 'SANGHO',
    // HSBC은행
    HSBC = 'HSBC',
    // 도이치은행
    DEUTSCHE = 'DEUTSCHE',
    // 산림조합중앙회
    NFCF = 'NFCF',
    // 우체국
    EPOST = 'EPOST',
    // KEB하나은행
    KEBHANA = 'KEBHANA',
    // 신한은행
    SHINHAN = 'SHINHAN',
    // 케이뱅크
    KBANK = 'KBANK',
    // 카카오뱅크
    KAKAO = 'KAKAO',
    // 토스뱅크
    TOSS = 'TOSS',
    // 유안타증권
    YUANTA = 'YUANTA',
    KBSEC = 'KBSEC',
    MIRAE = 'MIRAE',
    MIRAEDAEWOO = 'MIRAEDAEWOO',
    SAMSUNG = 'SAMSUNG',
    HANKOOK = 'HANKOOK',
    NH_INVEST = 'NH_INVEST',
    KYOBO = 'KYOBO',
    HI_INVEST = 'HI_INVEST',
    HMC_INVEST = 'HMC_INVEST',
    KIWOOM = 'KIWOOM',
    EBEST = 'EBEST',
    SK = 'SK',
    DAISHIN = 'DAISHIN',
    SOLOMON_INVEST = 'SOLOMON_INVEST',
    HANHWA = 'HANHWA',
    HANA_INVEST = 'HANA_INVEST',
    SHINHAN_INVEST = 'SHINHAN_INVEST',
    DONGBU = 'DONGBU',
    EUGENE_INVEST = 'EUGENE_INVEST',
    MERITZ_COMPREHENSIVE = 'MERITZ_COMPREHENSIVE',
    BOOKOOK = 'BOOKOOK',
    SHINYOUNG = 'SHINYOUNG',
    CAPE = 'CAPE',
}

// 정기결제 배송주기 타입
enum CYCLE_TYPE {
    // 월
    MONTH = 'MONTH',
    // 주
    WEEK = 'WEEK',
}

// 배송지 타입
enum ADDRESS_TYPE {
    // 기본주소
    BOOK = 'BOOK',
    // 최근주소
    RECENT = 'RECENT',
    // 정기결제 배송주소
    RECURRING_PAYMENT = 'RECURRING_PAYMENT',
}

// 결제수단
enum PAY_TYPE {
    CREDIT_CARD = 'CREDIT_CARD', // 신용카드
    ACCOUNT = 'ACCOUNT', // 무통장입금
    MOBILE = 'MOBILE', // 휴대폰결제
    REALTIME_ACCOUNT_TRANSFER = 'REALTIME_ACCOUNT_TRANSFER', // 실시간계좌이체
    VIRTUAL_ACCOUNT = 'VIRTUAL_ACCOUNT', // 가상계좌
    GIFT = 'GIFT', // 상품권
    ATM = 'ATM', // ATM
    PAYCO = 'PAYCO', // PAYCO
    ZERO_PAY = 'ZERO_PAY', // 0원결제
    ACCUMULATION = 'ACCUMULATION', // 적립금 전액 사용
    PHONE_BILL = 'PHONE_BILL', // 전화결제
    POINT = 'POINT', // 포인트결제
    YPAY = 'YPAY', // 옐로페이
    KPAY = 'KPAY', // 케이페이
    PAYPIN = 'PAYPIN', // 페이핀
    INIPAY = 'INIPAY', // INIPay 간편결제
    PAYPAL = 'PAYPAL', // PAYPAL
    STRIPE = 'STRIPE', // STRIPE
    NAVER_PAY = 'NAVER_PAY', // 네이버페이 주문형
    KAKAO_PAY = 'KAKAO_PAY', // 카카오페이
    NAVER_EASY_PAY = 'NAVER_EASY_PAY', // 네이버페이 결제형
    SAMSUNG_PAY = 'SAMSUNG_PAY', // 삼성페이
    CHAI = 'CHAI', // 차이
    TOSS_PAY = 'TOSS_PAY', // 토스페이
    ESCROW_REALTIME_ACCOUNT_TRANSFER = 'ESCROW_REALTIME_ACCOUNT_TRANSFER', // 실시간계좌이체 - 에스크로
    ESCROW_VIRTUAL_ACCOUNT = 'ESCROW_VIRTUAL_ACCOUNT', // 가상계좌 - 에스크로
    RENTAL = 'RENTAL',
    VERITRANS_CARD = 'VERITRANS_CARD', // Veritrans CreditCard
    TOASTCAM = 'TOASTCAM', // 토스트캠
    ETC = 'ETC', // 기타결제수단
}

enum PG_TYPE {
    DUMMY = 'DUMMY',
    PAYCO = 'PAYCO',
    PAYPAL = 'PAYPAL',
    STRIPE = 'STRIPE',
    KCP = 'KCP',
    INICIS = 'INICIS',
    NONE = 'NONE',
    KCP_MOBILE = 'KCP_MOBILE',
    KCP_APP = 'KCP_APP',
    NAVER_PAY = 'NAVER_PAY',
    LIIVMATE = 'LIIVMATE',
    PAYPALPRO = 'PAYPALPRO',
    ATHOR_NET = 'ATHOR_NET',
    KAKAO_PAY = 'KAKAO_PAY',
    NAVER_EASY_PAY = 'NAVER_EASY_PAY',
    LG_U_PLUS = 'LG_U_PLUS',
    TOSS_PAYMENTS = 'TOSS_PAYMENTS',
    CHAI = 'CHAI',
    SMARTRO_PAY = 'SMARTRO_PAY',
    VERITRANS = 'VERITRANS',
}

enum DOMESTIC {
    TRUE = 'true',
    FALSE = 'false',
    NULL = 'null',
}

enum ACCUMULATION_REASON {
    ADD = 'ADD',
    SUB = 'SUB',
}

enum SHOPBY_TERMS_TYPES {
    MALL_INTRODUCTION = 'MALL_INTRODUCTION',
    USE = 'USE',
    E_COMMERCE = 'E_COMMERCE',
    PI_PROCESS = 'PI_PROCESS',
    PI_COLLECTION_AND_USE_REQUIRED = 'PI_COLLECTION_AND_USE_REQUIRED',
    PI_COLLECTION_AND_USE_OPTIONAL = 'PI_COLLECTION_AND_USE_OPTIONAL',
    PI_PROCESS_CONSIGNMENT = 'PI_PROCESS_CONSIGNMENT',
    PI_THIRD_PARTY_PROVISION = 'PI_THIRD_PARTY_PROVISION',
    PI_COLLECTION_AND_USE_FOR_GUEST_ON_ARTICLE = 'PI_COLLECTION_AND_USE_FOR_GUEST_ON_ARTICLE',
    ACCESS_GUIDE = 'ACCESS_GUIDE',
    WITHDRAWAL_GUIDE = 'WITHDRAWAL_GUIDE',
    PI_SELLER_PROVISION = 'PI_SELLER_PROVISION',
    PI_COLLECTION_AND_USE_ON_ORDER = 'PI_COLLECTION_AND_USE_ON_ORDER',
    ORDER_INFO_AGREE = 'ORDER_INFO_AGREE',
    CLEARANCE_INFO_COLLECTION_AND_USE = 'CLEARANCE_INFO_COLLECTION_AND_USE',
    TRANSFER_AGREE = 'TRANSFER_AGREE',
    REGULAR_PAYMENT_USE = 'REGULAR_PAYMENT_USE',
    AUTO_APPROVAL_USE = 'AUTO_APPROVAL_USE',
    PI_LIQUOR_PURCHASE_PROVISION = 'PI_LIQUOR_PURCHASE_PROVISION',
    PI_RESTOCK_NOTICE = 'PI_RESTOCK_NOTICE',
}

enum VC_TERMS_TYPES {
    LOCATION_INFO = 'LOCATION_INFO',
    LOCATION_SERVICE = 'LOCATION_SERVICE',
    VSE = 'VSE',
}

enum COUPON_TYPES {
    PRODUCT = 'PRODUCT', // 상품적용 쿠폰
    CART = 'CART', // 주문적용 쿠폰
    CART_DELIVERY = 'CART_DELIVERY', // 장바구니 배송비 할인
}

// 쿠폰 대상 종류
enum COUPON_TARGET_TYPES {
    ALL_PRODUCT = 'ALL_PRODUCT', // 전상품
    PRODUCT = 'PRODUCT', // 개별상품
    BRAND = 'BRAND', // 브랜드
    CATEGORY = 'CATEGORY', // 카테고리
    PARTNER = 'PARTNER', // 파트너사
}

// 사용가능 플랫폼
enum USABLE_PLATFORMS {
    PC = 'PC',
    MOBILE_WEB = 'MOBILE_WEB',
    MOBILE_APP = 'MOBILE_APP',
}

// 환불 예상 방법
enum REFUND_TYPE {
    // PG 환불
    PG = 'PG',
    // 입금 전 취소,
    CANCEL_DEPOSIT = 'CANCEL_DEPOSIT',
    // 무통장입금 환불,
    ACCOUNT = 'ACCOUNT',
    // 적립금 환불,
    ACCUMULATION = 'ACCUMULATION',
    // 0원 환불,
    ZERO_REFUND = 'ZERO_REFUND',
    // 현금 환불,
    CASH = 'CASH',
    // 페이코 환불,
    PAYCO = 'PAYCO',
    // PAYPAL 환불,
    PAYPAL = 'PAYPAL',
    // STRIPE 환불,
    STRIPE = 'STRIPE',
    // KCP 환불,
    KCP = 'KCP',
    // 신용카드 환불,
    CREDIT_CARD = 'CREDIT_CARD',
    // 리브메이트 환불,
    LIIVMATE = 'LIIVMATE',
    // 이니시스 환불,
    INICIS = 'INICIS',
    // 네이버페이(간펼결제) 환불,
    NAVER_EASY_PAY = 'NAVER_EASY_PAY',
    // 카카오페이 환불,
    KAKAO_PAY = 'KAKAO_PAY',
    // 네이버(주문형) 환불
    NAVER_PAY = 'NAVER_PAY',
    // 토스페이먼츠 환불
    LG_U_PLUS = 'LG_U_PLUS',
    // 토스페이먼츠 환불
    TOSS_PAYMENTS = 'TOSS_PAYMENTS',
    // 강제 환불,
    FORCE_REFUND = 'FORCE_REFUND',
    // 없음
    DUMMY = 'DUMMY',
}

export {
    REQUIRED_TYPE,
    IMAGE_DISPLAY_TYPE,
    BOARD_DISPLAY_TYPE,
    INTRO_REDIRECTION_TYPE,
    PRODUCT_ACCUMULATION_BASIS_TYPE,
    ACCUMULATION_DISPLAY_FORMAT_TYPE,
    ACCUMULATION_GIVE_POINT,
    AUTHENTICATION_TYPE,
    AUTHENTICATION_TIME_TYPE,
    AUTH_TYPE,
    CERTIFICATED_USAGE,
    PLATFORM_TYPE,
    OPEN_ID_PROVIDER,
    ORDER_DIRECTION,
    PRODUCT_DIRECTION,
    ORDER_BY,
    BY,
    SALE_STATUS,
    PRODUCT_SALE_STATUS,
    INQUIRY_TYPE,
    SEARCH_TYPE,
    PAGE_TYPE,
    BEST_REVIEW_YN,
    MY_REVIEW_YN,
    HAS_ATTACHMENT_FILE,
    REPORT_REASON_CODE,
    SEX,
    OPEN_ID_TERM,
    ORDER_REQUEST_TYPE,
    CASH_RECEIPT_ISSUE_PURPOSE_TYPE,
    CLAIM_TYPE,
    COUNTRY_CD,
    REPLY_TYPE,
    CRITERION,
    DISCOUNTED_COMPARISON,
    DELIVERY_CONDITION_TYPE,
    ORDER_STATUS_TYPE,
    PRODUCT_BY,
    SHIPPING_AREA_TYPE,
    CHANNEL_TYPE,
    INQUIRY_SEARCH_TYPE,
    RESPONSIBLE_OBJECT_TYPE,
    CLAIM_REASON_TYPE,
    RETURN_WAY_TYPE,
    DELIVERY_COMPANY_TYPE,
    BANK,
    CYCLE_TYPE,
    ADDRESS_TYPE,
    PAY_TYPE,
    PG_TYPE,
    DOMESTIC,
    ACCUMULATION_REASON,
    SHOPBY_TERMS_TYPES,
    VC_TERMS_TYPES,
    COUPON_TYPES,
    COUPON_TARGET_TYPES,
    USABLE_PLATFORMS,
    REFUND_TYPE,
};
