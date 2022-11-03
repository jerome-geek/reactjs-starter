import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

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

const OrderListContainer = styled(LayoutResponsive)`
    max-width: 840px;
`;

const OrderOptionList = styled.ul``;

const OrderDetailLink = styled(Link)`
    font-size: 12px;
    vertical-align: top;
    color: #999999;
    margin-left: 10px;
    font-weight: normal;
`;

const OrderList = () => {
    const [searchCondition, setSearchCondition] = useState({
        hasTotalCount: true,
        pageNumber: 1,
        pageSize: 30,
        startYmd: dayjs().subtract(3, 'months').format('YYYY-MM-DD'),
        endYmd: dayjs().format('YYYY-MM-DD'),
    });

    const { member } = useMember();
    const isLogin = useMemo(() => !!member, [member]);

    const { data: orderSummary } = useQuery(
        [
            PROFILE_ORDER_SUMMARY,
            member?.memberId,
            {
                startYmd: searchCondition.startYmd,
                endYmd: searchCondition.endYmd,
            },
        ],
        async () =>
            await myOrder.getOrderOptionStatus({
                startYmd: searchCondition.startYmd,
                endYmd: searchCondition.endYmd,
            }),
        {
            enabled: isLogin,
            keepPreviousData: true,
            select: ({ data }) => data,
        },
    );

    const { data: orderList } = useQuery(
        [MY_ORDER_LIST, member?.memberId, { ...searchCondition }],
        async () =>
            await myOrder.getOrderList({
                ...searchCondition,
            }),
        {
            enabled: isLogin,
            keepPreviousData: true,
            select: ({ data }) => data,
        },
    );

    return (
        <>
            <OrderListContainer>
                <SearchPeriod
                    startYmd={searchCondition.startYmd}
                    endYmd={searchCondition.endYmd}
                    searchCondition={searchCondition}
                    setSearchCondition={setSearchCondition}
                />

                {orderSummary && (
                    <OrderSummarySection orderSummary={orderSummary} />
                )}

                <div style={{ marginTop: '40px' }}>
                    {orderList && orderList?.items.length > 0 ? (
                        orderList?.items.map((order) => {
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
                                                fontWeight: 'bold',
                                                fontSize: '16px',
                                                letterSpacing: 0,
                                                color: '#191919',
                                                marginRight: '10px',
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
                                        {order.orderOptions?.map((option) => {
                                            return (
                                                <OrderOptionListItem
                                                    key={
                                                        option.orderNo +
                                                        option.optionNo
                                                    }
                                                    optionNo={option.optionNo}
                                                    productNo={option.productNo}
                                                    imageUrl={option.imageUrl}
                                                    orderStatusTypeLabel={
                                                        option.orderStatusTypeLabel ||
                                                        ''
                                                    }
                                                    orderStatusType={
                                                        option.orderStatusType
                                                    }
                                                    productName={
                                                        option.productName
                                                    }
                                                    optionName={
                                                        option.optionName
                                                    }
                                                    orderCnt={option.orderCnt}
                                                    price={option.price}
                                                    invoiceNo={
                                                        option.delivery
                                                            .invoiceNo
                                                    }
                                                    deliveryCompanyTypeLabel={
                                                        option.delivery
                                                            .deliveryCompanyTypeLabel ||
                                                        ''
                                                    }
                                                    nextActions={
                                                        option.nextActions
                                                    }
                                                    claimStatusType={
                                                        option.claimStatusType
                                                    }
                                                />
                                            );
                                        })}
                                    </OrderOptionList>
                                </div>
                            );
                        })
                    ) : (
                        <div>주문 내역이 없습니다.</div>
                    )}
                </div>
            </OrderListContainer>
        </>
    );
};

export default OrderList;
