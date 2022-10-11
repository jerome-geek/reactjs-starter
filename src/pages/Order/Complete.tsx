import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { head, join, pipe, split } from '@fxts/core';
import styled from 'styled-components';
import currency from 'currency.js';
import dayjs from 'dayjs';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import OrderCompleteTopContent from 'components/OrderSheet/OrderCompleteTopContent';
import CartList from 'components/Cart/CartList';
import SEOHelmet from 'components/shared/SEOHelmet';
import Header from 'components/shared/Header';
import OrderProgress from 'components/OrderSheet/OrderProgress';
import PATHS from 'const/paths';
import media from 'utils/styles/media';
import { isDesktop } from 'utils/styles/responsive';
import { myOrder } from 'api/order';
import { ORDER_REQUEST_TYPE, PAY_TYPE } from 'models';
import { OrderOptionsGroupByDelivery, OrderProductOption } from 'models/order';
import { useMember, useQueryString } from 'hooks';

const CompleteContainer = styled(LayoutResponsive)`
    padding: 118px 0;
    ${media.custom(1280)} {
        width: 100%;
        padding: 24px 24px;
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

    const { width } = useWindowSize();

    const { t: orderComplete } = useTranslation('orderComplete');

    const query = useQueryString();
    console.log('🚀 ~ file: Complete.tsx ~ line 367 ~ Complete ~ query', query);

    // TODO: https://shopby.works/guide/dev-cover/order#/pay-button, useQueryString
    const orderParam = useMemo(
        () => new URLSearchParams(window.location.search),
        [],
    );

    const { member } = useMember();

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
                setOrderList([...newOrderList]);
                setDeliveryInfo(
                    head(
                        head(res.orderOptionsGroupByPartner)!
                            .orderOptionsGroupByDelivery,
                    ),
                );
            },
            enabled: !!orderParam.get('orderNo'),
        },
    );

    return (
        <>
            <SEOHelmet
                data={{
                    title: orderComplete('progress.now'),
                }}
            />
            <Header />
            <CompleteContainer type='large'>
                <OrderProgress
                    type='complete'
                    style={{ marginBottom: '48px' }}
                />

                {query.result && (
                    <OrderCompleteTopContent
                        result={query.result as 'SUCCESS' | 'FAIL'}
                        payType={orderCompleteData?.payType as PAY_TYPE}
                        orderNo={query.orderNo as string}
                        paymentExpirationYmdt={
                            orderCompleteData?.payInfo?.bankInfo
                                ?.paymentExpirationYmdt
                        }
                        message={query?.message as string}
                    />
                )}

                {query.result === 'SUCCESS' && orderCompleteData && (
                    <>
                        <OrderInformationContainer>
                            {orderCompleteData.payType ===
                                PAY_TYPE.VIRTUAL_ACCOUNT && (
                                <OrderInformationBox>
                                    <OrderInformationTitle>
                                        {orderComplete(
                                            'transferInformation.title',
                                        )}
                                    </OrderInformationTitle>
                                    <OrderInformationPrice marginBottom='60px'>
                                        <OrderInformationCategory>
                                            <div>
                                                {orderComplete(
                                                    'transferInformation.category.price',
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
                                                {orderComplete('etc.won')}
                                            </ImportantInformation>
                                        </OrderInformationContent>
                                    </OrderInformationPrice>
                                    <OrderInformationList marginBottom='32px'>
                                        <OrderInformationCategory>
                                            <div>
                                                {orderComplete(
                                                    'transferInformation.category.accountInformation',
                                                )}
                                            </div>
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
                                                        orderCompleteData
                                                            .payInfo.bankInfo
                                                            .depositorName
                                                    }
                                                </p>
                                            </div>
                                        </OrderInformationContent>
                                    </OrderInformationList>
                                    <OrderInformationList marginBottom='0'>
                                        <OrderInformationCategory>
                                            <div>
                                                {orderComplete(
                                                    'transferInformation.category.depositWait',
                                                )}
                                            </div>
                                        </OrderInformationCategory>
                                        <OrderInformationContent>
                                            <div>
                                                {dayjs(
                                                    orderCompleteData.payInfo
                                                        .bankInfo
                                                        .paymentExpirationYmdt,
                                                ).format(
                                                    'YY.MM.DD HH:mm:ss',
                                                )}{' '}
                                                {orderComplete('etc.until')}
                                            </div>
                                        </OrderInformationContent>
                                    </OrderInformationList>
                                </OrderInformationBox>
                            )}
                            <OrderInformationBox>
                                <OrderInformationTitle>
                                    {orderComplete('paymentInformation.title')}
                                </OrderInformationTitle>
                                <OrderInformationPrice marginBottom='24px'>
                                    <OrderInformationCategory>
                                        <div>
                                            {orderComplete(
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
                                            {orderComplete('etc.won')}
                                        </ImportantInformation>
                                    </OrderInformationContent>
                                </OrderInformationPrice>
                                <OrderInformationList marginBottom='24px'>
                                    <OrderInformationCategory>
                                        <div>
                                            {orderComplete(
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
                                            {orderComplete('etc.won')}
                                        </div>
                                    </OrderInformationContent>
                                </OrderInformationList>
                                <OrderInformationList marginBottom='24px'>
                                    <OrderInformationCategory>
                                        <div>
                                            {orderComplete(
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
                                            {orderComplete('etc.won')}
                                        </div>
                                    </OrderInformationContent>
                                </OrderInformationList>
                                <OrderInformationList marginBottom='24px'>
                                    <OrderInformationCategory>
                                        <div>
                                            {orderComplete(
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
                                            {orderComplete('etc.won')}
                                        </div>
                                    </OrderInformationContent>
                                </OrderInformationList>
                                <OrderInformationList marginBottom='24px'>
                                    <OrderInformationCategory>
                                        <div>
                                            {orderComplete(
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
                                            {orderComplete('etc.won')}
                                        </div>
                                    </OrderInformationContent>
                                </OrderInformationList>
                                <OrderInformationList marginBottom='0'>
                                    <OrderInformationCategory>
                                        <div>
                                            {orderComplete(
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
                                            {orderComplete('etc.won')}
                                        </div>
                                    </OrderInformationContent>
                                </OrderInformationList>
                            </OrderInformationBox>
                            {deliveryInfo && (
                                <OrderInformationBox>
                                    <OrderInformationTitle>
                                        {orderComplete(
                                            'deliveryInformation.title',
                                        )}
                                    </OrderInformationTitle>
                                    <OrderInformationList marginBottom='28px'>
                                        <OrderInformationCategory>
                                            <div>
                                                {orderComplete(
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
                                                {orderComplete(
                                                    'deliveryInformation.category.address',
                                                )}
                                            </div>
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
                                            <div>
                                                {orderComplete(
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
                                    member ? PATHS.MY_ORDER_LIST : PATHS.MY_PAGE
                                }
                            >
                                {orderComplete('etc.viewOrderList')}
                            </OrderListButton>
                            <ContinueShoppingButton to={PATHS.MAIN}>
                                {orderComplete('etc.keepShopping')}
                            </ContinueShoppingButton>
                        </ButtonWrapper>
                        <OrderProductListBox>
                            {isDesktop(width) && (
                                <OrderCategoryBox>
                                    <OrderInformation>
                                        {orderComplete(
                                            'orderProductList.category.productInformation',
                                        )}
                                    </OrderInformation>
                                    <OrderCount>
                                        {orderComplete(
                                            'orderProductList.category.count',
                                        )}
                                    </OrderCount>
                                    <OrderPrice>
                                        {orderComplete(
                                            'orderProductList.category.price',
                                        )}
                                    </OrderPrice>
                                    <OrderDelivery>
                                        {' '}
                                        {orderComplete(
                                            'orderProductList.category.deliverPrice',
                                        )}
                                    </OrderDelivery>
                                    <OrderAmountPrice>
                                        {orderComplete(
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
                )}
                {query.result === 'FAIL' && (
                    <ButtonWrapper>
                        <GoMainButton to={PATHS.MAIN}>
                            {orderComplete('etc.keepShopping')}
                        </GoMainButton>
                    </ButtonWrapper>
                )}
            </CompleteContainer>
        </>
    );
};

export default Complete;
