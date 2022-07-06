import {
    CRITERION,
    DELIVERY_CONDITION_TYPE,
    DISCOUNTED_COMPARISON,
    ORDER_DIRECTION,
    PRODUCT_BY,
    PRODUCT_DIRECTION,
    PRODUCT_SALE_STATUS,
    SHIPPING_AREA_TYPE,
} from 'models';

export interface BrandsParams {
    filter?: { name?: string; categoryNo?: number };
    pageNumber?: number;
    pageSize?: number;
    hasTotalCount?: boolean;
    fromDB?: boolean;
    sort?: { criterion?: CRITERION; direction?: PRODUCT_DIRECTION };
}

export interface ProductsParams {
    deliveryTemplateNo: number;
    hasOptionValues?: boolean;
    pageSize?: number;
    pageNumber?: number;
    productSort?: {
        criterion?: CRITERION;
        direction?: PRODUCT_DIRECTION;
    };
}

export interface RestockParams {
    optionNos: number[];
    privacyInfoAgreement: boolean;
    name: string;
    phone: string;
}

export interface GroupCodeParams {
    groupManagementCodes: string[];
    saleStatus?: PRODUCT_SALE_STATUS;
    isSoldOut?: boolean;
}

export interface ProductSearchParams {
    filter?: {
        discountedPrices?: number;
        keywords?: string;
        keywordInResult?: string;
        discountedComparison?: DISCOUNTED_COMPARISON;
        deliveryConditionType?: DELIVERY_CONDITION_TYPE;
        saleStatus?: PRODUCT_SALE_STATUS;
        soldout?: boolean;
        totalReviewCount?: boolean;
        familyMalls?: boolean;
        productManagementCd?: string;
        excludeMallProductNo?: number;
        includeMallProductNo?: number;
    };
    order?: {
        by?: PRODUCT_BY;
        direction?: ORDER_DIRECTION;
        soldoutPlaceEnd?: boolean;
    };
    categoryNos?: number;
    brandNos?: number;
    partnerNo?: number;
    clientKey?: string;
    pageNumber?: number;
    pageSize?: number;
    onlySaleProduct?: boolean;
    hasMaxCouponAmt?: boolean;
    hasTotalCount?: boolean;
    hasOptionValues?: boolean;
    includeSummaryInfo?: boolean;
    shippingAreaType?: SHIPPING_AREA_TYPE;
}

export interface ProductsSearchResponse {
    totalCount: number;
    pageCount: number;
    minPrice: number;
    maxPrice: number;
    items: ProductItem[];
    brands: Brand[];
    depth1Categories: Category[];
    depth2Categories: Category[];
    depth3Categories: any[];
    depth4Categories: any[];
    depth5Categories: any[];
    multiLevelCategories: Category[];
    clickUrlPrefix: null;
    displayableStock: boolean;
}

export interface Brand {
    brandNo: number;
    brandName: string;
    brandNameKo: string;
    brandNameEn: string;
    brandNameType: string;
    count: number;
}

export interface Category {
    categoryNo: number;
    count: number;
    displayOrder: number;
    label: string;
    parentCategoryNo: number;
    childCategories?: Category[];
}

export interface ProductItem {
    optionValues: OptionValue[];
    shippingArea: string;
    frontDisplayYn: boolean;
    urlDirectDisplayYn: boolean;
    salePeriodType: string;
    saleStartYmdt: Date;
    saleEndYmdt: Date;
    totalReviewCount: number;
    stockCnt: number;
    salePrice: number;
    immediateDiscountUnitType: string;
    immediateDiscountAmt: number;
    displayCategoryNos: string;
    productNo: number;
    productName: string;
    searchProductId: string;
    brandName: string;
    reviewRating: number;
    groupManagementCode: null;
    groupManagementCodeName: null;
    minSalePrice: number;
    maxSalePrice: number;
    maxDiscountAmount: number;
    brandNameKo: string;
    brandNameEn: string;
    brandNameType: string;
    couponTag: string;
    partnerName: string;
    saleCnt: number;
    deliveryConditionType: string;
    brandNo: number;
    registerYmdt: Date;
    additionDiscountAmt: number;
    additionDiscountUnitType: string;
    adult: boolean;
    couponDiscountAmt: number;
    enableCoupons: boolean;
    hasCoupons: HasCoupons;
    imageUrls: string[];
    listImageUrls: string[];
    mainBestProductYn: boolean;
    mainStockCnt: number;
    maxCouponAmt: number;
    productSalePeriodType: null;
    reservationData: null;
    sectionProductEndYmdt: null;
    sectionProductStartYmdt: null;
    stickerLabels: null;
    liked: boolean;
    contentsIfPausing: string;
    productType: string;
    productNameEn: string;
    promotionText: null;
    saleStatusType: string;
    hsCode: string;
    stickerInfos: any[];
    likeCount: number;
    productManagementCd: string;
    isSoldOut: boolean;
}

