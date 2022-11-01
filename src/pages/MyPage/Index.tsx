import { useLayoutEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styled from 'styled-components';

import SEOHelmet from 'components/shared/SEOHelmet';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import OrderSummarySection from 'components/Order/OrderSummarySection';
import ShoppingSummary from 'components/Order/ShoppingSummary';
import CouponSummary from 'components/MyPage/CouponSummary';
import MyGoodsSummary from 'components/MyPage/MyGoodsSummary';
import { accumulation } from 'api/manage';
import { myOrder } from 'api/order';
import { PROFILE_ACCUMULATION, PROFILE_ORDER_SUMMARY } from 'const/queryKeys';
import PATHS from 'const/paths';
import { useMember } from 'hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import useCouponData from 'hooks/queries/useCouponData';
import { isLogin } from 'utils/users';

const MyPageSummaryContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 36px;
`;

const StyledLink = styled(Link)`
    font-size: 12px;
    letter-spacing: 0px;
    color: #999999;
    opacity: 1;
`;

const MyPageContainer = styled(LayoutResponsive)`
    max-width: 840px;
`;

const MyPageSection = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #dbdbdb;
`;

const MyPageTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
`;

const MyPageIndex = () => {
    const navigate = useNavigate();

    const { member, onLogOutClick } = useMember();

    const { data: accumulationData } = useQuery(
        [PROFILE_ACCUMULATION, member?.memberId],
        async () =>
            await accumulation.getAccumulationSummary({
                startYmd: dayjs()
                    .subtract(1, 'year')
                    .format('YYYY-MM-DD HH:mm:ss'),
                endYmd: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            }),
        {
            enabled: isLogin(),
            select: ({ data }) => data,
        },
    );

    const { data: orderSummary } = useQuery(
        [PROFILE_ORDER_SUMMARY, member?.memberId],
        async () =>
            await myOrder.getOrderOptionStatus({
                startYmd: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
                endYmd: dayjs().format('YYYY-MM-DD'),
            }),
        {
            enabled: isLogin(),
            select: ({ data }) => data,
        },
    );
    const couponData = useCouponData({ memberNo: member?.memberNo });

    return (
        <>
            <SEOHelmet data={{ title: '마이페이지' }} />

            <MyPageContainer>
                <MyPageSection
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}
                >
                    <MyPageTitle>마이페이지</MyPageTitle>
                    <ul style={{ display: 'flex', fontSize: '12px' }}>
                        <li style={{ marginRight: '20px' }}>{member?.email}</li>
                        <li
                            style={{
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            }}
                            onClick={onLogOutClick}
                        >
                            로그아웃
                        </li>
                    </ul>
                </MyPageSection>

                <MyPageSection>
                    <MyPageSummaryContainer>
                        <p style={{ fontSize: '30px' }}>
                            <strong style={{ fontWeight: 'bolder' }}>
                                {member?.memberName}
                            </strong>
                            님, 안녕하세요!
                        </p>

                        <StyledLink to={PATHS.MY_INFO}>
                            정보수정 <FontAwesomeIcon icon={faAngleRight} />
                        </StyledLink>
                    </MyPageSummaryContainer>

                    {accumulationData && couponData.data && (
                        <ShoppingSummary
                            myGoodsCount={0}
                            totalAvailableAmt={
                                accumulationData.totalAvailableAmt
                            }
                            couponCount={couponData.data.totalCount}
                        />
                    )}

                    {orderSummary && (
                        <OrderSummarySection
                            orderSummary={orderSummary}
                            to={PATHS.MY_ORDER_LIST}
                        />
                    )}
                </MyPageSection>

                <MyPageSection>
                    <MyGoodsSummary myGoods={[1, 2, 3, 4]} />
                </MyPageSection>

                <MyPageSection style={{ border: 0 }}>
                    {couponData.data && (
                        <CouponSummary coupons={couponData.data.items} />
                    )}
                </MyPageSection>
            </MyPageContainer>
        </>
    );
};

export default MyPageIndex;
