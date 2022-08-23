import { myOrder } from 'api/order';
import OrderSummarySection from 'components/Order/OrderSummarySection';
import Header from 'components/shared/Header';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import { MY_ORDER_LIST, PROFILE_ORDER_SUMMARY } from 'const/queryKeys';
import dayjs from 'dayjs';
import { useMember } from 'hooks';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const OrderListWrapper = styled(LayoutResponsive)`
    margin-top: 150px;
`;

const OrderList = () => {
    const { member } = useMember();

    const { data: orderSummary } = useQuery(
        [PROFILE_ORDER_SUMMARY, member?.memberId],
        async () =>
            await myOrder.getOrderOptionStatus({
                startYmd: dayjs()
                    .subtract(1, 'year')
                    .format('YYYY-MM-DD HH:mm:ss'),
                endYmd: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            }),
        {
            select: ({ data }) => {
                return data;
            },
        },
    );

    useQuery(
        [MY_ORDER_LIST, member?.memberId],
        async () =>
            await myOrder.getOrderList({
                hasTotalCount: true,
                pageNumber: 1,
                pageSize: 1,
                startYmd: dayjs()
                    .subtract(1, 'year')
                    .format('YYYY-MM-DD HH:mm:ss'),
                endYmd: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            }),
        {
            select: ({ data }) => {
                console.log('🚀 ~ file: OrderList.tsx ~ line 37 ~ data', data);
                return data;
            },
        },
    );

    return (
        <>
            <Header />

            <OrderListWrapper type='medium'>
                {orderSummary && (
                    <OrderSummarySection orderSummary={orderSummary} />
                )}
            </OrderListWrapper>
        </>
    );
};

export default OrderList;
