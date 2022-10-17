import {
    CASH_RECEIPT_ISSUE_PURPOSE_TYPE,
    COUNTRY_CD,
    ORDER_REQUEST_TYPE,
    REPLY_TYPE,
    CYCLE_TYPE,
    ADDRESS_TYPE,
    PAY_TYPE,
    PG_TYPE,
    NCP_OPEN_ID_PROVIDER,
} from 'models';

// 상품쿠폰
interface ProductCoupons {
    // 쿠폰 발급 번호 (example: 1415130)
    couponIssueNo: number;
    // 상품번호(example: 100398947)
    productNo: number;
}

interface PaymentProductCoupons {
    couponIssueNo: number;
    promotionCode?: string;
    productNo: number;
}

// 정기결제 배송 정보
interface RecurringPaymentDelivery {
    // 정기결제 배송주기 일자 (example: 20)
    data: number;
    // 정기결제 배송주기 타입 (example: MONTH)
    cycleType: CYCLE_TYPE;
    // 정기결제 첫 배송 예정일 (example: YYYY-MM-DD)
    firstRecurringDate: string;
    // 정기결제 배송주기 (example: 1)
    cycle: number;
}

export interface OptionInputs {
    inputValue: string;
    inputLabel: string;
    required: boolean;
}

// 상품결제 파라미터
export interface Products {
    // 렌탈 정보 (nullable)
    rentalInfos?: RentalInfo[];
    // 정기결제 배송 정보
    recurringPaymentDelivery?: RecurringPaymentDelivery;
    channelType: string;
    // 주문수량 (example: 1)
    orderCnt: number;
    optionInputs?: OptionInputs[];
    // 옵션번호 (example: 1258932)
    optionNo: number;
    // 상품번호 (example: 100398947)
    productNo: number;
}

