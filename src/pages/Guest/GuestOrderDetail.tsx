import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import OrderInformationSection from 'components/Order/OrderInformationSection';
import PrimaryButton from 'components/Button/PrimaryButton';
import SecondaryButton from 'components/Button/SecondaryButton';
import { guestOrder } from 'api/order';
import { tokenStorage } from 'utils/storage';
import { KRW } from 'utils/currency';
import media from 'utils/styles/media';
import PATHS from 'const/paths';

const GuestOrderDetailContainer = styled(LayoutResponsive)`
    max-width: 840px;
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

const ButtonContainer = styled.div`
    width: 100%;
    max-width: 440px;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;

    ${media.medium} {
        max-width: 380px;
    }
`;

const CancelOrderButton = styled(SecondaryButton)`
    max-width: 200px;
    border: 1px solid #dbdbdb;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    color: #000000;

    ${media.medium} {
        max-width: 186px;
        height: 54px;
    }
`;

const FaqButton = styled(PrimaryButton)`
    max-width: 200px;

    ${media.medium} {
        max-width: 186px;
        height: 54px;
    }
`;

// TODO: 주문번호가 유효하지 않거나 잘못된 주문번호일 경우 처리 필요
const GuestOrderDetail = () => {
    const { guestOrderNo } = useParams() as { guestOrderNo: string };
    const navigate = useNavigate();

    if (!guestOrderNo) {
        navigate(PATHS.GUEST_LOGIN);
    }

    const guestToken = useMemo(
        () =>
            tokenStorage.getGuestToken()
                ? tokenStorage.getGuestToken().accessToken
                : '',
        [],
    );

    const { t: orderComplete } = useTranslation('orderComplete');

    // TODO: 주문 취소 처리 추가
    const onCancelOrderClick = () => {
        console.log(
            '주문취소 버튼은 입금대기 / 결제완료 상태인 경우에만 노출됩니다.',
        );
    };

    const onFaqButtonClick = () => {
        navigate(PATHS.FAQ);
    };

    const guestOrderData = useQuery(
        ['guestOrderCompleteData'],
        async () => await guestOrder.getOrderDetail(guestToken, guestOrderNo),
        {
            enabled: !!guestToken && !!guestOrderNo,
            select: ({ data }) => data,
        },
    );

    return (
        <>
            <GuestOrderDetailContainer>
                {guestOrderData.data && (
                    <>
                        <OrderInformationSection
                            title={orderComplete('transferInformation.title')}
                        >
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
                                        {KRW(
                                            guestOrderData.data.payInfo.payAmt,
                                        ).format()}
                                    </p>
                                </OrderInformationListItem>
                                <OrderInformationListItem>
                                    <p>
                                        {orderComplete(
                                            'transferInformation.category.accountInformation',
                                        )}
                                    </p>
                                    <p>
                                        {`${guestOrderData.data.payInfo.bankInfo.bankName} ${guestOrderData.data.payInfo.bankInfo.account}`}
                                        <br />
                                        <span
                                            style={{
                                                marginTop: '12px',
                                                color: '#858585',
                                            }}
                                        >
                                            {`${guestOrderData.data.payInfo.bankInfo.remitterName}`}
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
                                            guestOrderData.data.payInfo.bankInfo
                                                .paymentExpirationYmdt,
                                        ).format(
                                            'YY.MM.DD HH:mm:ss',
                                        )} ${orderComplete('etc.until')}`}
                                    </p>
                                </OrderInformationListItem>
                            </OrderInformationList>
                        </OrderInformationSection>

                        <OrderInformationSection
                            title={orderComplete('paymentInformation.title')}
                        >
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
                                        {KRW(
                                            guestOrderData.data.payInfo.payAmt,
                                        ).format()}
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
                                            guestOrderData.data.lastOrderAmount
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
                                            guestOrderData.data.lastOrderAmount
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
                                            guestOrderData.data.lastOrderAmount
                                                .immediateDiscountAmt,
                                        )
                                            .add(
                                                guestOrderData.data
                                                    .lastOrderAmount
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
                                            guestOrderData.data.lastOrderAmount
                                                .cartCouponDiscountAmt,
                                        )
                                            .add(
                                                guestOrderData.data
                                                    .lastOrderAmount
                                                    .productCouponDiscountAmt,
                                            )
                                            .add(
                                                guestOrderData.data
                                                    .lastOrderAmount
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
                                            guestOrderData.data.lastOrderAmount
                                                .subPayAmt,
                                        )
                                            .multiply(-1)
                                            .format()}
                                    </p>
                                </OrderInformationListItem>
                            </OrderInformationList>
                        </OrderInformationSection>

                        <OrderInformationSection
                            title={orderComplete('deliveryInformation.title')}
                            style={{ marginBottom: '80px' }}
                        >
                            <OrderInformationList>
                                <OrderInformationListItem>
                                    <p>
                                        {orderComplete(
                                            'deliveryInformation.category.receiver',
                                        )}
                                    </p>
                                    <p>
                                        {
                                            guestOrderData.data.shippingAddress
                                                .receiverName
                                        }
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
                                            guestOrderData.data.shippingAddress
                                                .receiverAddress
                                        }
                                        <br />
                                        {
                                            guestOrderData.data.shippingAddress
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
                                            guestOrderData.data.shippingAddress
                                                .receiverContact1
                                        }
                                    </p>
                                </OrderInformationListItem>
                            </OrderInformationList>
                        </OrderInformationSection>
                    </>
                )}

                <ButtonContainer>
                    <CancelOrderButton onClick={onCancelOrderClick}>
                        주문취소
                    </CancelOrderButton>

                    <FaqButton onClick={onFaqButtonClick}>
                        FAQ 바로가기
                    </FaqButton>
                </ButtonContainer>
            </GuestOrderDetailContainer>
        </>
    );
};

export default GuestOrderDetail;
