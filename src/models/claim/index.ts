import {
    CLAIM_TYPE,
    RESPONSIBLE_OBJECT_TYPE,
    CLAIM_REASON_TYPE,
    RETURN_WAY_TYPE,
    DELIVERY_COMPANY_TYPE,
    BANK,
    REFUND_TYPE,
    CLAIM_CLASS_TYPE,
    PAY_TYPE,
    PG_TYPE,
    COUNTRY_CD,
} from 'models';
import {
    DeliveryAmtInfo,
    OrderOption,
    ProductAmtInfo,
    ReturnAddress,
} from 'models/order';

// 추가결제방법
type AdditionalPayType = 'CASH' | 'ACCUMULATION' | 'NAVER_PAY';

// 계좌정보
interface BankAccountInfo {
    // 계좌번호 (nullable, optional) (example: 1002134134983)
    bankAccount?: string;
    // 예금주명 (nullable, optional) (example: 홍길동)
    bankDepositorName?: string;
    // 은행 코드 (nullable, optional) (example: KDB)
    bank?: BANK;
    // 은행명 (nullable, optional) (example: 산업은행)
    bankName?: string;
}

// 환불 계좌 정보
export interface RefundAccountInfo {
    // 계좌소유자명 (nullable, optional) example: 홍길동
    depositorName?: string;
    // 은행코드 (nullable, optional) (example: KB)
    bank?: BANK;
    // 계좌번호 (nullable, optional) (example: 123-12-1234)
    account?: string;
}

// interface ReturnAddress {
//     addressNo: number;
//     receiverName: string;
//     addressName: string;
//     receiverContact1: string;
//     receiverContact2?: string;
//     receiverZipCd: string;
//     receiverAddress: string;
//     receiverJibunAddress: string;
//     receiverDetailAddress: string;
//     customsIdNumber: string;
//     countryCd: string;
//     deliveryMemo: string;
// }

// 주문상품옵션정보
interface ClaimedProductOption {
    // 취소/반품할 제품수량 (example: 1)
    productCnt: number;
    // 주문 상품 옵선 번호 (example: 1)
    orderProductOptionNo: number;
}

// 교환할 옵션
interface ExchangeOption {
    // 입력값들
    inputTexts: {
        // 구매자 작성형 입력 값 (nullable, optional) (example: HGD)
        inputValue?: string;
        // 구매자 작성형 입력 이름 (nullable, optional) (example: 이니셜)
        inputLabel?: string;
    }[];
    // 교환상품수량 (example: 0)
    orderCnt: number;
    // 교환상품수량 (example: 0)
    optionNo: number;
    // 교환상품의 몰상품번호 (example: 0)
    productNo: number;
    // 교환상품의 추가상품 번호 (example: 1)
    additionalProductNo: number;
}

// 귀책 - responsibleObjectType이 null이면 ClaimReasonType에 매핑되는 귀책 적용 (nullable) (example: BUYER)
type ResponsibleObjectType = Nullable<RESPONSIBLE_OBJECT_TYPE>;

export interface CancelOptionsBody {
    // 상세사유 (example: 다른상품구매)
    claimReasonDetail: string;
    // 귀책
    responsibleObjectType: ResponsibleObjectType;
    // 클레임타입 (example: CANCEL)
    claimType: Omit<CLAIM_TYPE, 'NONE'>;
    // 주문상품옵션정보
    claimedProductOptions: ClaimedProductOption[];
    // 환불계좌정보 저장 여부 (example: true)
    saveBankAccountInfo: boolean;
    // 계좌정보 (nullable)
    bankAccountInfo?: BankAccountInfo;
    // 클레임사유 (example: CHANGE_MIND)
    claimReasonType: CLAIM_REASON_TYPE;
    // 즉시환불여부(기본 값: true)(서비스 플랜이 프리미엄이고, 주문상태가 결제완료인 옵션인 경우 즉시환불 가능) (example: true)
    refundsImmediately: boolean;
}