// 주소
export interface AddressRequest {
    // 	배송지 주소 (example: 경기도 성남시 분당구 대왕판교로645번길 12)
    receiverAddress: string;
    // 배송지 지번(지역추가배송비계산 시 사용) (example: 경기도 성남시 분당구 삼평동 629번지 NHN 플레이뮤지엄)
    receiverJibunAddress?: string;
    // 기본배송지 여부 (example: false), TODO: boolean인지 string인지 확인 필요
    defaultYn: string;
    // 배송지타입 (example: BOOK)
    addressType: ADDRESS_TYPE;
    // 수령자 명 (example: 홍길동)
    receiverName: string;
    // 개인고유통관부호 (nullable) (example: P12341234)
    customsIdNumber?: string;
    // 국가코드 (example: KR)
    countryCd?: COUNTRY_CD;
    // 배송지 우편 번호 (example: 13487)
    receiverZipCd: string;
    // 주소록명 (example: 홍길동집)
    addressName?: string;
    // 배송지 상세 주소 (example: 16 NHN 플레이뮤지엄)
    receiverDetailAddress?: string;
    // 연락처1( example: 010-0000-0000)
    receiverContact1: string;
    // 연락처2( example: 010-0000-0000)
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

// 무통장 입금 정보
interface BankAccountToDeposit {
    // 계좌번호 (example: 1234123)
    bankAccount: string;
    // 은행명 (example: 002)
    bankCode: string;
    // 입금자명 (example: 홍길동)
    bankDepositorName: string;
}

interface PaymentCoupons {
    productCoupons: PaymentProductCoupons[];
    cartCouponIssueNo?: number;
    promotionCode?: string;
}

// 쿠폰
export interface CouponRequest {
    // 상품 쿠폰 (nullable)
    productCoupons?: ProductCoupons[];
    // 장바구니 쿠폰 발행 번호 (example: 12121212)
    cartCouponIssueNo?: number;
    // 쿠폰 할인 코드 (example: 1258932)
    promotionCode?: string;
    // 쇼핑채널링-채널타입 (example: NAVER_EP)
    channelType: string;
}

export interface CouponApplyResponse {
    deliveryGroups: DeliveryGroup;
    appliedCoupons: AppliedCoupons;
    availablePayTypes: AvailablePayType;
    paymentInfo: PaymentInfo;
}

// 복수 배송지 정보
interface ShippingAddresses {
    // 상품결제 파라미터
    payProductParams: Omit<Products, 'channelType'>[];
    // 배송지정일 (example: YYYY-MM-DD)
    requestShippingDate?: string;
    // 배송지 번호(0:신규, 0이상:이전배송지) (example: 1)
    addressNo: number;
    // 배송지 나중입력 여부 (true: 나중입력, false: 바로입력) (example: false)
    usesShippingInfoLaterInput?: boolean;
    // 기본 주소지 설정 여부 (true 이면 선택한 배송지 정보가 기본주소지로 설정되어 저장된다) (true: 설정, false: 미설정) (example: false)
    useDefaultAddress: boolean;
    // TODO: 배송지 정보
    shippingAddress: Omit<AddressRequest, 'addressType'>;
    // 주소록명 (example: 홍길동집)
    addressName: string;
    // 배송지 나중입력 연락처(example: 010-7770-7777)
    shippingInfoLaterInputContact?: string;
}

interface Orderer {
    ordererEmail?: string;
    ordererContact1: string;
    ordererContact2?: string;
    ordererName: string;
}

// TOOD: cartNo, optionNo차이?
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

// 현금영수증
export interface CashReceiptBody {
    // 발급용도 (example: INCOME_TAX_DEDUCTION)
    cashReceiptIssuePurposeType: CASH_RECEIPT_ISSUE_PURPOSE_TYPE;
    // 발급용도에 따른 키(소득공제용: 휴대폰번호, 지출증빙용: 사업자번호) (example: 01011111111)
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
    // 적립금 사용액(example: 0)
    accumulationUseAmt: number;
    // 복수 배송지 정보
    shippingAddress: ShippingAddresses[];
}

export interface PaymentReserve {
    // 결제완료 API 호출 후 다시 전달 받을 값(NCPPay script에서 넣음) (nullable) (example: {"mallNo" : "1", "orderName" : "주문테스트"})
    clientParams?: ClientParams;
    // 	추가 정보 (ex : Stripe결제수단의 경우 카드 정보 or 저장된 카드의 cardId) (nullable) (example: {'cardNumber':4242424242424242, 'cardExpMonth':12, 'cardExpYear':'2020', 'cardCvc':'123', 'saveYn':'Y'} or {'cardId':'card_12354123124'})
    extraData?: ExtraData | ExtraData2;
    // 주문메모 (nullable) (example: 빠른 배송 부탁 드립니다.)
    orderMemo?: string;
    // 무통장 입금 정보
    bankAccountToDeposit?: BankAccountToDeposit;
    // 렌탈 상품 정보
    rentalInfo?: RentalInfo;
    // 결제수단 (example: CREDIT_CARD)
    payType: PAY_TYPE;
    // 결제 완료 후 리턴되는 쇼핑몰의 URL (example: http://쇼핑몰 URL/return.html)
    // URL 의 파라미터중
    // result=SUCCESS 인 경우 : 성공 페이지 구현 (orderNo 파라미터로 주문정보 출력가능)
    // result=FAIL 인 경우 : message 값을 화면이나 경고창으로 출력함
    clientReturnUrl: string;
    // TODO
    coupons?: PaymentCoupons;
    // 기본 주소지 설정 여부 (true: 선택한 배송지 정보가 기본주소지로 설정, false: 미설정) (nullable) (example: true)
    useDefaultAddress?: boolean;
    // 회원 여부 (example: true)
    member: boolean;
    // 앱내 결제 여부, Y인 경우 extraData.appUrl에 결제완료 후 돌아갈 app scheme을 넣어야 함 (nullable) (example: Y)
    inAppYn?: string;
    // 무통장 거래 시 현금영수증 발행 신청 여부(true: 신청, false: 미신청) * kcp 현금영수증 발행 대행 서비스 사용 시 true (nullable) (example: false)
    applyCashReceipt?: boolean;
    // PG 명세서에 표시될 주문명 (nullable)^|테스트상품 외 2건(default생성)
    orderTitle?: string;
    // 임시주문번호(비회원인경우 필수) (nullable) (example: 1212)
    tempPassword?: string;
    // 주소록에 등록 여부 (example: true)
    // (true 이면 선택한 배송지 정보가 주소록에 저장된다.
    // 이미 저장된 주소록을 선택하여 주소를 수정했다면, 변경한 주소로 수정되어 저장한다)
    saveAddressBook: boolean;
    // true 인 경우 주문자 정보로 회원의 정보를 수정함. 몰설정에서 회원의 점유인증을 하지 않는 경우에만 update 된다. (example: false)
    updateMember: boolean;
    // 주문서번호 (example: 202001012000000009)
    orderSheetNo: string;
    // 외부 PG사 (example: KCP)
    pgType: PG_TYPE;
    // 무통장 입금 시 입금할 입금자 이름 (nullable) (example: 홍길동)
    remitter?: string;
    // 배송메모 (nullable) (example: 문앞에 놔주세요)
    deliveryMemo?: string;
    // TODO
    orderer: Orderer;
    // 선택한 결제수단 사용여부(true: 사용, false: 미사용) (nullable) (example: false)
    paymentAmtForVerification: number;
    // TODO
    shippingAddress: MainAddress &
        Omit<DeliveryBody, 'deliveryMemo'> &
        Pick<
            ShippingAddresses,
            | 'requestShippingDate'
            | 'shippingInfoLaterInputContact'
            | 'usesShippingInfoLaterInput'
        >;
    // 선택한 결제수단 사용여부(true: 사용, false: 미사용) (nullable) (example: false)
    savesLastPayType?: boolean;
    // 보조결제 수단 결제액(적립금 사용액) (example: 0)
    subPayAmt: number;
    // 현금영수증
    cashReceipt?: CashReceiptBody;
    // TODO
    shippingAddresses?: ShippingAddresses & { savedAddressBook?: boolean }[];
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
    provider: NCP_OPEN_ID_PROVIDER;
    nextUrl: string;
    state?: string;
    code: string;
}

// 렌탈 정보
export interface RentalInfo {
    // 렌탈 기간 (example: 1)
    rentalPeriod: number;
    // 월 렌탈료 (example: 10000)
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
    validInfo?: ValidInfo;
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
    recentAddresses: MainAddress[];
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
    addressName?: string;
    receiverContact1: string;
    receiverContact2?: string;
    customsIdNumber?: string;
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
    // 보유한 적립금
    accumulationAmt: number;
    // 구매확정시 예상 적립금
    accumulationAmtWhenBuyConfirm: number;
    // 최대 사용가능한 적립금
    availableMaxAccumulationAmt: number;
    // buyAmt[장바구니 금액] = totalStandardAmt[최종상품금액] - totalImmediateDiscountAmt[즉시할인가] - totalAdditionalDiscountAmt[추가할인가] - productCouponAmt[상품쿠폰할인금액]
    cartAmt: number;
    // 장바구니 쿠폰 할인금액
    cartCouponAmt: number;
    // customs Duty [관세] (미국 몰 전용)
    customsDuty: number;
    // 배송비
    deliveryAmt: number;
    // 착불 배송비
    deliveryAmtOnDelivery: number;
    // 배송비 쿠폰 할인금액
    deliveryCouponAmt: number;
    // 적립금 사용 가능 여부 (true: 가능, false: 불가능)
    isAvailableAccumulation: boolean;
    // 적립금을 사용할 수 있는 최소 적립금 기준
    minAccumulationLimit: number;
    // 적립금을 사용할 수 있는 최소 결제 금액 기준
    minPriceLimit: number;
    // paymentAmt[결제예정금액] = buyAmt[장바구니 금액] - cartCouponAmt[장바구니 쿠폰할인금액] + deliveryAmt[배송비] + remoteDeliveryAmt[지역별추가배송비] + salesTaxAmt - deliveryCouponAmt[배송비 쿠폰 할인금액] (- usedAccumulationAmt[사용한적립금]:OrderSheet시점에는 hidden)
    paymentAmt: number;
    // productAmt[상품금액] = totalStandardAmt[최종상품금액] - totalImmediateDiscountAmt[즉시할인가] - totalAdditionalDiscountAmt[추가할인가]
    productAmt: number;
    // 상품쿠폰 할인금액(상품쿠폰 + 플러스쿠폰)
    productCouponAmt: number;
    // 추가배송비(조건에 의해 계산되어진)
    remoteDeliveryAmt: number;
    // 착불 지역별 추가 배송비
    remoteDeliveryAmtOnDelivery: number;
    // sales Tax (미국 몰 전용)
    salesTaxAmt: number;
    // additionalDiscountAmt[추가할인가] * orderCnt[구매수량]
    totalAdditionalDiscountAmt: number;
    // immediateDiscountAmt[즉시할인가] * orderCnt[구매수량]
    totalImmediateDiscountAmt: number;
    // standardPrice[최종상품금액] (salePrice[판매가] + addPrice[옵션추가금액]) * orderCnt[구매수량]
    totalStandardAmt: number;
    // 사용한 적립금
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

export interface ShippingAddressResponse {
    recentAddresses: MainAddress[];
    recurringPaymentAddresses: MainAddress[];
    bookedAddresses: MainAddress[];
    defaultAddress: MainAddress;
}

export interface ApplyCouponResponse {
    orderSheetNo: string;
    products: Product[];
    cartAmt: number;
    cartCoupons: CartCoupon[];
    deliveryAmt: number;
    productCouponDiscountAmt: number;
    cartCouponDiscountAmt: number;
    deliveryCouponDiscountAmt: number;
    deliveryCoupons: any[];
}

export interface Product {
    productNo: number;
    brandName: string;
    productName: string;
    mainOption: string;
    optionInputs: any;
    buyAmt: number;
    productCouponDiscountAmt: number;
    optionCnt: number;
    totalOrderCnt: number;
    productCoupons: ProductCoupon[];
    invalidProductCoupons: any[];
    productPlusCoupons: any[];
}

export interface ProductCoupon {
    couponIssueNo: number;
    couponNo: number;
    discountRate: number;
    freeDeliveryYn: string;
    couponName: string;
    reason: string;
    couponType: string;
    couponTargetType: string;
    usablePlatformTypes: string;
    useEndYmdt: string;
    fixedAmountDiscount: boolean;
    maxDiscountAmt: number;
    freeDelivery: boolean;
    otherCouponUsable: boolean;
    cartCouponUsable: boolean;
    productCouponUsable: boolean;
    limitPayType: string;
    displayCouponName: string;
    skipsAccumulation: boolean;
    minSalePrice: any;
    maxSalePrice: any;
    maximum: boolean;
    selected: boolean;
    used: boolean;
    couponDiscountAmt: number;
}

export interface CartCoupon {
    couponIssueNo: number;
    couponNo: number;
    discountRate: number;
    freeDeliveryYn: string;
    couponName: string;
    reason: string;
    couponType: string;
    couponTargetType: string;
    usablePlatformTypes: string;
    useEndYmdt: string;
    fixedAmountDiscount: boolean;
    maxDiscountAmt: number;
    freeDelivery: boolean;
    otherCouponUsable: boolean;
    cartCouponUsable: boolean;
    productCouponUsable: boolean;
    limitPayType: string;
    displayCouponName: string;
    skipsAccumulation: boolean;
    minSalePrice: any;
    maxSalePrice: any;
    maximum: boolean;
    selected: boolean;
    used: boolean;
    couponDiscountAmt: number;
}

export interface GuestOrderDetailResponse {
    // deprecated(더 이상 제공하지 않는 개체항목입니다)
    insurance: Insurance;
    // 추가 정보 (nullable)
    extraData: Nullable<string>;
    // 구매확정 시 적립예정 적립금 (example: 0)
    accumulationAmtWhenBuyConfirm: number;
    // 기본 주문 상태 (example: DEPOSIT_WAIT)
    defaultOrderStatusType: string;
    // PG사 결제키 (example: testtest)
    pgMallKey: string;
    // 배송지 메모 (example: 배송지 메모 내용)
    memo: string;
    // 최초주문금액정보
    firstOrderAmount: FirstOrderAmount;
    // 주문메모 (nullable) (example: 선물포장 부탁드립니다)
    orderMemo: Nullable<string>;
    // 개인통관고유부호필요여부(true: 필요, false: 불필요) (example: false)
    requireCustomsIdNumber: boolean;

