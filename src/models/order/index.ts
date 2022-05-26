import {
    CASH_RECEIPT_ISSUE_PURPOSE_TYPE,
    COUNTRY_CD,
    ORDER_REQUEST_TYPE,
    REPLY_TYPE,
} from 'models';

export interface OptionInputsParams {
    inputValue?: string;
    inputLabel?: string;
}

export interface ShoppingCartBody {
    orderCnt: number;
    channelType: string;
    optionInputs: OptionInputsParams[];
    optionNo: number;
    productNo: number;
    cartNo: number;
}

export interface TokenIssueBody {
    password?: string;
    name?: string;
    mobileNo?: string;
    email?: string;
    orderRequestType: ORDER_REQUEST_TYPE;
}

export interface ReceiptBody {
    cashReceiptIssuePurposeType: CASH_RECEIPT_ISSUE_PURPOSE_TYPE;
    cashReceiptKey: string;
}

export interface DeliveryBody {
    receiverZipCd: string;
    receiverAddress: string;
    receiverJibunAddress: string; // 대한민국 주소의 경우는 필수 값
    receiverDetailAddress: string;
    receiverName: string;
    receiverContact1: string;
    receiverContact2?: string;
    customIdNumber?: string;
    countryCd?: COUNTRY_CD; // default mall의 국가코드
    deliveryMemo?: string;
}

export interface PasswordParams {
    replyType: REPLY_TYPE;
    mobileNo?: string;
    email?: string;
    name?: string;
}
