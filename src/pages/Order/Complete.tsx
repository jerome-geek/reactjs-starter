import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
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
import { isDesktop, isMobile } from 'utils/styles/responsive';
import { guestOrder, myOrder } from 'api/order';
import { ORDER_REQUEST_TYPE, PAY_TYPE } from 'models';
import { OrderOptionsGroupByDelivery, OrderProductOption } from 'models/order';
import { useMember, useQueryString } from 'hooks';
import { KRW } from 'utils/currency';
import HTTP_RESPONSE from 'const/http';

const CompleteContainer = styled(LayoutResponsive)`
    max-width: 840px;
`;

const OrderInformationContainer = styled.section`
    margin-bottom: 24px;
`;

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

const OrderInformationListDiv = styled.div<{ marginBottom: string }>`
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

const ButtonContainer = styled.div`
    margin-bottom: 90px;
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

const OrderInformationListTitle = styled.h3`
    font-size: 24px;
    line-height: 36px;
    font-weight: bold;
    letter-spacing: -1.2px;
    color: #191919;
    text-align: left;
    margin-bottom: 24px;
`;

const OrderInformationList = styled.ul`
    border-top: 2px solid #222943;
    padding: 40px 10px;
`;

const OrderInformationListItem = styled.li`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    font-size: 16px;
    line-height: 24px;
    color: #191919;

    & > p:first-child {
        letter-spacing: -0.64px;
        text-align: left;
    }

    & > p:last-child {
        letter-spacing: 0;
        text-align: right;
    }
`;