export interface GetEstimatedRefundPriceBody {
    // 귀책 - responsibleObjectType이 null이면 ClaimReasonType에 매핑되는 귀책 적용 (nullable) (example: BUYER)
    responsibleObjectType: ResponsibleObjectType;
    // 주문상품옵션정보
    claimedProductOptions: ClaimedProductOption[];
    // 클레임타입 (example: CANCEL)
    claimType: Omit<CLAIM_TYPE, 'NONE'>;
    // 취소/반품할 제품수량
    productCnt: number;
    // 클레임사유 (example: CHANGE_MIND)
    claimReasonType: CLAIM_REASON_TYPE;
    // 반품상품 수거방법 (nullable) (example: SELLER_COLLECT)
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

export interface ExchangeRequest {
    exchangeAddress: Omit<ReturnAddress, 'addressNo' | 'addressName'> & {
        addressView: string;
    };
    exchangeOption: ExchangeOption;
}

export interface MemberClaim {
    // 클레임사유상세 (nullable) (example: 변심)
    claimReasonDetail: Nullable<string>;
    // 취소/반품상품상품들
    claimedProductOptions: ClaimedProductOption[];
    // 클레임타입 (example: CANCEL)
    claimType: Omit<CLAIM_TYPE, 'NONE'>;
    // 클레임번호 (example: 1)
    claimNo: number;
    // 주문번호 (example: 1)
    orderNo: string;
    // 클레임사유 (example: CHANGE_MIND)
    claimReasonType: CLAIM_REASON_TYPE;
    // 주문일자 (example: YYYY-MM-DD hh:mm:ss)
    orderYmdt: string;
    // 클레임신청일시 (example: YYYY-MM-DD hh:mm:ss)
    claimYmdt: string;
    // 클레임금액정보 (nullable)
    claimPriceInfo: Nullable<ClaimPriceInfo>;
}

// 금액정보
export interface ClaimPriceInfo {
    // 차감금액정보
    subtractionAmtInfo: {
        // 총주문차감금액
        totalAmt: number;

        // 배송비쿠폰 변경금액 (example: 0)
        deliveryCouponAmt: number;

        // 환불금액조정사유 (nullable) (example: 오배송)
        refundAdjustReason: string;

        // 환불금액조정 (example: 0)
        refundAdjustAmt: number;

        // 장바구니쿠폰 변경금액 (example: 0)
        cartCouponAmt: number;
    };
    // 환불방법(노출용) (example: 신용카드)
    refundTypeLabel: string;
    // 환불금액(적립금제외) (example: 1000)
    refundMainPayAmt: number;
    // 환불방법 (nullable) (example: CANCEL_DEPOSIT), TODO: omit
    refundType: Nullable<REFUND_TYPE>;
    // 배송비정보
    deliveryAmtInfo: ClaimDeliveyAmtInfo;
    // 적립금환불금액 (example: 1000)
    refundSubPayAmt: number;
    // 환불금액(적립금포함) (example: 1000)
    refundPayAmt: number;
    // 추가결제금액 (example: 1000)
    additionalPayAmt: number;
    // 환불결제방법 (nullable) (example: CREDIT_CARD)
    refundPayType: Nullable<REFUND_TYPE>;
    // 상품금액정보, TODO: models/order/index.ts 의 productAmyInfo와 뭐가 다른지 체크
    productAmtInfo: ClaimProductAmtInfo;
}

export interface ClaimDeliveyAmtInfo extends DeliveryAmtInfo {
    // 변경 전 지역별 배송비 (example: 0)
    beforeRemoteDeliveryAmt: number;
    // 변경 후 지역별 배송비 (example: 0)
    afterRemoteDeliveryAmt: number;
}

export interface ClaimProductAmtInfo
    extends Omit<ProductAmtInfo, 'returnImmediateDiscountedPrice'> {
    // 사은품할인금액 (example: 0)
    freeGiftDiscountAmt: number;
}

export interface GetClaimDetailByClaimNoResponse {
    // 클레임사유상세 (nullable) (example: 다른상품구매)
    claimReasonDetail: Nullable<string>;
    // 반품배송정보 (nullable)
    returnDelivery: Nullable<{
        // 택배사명 (nullable) (example: CJ대한통운)
        deliveryCompanyTypeLabel: string;
        // 택배사타입 (nullable) (example: CJ)
        deliveryCompanyType: Nullable<DELIVERY_COMPANY_TYPE>;
        // 송장번호 (nullable) (example: 123455)
        invoiceNo: Nullable<string>;
        // 무적반품(임의반품) 여부 (example: false)
        evadesReturnProcess: boolean;
    }>;
    // claimedOptions	[...]

    // 클레임번호 (example: 1)
    claimNo: number;
    // exchangedOption	{...}

    // 클레임사유 (example: CHANGE_MIND)
    claimReasonType: CLAIM_REASON_TYPE;
    // 반품상품 수거방법 (nullable) (example: SELLER_COLLECT)
    returnWayType: Nullable<RETURN_WAY_TYPE>;
    // 주문옵션번호 (example: 1)
    orderProductOptionNo: number;
    // 클레임신청일시 (example: YYYY-MM-DD hh:mm:ss)
    claimYmdt: string;
    // 교환 추가금액 결제 정보 (nullable)
    exchangePayInfo: Nullable<ExchangePayInfo>;
    // 출고전교환인경우 true (example: true)
    exchangeBeforeDelivery: boolean;
    // 반품/교환 이미지 첨부파일 url 리스트 (nullable) (example: url1,url2)
    claimImageUrls: string[];
    // claimedOption	{...}

