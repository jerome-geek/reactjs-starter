import {
    CASH_RECEIPT_ISSUE_PURPOSE_TYPE,
    COUNTRY_CD,
    ORDER_REQUEST_TYPE,
    REPLY_TYPE,
    CYCLE_TYPE,
    ADDRESS_TYPE,
    PAY_TYPE,
    PG_TYPE,
    OPEN_ID_PROVIDER,
} from 'models';

interface ProductCoupons {
    couponIssueNo: number;
    mallProductNo: number;
}

interface PaymentProductCoupons {
    couponIssueNo: number;
    promotionCode?: string;
    productNo: number;
}

interface RentalInfos {
    rentalPeriod: number;
    monthlyRentalAmount: number;
}

interface RecurringPaymentDelivery {
    data: number;
    cycleType: CYCLE_TYPE;
    firstRecurringDate: string;
    cycle: number;
}

interface OptionInputs {
    inputValue: string;
    inputLabel: string;
    required: boolean;
}

interface Products {
    rentalInfos?: RentalInfos[];
    recurringPaymentDelivery?: RecurringPaymentDelivery;
    channelType: string;
    orderCnt: number;
    optionInputs?: OptionInputs[];
    optionNo: number;
    productNo: number;
}

export interface AddressRequest {
    receiverAddress: string;
    receiverJibunAddress?: string;
    defaultYn: string; // boolean?
    addressType: ADDRESS_TYPE;
    receiverName: string;
    customsIdNumber?: string;
    countryCd?: COUNTRY_CD;
    receiverZipCd: string;
    addressName?: string;
    receiverDetailAddress?: string;
    receiverContact1: string;
    receiverContact2: string;
}

interface ClientParams {
    mallNo: string;
    orderName: string;
}

interface ExtraData {
    cardNumber: number;
    cardExpMonth: number;
    cardExpYear: number;
    cardCvc: number;
    saveYn: boolean;
}

interface ExtraData2 {
    cardId: string;
}

interface BankAccountToDeposit {
    bankAccount: string;
    bankCode: string;
    bankDepositorName: string;
}

interface PaymentCoupons {
    productCoupons: PaymentProductCoupons[];
    cartCouponIssueNo?: number;
    promotionCode?: string;
}

export interface CouponRequest {
    productCoupons?: ProductCoupons[];
    cartCouponIssueNo: number;
    promotionCode: string;
    channelType: string;
}

interface ShippingAddresses {
    payProductParams: Omit<Products, 'channelType'>[];
    requestShippingDate: string;
    addressNo: number;
    usesShippingInfoLaterInput: boolean;
    useDefaultAddress: boolean;
    shippingAddress: Omit<AddressRequest, 'addressType'>;
    addressName: string;
    shippingInfoLaterInputContact: string;
}

interface Orderer {
    orderEmail?: string;
    orderContact1: string;
    orderContact2?: string;
    orderName: string;
}

export interface OptionInputsParams {
    inputValue: string;
    inputLabel: string;
    required: boolean;
}

export interface ShoppingCartBody {
    orderCnt: number;
    channelType: string;
    optionInputs?: OptionInputsParams[];
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
    receiverZipCd: string; //sdf
    receiverAddress: string; //sdf
    receiverJibunAddress: string; // 대한민국 주소의 경우는 필수 값//sdf
    receiverDetailAddress: string; //sdf
    receiverName: string; //sdf
    receiverContact1: string; //sdf
    receiverContact2?: string; //sdf
    customIdNumber?: string; //sdf
    countryCd?: COUNTRY_CD; // default mall의 국가코드//sdf
    deliveryMemo?: string;
}

export interface PasswordParams {
    replyType: REPLY_TYPE;
    mobileNo?: string;
    email?: string;
    name?: string;
}

export interface OrderSheetBody {
    productCoupons?: ProductCoupons[];
    trackingKey: string;
    cartNos?: number[];
    channelType: string;
    products: Products[];
}

export interface GetCalculatedOrderSheet {
    addressRequest: AddressRequest;
    couponRequest: CouponRequest;
    accumulationUseAmt: number;
    shippingAddress: ShippingAddresses[];
}

export interface PaymentReserve {
    clientParams?: ClientParams; // 결제 완료 API 호출 후 다시 전달 받을 값(NCPPay script에서 넣음)
    extraData?: ExtraData | ExtraData2;
    orderMemo?: string;
    bankAccountToDeposit: BankAccountToDeposit;
    rentalInfo: RentalInfos;
    payType: PAY_TYPE;
    clientReturnUrl: string; //결제 완료 후 리턴 될 URL(NCPPay script에서 넣음)
    coupons: PaymentCoupons;
    useDefaultAddress: boolean;
    member: boolean;
    inAppYn?: string;
    applyCashReceipt?: boolean;
    orderTitle?: string;
    tempPassword?: string;
    saveAddressBook: boolean;
    updateMember: boolean;
    orderSheetNo: string;
    pgType: PG_TYPE;
    remitter?: string;
    deliveryMemo?: string;
    orderer: Orderer;
    paymentAmtForVerification: number;
    shippingAddress: Pick<
        ShippingAddresses,
        | 'requestShippingDate'
        | 'usesShippingInfoLaterInput'
        | 'addressName'
        | 'shippingInfoLaterInputContact'
    > &
        Omit<DeliveryBody, 'deliveryMemo'>;
    savesLastPayType?: boolean;
    subPayAmt: number;
    cashReceipt: ReceiptBody;
    shippingAddresses: ShippingAddresses & { savedAddressBook?: boolean };
}

export interface NaverPayOrderSheet {
    orderSheetNo?: string;
    clientReturnUrl: string;
    nvadid?: string;
    naco?: string;
    items: Omit<ShoppingCartBody, 'cartNo'> &
        { additionalProductNo?: number }[];
}

export interface OAuthBegin {
    clientId: string;
    provider: OPEN_ID_PROVIDER;
    nextUrl: string;
    state?: string;
    code: string;
}

export interface OrderSheetResponse {
    products: Products[];
    productCoupons: any[];
    cartNos: any[];
    trackingKey: string;
    channelType: string;
}

export interface RentalInfo {
    rentalPeriod: number;
    monthlyRentalAmount: number;
}
