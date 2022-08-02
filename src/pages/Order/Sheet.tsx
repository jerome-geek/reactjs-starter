import { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { shallowEqual } from 'react-redux';

import { useTypedSelector } from 'state/reducers';
import { orderSheet, purchase } from 'api/order';
import { OrderProductOption, PaymentReserve } from 'models/order';
import {
    CASH_RECEIPT_ISSUE_PURPOSE_TYPE,
    COUNTRY_CD,
    PAY_TYPE,
    PG_TYPE,
} from 'models';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import CartList from 'components/Cart/CartList';
import OrdererInformation from 'components/OrderSheet/OrdererInformation';
import ShippingAddress from 'components/OrderSheet/ShippingAddress';
import DiscountApply from 'components/OrderSheet/DiscountApply';
import CommonPayment from 'components/OrderSheet/CommonPayment';
import OrderSheetPrice from 'components/OrderSheet/OrderSheetPrice';
import ShippingListModal from 'components/Modal/ShippingListModal';
import { ReactComponent as Checked } from 'assets/icons/checkbox_square_checked.svg';
import { ReactComponent as UnChecked } from 'assets/icons/checkbox_square.svg';

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

const SheetTitle = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 60px;
    padding: 0 0 20px 30px;
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
        border: 1px solid #dbdbdb;
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
        border: 1px solid #dbdbdb;
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

const SheetInputWrapper = styled.div`
    display: flex;
    border-bottom: 1px solid #dbdbdb;
    text-align: left;
    min-height: 104px;
    &:last-child {
        border-bottom: none;
    }
`;

const SheetInputTitleBox = styled.div`
    width: 200px;
    padding: 40px 0 40px 41px;
    display: flex;
    flex-direction: column;
`;

const SheetInputBox = styled.div`
    width: 440px;
    padding-top: 30px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    color: ${(props) => props.theme.text1};
    > input {
        letter-spacing: -0.64px;
        font-weight: 400;
        &::placeholder {
            color: #a8a8a8;
        }
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
`;

const AgreeButton = styled.div`
    width: 100%;
    padding: 36px 0;
    border: 1px solid #d1d2d2;
    margin-top: 12px;
    > div {
        font-size: 12px;
        text-align: left;
        display: flex;
        justify-content: center;
        width: 100%;

        > input {
            display: none;
        }
        > label {
            cursor: pointer;
            margin-right: 11px;
        }
        > p {
            > span {
            }
        }
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
    const [ordererInformation, setOrdererInformation] =
        useState<boolean>(false);
    const [agreePurchase, setAgreePurchase] = useState<boolean>(false);
    const [isShippingListModal, setIsShippingListModal] =
        useState<boolean>(false);

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
        control,
        watch,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<PaymentReserve>({
        defaultValues: {
            clientParams: {},
            extraData: {},
            orderMemo: '',
            bankAccountToDeposit: {},
            rentalInfo: {},
            payType: PAY_TYPE.ACCOUNT, // 결제 방식
            clientReturnUrl: '',
            coupons: {}, // 할인 쿠폰
            useDefaultAddress: false, // 기본 배송지로 설정
            member: !!member,
            inAppYn: 'F',
            applyCashReceipt: false,
            orderTitle: '',
            tempPassword: '',
            saveAddressBook: false,
            updateMember: false,
            orderSheetNo,
            pgType: PG_TYPE.NAVER_PAY,
            remitter: '',
            deliveryMemo: '', // 택배사 요청 사항
            orderer: {
                ordererName: '', // 이름
                ordererContact1: '', // 전화번호
                ordererEmail: '', // 이메일
            },
            paymentAmtForVerification: 0,
            shippingAddress: {
                receiverName: '', // 수령인 이름
                receiverContact1: '', // 휴대폰 번호
                receiverAddress: '', // 주소검색
                receiverDetailAddress: '', // 상세 주소
                receiverZipCd: '',
            },
            savesLastPayType: false,
            subPayAmt: 0,
            cashReceipt: {
                cashReceiptIssuePurposeType:
                    CASH_RECEIPT_ISSUE_PURPOSE_TYPE.INCOME_TAX_DEDUCTION,
                cashReceiptKey: '',
            },
            shippingAddresses: [],
        },
    });

    const { data: orderData } = useQuery(
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
                    res.data.deliveryGroups.forEach((deliveryGroup) => {
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

    const { mutate } = useMutation(
        async () =>
            await purchase.reservePayment({
                // TODO 결제 로직(필수값) 정리하기
                orderSheetNo,
                shippingAddress: {
                    addressNo: 0,
                    receiverZipCd: '1231231', // TODO zipCode 입력 하기
                    receiverAddress: getValues(
                        'shippingAddress.receiverAddress',
                    ),
                    receiverJibunAddress: getValues(
                        'shippingAddress.receiverAddress', // TODO 지번 주소 입력
                    ),
                    receiverDetailAddress: getValues(
                        'shippingAddress.receiverDetailAddress',
                    ),
                    receiverName: getValues('shippingAddress.receiverName'),
                    receiverContact1: getValues(
                        'shippingAddress.receiverContact1',
                    ),
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
                clientReturnUrl:
                    'https://alpha-service.e-ncp.com:/pay/temp/confirm', // TODO returnUrl 작성 및 이동하기
                paymentAmtForVerification:
                    orderData?.data.paymentInfo.paymentAmt!,
            }),
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
            <LayoutResponsive type='large' style={{ padding: '10rem 0' }}>
                <SheetContainer>
                    <SheetOrderWrapper>
                        <Progress>
                            <div className='current-progress'>주문서</div>
                            <div>&#8250;</div>
                            <div>주문 완료</div>
                        </Progress>
                        <SheetTitle>
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
                            <div
                                className='shipping-info'
                                onClick={() => setIsShippingListModal(true)}
                            >
                                배송지 정보
                            </div>
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
                        />
                        <SheetTitle>
                            <h3>할인 적용</h3>
                        </SheetTitle>
                        <DiscountApply />
                        <SheetTitle>
                            <h3>결제 방식</h3>
                        </SheetTitle>
                        <CommonPayment setValue={setValue} />
                    </SheetOrderWrapper>
                    <SheetOrderPriceWrapper>
                        <OrderSheetPrice
                            title='총 결제 금액'
                            cartOrderPrice={orderPriceData}
                            amountPrice={orderData?.data.paymentInfo.paymentAmt}
                        />
                        <AgreeButton>
                            <div>
                                <input
                                    type='checkbox'
                                    onChange={() =>
                                        setAgreePurchase(() => !agreePurchase)
                                    }
                                    id='agreePurchase'
                                />
                                <label htmlFor='agreePurchase'>
                                    {agreePurchase ? (
                                        <Checked />
                                    ) : (
                                        <UnChecked />
                                    )}
                                </label>
                                <p>
                                    주문할 제품의 거래조건을 확인 하였으며,
                                    <br /> 구매에 동의하시겠습니까 ? (필수)
                                </p>
                            </div>
                        </AgreeButton>
                        <SheetButton width='100%' onClick={() => mutate()}>
                            결제하기
                        </SheetButton>
                    </SheetOrderPriceWrapper>
                </SheetContainer>
            </LayoutResponsive>
        </>
    );
};

export default Sheet;
