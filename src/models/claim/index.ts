import {
    CLAIM_TYPE,
    RESPONSIBLE_OBJECT_TYPE,
    CLAIM_REASON_TYPE,
    RETURN_WAY_TYPE,
    DELIVERY_COMPANY_TYPE,
    BANK,
} from 'models';

interface BankAccountInfo {
    bankAccount?: string;
    bankDepositorName?: string;
    bank: string;
    bankName?: string;
}

interface ReturnAddress {
    addressNo: number;
    receiverName: string;
    addressName: string;
    receiverContact1: string;
    receiverContact2?: string;
    receiverZipCd: string;
    receiverAddress: string;
    receiverJibunAddress: string;
    receiverDetailAddress: string;
    customsIdNumber: string;
    countryCd: string;
    deliveryMemo: string;
}

interface ClaimedProductOption {
    orderProductOptionNo: number;
    productCnt: number;
}

interface InputText {
    inputValue?: string;
    inputLabel?: string;
}

interface ExchangeOption {
    inputTexts: InputText[];
    orderCnt: number;
    optionNo: number;
    productNo: number;
    additionalProductNo: number;
}

export interface CancelOptions {
    claimReasonDetail: string;
    responsibleObjectType: RESPONSIBLE_OBJECT_TYPE;
    claimType: Omit<CLAIM_TYPE, 'NONE'>;
    claimedProductOptions: ClaimedProductOption[];
    saveBankAccountInfo?: boolean;
    bankAccountInfo?: BankAccountInfo;
    claimReasonType: CLAIM_REASON_TYPE;
    refundsImmediately: boolean;
}

export interface CanceledPrice {
    responsibleObjectType?: RESPONSIBLE_OBJECT_TYPE;
    claimedProductOptions: ClaimedProductOption[];
    claimType: Omit<CLAIM_TYPE, 'NONE'>;
    productCnt: number;
    claimReasonType: CLAIM_REASON_TYPE;
    returnWayType?: RETURN_WAY_TYPE;
}

export interface ReturnOption {
    claimImageUrls?: string[];
    claimReasonDetail?: string;
    bankAccountInfo: BankAccountInfo;
    saveBankAccountInfo?: boolean;
    returnAddress: ReturnAddress;
    deliveryCompanyType?: DELIVERY_COMPANY_TYPE;
    invoiceNo?: string;
}

export interface ReturnAccount {
    depositorName?: string;
    bank?: BANK;
    account?: string;
}

export interface ExchangeRequest {
    exchangeAddress: Omit<ReturnAddress, 'addressNo' | 'addressName'> & {
        addressView: string;
    };
    exchangeOption: ExchangeOption;
}
