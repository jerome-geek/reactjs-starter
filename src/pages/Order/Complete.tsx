import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
import currency from 'currency.js';
import dayjs from 'dayjs';
import { head, join, pipe, split } from '@fxts/core';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import CartList from 'components/Cart/CartList';
import SEOHelmet from 'components/shared/SEOHelmet';
import Header from 'components/shared/Header';
import { useTypedSelector } from 'state/reducers';
import { myOrder } from 'api/order';
import { ORDER_REQUEST_TYPE, PAY_TYPE } from 'models';
import { OrderOptionsGroupByDelivery, OrderProductOption } from 'models/order';
import PATHS from 'const/paths';
import media from 'utils/styles/media';
import { isDesktop, isMobile } from 'utils/styles/responsive';
import { useWindowSize } from 'usehooks-ts';

const CompleteContainer = styled(LayoutResponsive)`
    padding: 118px 0;
    ${media.custom(1280)} {
        width: 100%;
        padding: 24px 24px;
    }
`;

const Progress = styled.div`
    display: flex;
    color: #ababab;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 48px;
    .current-progress {
        color: ${(props) => props.theme.text1};
    }
    > div {
        margin-right: 18px;
    }
    ${media.custom(1280)} {
        display: none;
    }
`;

const OrderNoContainer = styled.div`
    width: 100%;
    height: 310px;
    background-color: ${(props) => props.theme.bg2};
    margin: 0 0 70px;
    padding: 101px 0 0;
    > h2 {
        font-weight: bold;
        font-size: 1.875rem;
        color: ${(props) => props.theme.text1};
    }
    ${media.xlarge} {
        padding: 80px 0;
        height: 340px;
        > h2 {
            font-size: 1.71rem;
        }
    }
    ${media.medium} {
        > h2 {
            font-size: 2.5rem;
        }
    }
`;

const PayType = styled.div`
    display: inline-block;
    padding: 6px 11px;
    border: 1px solid #8c909d;
    margin: 30px 0 14px;
    color: #767676;
    font-size: 0.75rem;
    ${media.xlarge} {
        font-size: 1rem;
    }
    ${media.medium} {
        font-size: 1.166rem;
    }
`;

const DepositDeadline = styled.div`
    letter-spacing: -0.64px;
    color: #8f8f8f;
    margin-bottom: 14px;
    > span {
        font-weight: bold;
        color: ${(props) => props.theme.text1};
    }
    ${media.xlarge} {
        font-size: 1.143rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
        > span {
            line-height: 30px;
        }
    }
`;

const OrderNoBox = styled.div`
    color: #767676;
    ${media.xlarge} {
        font-size: 1rem;
    }
    ${media.medium} {
        font-size: 1.166rem;
    }
`;

const OrderInformationContainer = styled.div``;

const OrderInformationBox = styled.div`
    margin-bottom: 64px;
`;

