import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { useWindowSize } from 'usehooks-ts';
import { shallowEqual } from 'react-redux';

import { useTypedSelector } from 'state/reducers';
import orderPayment from 'pages/Order/orderPayment';
import { OrderPrice } from 'pages/Cart/Cart';
import CartList from 'components/Cart/CartList';
import OrdererInformation from 'components/OrderSheet/OrdererInformation';
import ShippingAddress from 'components/OrderSheet/ShippingAddress';
import DiscountApply from 'components/OrderSheet/DiscountApply';
import CommonPayment from 'components/OrderSheet/CommonPayment';
import OrderSheetPrice from 'components/OrderSheet/OrderSheetPrice';
import ShippingListModal from 'components/Modal/ShippingListModal';
import SearchAddressModal from 'components/Modal/SearchAddressModal';
import GuestPassword from 'components/OrderSheet/GuestPassword';
import CouponListModal from 'components/Modal/CouponListModal';
import { ReactComponent as Checked } from 'assets/icons/checkbox_square_checked.svg';
import { ReactComponent as UnChecked } from 'assets/icons/checkbox_square_unchecked.svg';
import { CHANNEL_TYPE, PAY_TYPE, PG_TYPE } from 'models';
import {
    CouponRequest,
    OrderProductOption,
    PaymentReserve,
} from 'models/order';
import { orderSheet } from 'api/order';
import { tokenStorage } from 'utils/storage';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';
import currency from 'currency.js';
import Header from 'components/shared/Header';
import GoBackButton from 'components/Button/GoBackButton';

const accessTokenInfo = tokenStorage.getAccessToken();

const SheetContainer = styled.div`
    width: 1280px;
    margin: 118px auto;
    display: flex;
    justify-content: space-between;
    ${media.custom(1280)} {
        padding: 0 24px;
        width: 100%;
    }
    ${media.medium} {
        margin-top: 25px;
        margin-bottom: 10px;
        flex-direction: column;
    }
`;

const SheetOrderWrapper = styled.div`
    width: 838px;
    ${media.custom(1280)} {
        width: 65.4%;
    }
    ${media.medium} {
        width: 100%;
    }
`;

const Progress = styled.div`
    display: flex;
    color: ${(props) => props.theme.text3};
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 60px;
    .current-progress {
        color: ${(props) => props.theme.text1};
        margin-right: 18px;
    }
    > div {
        margin-right: 18px;
    }
    ${media.medium} {
        text-align: center;
    }
`;

const MobileTitle = styled.div`
    position: relative;
    > h2 {
        text-align: center;
        font-size: 1.25rem;
        font-weight: bold;
        color: ${(props) => props.theme.text1};
    }
    > div {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const GuestLoginBox = styled.div`
    margin-top: 30px;
    border: ${(props) => `1px solid ${props.theme.line2}`};
    text-align: left;
    padding: 18px 18px;
    font-size: 16px;
    color: #000;
    line-height: 28px;
    letter-spacing: -0.64px;
    > a {
        font-weight: bold;
        text-decoration: underline;
    }
`;

const SheetTitle = styled.div<{ marginTop?: string }>`
    position: relative;
    display: flex;
    align-items: center;
    margin: ${(props) =>
        props.marginTop
            ? `${props.marginTop} 0 20px 28px`
            : '60px 0 20px 28px'};
    > h3 {
        text-align: left;
        color: ${(props) => props.theme.text1};
        font-size: 1.5rem;
        font-weight: bold;
    }
    .shipping-info {
        color: #000;
        font-size: 0.75rem;
        border: ${(props) => `1px solid ${props.theme.line2}`};
        padding: 5px 11px;
        margin-left: 20px;
        cursor: pointer;
    }
    .order-info {
        position: absolute;
        right: 0;
        bottom: 0;
        color: #8f8f8f;
        > input {
            display: none;
        }
        > label {
            display: flex;
            align-items: center;
            cursor: pointer;
            > p {
                margin-left: 9px;
            }
        }
    }
    ${media.medium} {
        margin: ${(props) =>
            props.marginTop ? `${props.marginTop} 0 20px` : '44px 0 20px'};
        h3 {
            font-size: 1.25rem;
            letter-spacing: -0.72px;
        }
        .shipping-info {
            font-size: 0.75rem;
            letter-spacing: -0.4px;
        }
        .order-info {
            font-size: 1rem;
            letter-spacing: -0.56px;
        }
    }
    ${media.small} {
        h3 {
            font-size: 1.8rem;
            letter-spacing: -0.72px;
        }
        .shipping-info {
            font-size: 1rem;
            letter-spacing: -0.4px;
        }
        .order-info {
            font-size: 1.4rem;
            letter-spacing: -0.56px;
        }
    }