export interface HasCoupons {
    product: boolean;
    brand: boolean;
    category: boolean;
    partner: boolean;
    event: boolean;
}

export interface OptionValue {
    mallProductNo: number;
    optionValue: string;
    stockCnt: number;
}

export interface ProductDetailResponse {
    baseInfo: BaseInfo;
    deliveryDate: DeliveryDate;
    stock: Stock;
    price: Price;
    deliveryFee: DeliveryFee;
    limitations: Limitations;
    counter: Counter;
    categories: Category[];
    brand: any;
    liked: boolean;
    partner: Partner;
    status: Status;
    partnerNotice: PartnerNotice;
    reservationData: ReservationData;
    deliveryGuide: string;
    afterServiceGuide: string;
    refundGuide: string;
    exchangeGuide: string;
    liquorDelegationGuide: string;
    relatedProductNos: number[];
    shippingInfo: ShippingInfo;
    groupManagementCode: string;
    groupManagementCodeName: string;
    regularDelivery: any;
    rentalInfos: RentalInfo[];
    displayableStock: boolean;
    saleMethodType: string;
    reviewAvailable: boolean;
    mainBestProductYn: boolean;
}

export interface BaseInfo {
    productNo: number;
    saleStartYmdt: string;
    saleEndYmdt: string;
    salePeriodType: string;
    registerYmdt: string;
    promotionText: string;
    productName: string;
    productNameEn: string;
    imageUrls: string[];
    placeOriginLabel: string;
    placeOriginEtcLabel: string;
    manufactureYmdt: string;
    expirationYmdt: string;
    contentHeader: string;
    content: string;
    contentFooter: string;
    dutyInfo: string;
    stickerLabels: string[];
    stickerInfos: StickerInfo[];
    optionImageViewable: boolean;
    productManagementCd: string;
    purchaseGuide: string;
    accumulationUseYn: string;
    deliveryCustomerInfo: string;
    certificationType: string;
    certifications: Certification[];
    productGroup: string;
    hsCode: string;
    usableRestockNoti: boolean;
    productType: string;
    customPropertise: CustomPropertise[];
    couponUseYn: string;
    minorPurchaseYn: string;
}

export interface StickerInfo {
    type: string;
    label: string;
    name: string;
}

export interface Certification {
    no: number;
    type: string;
    organization: string;
    code: string;
    target: string;
    date: string;
}

export interface CustomPropertise {
    propNo: number;
    propValueNo: number;
    propName: string;
    propValue: string;
    multipleSelectionYn: string;
}

export interface DeliveryDate {
    daysAfterPurchase: any;
    daysOfWeek: any;
    period: any;
}

export interface Stock {
    saleCnt: number;
    stockCnt: number;
    mainStockCnt: number;
}

export interface Price {
    salePrice: number;
    immediateDiscountAmt: number;
    immediateDiscountUnitType: string;
    additionDiscountAmt: number;
    additionDiscountUnitType: string;
    additionDiscountValue: number;
    minSalePrice: number;
    maxSalePrice: number;
    maxAdditionDiscountAmt: number;
    maxDiscountAmount: number;
    unitName: string;
    unitNameType: string;
    unitPrice: number;
    maxCouponAmt: number;
    couponDiscountAmt: number;
    accumulationAmtWhenBuyConfirm: number;
    accumulationRate: number;
    contentsIfPausing: string;
}

