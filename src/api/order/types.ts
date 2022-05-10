export enum ORDER_REQUEST_TYPE {
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

export enum CASH_RECEIPT_ISSUE_PURPOSE_TYPE {
    INCOME_TAX_DEDUCTION = 'INCOME_TAX_DEDUCTION',
    PROOF_EXPENDITURE = 'PROOF_EXPENDITURE',
}

export enum CLAIM_TYPE {
    CANCEL = 'CANCEL',
    RETURN = 'RETURN',
    EXCHANGE = 'EXCHANGE',
    NONE = 'NONE',
}

export enum COUNTRY_CD {
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

export enum REPLY_TYPE {
    EMAIL = 'EMAIL',
    SMS = 'SMS',
}

export type GuestToken = {
    guestToken: String;
};

export interface OptionInputsParams {
    inputValue: String | null;
    inputLabel: String | null;
}

export interface ShoppingCartBody {
    orderCnt: Number;
    channelType: String;
    optionInputs: OptionInputsParams[];
    optionNo: Number;
    productNo: Number;
    cartNo: Number;
}

export interface TokenIssueBody {
    password: String | null;
    name: String | null;
    mobileNo: String | null;
    email: String | null;
    orderRequestType: ORDER_REQUEST_TYPE;
}

export interface ReceiptBody {
    cashReceiptIssuePurposeType: CASH_RECEIPT_ISSUE_PURPOSE_TYPE;
    cashReceiptKey: String;
}

export interface DeliveryBody {
    receiverZipCd: String;
    receiverAddress: String;
    receiverJibunAddress: String; // 대한민국 주소의 경우는 필수 값
    receiverDetailAddress: String;
    receiverName: String;
    receiverContact1: String;
    receiverContact2: String | null;
    customsIdNumber: String | null;
    countryCd: COUNTRY_CD | null; // default mall의 국가코드
    deliveryMemo: String | null;
}

export interface PasswordParams {
    replyType: REPLY_TYPE;
    mobileNo?: String;
    email?: String;
    name?: String;
}