`;

const OrderProductListBox = styled.div`
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `2px solid ${props.theme.secondary}`};
`;

const CartCategoryBox = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dbdbdb;
    > div {
        padding: 20px 0;
        text-align: center;
        color: #191919;
        font-size: 16px;
        font-weight: bold;
    }
`;

const CartInformation = styled.div`
    width: 240px;
    display: flex;
    justify-content: space-around;
`;

const CartCountBox = styled.div`
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: ${(props) => `1px solid ${props.theme.line2}`};
        width: 78px;
        > div {
            width: 26px;
            text-align: center;
            height: 30px;
            line-height: 30px;
        }
    }
`;

const CartPrice = styled.div`
    width: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > p {
        font-size: 16px;
        color: #191919;
        position: relative;
        > span {
            display: block;
            position: absolute;
            bottom: 100%;
            text-decoration: line-through;
            font-size: 12px;
            color: #ababab;
        }
    }
`;

const CartDelivery = styled.div`
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #191919;
    font: 16px;
`;

const CartAmount = styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    > span {
        font-weight: 400;
    }
`;

const SheetButton = styled.div<{ width: string }>`
    width: ${(props) => props.width};
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background: ${(props) => props.theme.secondary};
    margin-bottom: 10px;
    font-weight: bold;
    cursor: pointer;
    ${media.medium} {
        width: 100vw;
        height: 70px;
        line-height: 70px;
        margin-bottom: 0;
        font-size: 1.5rem;
        letter-spacing: -0.72px;
    }
    ${media.small} {
        font-size: 1.8rem;
    }
`;

const SheetOrderPriceWrapper = styled.form`
    height: fit-content;
    position: sticky;
    top: 228px;
    width: 400px;
    ${media.custom(1280)} {
        width: 31.25%;
    }
    ${media.medium} {
        width: 100%;
        margin-top: 44px;
    }
`;

const AgreeButton = styled.div`
    width: 100%;
    padding: 0 0 36px;
    border: 1px solid #d1d2d2;
    margin-top: 12px;
    white-space: nowrap;
    > .guest_agree_box {
        flex-direction: column;
        align-items: left;
        padding: 0 29px;
        > div {
            border-bottom: ${(props) => `1px dashed ${props.theme.text3}`};
            padding: 10px 59px 30px;
            font-size: 12px;
        }
        .induce {
            letter-spacing: -0.48px;
            color: ${(props) => props.theme.text3};
            line-height: 16px;
        }
        .agree_Button_box {
            > div {
                display: flex;
                justify-content: left;
                align-items: center;
                width: 100%;
                margin-top: 20px;
                &:first-child {
                    margin-top: 0px;
                }
            }
        }
    }
    > div {
        margin-top: 30px;
        font-size: 12px;
        text-align: left;
        display: flex;
        justify-content: center;
        width: 100%;
    }
    p {
        line-height: 16px;
        > span {
            color: ${(props) => props.theme.text3};
        }
        > a {
            margin-left: 10px;
            text-decoration: underline;
            letter-spacing: 0;
            color: #8c8c8c;
        }
    }
    input {
        display: none;
    }
    label {
        cursor: pointer;
        margin-right: 11px;
    }