export interface DeliveryFee {
    deliveryConditionType: string;
    deliveryAmt: number;
    aboveDeliveryAmt: any;
    returnDeliveryAmt: number;
    deliveryType: string;
    deliveryCompanyType: string;
    perOrderCnt: any;
    defaultDeliveryConditionLabel: string;
    deliveryAmtLabels: any[];
    deliveryCompanyTypeLabel: string;
    deliveryConditionDetails: any[];
    remoteDeliveryAreaFees: any[];
    deliveryPrePayment: boolean;
    returnWarehouse: ReturnWarehouse;
    deliveryCustomerInfo: string;
}

export interface ReturnWarehouse {
    warehouseNo: number;
    warehouseName: string;
    defaultReleaseWarehouseYn: string;
    defaultReturnWarehouseYn: string;
    partnerNo: number;
    address: string;
    detailAddress: string;
    zipCd: string;
    overseaAddress1: string;
    overseaAddress2: string;
    overseaCity: string;
    overseaRegion: string;
    countryCd: string;
    warehouseAddressType: string;
    deleteYn: string;
    registerAdminNo: number;
    updateYmdt: string;
    updateAdminNo: number;
    addressStr: string;
}

export interface Limitations {
    minBuyCnt: number;
    maxBuyPersonCnt: number;
    maxBuyTimeCnt: number;
    maxBuyDays: number;
    maxBuyPeriodCnt: number;
    memberOnly: boolean;
    canAddToCart: boolean;
    refundable: boolean;
    naverPayHandling: boolean;
}

export interface Counter {
    likeCnt: number;
    reviewCnt: number;
    inquiryCnt: number;
    myInquiryCnt: number;
}

export interface Category {
    fullCategoryLabel: string;
    categories: Category2[];
}

export interface Category2 {
    label: string;
    depth: number;
    categoryNo: number;
}

export interface Partner {
    partnerName: string;
    businessRegistrationNo: string;
    companyName: string;
    onlineMarketingBusinessDeclarationNo: string;
    ownerName: string;
    officeAddressLabel: string;
    phoneNo: string;
    faxNo: string;
    email: string;
}

export interface Status {
    saleStatusType: string;
    soldout: boolean;
    display: boolean;
    productClassType: string;
}

export interface PartnerNotice {
    title: string;
    content: string;
}

export interface ReservationData {
    reservationStartYmdt: string;
    reservationEndYmdt: string;
    reservationDeliveryYmdt: string;
    reservationStockCnt: number;
}

export interface ShippingInfo {
    shippingAvailable: boolean;
    shippingConfig: ShippingConfig;
}

export interface ShippingConfig {
    shippingAreaType: string;
    shippingAreaPartnerNo: number;
    combinable: boolean;
    internationalShippingAvailable: boolean;
    templateNo: number;
}

export interface RentalInfo {
    rentalPeriod: number;
    monthlyRentalAmount: number;
    creditRating: number;
}

export interface OptionResponse {
    type: string;
    selectType: string;
    labels: string[];
    multiLevelOptions: MultiLevelOption[];
    flatOptions: FlatOption[];
    inputs: Input[];
    displayableStock: boolean;
    additionalProducts: any[];
}

export interface MultiLevelOption {
    label: string;
    value: string;
    children: Children[];
}

export interface Children {
    label: string;
    value: string;
    optionNo: number;
    addPrice: number;
    saleCnt: number;
    stockCnt: number;
    reservationStockCnt: number;
    saleType: string;
    main: boolean;
    images: Image[];
    optionManagementCd: string;
    buyPrice: number;
    forcedSoldOut: boolean;
    children: any;
    rentalInfo: RentalInfo[];
}

export interface Image {
    url: string;
    main: boolean;
}

export interface RentalInfo {
    rentalPeriod: number;
    monthlyRentalAmount: number;
    creditRating: number;
}

export interface FlatOption {
    optionNo: number;
    label: string;
    value: string;
    addPrice: number;
    saleCnt: number;
    stockCnt: number;
    reservationStockCnt: number;
    saleType: string;
    main: boolean;
    images: Image2[];
    optionManagementCd: string;
    buyPrice: number;
    forcedSoldOut: boolean;
    rentalInfo: RentalInfo2[];
}

export interface Image2 {
    url: string;
    main: boolean;
}

export interface RentalInfo2 {
    rentalPeriod: number;
    monthlyRentalAmount: number;
    creditRating: number;
}

export interface Input {
    inputNo: number;
    inputLabel: string;
    inputMatchingType: string;
    required: boolean;
}