    // 환불(예상)방법(PG) (example: PG)
    refundType: string;
}

// TODO: 회원 / 비회원(guestOrder.issueToken) 확인해볼것
export interface OrderDetailResponse {
    orderNo: string;
    orderYmdt: string;
    payType: string;
    payInfo: PayInfo;
    pgType: string;
    pgMallKey: string;
    pgOrderNo: string;
    escrow: boolean;
    orderMemo: string;
    orderOptionsGroupByPartner: OrderOptionsGroupByPartner[];
    guestToken: any;
    refundInfos: RefundInfo[];
    additionalPayInfos: AdditionalPayInfo[];
    exchangePayInfos: ExchangePayInfo[];
    member: boolean;
    firstOrderAmount: FirstOrderAmount;
    lastOrderAmount: LastOrderAmount;
    shippingAddress: ShippingAddress;
    orderer: Orderer;
    billingAddress: any;
    nextActions: NextAction2[];
    receiptInfos: ReceiptInfo[];
    claimReasonTypes: ClaimReasonType[];
    refundType: string;
    refundPayType: string;
    refundTypeLabel: string;
    memo: string;
    deliveryMemo: string;
    extraData: ExtraData;
    insurance: Insurance;
    availableBanks: AvailableBank[];
    requireCustomsIdNumber: boolean;
    defaultOrderStatusType: string;
    payTypeLabel: string;
    accumulationAmtWhenBuyConfirm: number;
}

export interface PayInfo {
    payType: string;
    cardInfo: any;
    bankInfo: BankInfo;
    naverPayInfo: any;
    cashAuthNo: any;
    cashNo: any;
    tradeNo: any;
    escrowYn: string;
    payAmt: number;
    sellerCouponAmt: number;
    pgCouponAmt: number;
    cardCouponAmt: number;
    pointAmt: number;
    taxType: any;
    mobileInfo: any;
}

export interface BankInfo {
    bank: string;
    bankCode: string;
    bankName: string;
    account: string;
    bankAmt: number;
    depositAmt: number;
    depositYmdt: string;
    remitterName: string;
    depositorName: string;
    paymentExpirationYmdt: string;
}

export interface OrderOptionsGroupByPartner {
    partnerNo: number;
    partnerName: string;
    orderOptionsGroupByDelivery: OrderOptionsGroupByDelivery[];
}

export interface OrderOptionsGroupByDelivery {
    deliveryNo: number;
    deliveryAmt: number;
    remoteDeliveryAmt: number;
    returnDeliveryAmt: number;
    deliveryType: string;
    deliveryCompanyType: string;
    invoiceNo: string;
    deliveryPayType: string;
    deliveryMemo: any;
    retrieveInvoiceUrl: string;
    orderOptions: OrderOption[];
    receiverName: string;
    receiverContact1: string;
    receiverContact2: string;
    receiverAddress: string;
    receiverZipCd: string;
    receiverDetailAddress: string;
    receiverJibunAddress: any;
    requestShippingDate: any;
    usesShippingInfoLaterInput: boolean;
    shippingAreaType: string;
    partnerNo: number;
    partnerName: string;
    shippingMethodType: any;
    shippingMethodLabel: any;
    frontDisplayText: any;
    deliveryCompanyTypeLabel: string;
}

export interface OrderOption {
    orderNo: string;
    orderOptionNo: number;
    productNo: number;
    partnerName: string;
    optionNo: number;
    additionalProductNo: number;
    imageUrl: string;
    brandNo: number;
    brandName: string;
    brandNameEn: string;
    productName: string;
    productNameEn: string;
    optionName: string;
    optionValue: string;
    optionUsed: boolean;
    optionType: string;
    orderCnt: number;
    orderStatusType: string;
    claimStatusType: any;
    orderStatusDate: OrderStatusDate;
    claimNo: any;
    accumulationAmt: number;
    refundable: boolean;
    deliveryInternationalYn: boolean;
    reservationDeliveryYmdt: any;
    exchangeYn: string;
    member: boolean;
    deliverable: boolean;
    inputs: any[];
    nextActions: NextAction[];
    optionManagementCd: string;
    delivery: Delivery;
    price: Price;
    reservation: boolean;
    isFreeGift: boolean;
    setOptions: SetOption[];
    isRecurringPayment: boolean;
    holdDelivery: boolean;
    optionTitle: string;
    orderStatusTypeLabel: string;
    claimStatusTypeLabel: any;
}

export interface OrderStatusDate {
    registerYmdt: string;
    buyConfirmYmdt: any;
    reviewableYmdt: any;
    payYmdt: any;
}

export interface NextAction {
    nextActionType: string;
    uri: string;
    actionGroupType: string;
}

export interface Delivery {
    invoiceNo: any;
    deliveryCompanyType: any;
    retrieveInvoiceUrl: any;
    deliveryType: string;
    usesShippingInfoLaterInput: boolean;
    deliveryCompanyTypeLabel: any;
}

export interface Price {
    standardPrice: number;
    immediateDiscountedPrice: number;
    buyPrice: number;
    standardAmt: number;
    immediateDiscountedAmt: number;
    buyAmt: number;
    salePrice: number;
    addPrice: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    accumulationRate: number;
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

export interface RefundInfo {
    claimNo: number;
    productAmtInfo: ProductAmtInfo;
    deliveryAmtInfo: DeliveryAmtInfo;
    subtractionAmtInfo: SubtractionAmtInfo;
    returnWayType: string;
    returnAddress: ReturnAddress;
    returnInvoiceNo: any;
    returnDeliveryCompanyTypeLabel: any;
    exchangeAddress: ExchangeAddress;
    claimImageUrls: any[];
    exchangeOrderOption: any;
    claimClassType: any;
    refundBankAccount: RefundBankAccount;
    refundPayAmt: number;
    refundSubPayAmt: number;
    refundType: string;
    refundPayType: string;
    refundTypeLabel: string;
    refundMainPayAmt: number;
}

export interface ProductAmtInfo {
    immediateDiscountedPrice: number;
    discountAmt: number;
    standardPrice: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    productCouponDiscountAmt: number;
    exchangeImmediateDiscountedPrice: number;
    returnImmediateDiscountedPrice: number;
    exchangeDiscountAmt: number;
    exchangeAdjustAmt: number;
    totalAmt: number;
}

export interface DeliveryAmtInfo {
    beforeDeliveryAmt: number;
    afterDeliveryAmt: number;
    refundDeliveryAmt: number;
    payOnDelivery: boolean;
    sellerFault: boolean;
    returnDeliveryAmt: number;
    returnAdjustAmt: number;
    buyerReturn: boolean;
    exchangeDeliveryAmt: number;
    exchangeAdjustAmt: number;
    totalAmt: number;
}

export interface SubtractionAmtInfo {
    cartCouponAmt: number;
    deliveryCouponAmt: number;
    refundAdjustAmt: number;
    refundAdjustReason: string;
    totalAmt: number;
}

export interface ReturnAddress {
    name: string;
    contact1: string;
    contact2: any;
    zipCd: string;
    address: string;
    jibunAddress: string;
    detailAddress: string;
    note: string;
    addressStr: string;
    customsIdNumber: any;
}

export interface ExchangeAddress {
    name: string;
    contact1: string;
    contact2: any;
    zipCd: string;
    address: string;
    jibunAddress: string;
    detailAddress: string;
    note: string;
    addressStr: string;
    customsIdNumber: any;
}

export interface RefundBankAccount {
    bank: string;
    bankAccount: string;
    bankDepositorName: string;
    bankName: string;
}

export interface AdditionalPayInfo {
    claimNo: number;
    productAmtInfo: ProductAmtInfo2;
    deliveryAmtInfo: DeliveryAmtInfo2;
    subtractionAmtInfo: SubtractionAmtInfo2;
    returnWayType: any;
    returnAddress: ReturnAddress2;
    returnInvoiceNo: any;
    returnDeliveryCompanyTypeLabel: any;
    exchangeAddress: ExchangeAddress2;
    claimImageUrls: any[];
    exchangeOrderOption: any;
    claimClassType: any;
    bankAccount: BankAccount;
    remitter: string;
    payType: string;
    exchangePayAmt: number;
}

export interface ProductAmtInfo2 {
    immediateDiscountedPrice: number;
    discountAmt: number;
    standardPrice: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    productCouponDiscountAmt: number;
    exchangeImmediateDiscountedPrice: number;
    returnImmediateDiscountedPrice: number;
    exchangeDiscountAmt: number;
    exchangeAdjustAmt: number;
    totalAmt: number;
}

export interface DeliveryAmtInfo2 {
    beforeDeliveryAmt: number;
    afterDeliveryAmt: number;
    refundDeliveryAmt: number;
    payOnDelivery: boolean;
    sellerFault: boolean;
    returnDeliveryAmt: number;
    returnAdjustAmt: number;
    buyerReturn: boolean;
    exchangeDeliveryAmt: number;
    exchangeAdjustAmt: number;
    totalAmt: number;
}

export interface SubtractionAmtInfo2 {
    cartCouponAmt: number;
    deliveryCouponAmt: number;
    refundAdjustAmt: number;
    refundAdjustReason: string;
    totalAmt: number;
}

export interface ReturnAddress2 {
    name: string;
    contact1: string;
    contact2: any;
    zipCd: string;
    address: string;
    jibunAddress: string;
    detailAddress: string;
    note: string;
    addressStr: string;
    customsIdNumber: any;
}

export interface ExchangeAddress2 {
    name: string;
    contact1: string;
    contact2: any;
    zipCd: string;
    address: string;
    jibunAddress: string;
    detailAddress: string;
    note: string;
    addressStr: string;
    customsIdNumber: any;
}

export interface BankAccount {
    bank: string;
    bankAccount: string;
    bankDepositorName: string;
    bankName: string;
}

export interface ExchangePayInfo {
    exchangePayAmt: number;
    payType: string;
    bankAccount: BankAccount2;
    remitter: string;
}

export interface BankAccount2 {
    bank: string;
    bankAccount: string;
    bankDepositorName: string;
    bankName: string;
}

// 최초주문금액정보
export interface FirstOrderAmount {
    // 총 상품금액 (example: 10000)
    totalProductAmt: number;
    // 총 추가할인 금액 (example: 0)
    additionalDiscountAmt: number;
    // 총 즉시할인 금액 (example: 0)
    immediateDiscountAmt: number;
    // 사용자 결제 금액 (example: 10000)
    chargeAmt: number;
    // 총 배송비 (example: 2500)
    deliveryAmt: number;
    // 배송비쿠폰 할인 금액 (example: 0)
    deliveryCouponDiscountAmt: number;
    // 총 상품정상금액(즉시할인, 추가할인 제외) (example: 7500)
    standardAmt: number;
    // 총 지역추가배송비 (example: 0)
    remoteDeliveryAmt: number;
    // 주문쿠폰할인 금액 (example: 0)
    cartCouponDiscountAmt: number;
    // 총 상품쿠폰할인 금액 (example: 0)
    productCouponDiscountAmt: number;
    // 보조결제금액(적립금) (example: 2000)
    subPayAmt: number;
    // 결제금액 (example: 10000)
    payAmt: number;
}

export interface LastOrderAmount {
    payAmt: number;
    subPayAmt: number;
    standardAmt: number;
    deliveryAmt: number;
    remoteDeliveryAmt: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    cartCouponDiscountAmt: number;
    productCouponDiscountAmt: number;
    deliveryCouponDiscountAmt: number;
    totalProductAmt: number;
    chargeAmt: number;
}

export interface ShippingAddress {
    addressNo: number;
    receiverZipCd: string;
    receiverAddress: string;
    receiverJibunAddress: string;
    receiverDetailAddress: string;
    receiverName: string;
    addressName: any;
    receiverContact1: string;
    receiverContact2: any;
    customsIdNumber: any;
    countryCd: string;
}

export interface NextAction2 {
    nextActionType: string;
    uri: string;
    actionGroupType: string;
}

export interface ReceiptInfo {
    receiptType: string;
    url: string;
}

export interface ClaimReasonType {
    claimReasonType: string;
    label: string;
    responsibleObjectType: string;
}

// deprecated(더 이상 제공하지 않는 개체항목입니다)
export interface Insurance {
    // deprecated(더 이상 제공하지 않는 개체항목입니다)
    no: string;
    // deprecated(더 이상 제공하지 않는 개체항목입니다)
    type: string;
    // deprecated(더 이상 제공하지 않는 개체항목입니다)
    url: string;
}

export interface AvailableBank {
    bank: string;
    label: string;
}

export interface OrderSummary {
    depositWaitCnt: number; // 입금대기
    payDoneCnt: number; // 결제완료
    productPrepareCnt: number; // 상품준비중
    deliveryPrepareCnt: number; // 배송준비중
    deliveryIngCnt: number; // 배송중
    deliveryDoneCnt: number; // 배송완료
    buyConfirmCnt: number; // 구매확정
    cancelProcessingCnt: number; // 취소진행중
    cancelDoneCnt: number; // 취소완료
    exchangeProcessingCnt: number; // 교환진행중
    exchangeDoneCnt: number; // 교환완료
    returnProcessingCnt: number; // 반품진행중
    returnDoneCnt: number; // 반품완료
}