    // 반품수거지 (nullable)
    returnAddress: Nullable<Omit<ReturnAddress, 'customsIdNumber'>>;
    // 환불방법 (nullable) (example: CANCEL_DEPOSIT)
    refundType: REFUND_TYPE;
    // 클레임타입 (example: CANCEL)
    claimType: Omit<CLAIM_TYPE, 'NONE'>;
    // 교환배송지 (nullable)
    exchangeAddress: Nullable<Omit<ReturnAddress, 'customsIdNumber'>>;
    // 클레임종류 (example: OPTION_CANCEL)
    claimClassType: CLAIM_CLASS_TYPE;
    // 금액정보
    claimPriceInfo: ClaimPriceInfo;
    // 환불계좌 정보(무통장 및 가상계좌) (nullable)
    refundBankAccount: Nullable<RefundAccountInfo>;
}

// 교환 추가금액 결제 정보
export interface ExchangePayInfo {
    // 교환금액 (example: 10000)
    exchangePayAmt: number;
    // 계좌정보 (nullable)
    bankAccount: Nullable<BankAccountInfo>;
    // 결제방법 (nullable) (example: CASH)
    payType: Nullable<'CASH' | 'ACCUMULATION' | 'NAVER_PAY'>;
    // 입금자 (nullable) (example: 홍길동)
    remitter: Nullable<string>;
}

export interface ClaimOrderOption extends OrderOption {
    // 클레임사유 (example: CHANGE_MIND)
    claimReasonType: CLAIM_REASON_TYPE;
    // 수량할인 여부
    isQuantityDiscount: boolean;
    // 결제수단 (example: CREDIT_CARD)
    payType: string;
    // 상세사유 (nullable) (example: 상세사유)
    claimReasonDetail: Nullable<string>;
    // PG타입 (example: PAYCO)
    pgType: PG_TYPE;
}

// export interface RequestExchangeBody
//     extends Omit<GetEstimatedRefundPriceBody, 'claimedProductOptions'>,
//         ReturnOption,
//         ExchangeRequest {}

export interface RequestExchangeBody {
    // 상세사유 (example: 다른상품구매)
    claimReasonDetail: string;
    // 귀책
    responsibleObjectType: ResponsibleObjectType;
    // 입금자명(추가결제시) (nullable, optional)
    additionalPayRemitter?: string;
    // 환불계좌정보 (nullable)
    bankAccountInfo?: BankAccountInfo;
    // 취소 / 반품할 제품수량 (example: 1)
    productCnt: number;
    // 클레임사유 (example: CHANGE_MIND)
    claimReasonType: CLAIM_REASON_TYPE;
    // 반품수거방법(SELLER_COLLECT 일 경우 returnAddress(반품수거주소지) 입력 필요) (nullable) (example: SELLER_COLLECT)
    returnWayType: RETURN_WAY_TYPE;
    // 택배사타입 (nullable) (example: CJ)
    deliveryCompanyType?: DELIVERY_COMPANY_TYPE;
    // 첨부파일 url 리스트 (5개까지 가능) (nullable) (example: url1,url2)
    claimImageUrls: string[];
    // 반품수거 주소지(배송상품인 경우 필수, 배송안함상품인 경우 null 가능) (nullable, optional)
    returnAddress?: ClaimAddress;
    // 추가결제입금계좌(추가결제시) (nullable, optional)
    additionalPayBankAccount?: BankAccountInfo;
    // 환불계좌정보 저장 여부 (nullable, optional) (example: true)
    saveBankAccountInfo?: boolean;
    // 추가결제방법 (nullable, optional) (example: CASH,ACCUMULATION)
    additionalPayType?: AdditionalPayType;
    // 교환출고지주소 (nullable, optional)
    exchangeAddress?: ClaimAddress;
    // 교환할 옵션
    exchangeOption: ExchangeOption;
    // 송장번호 (nullable, optional) (example: 123455)
    invoiceNo?: string;
}

// 교환, 반품시 사용하는 출고지 주소
export interface ClaimAddress {
    // 수령자주소 (example: 서울특별시 구로구 디지털로26길 72)
    receiverAddress: string;
    // 연락처2 (example: 01012341234)
    addressView: string;
    // 수령자지번주소 (nullable, optional) (example: 서울특별시 구로구 구로동 222-22)
    receiverJibunAddress?: string;
    // 수령자명 (example: 홍길동)
    receiverName: string;
    // 개인통관고유부호(해외배송상품인 경우 필수) (nullable, optional) (example: P12341234123412)
    customsIdNumber?: string;
    // 국가코드 (example: KR)
    countryCd: COUNTRY_CD;
    // 수령자우편번호 (example: 12345)
    receiverZipCd: string;
    // 수령자상세주소 (nullable, optional) (example: NHN한국사이버결제 3층)
    receiverDetailAddress?: string;
    // 배송메모 (nullable, optional) (example: 택배실에 맡겨 주세요.)
    deliveryMemo?: string;
    // 수령자연락처1 (example: 01012341234)
    receiverContact1: string;
    // 수령자연락처2 (nullable, optional) (example: 01011111111)
    receiverContact2?: string;
}
