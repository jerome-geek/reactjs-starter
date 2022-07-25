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

export interface Products {
    rentalInfos?: RentalInfo[];
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

export interface ShoppingCartBody {
    orderCnt: number;
    channelType: string;
    optionInputs?: OptionInputs[];
    optionNo: number;
    productNo: number;
    cartNo?: number;
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
    rentalInfo: RentalInfo;
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

export interface RentalInfo {
    rentalPeriod: number;
    monthlyRentalAmount: number;
}
export interface CartList {
    deliveryGroups: DeliveryGroup[];
    invalidProducts: InvalidProduct[];
    price: CartPrice;
}

export interface DeliveryGroup {
    orderProducts: OrderProduct[];
    deliveryAmt: number;
    deliveryPayType: string;
    deliveryCondition: DeliveryCondition;
    partnerName: string;
    partnerNo: number;
    deliveryTemplateNo: number;
    deliveryTemplateGroupNo: number;
}

export interface OrderProduct {
    productNo: number;
    imageUrl: string;
    brandNo: number;
    brandName: string;
    productName: string;
    liked: boolean;
    optionUsed: boolean;
    deliverable: boolean;
    deliveryInternational: boolean;
    refundable: boolean;
    orderProductOptions: OrderProductOption[];
    brandNameEn: string;
    deliveryDate: DeliveryDate;
    hsCode: string;
    eanCode: string;
    shippingAreaType: string;
    selectType: any;
    maxBuyCountInfo: MaxBuyCountInfo;
    minBuyCount: number;
    accumulationUsable: boolean;
    couponUsable: boolean;
    buyAmt: number;
}

export interface OrderProductOption {
    optionManagementCd: string;
    price: Price;
    cartNo: number;
    imageUrl: string;
    optionName: string;
    optionValue: string;
    orderCnt: number;
    stockCnt: number;
    optionType: string;
    accumulationAmtWhenBuyConfirm: number;
    productNo: number;
    optionNo: number;
    optionInputs: OptionInputs[];
    validInfo: ValidInfo;
    reservation: boolean;
    reservationDeliveryYmdt: string;
    setOptions: SetOption[];
    recurringDeliveryCycles: any;
    soldOut: boolean;
    optionTitle: string;
}

export interface Price {
    salePrice: number;
    addPrice: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    buyAmt: number;
    standardAmt: number;
}

export interface OptionInput {
    inputLabel: string;
    inputValue: string;
    required: any;
}

export interface ValidInfo {
    errorCode: string;
    message: string;
    orderCntChangeable: boolean;
    valid: boolean;
    validYn: string;
}

export interface DeliveryDate {
    daysAfterPurchase: number;
    daysOfWeek: string[];
    period: Period;
}

export interface Period {
    startYmdt: string;
    endYmdt: string;
}

export interface MaxBuyCountInfo {
    maxBuyPersonCount: number;
    maxBuyTimeCount: number;
    maxBuyDays: number;
    maxBuyPeriodCount: number;
}

export interface DeliveryCondition {
    deliveryAmt: number;
    remoteDeliveryAmt: number;
    returnDeliveryAmt: number;
    aboveDeliveryAmt: number;
    baseDeliveryAmt: number;
    deliveryConditionType: string;
    groupDeliveryAmtType: string;
    chargesRemoteDeliveryAmt: boolean;
}

export interface InvalidProduct {
    productNo: number;
    imageUrl: string;
    brandNo: number;
    brandName: string;
    productName: string;
    liked: boolean;
    optionUsed: boolean;
    deliverable: boolean;
    deliveryInternational: boolean;
    refundable: boolean;
    orderProductOptions: OrderProductOption[];
    brandNameEn: string;
    deliveryDate: DeliveryDate2;
    hsCode: string;
    eanCode: string;
    shippingAreaType: string;
    selectType: any;
    maxBuyCountInfo: MaxBuyCountInfo;
    minBuyCount: number;
    accumulationUsable: boolean;
    couponUsable: boolean;
    buyAmt: number;
}

export interface DeliveryDate2 {
    daysAfterPurchase: number;
    daysOfWeek: string[];
    period: Period2;
}

export interface Period2 {
    startYmdt: string;
    endYmdt: string;
}

export interface CartPrice {
    buyAmt: number;
    accumulationAmtWhenBuyConfirm: number;
    standardAmt: number;
    discountAmt: number;
    totalDeliveryAmt: number;
    totalPrePaidDeliveryAmt: number;
    totalPayOnDeliveryAmt: number;
    totalAmt: number;
}

export interface OrderSheetResponse {
    deliveryGroups: DeliveryGroup[];
    orderSheetPromotionSummary: OrderSheetPromotionSummary;
    orderSheetAddress: OrderSheetAddress;
    ordererContact: OrdererContact;
    appliedCoupons: AppliedCoupons;
    lastPayType: string;
    paymentInfo: PaymentInfo;
    tradeBankAccountInfos: TradeBankAccountInfo[];
    availablePayTypes: AvailablePayType[];
    foreignPartners: ForeignPartner[];
    sellerPrivacyUsagePartners: SellerPrivacyUsagePartner[];
    applyCashReceiptForAccount: boolean;
    agreementTypes: string[];
    requireCustomsIdNumber: boolean;
    freeGiftInfos: FreeGiftInfo[];
    rentalInfos: RentalInfo[];
    invalidProducts: any;
}

export interface DeliveryGroup {
    orderProducts: OrderProduct[];
    deliveryAmt: number;
    deliveryPayType: string;
    deliveryCondition: DeliveryCondition;
    partnerName: string;
    partnerNo: number;
}

export interface OrderProduct {
    productNo: number;
    imageUrl: string;
    brandNo: number;
    brandName: string;
    productName: string;
    liked: boolean;
    optionUsed: boolean;
    deliverable: boolean;
    deliveryInternational: boolean;
    refundable: boolean;
    orderProductOptions: OrderProductOption[];
    brandNameEn: string;
    deliveryDate: DeliveryDate;
    shippingAreaType: string;
    accumulationUsable: boolean;
    couponUsable: boolean;
    categoryNos: number[];
    buyAmt: number;
    additionalProducts: any[];
}

export interface ErrorCode {
    code: string;
    simpleCode: string;
}

export interface Price {
    salePrice: number;
    addPrice: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    standardAmt: number;
    buyAmt: number;
}

export interface SetOption {
    mallProductNo: number;
    productManagementCd: string;
    productName: string;
    mallOptionNo: number;
    optionManagementCd: string;
    optionName: string;
    optionValue: string;
    usesOption: boolean;
    count: number;
    optionPrice: number;
    stockNo: number;
    sku: string;
    optionNameForDisplay: string;
}

export interface DeliveryDate {
    daysAfterPurchase: number;
    daysOfWeek: string[];
    period: Period;
}

export interface Period {
    startYmdt: string;
    endYmdt: string;
}

export interface DeliveryCondition {
    deliveryAmt: number;
    remoteDeliveryAmt: number;
    returnDeliveryAmt: number;
    aboveDeliveryAmt: number;
    baseDeliveryAmt: number;
    deliveryConditionType: string;
    groupDeliveryAmtType: string;
    chargesRemoteDeliveryAmt: boolean;
}

export interface OrderSheetPromotionSummary {
    usableCouponCnt: number;
    myCouponCnt: number;
    usableDeliveryCouponCnt: number;
    myDeliveryCouponCnt: number;
    myAccumulationAmt: number;
}

export interface OrderSheetAddress {
    mainAddress: MainAddress;
    recentAddresses: RecentAddress[];
    memberAddress: MemberAddress;
    recentDeliveryMemo: any[];
}

export interface MainAddress {
    addressNo: number;
    receiverZipCd: string;
    receiverAddress: string;
    receiverJibunAddress: string;
    receiverDetailAddress: string;
    receiverName: string;
    addressName: string;
    receiverContact1: string;
    receiverContact2: string;
    customsIdNumber: string;
    countryCd: string;
}

export interface RecentAddress {
    addressNo: number;
    receiverZipCd: string;
    receiverAddress: string;
    receiverJibunAddress: string;
    receiverDetailAddress: string;
    receiverName: string;
    addressName: string;
    receiverContact1: string;
    receiverContact2: string;
    customsIdNumber: string;
    countryCd: string;
}

export interface MemberAddress {
    zipCd: string;
    address: string;
    detailAddress: string;
    jibunAddress: string;
    jibunDetailAddress: string;
}

export interface OrdererContact {
    ordererName: string;
    ordererContact1: string;
    ordererContact2: string;
    ordererEmail: string;
}

export interface AppliedCoupons {
    cartCouponIssueNo: number;
    promotionCode: string;
    productCoupons: ProductCoupon[];
}

export interface ProductCoupon {
    productNo: number;
    couponIssueNo: number;
}

export interface PaymentInfo {
    accumulationAmt: number;
    accumulationAmtWhenBuyConfirm: number;
    availableMaxAccumulationAmt: number;
    cartAmt: number;
    cartCouponAmt: number;
    customsDuty: number;
    deliveryAmt: number;
    deliveryAmtOnDelivery: number;
    deliveryCouponAmt: number;
    isAvailableAccumulation: boolean;
    minAccumulationLimit: number;
    minPriceLimit: number;
    paymentAmt: number;
    productAmt: number;
    productCouponAmt: number;
    remoteDeliveryAmt: number;
    remoteDeliveryAmtOnDelivery: number;
    salesTaxAmt: number;
    totalAdditionalDiscountAmt: number;
    totalImmediateDiscountAmt: number;
    totalStandardAmt: number;
    usedAccumulationAmt: number;
}

export interface TradeBankAccountInfo {
    bankAccount: string;
    bankCode: string;
    bankDepositorName: string;
    bankName: string;
}

export interface AvailablePayType {
    payType: string;
    pgTypes: string[];
}

export interface ForeignPartner {
    partnerName: string;
    countryCd: string;
    privacyManagerName: string;
    privacyManagerPhoneNo: string;
}

export interface SellerPrivacyUsagePartner {
    partnerName: string;
}

export interface FreeGiftInfo {
    giveConditionName: string;
    giveStartYmdt: string;
    giveEndYmdt: string;
    freeGifts: FreeGift[];
}

export interface FreeGift {
    productName: string;
    optionName: string;
    optionValue: string;
    mallProductMainImageUrl: string;
}

export interface RentalInfo {
    rentalPeriod: number;
    monthlyRentalAmount: number;
}
