import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { shallowEqual } from 'react-redux';

import { useTypedSelector } from 'state/reducers';
import { orderSheet, purchase } from 'api/order';
import {
    CouponRequest,
    OrderProductOption,
    PaymentReserve,
} from 'models/order';
import { CHANNEL_TYPE, COUNTRY_CD, PG_TYPE } from 'models';
import LayoutResponsive from 'components/shared/LayoutResponsive';
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
import { ReactComponent as UnChecked } from 'assets/icons/checkbox_square.svg';
import { tokenStorage } from 'utils/storage';

const accessTokenInfo = tokenStorage.getAccessToken();

const SheetContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SheetOrderWrapper = styled.div`
    width: 838px;
`;

const Progress = styled.div`
    display: flex;
    color: #ababab;
    font-weight: bold;
    font-size: 24px;
    .current-progress {
        color: ${(props) => props.theme.text1};
    }
    > div {
        margin-right: 18px;
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
    margin-top: ${(props) => (props.marginTop ? props.marginTop : '60px')};
    padding: 0 0 20px 0;
    > h3 {
        text-align: left;
        color: ${(props) => props.theme.text1};
        font-size: 24px;
        font-weight: bold;
    }
    > div {
    }
    .shipping-info {
        color: #000;
        font-size: 12px;
        border: ${(props) => `1px solid ${props.theme.line2}`};
        padding: 5px 11px;
        margin-left: 20px;
        cursor: pointer;
    }
    .order-info {
        position: absolute;
        right: 0;
        top: 12px;
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
`;

const OrderProductListBox = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
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
    background: #222943;
    margin-bottom: 10px;
    cursor: pointer;
`;

const SheetOrderPriceWrapper = styled.div`
    height: fit-content;
    position: sticky;
    top: 280px;
    width: 400px;
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
    const [agreePurchase, setAgreePurchase] = useState<string[]>([]);
    const [isShippingListModal, setIsShippingListModal] = useState(false);
    const [isSearchAddressModal, setIsSearchAddressModal] = useState(false);
    const [isCouponListModal, setIsCouponListModal] = useState(false);
    const [selectCoupon, setSelectCoupon] = useState<CouponRequest>();

    const { orderSheetNo } = useParams() as { orderSheetNo: string };

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
    } = useForm<PaymentReserve>();

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
            },
            refetchOnWindowFocus: false,
        },
    );

    const paymentData = {
        orderSheetNo,
        shippingAddress: {
            addressNo: 0,
            receiverZipCd: '1231231', // TODO zipCode 입력 하기
            receiverAddress: getValues('shippingAddress.receiverAddress'),
            receiverJibunAddress: getValues(
                'shippingAddress.receiverAddress', // TODO 지번 주소 입력
            ),
            receiverDetailAddress: getValues(
                'shippingAddress.receiverDetailAddress',
            ),
            receiverName: getValues('shippingAddress.receiverName'),
            receiverContact1: getValues('shippingAddress.receiverContact1'),
            customsIdNumber: '123',
            countryCd: COUNTRY_CD.KR,
        },
        useDefaultAddress: getValues('useDefaultAddress'),
        saveAddressBook: false,
        deliveryMemo: getValues('deliveryMemo'),
        member: !!member?.memberName,
        orderer: {
            ordererName: getValues('orderer.ordererName'),
            ordererEmail: getValues('orderer.ordererEmail'),
            ordererContact1: getValues('orderer.ordererContact1'),
        },
        updateMember: false,
        subPayAmt: 0,
        pgType: PG_TYPE.INICIS,
        payType: getValues('payType'),
        clientReturnUrl: window.location.href, // TODO returnUrl 작성 및 이동하기
        paymentAmtForVerification: orderData?.data.paymentInfo.paymentAmt!,
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
            onSuccess: (res) => {
                console.log(res);
                orderRefetch();
            },
        },
    );

    const { mutate: paymentMutate } = useMutation(
        async () =>
            await purchase.reservePayment({
                ...paymentData,
            }),
        {
            onSuccess: (res) => {
                // TODO 결제
            },
        },
    );

    const orderPriceData = orderData?.data.paymentInfo && [
        ['총 주문금액', orderData.data.paymentInfo.totalStandardAmt],
        ['총 배송비', orderData.data.paymentInfo.deliveryAmt],
        [
            '총 할인금액',
            orderData.data.paymentInfo.totalImmediateDiscountAmt +
                orderData.data.paymentInfo.totalAdditionalDiscountAmt,
        ],
        [
            '쿠폰 할인',
            orderData.data.paymentInfo.cartCouponAmt +
                +orderData.data.paymentInfo.productCouponAmt +
                orderData.data.paymentInfo.deliveryCouponAmt,
        ],
    ];

    const orderTerms = [
        'agreeOrderService',
        'agreeOrderInformation',
        'agreePurchase',
    ];

    const agreeAllHandler = (checked: boolean) => {
        if (checked) {
            setAgreePurchase([...orderTerms]);
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
            <LayoutResponsive type='large' style={{ padding: '10rem 0' }}>
                <SheetContainer>
                    <SheetOrderWrapper>
                        <Progress>
                            <div className='current-progress'>주문서</div>
                            <div>&#8250;</div>
                            <div>주문 완료</div>
                        </Progress>
                        {!member && (
                            <GuestLoginBox>
                                <p>
                                    지금 보이스캐디의 회원이 되어 즉시 사용
                                    가능한 3,000원 할인 쿠폰 혜택을 만나보세요.
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
                            <CartCategoryBox>
                                <CartInformation>상품 정보</CartInformation>
                                <CartCountBox>수량</CartCountBox>
                                <CartPrice>가격</CartPrice>
                                <CartDelivery>배송비</CartDelivery>
                                <CartAmount>총 상품 금액</CartAmount>
                            </CartCategoryBox>
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
                    <SheetOrderPriceWrapper>
                        <OrderSheetPrice
                            title='총 결제 금액'
                            cartOrderPrice={
                                member
                                    ? orderPriceData
                                    : orderPriceData?.slice(0, 3)
                            }
                            amountPrice={orderData?.data.paymentInfo.paymentAmt}
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
                                        agreeHandler(
                                            e.target.checked,
                                            e.target.id,
                                        )
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
                        <SheetButton
                            width='100%'
                            onClick={handleSubmit(() => {
                                if (
                                    agreePurchase.length !== orderTerms.length
                                ) {
                                    alert('약관에 동의해주세요.');
                                    return;
                                }
                                mutate: paymentMutate();
                            })}
                        >
                            결제하기
                        </SheetButton>
                    </SheetOrderPriceWrapper>
                </SheetContainer>
            </LayoutResponsive>
        </>
    );
};

export default Sheet;