`;

const Sheet = () => {
    const [orderList, setOrderList] = useState<
        Array<
            OrderProductOption & {
                deliveryAmt: number;
                productName: string;
            }
        >
    >([]);
    const [ordererInformation, setOrdererInformation] = useState(false);
    const [orderPriceData, setOrderPriceData] = useState<OrderPrice>({});
    const [agreePurchase, setAgreePurchase] = useState<string[]>([]);
    const [isShippingListModal, setIsShippingListModal] = useState(false);
    const [isSearchAddressModal, setIsSearchAddressModal] = useState(false);
    const [isCouponListModal, setIsCouponListModal] = useState(false);
    const [selectCoupon, setSelectCoupon] = useState<CouponRequest>();

    const { orderSheetNo } = useParams() as { orderSheetNo: string };

    const { width } = useWindowSize();

    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const { mallInfo } = useTypedSelector(
        ({ mall }) => ({
            mallInfo: mall,
        }),
        shallowEqual,
    );

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<PaymentReserve>({
        defaultValues: { subPayAmt: 0, payType: PAY_TYPE.CREDIT_CARD },
    });

    const { data: orderData, refetch: orderRefetch } = useQuery(
        ['orderData', { member: member?.memberName }],
        async () =>
            await orderSheet.getOrderSheet(orderSheetNo, {
                includeMemberAddress: false,
            }),
        {
            onSuccess: (res) => {
                setOrderList(() => {
                    const newOrderList: Array<
                        OrderProductOption & {
                            deliveryAmt: number;
                            productName: string;
                        }
                    > = [];
                    res?.data.deliveryGroups.forEach((deliveryGroup) => {
                        deliveryGroup.orderProducts.forEach((orderProduct) => {
                            orderProduct.orderProductOptions.forEach(
                                (productOption) => {
                                    newOrderList.push({
                                        ...productOption,
                                        deliveryAmt: deliveryGroup.deliveryAmt,
                                        productName: orderProduct.productName,
                                    });
                                },
                            );
                        });
                    });
                    return [...newOrderList];
                });
                setOrderPriceData((prev) => {
                    prev.totalOrderPrice = {
                        name: '총 주문금액',
                        price: res?.data.paymentInfo.totalStandardAmt,
                    };
                    prev.totalDeliveryPrice = {
                        name: '총 배송비',
                        price: res?.data.paymentInfo.deliveryAmt,
                    };
                    prev.totalDiscountPrice = {
                        name: '총 할인금액',
                        price: `- ${
                            res?.data.paymentInfo.totalImmediateDiscountAmt +
                            res?.data.paymentInfo.totalAdditionalDiscountAmt
                        }`,
                    };
                    if (member) {
                        prev.couponDiscount = {
                            name: '쿠폰 할인',
                            price: `- ${
                                res?.data.paymentInfo.cartCouponAmt +
                                res?.data.paymentInfo.productCouponAmt +
                                res?.data.paymentInfo.deliveryCouponAmt
                            }`,
                        };
                    }
                    return { ...prev };
                });
            },
        },
    );

    const paymentData = {
        orderSheetNo,
        extraData: { test: 'extraData 확인' },
        shippingAddress: {
            addressNo: getValues('shippingAddress.addressNo')
                ? getValues('shippingAddress.addressNo')
                : 0,
            receiverZipCd: getValues('shippingAddress.receiverZipCd'),
            receiverAddress: getValues('shippingAddress.receiverAddress'),
            receiverJibunAddress: getValues(
                'shippingAddress.receiverJibunAddress',
            ),
            receiverDetailAddress: getValues(
                'shippingAddress.receiverDetailAddress',
            ),
            receiverName: getValues('shippingAddress.receiverName'),
            receiverContact1: getValues('shippingAddress.receiverContact1'),
            shippingInfoLaterInputContact: '',
            requestShippingDate: null,
            receiverContact2: null,
            customsIdNumber: null,
            addressName: null,
            countryCd: null,
        },
        orderTitle:
            orderData?.data.deliveryGroups[0]?.orderProducts[0]?.productName,
        useDefaultAddress: getValues('useDefaultAddress'),
        deliveryMemo: getValues('deliveryMemo'),
        member: !!member?.memberName,
        orderer: {
            ordererName: getValues('orderer.ordererName'),
            ordererEmail: getValues('orderer.ordererEmail'),
            ordererContact1: getValues('orderer.ordererContact1'),
        },
        coupons: {
            productCoupons: selectCoupon?.productCoupons
                ? selectCoupon.productCoupons
                : null,
            cartCouponIssueNo: selectCoupon?.cartCouponIssueNo
                ? selectCoupon.cartCouponIssueNo
                : null,
        },
        tempPassword: getValues('tempPassword')
            ? getValues('tempPassword')
            : null,
        updateMember: false,
        subPayAmt: getValues('subPayAmt') ? getValues('subPayAmt') : 0,
        pgType: PG_TYPE.INICIS,
        payType: getValues('payType'),
        inAppYn: 'N',
        accumulationAmt: 0,
        availableMaxAccumulationAmt: 0,
        paymentAmt: orderData?.data.paymentInfo.paymentAmt,
        bankAccountToDeposit: {
            bankAccount: mallInfo.bankAccountInfo.bankAccount,
            bankCode: mallInfo.bankAccountInfo.bankName,
            bankDepositorName: mallInfo.bankAccountInfo.bankDepositorName,
        },
    };

    const { mutate: couponApplyMutate } = useMutation(
        async () =>
            await orderSheet.applyCoupon(orderSheetNo, {
                cartCouponIssueNo: selectCoupon?.cartCouponIssueNo,
                channelType: CHANNEL_TYPE.NAVER_EP,
                promotionCode: selectCoupon?.promotionCode,
                productCoupons: selectCoupon?.productCoupons,
            }),
        {
            onSuccess: () => {
                orderRefetch();
            },
        },
    );

    const orderTerms = [
        'agreeOrderService',
        'agreeOrderInformation',
        'agreePurchase',
    ];

    const agreeAllHandler = (checked: boolean) => {
        if (checked) {
            accessTokenInfo?.accessToken
                ? setAgreePurchase(['agreePurchase'])
                : setAgreePurchase([...orderTerms]);
        } else {
            setAgreePurchase([]);
        }
    };

    const agreeHandler = (checked: boolean, term: string) => {
        if (checked) {
            setAgreePurchase((prev) => [...prev, term]);
        } else {
            setAgreePurchase((prev) =>
                prev.filter((agreeTerm) => agreeTerm !== term),
            );
        }
    };

    return (
        <>
            {!isMobile(width) && <Header />}
            {isShippingListModal && (
                <ShippingListModal
                    onClickToggleModal={() =>
                        setIsShippingListModal(!isShippingListModal)
                    }
                    width={'1080px'}
                    register={register}
                    setValue={setValue}
                    setIsShippingListModal={setIsShippingListModal}
                ></ShippingListModal>
            )}
            {isSearchAddressModal && (
                <SearchAddressModal
                    onClickToggleModal={() =>
                        setIsSearchAddressModal((prev) => !prev)
                    }
                    width={'720px'}
                    height={'720px'}
                    register={register}
                    setValue={setValue}
                ></SearchAddressModal>
            )}
            {isCouponListModal && (
                <CouponListModal
                    onClickToggleModal={() =>
                        setIsCouponListModal((prev) => !prev)
                    }
                    width={'700px'}
                    height={'696px'}
                    setIsCouponListModal={setIsCouponListModal}
                    setSelectCoupon={setSelectCoupon}
                    orderSheetNo={orderSheetNo}
                    couponApplyMutate={couponApplyMutate}
                ></CouponListModal>
            )}
            <SheetContainer>
                <SheetOrderWrapper>
                    {isMobile(width) ? (
                        <MobileTitle>
                            <GoBackButton />
                            <h2>주문서</h2>
                        </MobileTitle>
                    ) : (
                        <Progress>
                            <h2 className='current-progress'>주문서</h2>
                            <div>&#8250;</div>
                            <div>주문 완료</div>
                        </Progress>
                    )}
                    {!member && (
                        <GuestLoginBox>
                            <p>
                                지금 보이스캐디의 회원이 되어 즉시 사용 가능한
                                3,000원 할인 쿠폰 혜택을 만나보세요.
                            </p>
                            <Link to={'/member/join-agreement'}>
                                회원 가입 바로가기
                            </Link>
                        </GuestLoginBox>
                    )}
                    <SheetTitle marginTop='30px'>
                        <h3>주문 상품</h3>
                    </SheetTitle>
                    <OrderProductListBox>
                        {!isMobile(width) && (
                            <CartCategoryBox>
                                <CartInformation>상품 정보</CartInformation>
                                <CartCountBox>수량</CartCountBox>
                                <CartPrice>가격</CartPrice>
                                <CartDelivery>배송비</CartDelivery>
                                <CartAmount>총 상품 금액</CartAmount>
                            </CartCategoryBox>
                        )}
                        {orderList.map((orderData) => {
                            return (
                                <CartList
                                    cartData={orderData}
                                    key={orderData.optionNo}
                                    isModifiable={false}
                                />
                            );
                        })}
                    </OrderProductListBox>
                    <SheetTitle>
                        <h3>주문자 정보</h3>
                    </SheetTitle>
                    <OrdererInformation register={register} />
                    <SheetTitle>
                        <h3>배송지</h3>
                        {member && (
                            <div
                                className='shipping-info'
                                onClick={() => setIsShippingListModal(true)}
                            >
                                배송지 정보
                            </div>
                        )}
                        <div className='order-info'>
                            <input
                                type='checkbox'
                                id='orderInfo'
                                onChange={() =>
                                    setOrdererInformation((prev) => !prev)
                                }
                                checked={ordererInformation}
                            />
                            <label htmlFor='orderInfo'>
                                {ordererInformation ? (
                                    <Checked />
                                ) : (
                                    <UnChecked />
                                )}
                                <p>주문자 정보와 동일</p>
                            </label>
                        </div>
                    </SheetTitle>
                    <ShippingAddress
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        ordererInformation={
                            ordererInformation
                                ? {
                                      receiverName: getValues(
                                          'orderer.ordererName',
                                      ),
                                      receiverContact1: getValues(
                                          'orderer.ordererContact1',
                                      ),
                                  }
                                : undefined
                        }
                        setIsSearchAddressModal={setIsSearchAddressModal}
                    />
                    {member && (
                        <>
                            <SheetTitle>
                                <h3>할인 적용</h3>
                            </SheetTitle>
                            <DiscountApply
                                setIsCouponListModal={setIsCouponListModal}
                                paymentInfo={orderData?.data.paymentInfo}
                                setValue={setValue}
                                setOrderPriceData={setOrderPriceData}
                                getValues={getValues}
                            />
                        </>
                    )}
                    <SheetTitle>
                        <h3>결제 방식</h3>
                    </SheetTitle>
                    <CommonPayment setValue={setValue} />
                    {!member && (
                        <>
                            <SheetTitle>
                                <h3>비회원 주문 비밀번호</h3>
                                <div className='order-info'>
                                    비회원 배송 조회 시 사용할 비밀번호를
                                    입력해주세요.
                                </div>
                            </SheetTitle>
                            <GuestPassword
                                errors={errors}
                                register={register}
                            />
                        </>
                    )}
                </SheetOrderWrapper>
                <SheetOrderPriceWrapper id='SendPayForm_id' method='POST'>
                    <OrderSheetPrice
                        title='총 결제 금액'
                        cartOrderPrice={orderPriceData}
                        amountPrice={
                            orderData &&
                            orderData.data.paymentInfo.paymentAmt -
                                getValues('subPayAmt')
                        }
                    />
                    <AgreeButton>
                        {!member && (
                            <>
                                <div className='guest_agree_box'>
                                    <div className='induce'>
                                        비회원으로 상품을 구매하시면
                                        보이스캐디의
                                        <br />
                                        쿠폰 및 적립급 혜택을 받을실 수
                                        없습니다.
                                    </div>
                                </div>
                                <div className='guest_agree_box'>
                                    <div className='agree_Button_box'>
                                        <div>
                                            <input
                                                type='checkbox'
                                                onChange={(e) =>
                                                    agreeAllHandler(
                                                        e.target.checked,
                                                    )
                                                }
                                                id='agreeOrderAll'
                                                checked={
                                                    agreePurchase.length ===
                                                    orderTerms.length
                                                }
                                            />
                                            <label htmlFor='agreeOrderAll'>
                                                {agreePurchase.length ===
                                                orderTerms.length ? (
                                                    <Checked />
                                                ) : (
                                                    <UnChecked />
                                                )}
                                            </label>
                                            <p>전체 동의</p>
                                        </div>
                                        <div>
                                            <input
                                                type='checkbox'
                                                onChange={(e) =>
                                                    agreeHandler(
                                                        e.target.checked,
                                                        e.target.id,
                                                    )
                                                }
                                                checked={agreePurchase.includes(
                                                    'agreeOrderService',
                                                )}
                                                id='agreeOrderService'
                                            />
                                            <label htmlFor='agreeOrderService'>
                                                {agreePurchase.includes(
                                                    'agreeOrderService',
                                                ) ? (
                                                    <Checked />
                                                ) : (
                                                    <UnChecked />
                                                )}
                                            </label>
                                            <p>
                                                서비스 이용약관 동의
                                                <span>&nbsp;(필수)</span>
                                                <Link to={'/'}>
                                                    자세히보기
                                                </Link>{' '}
                                                {/* TODO 약관 페이지 이동*/}
                                            </p>
                                        </div>
                                        <div>
                                            <input
                                                type='checkbox'
                                                onChange={(e) =>
                                                    agreeHandler(
                                                        e.target.checked,
                                                        e.target.id,
                                                    )
                                                }
                                                id='agreeOrderInformation'
                                                checked={agreePurchase.includes(
                                                    'agreeOrderInformation',
                                                )}
                                            />
                                            <label htmlFor='agreeOrderInformation'>
                                                {agreePurchase.includes(
                                                    'agreeOrderInformation',
                                                ) ? (
                                                    <Checked />
                                                ) : (
                                                    <UnChecked />
                                                )}
                                            </label>
                                            <p>
                                                개인정보 처리방침
                                                <span>&nbsp;(필수)</span>
                                                <Link to={'/'}>
                                                    자세히보기
                                                </Link>{' '}
                                                {/* TODO 약관 페이지 이동*/}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <div>
                            <input
                                type='checkbox'
                                onChange={(e) =>
                                    agreeHandler(e.target.checked, e.target.id)
                                }
                                id='agreePurchase'
                                checked={agreePurchase.includes(
                                    'agreePurchase',
                                )}
                            />
                            <label htmlFor='agreePurchase'>
                                {agreePurchase.includes('agreePurchase') ? (
                                    <Checked />
                                ) : (
                                    <UnChecked />
                                )}
                            </label>
                            <p>
                                주문할 제품의 거래조건을 확인 하였으며,
                                <br /> 구매에 동의하시겠습니까 ?
                                <span>&nbsp;(필수)</span>
                            </p>
                        </div>
                    </AgreeButton>
                    {!isMobile && (
                        <SheetButton
                            width='100%'
                            onClick={handleSubmit(() => {
                                if (accessTokenInfo?.accessToken) {
                                    if (
                                        !agreePurchase.includes('agreePurchase')
                                    ) {
                                        alert('약관에 동의해주세요.');
                                        return;
                                    }
                                } else if (
                                    agreePurchase.length !== orderTerms.length
                                ) {
                                    alert('약관에 동의해주세요.');
                                    return;
                                }
                                orderPayment.setConfiguration();
                                orderPayment.reservation(paymentData);
                            })}
                        >
                            결제하기
                        </SheetButton>
                    )}
                </SheetOrderPriceWrapper>
            </SheetContainer>
            {isMobile(width) && (
                <SheetButton
                    width='100%'
                    onClick={handleSubmit(() => {
                        if (accessTokenInfo?.accessToken) {
                            if (!agreePurchase.includes('agreePurchase')) {
                                alert('약관에 동의해주세요.');
                                return;
                            }
                        } else if (agreePurchase.length !== orderTerms.length) {
                            alert('약관에 동의해주세요.');
                            return;
                        }
                        orderPayment.setConfiguration();
                        orderPayment.reservation(paymentData);
                    })}
                >
                    {currency(
                        paymentData.paymentAmt ? paymentData.paymentAmt : 0,
                        {
                            symbol: '',
                            precision: 0,
                        },
                    ).format()}{' '}
                    원 결제하기
                </SheetButton>
            )}
        </>
    );
};

export default Sheet;