const Complete = () => {
    const query = useQueryString();

    const [orderList, setOrderList] = useState<
        Array<
            OrderProductOption & {
                deliveryAmt: number;
                productName: string;
            }
        >
    >([]);

    const { width } = useWindowSize();

    const { t: orderComplete } = useTranslation('orderComplete');

    // TODO: https://shopby.works/guide/dev-cover/order#/pay-button, useQueryString
    const orderParam = useMemo(
        () => new URLSearchParams(window.location.search),
        [],
    );

    const { member } = useMember();
    const isLogin = useMemo(() => !!member, [member]);

    const navigate = useNavigate();

    // TODO 캐시타임 지정 후 stale 상태이면 refetch or redirect
    const { data: orderCompleteData } = useQuery(
        ['orderCompleteData', { member: member?.memberName }],
        async () =>
            await myOrder.getOrderDetail(orderParam.get('orderNo')!, {
                orderRequestTypes: ORDER_REQUEST_TYPE.ALL,
            }),
        {
            enabled: isLogin && !!orderParam.get('orderNo'),
            select: (res) => ({ ...res.data, status: res.status }),
            onSuccess: (data) => {
                console.log(
                    '🚀 ~ file: Complete.tsx ~ line 452 ~ Complete ~ data',
                    data,
                );

                if (data.status === HTTP_RESPONSE.HTTP_OK) {
                    data.orderOptionsGroupByPartner.forEach(
                        (partnerOptionGroup: any) => {
                            partnerOptionGroup.orderOptionsGroupByDelivery.forEach(
                                (deliveryOptionGroup: any) => {
                                    deliveryOptionGroup.orderOptions.forEach(
                                        ({
                                            accumulationAmt,
                                            optionNo,
                                            imageUrl,
                                            optionManagementCd,
                                            optionName,
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
                                        }: any) => {
                                            console.log(
                                                '🚀 ~ file: Complete.tsx ~ line 373 ~ Complete ~ optionNo',
                                                optionNo,
                                            );
                                            setOrderList((prev) => [
                                                ...prev,
                                                {
                                                    accumulationAmtWhenBuyConfirm:
                                                        accumulationAmt,
                                                    cartNo: optionNo,
                                                    deliveryAmt:
                                                        deliveryOptionGroup.deliveryAmt,
                                                    imageUrl,
                                                    optionInputs: inputs,
                                                    optionManagementCd,
                                                    optionName,
                                                    optionNo,
                                                    optionTitle,
                                                    optionType,
                                                    optionValue,
                                                    orderCnt,
                                                    price,
                                                    productName,
                                                    productNo,
                                                    recurringDeliveryCycles:
                                                        null,
                                                    reservation,
                                                    reservationDeliveryYmdt,
                                                    setOptions,
                                                    soldOut: false, // TODO: check 필요
                                                    stockCnt: 999999, // TODO: check 필요
                                                },
                                            ]);
                                        },
                                    );
                                },
                            );
                        },
                    );
                }
            },
            onError: (error) => {
                console.log(
                    '🚀 ~ file: Complete.tsx ~ line 449 ~ Complete ~ error',
                    error,
                );
            },
            //     onSuccess: (res) => {
            //         const newOrderList: Array<
            //             OrderProductOption & {
            //                 deliveryAmt: number;
            //                 productName: string;
            //             }
            //         > = [];
            //         res.orderOptionsGroupByPartner.forEach((partnerOptionGroup) => {
            //             partnerOptionGroup.orderOptionsGroupByDelivery.forEach(
            //                 (deliveryOptionGroup) => {
            //                     deliveryOptionGroup.orderOptions.forEach(
            //                         ({
            //                             accumulationAmt,
            //                             optionNo,
            //                             imageUrl,
            //                             optionManagementCd,
            //                             optionName,
            //                             orderOptionNo,
            //                             optionTitle,
            //                             optionType,
            //                             optionValue,
            //                             orderCnt,
            //                             price,
            //                             productName,
            //                             productNo,
            //                             reservation,
            //                             reservationDeliveryYmdt,
            //                             setOptions,
            //                             inputs,
            //                         }) => {
            //                             newOrderList.push({
            //                                 accumulationAmtWhenBuyConfirm:
            //                                     accumulationAmt,
            //                                 cartNo: optionNo,
            //                                 deliveryAmt:
            //                                     deliveryOptionGroup.deliveryAmt,
            //                                 imageUrl,
            //                                 optionInputs: inputs,
            //                                 optionManagementCd,
            //                                 optionName,
            //                                 optionNo: orderOptionNo,
            //                                 optionTitle,
            //                                 optionType,
            //                                 optionValue,
            //                                 orderCnt,
            //                                 price,
            //                                 productName,
            //                                 productNo,
            //                                 recurringDeliveryCycles: null,
            //                                 reservation,
            //                                 reservationDeliveryYmdt,
            //                                 setOptions,
            //                                 soldOut: false,
            //                                 stockCnt: 999999,
            //                             });
            //                         },
            //                     );
            //                 },
            //             );
            //         });
            //         setOrderList([...newOrderList]);
            //         setDeliveryInfo(
            //             head(
            //                 head(res.orderOptionsGroupByPartner)!
            //                     .orderOptionsGroupByDelivery,
            //             ),
            //         );
            //     },
        },
    );

    const { data: guestOrderCompleteData } = useQuery(
        ['guestOrderCompleteData'],
        async () =>
            guestOrder.getOrderDetail(
                orderParam.get('guestToken')!,
                orderParam.get('orderNo')!,
                {
                    orderRequestType: ORDER_REQUEST_TYPE.ALL,
                },
            ),
        {
            enabled: !isLogin && !!orderParam.get('orderNo'),
            select: (res) => ({ ...res.data, status: res.status }),
            onSuccess: (data) => {
                console.log(
                    '🚀 ~ file: Complete.tsx ~ line 452 ~ Complete ~ data',
                    data,
                );

                if (data.status === HTTP_RESPONSE.HTTP_OK) {
                    data.orderOptionsGroupByPartner.forEach(
                        (partnerOptionGroup: any) => {
                            partnerOptionGroup.orderOptionsGroupByDelivery.forEach(
                                (deliveryOptionGroup: any) => {
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
                                        }: any) => {
                                            setOrderList((prev) => [
                                                ...prev,
                                                {
                                                    accumulationAmtWhenBuyConfirm:
                                                        accumulationAmt,
                                                    cartNo: optionNo,
                                                    deliveryAmt:
                                                        deliveryOptionGroup.deliveryAmt,
                                                    imageUrl,
                                                    optionInputs: inputs,
                                                    optionManagementCd,
                                                    optionName,
                                                    optionNo,
                                                    optionTitle,
                                                    optionType,
                                                    optionValue,
                                                    orderCnt,
                                                    price,
                                                    productName,
                                                    productNo,
                                                    recurringDeliveryCycles:
                                                        null,
                                                    reservation,
                                                    reservationDeliveryYmdt,
                                                    setOptions,
                                                    soldOut: false, // TODO: check 필요
                                                    stockCnt: 999999, // TODO: check 필요
                                                },
                                            ]);
                                        },
                                    );
                                },
                            );
                        },
                    );
                } else {
                    console.log('not ok');
                    alert(data.message);
                    navigate(PATHS.MAIN);
                }
            },
            onError: (error) => {
                console.log(
                    '🚀 ~ file: Complete.tsx ~ line 449 ~ Complete ~ error',
                    error,
                );
            },
        },
    );

    const orderInfo = useMemo(
        () => (isLogin ? orderCompleteData : guestOrderCompleteData),
        [isLogin, orderCompleteData, guestOrderCompleteData],
    );

    return (
        <>
            <SEOHelmet
                data={{
                    title: orderComplete('progress.now'),
                }}
            />

            <CompleteContainer>
                {!isMobile(width) && (
                    <OrderProgress
                        type='complete'
                        style={{ marginBottom: '48px' }}
                    />
                )}

                {query.result && orderInfo && (
                    <OrderCompleteTopContent
                        result={query.result as 'SUCCESS' | 'FAIL'}
                        payType={orderInfo.payType as PAY_TYPE}
                        orderNo={query.orderNo as string}
                        paymentExpirationYmdt={
                            orderInfo.payInfo?.bankInfo?.paymentExpirationYmdt
                        }
                        message={query?.message as string}
                    />
                )}

                {orderInfo && (
                    <>
                        <OrderInformationContainer>
                            <OrderInformationListTitle>
                                {orderComplete('transferInformation.title')}
                            </OrderInformationListTitle>
                            <OrderInformationList>
                                <OrderInformationListItem>
                                    <p style={{ fontWeight: 'bold' }}>
                                        {orderComplete(
                                            'transferInformation.category.price',
                                        )}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: 'bold',
                                            color: '#C00020',
                                        }}
                                    >
                                        {KRW(orderInfo.payInfo.payAmt).format()}
                                    </p>
                                </OrderInformationListItem>
                                <OrderInformationListItem>
                                    <p>
                                        {orderComplete(
                                            'transferInformation.category.accountInformation',
                                        )}
                                    </p>
                                    <p>
                                        {`${orderInfo.payInfo.bankInfo.bankName} ${orderInfo.payInfo.bankInfo.account}`}
                                        <br />
                                        <span
                                            style={{
                                                marginTop: '12px',
                                                color: '#858585',
                                            }}
                                        >
                                            {`${orderInfo.payInfo.bankInfo.remitterName}`}
                                        </span>
                                    </p>
                                </OrderInformationListItem>
                                <OrderInformationListItem>
                                    <p>
                                        {orderComplete(
                                            'transferInformation.category.depositWait',
                                        )}
                                    </p>

                                    <p>
                                        {`${dayjs(
                                            orderInfo.payInfo.bankInfo
                                                .paymentExpirationYmdt,
                                        ).format(
                                            'YY.MM.DD HH:mm:ss',
                                        )} ${orderComplete('etc.until')}`}
                                    </p>
                                </OrderInformationListItem>
                            </OrderInformationList>
                        </OrderInformationContainer>

                        <OrderInformationContainer>
                            <OrderInformationListTitle>
                                {orderComplete('paymentInformation.title')}
                            </OrderInformationListTitle>
                            <OrderInformationList>
                                <OrderInformationListItem>
                                    <p style={{ fontWeight: 'bold' }}>
                                        {orderComplete(
                                            'paymentInformation.category.totalPrice',
                                        )}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: 'bold',
                                            color: '#C00020',
                                        }}
                                    >
                                        {KRW(orderInfo.payInfo.payAmt).format()}
                                    </p>
                                </OrderInformationListItem>
                                <OrderInformationListItem>
                                    <p>
                                        {orderComplete(
                                            'paymentInformation.category.productPrice',
                                        )}
                                    </p>
                                    <p>
                                        {KRW(
                                            orderInfo.lastOrderAmount
                                                .standardAmt,
                                        ).format()}
                                    </p>
                                </OrderInformationListItem>
                                <OrderInformationListItem>
                                    <p>
                                        {orderComplete(
                                            'paymentInformation.category.deliverPrice',
                                        )}
                                    </p>
                                    <p>
                                        {KRW(
                                            orderInfo.lastOrderAmount
                                                .deliveryAmt,
                                        ).format()}
                                    </p>
                                </OrderInformationListItem>
                                <OrderInformationListItem>
                                    <p>
                                        {orderComplete(
                                            'paymentInformation.category.discountPrice',
                                        )}
                                    </p>
                                    <p>
                                        {KRW(
                                            orderInfo.lastOrderAmount
                                                .immediateDiscountAmt,
                                        )
                                            .add(
                                                orderInfo.lastOrderAmount
                                                    .additionalDiscountAmt,
                                            )
                                            .multiply(-1)
                                            .format()}
                                    </p>
                                </OrderInformationListItem>
                                <OrderInformationListItem>
                                    <p>
                                        {orderComplete(
                                            'paymentInformation.category.couponDiscount',
                                        )}
                                    </p>
                                    <p>
                                        {KRW(
                                            orderInfo.lastOrderAmount
                                                .cartCouponDiscountAmt,
                                        )
                                            .add(
                                                orderInfo.lastOrderAmount
                                                    .productCouponDiscountAmt,
                                            )
                                            .add(
                                                orderInfo.lastOrderAmount
                                                    .deliveryCouponDiscountAmt,
                                            )
                                            .multiply(-1)
                                            .format()}
                                    </p>
                                </OrderInformationListItem>
                                <OrderInformationListItem>
                                    <p>
                                        {orderComplete(
                                            'paymentInformation.category.useDeposit',
                                        )}
                                    </p>
                                    <p>
                                        {KRW(
                                            orderInfo.lastOrderAmount.subPayAmt,
                                        )
                                            .multiply(-1)
                                            .format()}
                                    </p>
                                </OrderInformationListItem>
                            </OrderInformationList>
                        </OrderInformationContainer>

                        <OrderInformationContainer
                            style={{ marginBottom: '80px' }}
                        >
                            <OrderInformationListTitle>
                                {orderComplete('deliveryInformation.title')}
                            </OrderInformationListTitle>
                            <OrderInformationList>
                                <OrderInformationListItem>
                                    <p>
                                        {orderComplete(
                                            'deliveryInformation.category.receiver',
                                        )}
                                    </p>
                                    <p>
                                        {orderInfo.shippingAddress.receiverName}
                                    </p>
                                </OrderInformationListItem>
                                <OrderInformationListItem>
                                    <p>
                                        {orderComplete(
                                            'deliveryInformation.category.address',
                                        )}
                                    </p>
                                    <p>
                                        {
                                            orderInfo.shippingAddress
                                                .receiverAddress
                                        }
                                        <br />
                                        {
                                            orderInfo.shippingAddress
                                                .receiverDetailAddress
                                        }
                                    </p>
                                </OrderInformationListItem>
                                <OrderInformationListItem>
                                    <p>
                                        {orderComplete(
                                            'deliveryInformation.category.phoneNumber',
                                        )}
                                    </p>
                                    <p>
                                        {
                                            orderInfo.shippingAddress
                                                .receiverContact1
                                        }
                                    </p>
                                </OrderInformationListItem>
                            </OrderInformationList>
                        </OrderInformationContainer>
                    </>
                )}

                <ButtonContainer>
                    {query.result === 'SUCCESS' && (
                        <>
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
                        </>
                    )}
                    {query.result === 'FAIL' && (
                        <GoMainButton to={PATHS.MAIN}>
                            {orderComplete('etc.keepShopping')}
                        </GoMainButton>
                    )}
                </ButtonContainer>

                {orderList.length > 0 && (
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
                )}
            </CompleteContainer>
        </>
    );
};

export default Complete;