const OrderInformationTitle = styled.div`
    text-align: left;
    color: ${(props) => props.theme.text1};
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -1.2px;
    padding-bottom: 24px;
    border-bottom: ${(props) => `2px solid ${props.theme.secondary}`};
    margin-bottom: 40px;
    ${media.xlarge} {
        margin-bottom: 20px;
        border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
        letter-spacing: 0;
        font-size: 1.143rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

const OrderInformationPrice = styled.div<{ marginBottom: string }>`
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-align: left;
    margin-bottom: ${(props) => props.marginBottom};
    color: ${(props) => props.theme.text1};
    font-weight: bold;
    ${media.xlarge} {
        margin-bottom: 24px;
        font-size: 1.143rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

const OrderInformationList = styled.div<{ marginBottom: string }>`
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-align: right;
    margin-bottom: ${(props) => props.marginBottom};
    color: #767676;
    ${media.xlarge} {
        margin-bottom: 24px;
        font-size: 1.143rem;
        letter-spacing: 0;
    }
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

const OrderInformationCategory = styled.div`
    ${media.xlarge} {
        color: ${(props) => props.theme.text1};
        font-weight: 500;
        letter-spacing: -0.64px;
    }
`;

const ImportantInformation = styled.div`
    ${media.xlarge} {
        color: ${(props) => props.theme.primary};
        font-size: 1.429rem;
        font-weight: bold;
    }
    ${media.medium} {
        color: ${(props) => props.theme.primary};
        font-size: 1.666rem;
    }
`;

const OrderInformationContent = styled.div`
    letter-spacing: 0;
    p {
        margin-top: 0.75rem;
    }
    ${media.xlarge} {
        color: ${(props) => props.theme.text1};
        font-weight: 500;
        .depositor_name {
            font-size: 0.857rem;
            color: ${(props) => props.theme.text2};
        }
    }
    ${media.medium} {
        max-width: 89%;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        .depositor_name {
            font-size: 1rem;
        }
    }
`;

const ButtonWrapper = styled.div`
    font-size: 16px;
    letter-spacing: -0.64px;
    line-height: 44px;
    display: flex;
    width: fit-content;
    margin: 0 auto;
    ${media.xlarge} {
        width: 100%;
        justify-content: space-between;
        > a {
            height: 54px;
            width: 48.94%;
            line-height: 54px;
            font-size: 1.143rem;
        }
    }
    ${media.medium} {
        > a {
            font-size: 1.333rem;
        }
    }
`;

const OrderListButton = styled(Link)`
    display: block;
    color: ${(props) => props.theme.text1};
    border: ${(props) => `1px solid ${props.theme.line2}`};
    width: 210px;
    height: 44px;
    margin-right: 21px;
    ${media.medium} {
        margin-right: 0;
    }
`;

const ContinueShoppingButton = styled(Link)`
    display: block;
    background: ${(props) => props.theme.secondary};
    color: #fff;
    width: 210px;
    height: 44px;
`;

const OrderProductListBox = styled.div`
    margin-top: 91px;
    border-top: 2px solid #222943;
    border-bottom: ${(props) => `2px solid ${props.theme.secondary}`};
`;

const OrderCategoryBox = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
    > div {
        padding: 20px 0;
        text-align: center;
        color: ${(props) => props.theme.text1};
        font-weight: bold;
    }
`;

const OrderInformation = styled.div`
    width: 29%;
    display: flex;
    justify-content: space-around;
`;

const OrderCount = styled.div`
    width: 18%;
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

const OrderPrice = styled.div`
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

const OrderDelivery = styled.div`
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #191919;
    font: 16px;
`;

const OrderAmountPrice = styled.div`
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
    const [payTypeName, setPayTypeName] = useState<string>();

    const { width } = useWindowSize();

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
            select: (res) => res.data,
            onSuccess: (res) => {
                const newOrderList: Array<
                    OrderProductOption & {
                        deliveryAmt: number;
                        productName: string;
                    }
                > = [];
                res.orderOptionsGroupByPartner.forEach((partnerOptionGroup) => {
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
                });
                setPayTypeName(() => {
                    let payType = '';
                    switch (res.payType) {
                        case PAY_TYPE.CREDIT_CARD:
                            payType = '신용카드';
                            break;
                        case PAY_TYPE.REALTIME_ACCOUNT_TRANSFER:
                            payType = '실시간 계좌 이체';
                            break;
                        case PAY_TYPE.VIRTUAL_ACCOUNT:
                            payType = '가상계좌';
                            break;
                        case PAY_TYPE.KPAY:
                            payType = 'KPAY';
                            break;
                    }
                    return payType;
                });
                setOrderList([...newOrderList]);
                setDeliveryInfo(
                    head(
                        head(res.orderOptionsGroupByPartner)!
                            .orderOptionsGroupByDelivery,
                    ),
                );
            },
            refetchOnWindowFocus: false,
            enabled: !!orderParam.get('orderNo'),
        },
    );

    return (
        <>
            <SEOHelmet
                data={{
                    title: '주문 완료',
                }}
            />
            <Header />
            {orderCompleteData && (
                <CompleteContainer type='large'>
                    <Progress>
                        <div>주문서</div>
                        <div>&#8250;</div>
                        <div className='current-progress'>주문 완료</div>
                    </Progress>
                    <OrderNoContainer>
                        <h2>주문이 완료되었습니다 !</h2>
                        <PayType>{payTypeName}</PayType>
                        {orderCompleteData.payType ===
                            PAY_TYPE.VIRTUAL_ACCOUNT && (
                            <>
                                {isMobile(width) ? (
                                    <DepositDeadline>
                                        <span>
                                            {dayjs(
                                                orderCompleteData.payInfo
                                                    .bankInfo
                                                    ?.paymentExpirationYmdt,
                                            ).format('YY.MM.DD')}{' '}
                                            까지 <br />
                                        </span>
                                        <span>계좌로 입금</span> 해주시면 제품이
                                        발송됩니다.
                                    </DepositDeadline>
                                ) : (
                                    <DepositDeadline>
                                        <span>
                                            {dayjs(
                                                orderCompleteData.payInfo
                                                    .bankInfo
                                                    ?.paymentExpirationYmdt,
                                            ).format('YY.MM.DD')}{' '}
                                            까지 계좌로 입금
                                        </span>
                                        해주시면 제품이 발송됩니다.
                                    </DepositDeadline>
                                )}
                            </>
                        )}
                        <OrderNoBox>
                            주문번호 {orderParam.get('orderNo')}
                        </OrderNoBox>
                    </OrderNoContainer>
                    <OrderInformationContainer>
                        {orderCompleteData.payType ===
                            PAY_TYPE.VIRTUAL_ACCOUNT && (
                            <OrderInformationBox>
                                <OrderInformationTitle>
                                    이체 정보
                                </OrderInformationTitle>
                                <OrderInformationPrice marginBottom='60px'>
                                    <OrderInformationCategory>
                                        <div>이체 금액</div>
                                    </OrderInformationCategory>
                                    <OrderInformationContent>
                                        <ImportantInformation>
                                            {currency(
                                                orderCompleteData.payInfo
                                                    .payAmt,
                                                {
                                                    symbol: '',
                                                    precision: 0,
                                                },
                                            ).format()}{' '}
                                            원
                                        </ImportantInformation>
                                    </OrderInformationContent>
                                </OrderInformationPrice>
                                <OrderInformationList marginBottom='32px'>
                                    <OrderInformationCategory>
                                        <div>계좌 정보</div>
                                    </OrderInformationCategory>
                                    <OrderInformationContent>
                                        <div>
                                            {
                                                orderCompleteData.payInfo
                                                    .bankInfo.bankName
                                            }{' '}
                                            {
                                                orderCompleteData.payInfo
                                                    .bankInfo.account
                                            }
                                            <p className='depositor_name'>
                                                {
                                                    orderCompleteData.payInfo
                                                        .bankInfo.depositorName
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
                                                orderCompleteData.payInfo
                                                    .bankInfo
                                                    .paymentExpirationYmdt,
                                            ).format('YY.MM.DD HH:mm:ss')}{' '}
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
                                    <div>총 결제 금액</div>
                                </OrderInformationCategory>
                                <OrderInformationContent>
                                    <ImportantInformation>
                                        {currency(
                                            orderCompleteData.payInfo.payAmt,
                                            { symbol: '', precision: 0 },
                                        ).format()}{' '}
                                        원
                                    </ImportantInformation>
                                </OrderInformationContent>
                            </OrderInformationPrice>
                            <OrderInformationList marginBottom='24px'>
                                <OrderInformationCategory>
                                    <div>상품 가격</div>
                                </OrderInformationCategory>
                                <OrderInformationContent>
                                    <div>
                                        {currency(
                                            orderCompleteData?.lastOrderAmount
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
                                            orderCompleteData?.lastOrderAmount
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
                                        {currency(
                                            (orderCompleteData?.lastOrderAmount
                                                .immediateDiscountAmt +
                                                orderCompleteData
                                                    ?.lastOrderAmount
                                                    .additionalDiscountAmt) *
                                                -1,
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
                                        {currency(
                                            (orderCompleteData?.lastOrderAmount
                                                .cartCouponDiscountAmt +
                                                orderCompleteData
                                                    ?.lastOrderAmount
                                                    .productCouponDiscountAmt) *
                                                -1,
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
                                        {currency(
                                            orderCompleteData?.lastOrderAmount
                                                .subPayAmt * -1,
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
                                        <div>{deliveryInfo.receiverName}</div>
                                    </OrderInformationContent>
                                </OrderInformationList>
                                <OrderInformationList marginBottom='28px'>
                                    <OrderInformationCategory>
                                        <div>주소</div>
                                    </OrderInformationCategory>
                                    <OrderInformationContent>
                                        <div>
                                            {deliveryInfo.receiverAddress}
                                            {deliveryInfo.receiverDetailAddress}
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
                            to={member ? PATHS.MY_ORDER_LIST : PATHS.MY_PAGE}
                        >
                            주문 내역 보기
                        </OrderListButton>
                        <ContinueShoppingButton to={PATHS.MAIN}>
                            쇼핑 계속하기
                        </ContinueShoppingButton>
                    </ButtonWrapper>
                    <OrderProductListBox>
                        {isDesktop(width) && (
                            <OrderCategoryBox>
                                <OrderInformation>상품 정보</OrderInformation>
                                <OrderCount>수량</OrderCount>
                                <OrderPrice>가격</OrderPrice>
                                <OrderDelivery>배송비</OrderDelivery>
                                <OrderAmountPrice>
                                    총 상품 금액
                                </OrderAmountPrice>
                            </OrderCategoryBox>
                        )}
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
        </>
    );
};

export default Complete;
