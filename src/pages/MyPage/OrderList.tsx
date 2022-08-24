import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import Header from 'components/shared/Header';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import SearchPeriod from 'components/MyPage/SearchPeriod';
import OrderSummarySection from 'components/Order/OrderSummarySection';
import OrderOptionListItem from 'components/MyPage/OrderOptionListItem';
import { useMember } from 'hooks';
import { myOrder } from 'api/order';
import { MY_ORDER_LIST, PROFILE_ORDER_SUMMARY } from 'const/queryKeys';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PATHS from 'const/paths';

const OrderListWrapper = styled(LayoutResponsive)`
    margin-top: 150px;
`;

const OrderOptionList = styled.ul``;

const OrderDetailLink = styled(Link)`
    font-size: 12px;
    vertical-align: top;
    color: #999999;
`;

const DEFAULT_SEARCH_PERIOD = 7;

const OrderList = () => {
    const [searchPeriod, setSearchPeriod] = useState({
        startYmd: dayjs()
            .subtract(DEFAULT_SEARCH_PERIOD, 'days')
            .format('YYYY-MM-DD HH:mm:ss'),
        endYmd: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });

    const { member } = useMember();

    const { data: orderSummary } = useQuery(
        [PROFILE_ORDER_SUMMARY, member?.memberId],
        async () =>
            await myOrder.getOrderOptionStatus({
                startYmd: searchPeriod.startYmd,
                endYmd: searchPeriod.endYmd,
            }),
        {
            select: ({ data }) => {
                return data;
            },
        },
    );

    const { data: orderList } = useQuery(
        [MY_ORDER_LIST, member?.memberId],
        async () =>
            await myOrder.getOrderList({
                hasTotalCount: true,
                pageNumber: 1,
                pageSize: 30,
                startYmd: searchPeriod.startYmd,
                endYmd: searchPeriod.endYmd,
            }),
        {
            select: ({ data }) => {
                return data;
            },
        },
    );

    const onSearchClick = (startYmd: string, endYmd: string) => {
        setSearchPeriod({ startYmd, endYmd });
    };

    return (
        <>
            <Header />

            <OrderListWrapper type='medium'>
                <SearchPeriod
                    startYmd={searchPeriod.startYmd}
                    endYmd={searchPeriod.endYmd}
                    setSearchPeriod={setSearchPeriod}
                    onSearchClick={onSearchClick}
                />

                {orderSummary && (
                    <OrderSummarySection orderSummary={orderSummary} />
                )}

                <div style={{ marginTop: '40px' }}>
                    {orderList?.items.map((order: any) => {
                        console.log(
                            '🚀 ~ file: OrderList.tsx ~ line 71 ~ OrderList ~ order',
                            order,
                        );
                        return (
                            <div
                                key={order.orderNo}
                                style={{ borderTop: '2px solid #222943' }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '10px',
                                        lineHeight: '24px',
                                        borderBottom: '1px solid #222943',
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: '16px',
                                            letterSpacing: 0,
                                            color: '#191919',
                                        }}
                                    >
                                        {order.orderNo}&nbsp;
                                        <OrderDetailLink
                                            to={`${PATHS.MY_ORDER_DETAIL}/${order.orderNo}`}
                                        >
                                            주문상세&nbsp;
                                            <FontAwesomeIcon
                                                icon={faAngleRight}
                                            />
                                        </OrderDetailLink>
                                    </p>
                                    <p
                                        style={{
                                            fontSize: '10px',
                                            letterSpacing: 0,
                                            color: '#000000',
                                        }}
                                    >
                                        {`${dayjs(order.orderYmdt).format(
                                            'YY-MM-DD HH:mm',
                                        )} 주문`}
                                    </p>
                                </div>

                                <OrderOptionList>
                                    {order.orderOptions?.map((option: any) => {
                                        console.log(
                                            '🚀 ~ file: OrderList.tsx ~ line 99 ~ {orderList?.items.map ~ option',
                                            option,
                                        );
                                        return (
                                            <OrderOptionListItem
                                                key={
                                                    option.orderNo +
                                                    option.optionNo
                                                }
                                                productNo={option.productNo}
                                                imageUrl={option.imageUrl}
                                                orderStatusTypeLabel={
                                                    option.orderStatusTypeLabel
                                                }
                                                productName={option.productName}
                                                optionName={option.optionName}
                                                orderCnt={option.orderCnt}
                                                price={option.price}
                                                invoiceNo={
                                                    option.delivery.invoiceNo ||
                                                    411677450483
                                                } // TEST용 값 추가
                                                deliveryCompanyTypeLabel={
                                                    option.delivery
                                                        .deliveryCompanyTypeLabel
                                                }
                                            />
                                        );
                                    })}
                                </OrderOptionList>
                            </div>
                        );
                    })}
                </div>
            </OrderListWrapper>
        </>
    );
};

export default OrderList;
