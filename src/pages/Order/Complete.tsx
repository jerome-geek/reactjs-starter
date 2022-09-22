import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { head, join, pipe, split } from '@fxts/core';
import styled from 'styled-components';
import currency from 'currency.js';
import dayjs from 'dayjs';

import { myOrder } from 'api/order';
import { ORDER_REQUEST_TYPE, PAY_TYPE } from 'models';
import { OrderOptionsGroupByDelivery, OrderProductOption } from 'models/order';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import CartList from 'components/Cart/CartList';
import SEOHelmet from 'components/shared/SEOHelmet';
import Header from 'components/shared/Header';
import { useTypedSelector } from 'state/reducers';
import PATHS from 'const/paths';
import media from 'utils/styles/media';
import { isDesktop, isMobile } from 'utils/styles/responsive';

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
        height: auto;
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

const OrderFailMessage = styled.p`
    margin-top: 20px;
    font-size: 1.25rem;
    color: ${(props) => props.theme.text2};
    line-height: 1.4;
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

const GoMainButton = styled(ContinueShoppingButton)`
    margin: 0 auto;
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

    const { t: complete } = useTranslation('orderComplete');

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
                            payType = complete('paymentMethod.creditCard');
                            break;
                        case PAY_TYPE.REALTIME_ACCOUNT_TRANSFER:
                            payType = complete('paymentMethod.realtimeAccount');
                            break;
                        case PAY_TYPE.VIRTUAL_ACCOUNT:
                            payType = complete('paymentMethod.virtualAccount');
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
                    title: complete('progress.now'),
                }}
            />
            <Header />
            {
                <CompleteContainer type='large'>
                    {orderCompleteData ? (
                        <>
                            <Progress>
                                <div>{complete('progress.before')}</div>
                                <div>&#8250;</div>
                                <div className='current-progress'>
                                    {complete('progress.now')}
                                </div>
                            </Progress>
                            <OrderNoContainer>
                                <h2>{complete('orderComplete')}</h2>
                                <PayType>{payTypeName}</PayType>
                                {orderCompleteData.payType ===
                                    PAY_TYPE.VIRTUAL_ACCOUNT && (
                                    <>
                                        {isMobile(width) ? (
                                            <DepositDeadline>
                                                <span>
                                                    {dayjs(
                                                        orderCompleteData
                                                            .payInfo.bankInfo
                                                            ?.paymentExpirationYmdt,
                                                    ).format('YY.MM.DD')}{' '}
                                                    {complete('etc.until')}
                                                    <br />
                                                </span>
                                                <span>
                                                    {complete(
                                                        'etc.intoAccount',
                                                    )}
                                                </span>{' '}
                                                {complete(
                                                    'etc.productShipment',
                                                )}
                                            </DepositDeadline>
                                        ) : (
                                            <DepositDeadline>
                                                <span>
                                                    {dayjs(
                                                        orderCompleteData
                                                            .payInfo.bankInfo
                                                            ?.paymentExpirationYmdt,
                                                    ).format('YY.MM.DD')}{' '}
                                                    {complete('etc.until')}{' '}
                                                    {complete(
                                                        'etc.intoAccount',
                                                    )}
                                                </span>
                                                {complete(
                                                    'etc.productShipment',
                                                )}
                                            </DepositDeadline>
                                        )}
                                    </>
                                )}
                                <OrderNoBox>
                                    {complete('etc.orderNo')}{' '}
                                    {orderParam.get('orderNo')}
                                </OrderNoBox>
                            </OrderNoContainer>
                            <OrderInformationContainer>
                                {orderCompleteData.payType ===
                                    PAY_TYPE.VIRTUAL_ACCOUNT && (
                                    <OrderInformationBox>
                                        <OrderInformationTitle>
                                            {complete(
                                                'transferInformation.title',
                                            )}
                                        </OrderInformationTitle>
                                        <OrderInformationPrice marginBottom='60px'>
                                            <OrderInformationCategory>
                                                <div>
                                                    {complete(
                                                        'transferInformation.category.price',
                                                    )}
                                                </div>
                                            </OrderInformationCategory>
                                            <OrderInformationContent>
                                                <ImportantInformation>
                                                    {currency(
                                                        orderCompleteData
                                                            .payInfo.payAmt,
                                                        {
                                                            symbol: '',
                                                            precision: 0,
                                                        },
                                                    ).format()}{' '}
                                                    {complete('etc.won')}
                                                </ImportantInformation>
                                            </OrderInformationContent>
                                        </OrderInformationPrice>
                                        <OrderInformationList marginBottom='32px'>
                                            <OrderInformationCategory>
                                                <div>
                                                    {complete(
                                                        'transferInformation.category.accountInformation',
                                                    )}
                                                </div>
                                            </OrderInformationCategory>
                                            <OrderInformationContent>
                                                <div>
                                                    {
                                                        orderCompleteData
                                                            .payInfo.bankInfo
                                                            .bankName
                                                    }{' '}
                                                    {
                                                        orderCompleteData
                                                            .payInfo.bankInfo
                                                            .account
                                                    }
                                                    <p className='depositor_name'>
                                                        {
                                                            orderCompleteData
                                                                .payInfo
                                                                .bankInfo
                                                                .depositorName
                                                        }
                                                    </p>
                                                </div>
                                            </OrderInformationContent>
                                        </OrderInformationList>
                                        <OrderInformationList marginBottom='0'>
                                            <OrderInformationCategory>
                                                <div>
                                                    {complete(
                                                        'transferInformation.category.depositWait',
                                                    )}
                                                </div>
                                            </OrderInformationCategory>
                                            <OrderInformationContent>
                                                <div>
                                                    {dayjs(
                                                        orderCompleteData
                                                            .payInfo.bankInfo
                                                            .paymentExpirationYmdt,
                                                    ).format(
                                                        'YY.MM.DD HH:mm:ss',
                                                    )}{' '}
                                                    {complete('etc.until')}
                                                </div>
                                            </OrderInformationContent>
                                        </OrderInformationList>
                                    </OrderInformationBox>
                                )}
                                <OrderInformationBox>
                                    <OrderInformationTitle>
                                        {complete('paymentInformation.title')}
                                    </OrderInformationTitle>
                                    <OrderInformationPrice marginBottom='24px'>
                                        <OrderInformationCategory>
                                            <div>
                                                {complete(
                                                    'paymentInformation.category.totalPrice',
                                                )}
                                            </div>
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
                                                {complete('etc.won')}
                                            </ImportantInformation>
                                        </OrderInformationContent>
                                    </OrderInformationPrice>
                                    <OrderInformationList marginBottom='24px'>
                                        <OrderInformationCategory>
                                            <div>
                                                {complete(
                                                    'paymentInformation.category.productPrice',
                                                )}
                                            </div>
                                        </OrderInformationCategory>
                                        <OrderInformationContent>
                                            <div>
                                                {currency(
                                                    orderCompleteData
                                                        ?.lastOrderAmount
                                                        .standardAmt,
                                                    {
                                                        symbol: '',
                                                        precision: 0,
                                                    },
                                                ).format()}{' '}
                                                {complete('etc.won')}
                                            </div>
                                        </OrderInformationContent>
                                    </OrderInformationList>
                                    <OrderInformationList marginBottom='24px'>
                                        <OrderInformationCategory>
                                            <div>
                                                {complete(
                                                    'paymentInformation.category.deliverPrice',
                                                )}
                                            </div>
                                        </OrderInformationCategory>
                                        <OrderInformationContent>
                                            <div>
                                                {currency(
                                                    orderCompleteData
                                                        ?.lastOrderAmount
                                                        .deliveryAmt,
                                                    {
                                                        symbol: '',
                                                        precision: 0,
                                                    },
                                                ).format()}{' '}
                                                {complete('etc.won')}
                                            </div>
                                        </OrderInformationContent>
                                    </OrderInformationList>
                                    <OrderInformationList marginBottom='24px'>
                                        <OrderInformationCategory>
                                            <div>
                                                {complete(
                                                    'paymentInformation.category.discountPrice',
                                                )}
                                            </div>
                                        </OrderInformationCategory>
                                        <OrderInformationContent>
                                            <div>
                                                {currency(
                                                    (orderCompleteData
                                                        ?.lastOrderAmount
                                                        .immediateDiscountAmt +
                                                        orderCompleteData
                                                            ?.lastOrderAmount
                                                            .additionalDiscountAmt) *
                                                        -1,
                                                    {
                                                        symbol: '',
                                                        precision: 0,
                                                    },
                                                ).format()}{' '}
                                                {complete('etc.won')}
                                            </div>
                                        </OrderInformationContent>
                                    </OrderInformationList>
                                    <OrderInformationList marginBottom='24px'>
                                        <OrderInformationCategory>
                                            <div>
                                                {complete(
                                                    'paymentInformation.category.couponDiscount',
                                                )}
                                            </div>
                                        </OrderInformationCategory>
                                        <OrderInformationContent>
                                            <div>
                                                {currency(
                                                    (orderCompleteData
                                                        ?.lastOrderAmount
                                                        .cartCouponDiscountAmt +
                                                        orderCompleteData
                                                            ?.lastOrderAmount
                                                            .productCouponDiscountAmt) *
                                                        -1,
                                                    {
                                                        symbol: '',
                                                        precision: 0,
                                                    },
                                                ).format()}{' '}
                                                {complete('etc.won')}
                                            </div>
                                        </OrderInformationContent>
                                    </OrderInformationList>
                                    <OrderInformationList marginBottom='0'>
                                        <OrderInformationCategory>
                                            <div>
                                                {complete(
                                                    'paymentInformation.category.useDeposit',
                                                )}
                                            </div>
                                        </OrderInformationCategory>
                                        <OrderInformationContent>
                                            <div>
                                                {currency(
                                                    orderCompleteData
                                                        ?.lastOrderAmount
                                                        .subPayAmt * -1,
                                                    {
                                                        symbol: '',
                                                        precision: 0,
                                                    },
                                                ).format()}{' '}
                                                {complete('etc.won')}
                                            </div>
                                        </OrderInformationContent>
                                    </OrderInformationList>
                                </OrderInformationBox>
                                {deliveryInfo && (
                                    <OrderInformationBox>
                                        <OrderInformationTitle>
                                            {complete(
                                                'deliveryInformation.title',
                                            )}
                                        </OrderInformationTitle>
                                        <OrderInformationList marginBottom='28px'>
                                            <OrderInformationCategory>
                                                <div>
                                                    {complete(
                                                        'deliveryInformation.category.receiver',
                                                    )}
                                                </div>
                                            </OrderInformationCategory>
                                            <OrderInformationContent>
                                                <div>
                                                    {deliveryInfo.receiverName}
                                                </div>
                                            </OrderInformationContent>
                                        </OrderInformationList>
                                        <OrderInformationList marginBottom='28px'>
                                            <OrderInformationCategory>
                                                <div>
                                                    {complete(
                                                        'deliveryInformation.category.address',
                                                    )}
                                                </div>
                                            </OrderInformationCategory>
                                            <OrderInformationContent>
                                                <div>
                                                    {
                                                        deliveryInfo.receiverAddress
                                                    }
                                                    {
                                                        deliveryInfo.receiverDetailAddress
                                                    }
                                                </div>
                                            </OrderInformationContent>
                                        </OrderInformationList>
                                        <OrderInformationList marginBottom='0'>
                                            <OrderInformationCategory>
                                                <div>
                                                    {complete(
                                                        'deliveryInformation.category.phoneNumber',
                                                    )}
                                                </div>
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
                                        member
                                            ? PATHS.MY_ORDER_LIST
                                            : PATHS.MY_PAGE
                                    }
                                >
                                    {complete('etc.viewOrderList')}
                                </OrderListButton>
                                <ContinueShoppingButton to={PATHS.MAIN}>
                                    {complete('etc.keepShopping')}
                                </ContinueShoppingButton>
                            </ButtonWrapper>
                            <OrderProductListBox>
                                {isDesktop(width) && (
                                    <OrderCategoryBox>
                                        <OrderInformation>
                                            {complete(
                                                'orderProductList.category.productInformation',
                                            )}
                                        </OrderInformation>
                                        <OrderCount>
                                            {complete(
                                                'orderProductList.category.count',
                                            )}
                                        </OrderCount>
                                        <OrderPrice>
                                            {complete(
                                                'orderProductList.category.price',
                                            )}
                                        </OrderPrice>
                                        <OrderDelivery>
                                            {' '}
                                            {complete(
                                                'orderProductList.category.deliverPrice',
                                            )}
                                        </OrderDelivery>
                                        <OrderAmountPrice>
                                            {complete(
                                                'orderProductList.category.totalPrice',
                                            )}
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
                        </>
                    ) : (
                        <>
                            <OrderNoContainer>
                                <h2>{complete('orderFail')}</h2>
                                <OrderFailMessage
                                    dangerouslySetInnerHTML={{
                                        __html: complete('orderFailMessage'),
                                    }}
                                ></OrderFailMessage>
                            </OrderNoContainer>
                            <ButtonWrapper>
                                <GoMainButton to={PATHS.MAIN}>
                                    {complete('etc.keepShopping')}
                                </GoMainButton>
                            </ButtonWrapper>
                        </>
                    )}
                </CompleteContainer>
            }
        </>
    );
};

export default Complete;
