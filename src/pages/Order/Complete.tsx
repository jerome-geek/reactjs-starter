import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
import currency from 'currency.js';
import dayjs from 'dayjs';
import { head, join, pipe, split } from '@fxts/core';

import { useTypedSelector } from 'state/reducers';
import { myOrder } from 'api/order';
import { ORDER_REQUEST_TYPE } from 'models';
import { OrderOptionsGroupByDelivery, OrderProductOption } from 'models/order';
import PATHS from 'const/paths';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import CartList from 'components/Cart/CartList';
import SEOHelmet from 'components/shared/SEOHelmet';
import Header from 'components/shared/Header';

const CompleteContainer = styled.div`
    padding: 0 40px;
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

const OrderNoContainer = styled.div`
    width: 100%;
    height: 340px;
    background-color: ${(props) => props.theme.bg2};
    margin: 48px 0 70px;
    padding-top: 101px;
    > p {
        font-weight: bold;
        font-size: 30px;
        color: ${(props) => props.theme.text1};
    }
`;

const PayType = styled.div`
    display: inline-block;
    padding: 6px 11px;
    border: 1px solid #8c909d;
    margin: 30px 0 10px;
    color: #767676;
    font-size: 12px;
`;

const DepositDeadline = styled.div`
    font: 16px;
    letter-spacing: -0.64px;
    color: #8f8f8f;
    margin-bottom: 10px;
    > span {
        font-weight: bold;
        color: ${(props) => props.theme.text1};
    }
`;

const OrderNoBox = styled.div`
    font-size: 16px;
    color: #767676;
`;

const OrderInformationContainer = styled.div``;

const OrderInformationBox = styled.div`
    font-size: 16px;
    margin-bottom: 64px;
`;

const OrderInformationTitle = styled.div`
    text-align: left;
    color: ${(props) => props.theme.text1};
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -1.2px;
    padding-bottom: 24px;
    border-bottom: 2px solid #222943;
    margin-bottom: 40px;
`;

const OrderInformationPrice = styled.div<{ marginBottom: string }>`
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-align: left;
    margin-bottom: ${(props) => props.marginBottom};
    color: ${(props) => props.theme.text1};
    font-weight: bold;
`;

const OrderInformationList = styled.div<{ marginBottom: string }>`
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-align: right;
    margin-bottom: ${(props) => props.marginBottom};
    color: #767676;
`;

const OrderInformationCategory = styled.div`
    letter-spacing: -0.64px;
`;

const OrderInformationContent = styled.div`
    letter-spacing: 0;
    p {
        margin-top: 12px;
    }
`;

const ButtonWrapper = styled.div`
    font-size: 16px;
    letter-spacing: -0.64px;
    line-height: 44px;
    display: flex;
    width: fit-content;
    margin: 0 auto;
`;

const OrderListButton = styled(Link)`
    display: block;
    color: ${(props) => props.theme.text1};
    border: ${(props) => `1px solid ${props.theme.line2}`};
    width: 210px;
    height: 44px;
    margin-right: 21px;
`;

const ContinueShoppingButton = styled(Link)`
    display: block;
    background: #222943;
    color: #fff;
    width: 210px;
    height: 44px;
`;

const OrderProductListBox = styled.div`
    margin-top: 91px;
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

const Complete = () => {
    const [orderList, setOrderList] =
        useState<
            Array<
                OrderProductOption & {
                    deliveryAmt: number;
                    productName: string;
                }
            >
        >();
    const [deliveryInfo, setDeliveryInfo] =
        useState<OrderOptionsGroupByDelivery>();

    const orderParam = useMemo(
        () => new URLSearchParams(window.location.search),
        [],
    );

    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const { data: orderCompleteData } = useQuery(
        ['orderCompleteData', { member: member?.memberName }],
        async () =>
            await myOrder.getOrderDetail(orderParam.get('orderNo')!, {
                orderRequestTypes: ORDER_REQUEST_TYPE.ALL,
            }),
        {
            onSuccess: (res) => {
                const newOrderList: Array<
                    OrderProductOption & {
                        deliveryAmt: number;
                        productName: string;
                    }
                > = [];
                res.data.orderOptionsGroupByPartner.forEach(
                    (partnerOptionGroup) => {
                        partnerOptionGroup.orderOptionsGroupByDelivery.forEach(
                            (deliveryOptionGroup) => {
                                deliveryOptionGroup.orderOptions.forEach(
                                    ({
                                        accumulationAmt,
                                        optionNo,
                                        imageUrl,
                                        optionManagementCd,
                                        optionName,
                                        orderOptionNo,
                                        optionTitle,
                                        optionType,
                                        optionValue,
                                        orderCnt,
                                        price,
                                        productName,
                                        productNo,
                                        reservation,
                                        reservationDeliveryYmdt,
                                        setOptions,
                                        inputs,
                                    }) => {
                                        newOrderList.push({
                                            accumulationAmtWhenBuyConfirm:
                                                accumulationAmt,
                                            cartNo: optionNo,
                                            deliveryAmt:
                                                deliveryOptionGroup.deliveryAmt,
                                            imageUrl,
                                            optionInputs: inputs,
                                            optionManagementCd,
                                            optionName,
                                            optionNo: orderOptionNo,
                                            optionTitle,
                                            optionType,
                                            optionValue,
                                            orderCnt,
                                            price,
                                            productName,
                                            productNo,
                                            recurringDeliveryCycles: null,
                                            reservation,
                                            reservationDeliveryYmdt,
                                            setOptions,
                                            soldOut: false,
                                            stockCnt: 999999,
                                        });
                                    },
                                );
                            },
                        );
                    },
                );
                setOrderList([...newOrderList]);
                setDeliveryInfo(
                    head(
                        head(res.data.orderOptionsGroupByPartner)!
                            .orderOptionsGroupByDelivery,
                    ),
                );
            },
            refetchOnWindowFocus: false,
            enabled: !!orderParam.get('orderNo'),
        },
    );

    console.log(orderCompleteData);

    const payTypeText = () => {
        let payType = '';
        switch (orderCompleteData?.data.payType) {
            case 'ACCOUNT':
                payType = '무통장 입금';
                break;
            case 'CREDIT_CARD':
                payType = '신용카드';
                break;
            case 'REALTIME_ACCOUNT_TRANSFER':
                payType = '실시간 계좌 이체';
                break;
            case 'VIRTUAL_ACCOUNT':
                payType = '가상계좌';
                break;
            case 'KPAY':
                payType = 'KPAY';
                break;
        }
        return payType;
    };

    return (
        <>
            <SEOHelmet
                data={{
                    title: '주문 완료',
                }}
            />
            <Header />
            <LayoutResponsive type='medium' style={{ padding: '10rem 0' }}>
                {orderCompleteData && (
                    <CompleteContainer>
                        <Progress>
                            <div>주문서</div>
                            <div>&#8250;</div>
                            <div className='current-progress'>주문 완료</div>
                        </Progress>
                        <OrderNoContainer>
                            <p>주문이 완료되었습니다 !</p>
                            <PayType>{payTypeText()}</PayType>
                            <DepositDeadline>
                                <span>
                                    {dayjs(
                                        orderCompleteData.data.payInfo.bankInfo
                                            ?.paymentExpirationYmdt,
                                    ).format('YY.MM.DD')}{' '}
                                    까지 계좌로 입금
                                </span>
                                해주시면 제품이 발송됩니다.
                            </DepositDeadline>
                            <OrderNoBox>
                                주문번호 {orderParam.get('orderNo')}
                            </OrderNoBox>
                        </OrderNoContainer>
                        <OrderInformationContainer>
                            {orderCompleteData.data.payType ===
                                ('ACCOUNT' ||
                                    'REALTIME_ACCOUNT_TRANSFER' ||
                                    'VIRTUAL_ACCOUNT') && (
                                <OrderInformationBox>
                                    <OrderInformationTitle>
                                        이체 정보
                                    </OrderInformationTitle>
                                    <OrderInformationPrice marginBottom='60px'>
                                        <OrderInformationCategory>
                                            <div>이체 금액</div>
                                        </OrderInformationCategory>
                                        <OrderInformationContent>
                                            <div>
                                                {currency(
                                                    orderCompleteData.data
                                                        .payInfo.payAmt,
                                                    {
                                                        symbol: '',
                                                        precision: 0,
                                                    },
                                                ).format()}{' '}
                                                원
                                            </div>
                                        </OrderInformationContent>
                                    </OrderInformationPrice>
                                    <OrderInformationList marginBottom='32px'>
                                        <OrderInformationCategory>
                                            <div>계좌정보</div>
                                        </OrderInformationCategory>
                                        <OrderInformationContent>
                                            <div>
                                                {
                                                    orderCompleteData.data
                                                        .payInfo.bankInfo
                                                        .bankName
                                                }{' '}
                                                {
                                                    orderCompleteData.data
                                                        .payInfo.bankInfo
                                                        .account
                                                }
                                                <p>
                                                    {
                                                        orderCompleteData.data
                                                            .payInfo.bankInfo
                                                            .depositorName
                                                    }
                                                </p>
                                            </div>
                                        </OrderInformationContent>
                                    </OrderInformationList>
                                    <OrderInformationList marginBottom='0'>
                                        <OrderInformationCategory>
                                            <div>입금기한</div>
                                        </OrderInformationCategory>
                                        <OrderInformationContent>
                                            <div>
                                                {dayjs(
                                                    orderCompleteData.data
                                                        .payInfo.bankInfo
                                                        .paymentExpirationYmdt,
                                                ).format(
                                                    'YY.MM.DD HH:mm:ss',
                                                )}{' '}
                                                까지
                                            </div>
                                        </OrderInformationContent>
                                    </OrderInformationList>
                                </OrderInformationBox>
                            )}
                            <OrderInformationBox>
                                <OrderInformationTitle>
                                    결제 정보
                                </OrderInformationTitle>
                                <OrderInformationPrice marginBottom='24px'>
                                    <OrderInformationCategory>
                                        <div>총 결제금액</div>
                                    </OrderInformationCategory>
                                    <OrderInformationContent>
                                        <div>
                                            {currency(
                                                orderCompleteData.data.payInfo
                                                    .payAmt,
                                                { symbol: '', precision: 0 },
                                            ).format()}{' '}
                                            원
                                        </div>
                                    </OrderInformationContent>
                                </OrderInformationPrice>
                                <OrderInformationList marginBottom='24px'>
                                    <OrderInformationCategory>
                                        <div>상품가격</div>
                                    </OrderInformationCategory>
                                    <OrderInformationContent>
                                        <div>
                                            {currency(
                                                orderCompleteData?.data
                                                    .lastOrderAmount
                                                    .standardAmt,
                                                { symbol: '', precision: 0 },
                                            ).format()}{' '}
                                            원
                                        </div>
                                    </OrderInformationContent>
                                </OrderInformationList>
                                <OrderInformationList marginBottom='24px'>
                                    <OrderInformationCategory>
                                        <div>배송비</div>
                                    </OrderInformationCategory>
                                    <OrderInformationContent>
                                        <div>
                                            {currency(
                                                orderCompleteData?.data
                                                    .lastOrderAmount
                                                    .deliveryAmt,
                                                { symbol: '', precision: 0 },
                                            ).format()}{' '}
                                            원
                                        </div>
                                    </OrderInformationContent>
                                </OrderInformationList>
                                <OrderInformationList marginBottom='24px'>
                                    <OrderInformationCategory>
                                        <div>할인 금액</div>
                                    </OrderInformationCategory>
                                    <OrderInformationContent>
                                        <div>
                                            -
                                            {currency(
                                                orderCompleteData?.data
                                                    .lastOrderAmount
                                                    .immediateDiscountAmt +
                                                    orderCompleteData?.data
                                                        .lastOrderAmount
                                                        .additionalDiscountAmt,
                                                { symbol: '', precision: 0 },
                                            ).format()}{' '}
                                            원
                                        </div>
                                    </OrderInformationContent>
                                </OrderInformationList>
                                <OrderInformationList marginBottom='24px'>
                                    <OrderInformationCategory>
                                        <div>쿠폰 할인</div>
                                    </OrderInformationCategory>
                                    <OrderInformationContent>
                                        <div>
                                            -
                                            {currency(
                                                orderCompleteData?.data
                                                    .lastOrderAmount
                                                    .cartCouponDiscountAmt +
                                                    orderCompleteData?.data
                                                        .lastOrderAmount
                                                        .productCouponDiscountAmt,
                                                { symbol: '', precision: 0 },
                                            ).format()}{' '}
                                            원
                                        </div>
                                    </OrderInformationContent>
                                </OrderInformationList>
                                <OrderInformationList marginBottom='0'>
                                    <OrderInformationCategory>
                                        <div>적립금 사용</div>
                                    </OrderInformationCategory>
                                    <OrderInformationContent>
                                        <div>
                                            {orderCompleteData?.data
                                                .lastOrderAmount.subPayAmt >
                                                0 && '-'}
                                            {currency(
                                                orderCompleteData?.data
                                                    .lastOrderAmount.subPayAmt,
                                                { symbol: '', precision: 0 },
                                            ).format()}{' '}
                                            원
                                        </div>
                                    </OrderInformationContent>
                                </OrderInformationList>
                            </OrderInformationBox>
                            {deliveryInfo && (
                                <OrderInformationBox>
                                    <OrderInformationTitle>
                                        배송 정보
                                    </OrderInformationTitle>
                                    <OrderInformationList marginBottom='28px'>
                                        <OrderInformationCategory>
                                            <div>받는사람</div>
                                        </OrderInformationCategory>
                                        <OrderInformationContent>
                                            <div>
                                                {deliveryInfo.receiverName}
                                            </div>
                                        </OrderInformationContent>
                                    </OrderInformationList>
                                    <OrderInformationList marginBottom='28px'>
                                        <OrderInformationCategory>
                                            <div>주소</div>
                                        </OrderInformationCategory>
                                        <OrderInformationContent>
                                            <div>
                                                {deliveryInfo.receiverAddress}
                                                {
                                                    deliveryInfo.receiverDetailAddress
                                                }
                                            </div>
                                        </OrderInformationContent>
                                    </OrderInformationList>
                                    <OrderInformationList marginBottom='0'>
                                        <OrderInformationCategory>
                                            <div>전화번호</div>
                                        </OrderInformationCategory>
                                        <OrderInformationContent>
                                            <div>
                                                {pipe(
                                                    deliveryInfo.receiverContact1,
                                                    split('-'),
                                                    join(''),
                                                )}
                                            </div>
                                        </OrderInformationContent>
                                    </OrderInformationList>
                                </OrderInformationBox>
                            )}
                        </OrderInformationContainer>
                        <ButtonWrapper>
                            <OrderListButton
                                to={
                                    member ? PATHS.MY_ORDER_LIST : PATHS.MY_PAGE
                                }
                            >
                                주문 내역 보기
                            </OrderListButton>
                            <ContinueShoppingButton to={PATHS.MAIN}>
                                쇼핑 계속하기
                            </ContinueShoppingButton>
                        </ButtonWrapper>
                        <OrderProductListBox>
                            <CartCategoryBox>
                                <CartInformation>상품 정보</CartInformation>
                                <CartCountBox>수량</CartCountBox>
                                <CartPrice>가격</CartPrice>
                                <CartDelivery>배송비</CartDelivery>
                                <CartAmount>총 상품 금액</CartAmount>
                            </CartCategoryBox>
                            {orderList?.map((orderData) => {
                                return (
                                    <CartList
                                        cartData={orderData}
                                        key={orderData.optionNo}
                                        isModifiable={false}
                                    />
                                );
                            })}
                        </OrderProductListBox>
                    </CompleteContainer>
                )}
            </LayoutResponsive>
        </>
    );
};

export default Complete;
