import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { every, pipe, toArray, map } from '@fxts/core';
import { DevTool } from '@hookform/devtools';

import SEOHelmet from 'components/shared/SEOHelmet';
import Header from 'components/shared/Header';
import MobileHeader from 'components/shared/MobileHeader';
import CartList from 'components/Cart/CartList';
import OrdererInformation from 'components/OrderSheet/OrdererInformation';
import ShippingAddress from 'components/OrderSheet/ShippingAddress';
import DiscountApply from 'components/OrderSheet/DiscountApply';
import CommonPayment from 'components/OrderSheet/CommonPayment';
import OrderSheetPrice from 'components/OrderSheet/OrderSheetPrice';
import ShippingListModal from 'components/Modal/ShippingListModal';
import SearchAddressModal from 'components/Modal/SearchAddressModal';
import GuestOrderPassword from 'components/OrderSheet/GuestOrderPassword';
import CouponListModal from 'components/Modal/CouponListModal';
import OrderTermsAgreement from 'components/OrderSheet/OrderTermsAgreement';
import PrimaryButton from 'components/Button/PrimaryButton';
import OrderProgress from 'components/OrderSheet/OrderProgress';
import { ReactComponent as Checked } from 'assets/icons/checkbox_square_checked.svg';
import { ReactComponent as UnChecked } from 'assets/icons/checkbox_square_unchecked.svg';
import { CHANNEL_TYPE, COUNTRY_CD, PAY_TYPE, PG_TYPE } from 'models';
import {
    CouponRequest,
    OrderProductOption,
    PaymentReserve,
} from 'models/order';
import { orderSheet } from 'api/order';
import media from 'utils/styles/media';
import { isDesktop, isMobile } from 'utils/styles/responsive';
import { useMall, useMember } from 'hooks';
import PATHS from 'const/paths';
import { KRW } from 'utils/currency';
import payment from 'utils/payment';

const OrderSheetContainer = styled.form`
    width: 1280px;
    margin: 118px auto;

    ${media.custom(1280)} {
        padding: 0 24px;
        margin-top: 35px;
        width: 100%;
    }
`;

const SheetMainContainer = styled.div`
    width: 1280px;
    display: flex;
    justify-content: space-between;
    position: relative;
    ${media.custom(1280)} {
        width: 100%;
    }
    ${media.medium} {
        margin-top: 25px;
        margin-bottom: 10px;
        flex-direction: column;
    }
`;

const SheetOrderWrapper = styled.div`
    width: 838px;
    ${media.custom(1280)} {
        width: 65.4%;
    }
    ${media.medium} {
        width: 100%;
    }
`;

const GuestLoginBox = styled.div`
    border: ${(props) => `1px solid ${props.theme.line2}`};
    text-align: left;
    padding: 18px 18px;
    font-size: 16px;
    color: #000;
    line-height: 28px;
    letter-spacing: -0.64px;
    > a {
        font-weight: bold;
        text-decoration: underline;
    }
`;

const SheetTitle = styled.div<{ marginTop?: string }>`
    position: relative;
    display: flex;
    align-items: center;
    margin: ${(props) =>
        props.marginTop
            ? `${props.marginTop} 0 20px 28px`
            : '60px 0 20px 28px'};
    > h3 {
        text-align: left;
        color: ${(props) => props.theme.text1};
        font-size: 1.5rem;
        font-weight: bold;
    }
    .shipping-info {
        color: #000;
        font-size: 0.75rem;
        border: ${(props) => `1px solid ${props.theme.line2}`};
        padding: 5px 11px;
        margin-left: 20px;
        cursor: pointer;
    }
    .order-info {
        position: absolute;
        right: 0;
        bottom: 0;
        color: #8f8f8f;
        > input {
            display: none;
        }
        > label {
            display: flex;
            align-items: center;
            cursor: pointer;
            > p {
                margin-left: 9px;
            }
        }
    }
    ${media.medium} {
        margin: ${(props) =>
            props.marginTop ? `${props.marginTop} 0 20px` : '44px 0 20px'};
        h3 {
            font-size: 1.25rem;
            letter-spacing: -0.72px;
        }
        .shipping-info {
            font-size: 0.75rem;
            letter-spacing: -0.4px;
        }
        .order-info {
            font-size: 1rem;
            letter-spacing: -0.56px;
        }
    }
    ${media.small} {
        h3 {
            font-size: 1.8rem;
            letter-spacing: -0.72px;
        }
        .shipping-info {
            font-size: 1rem;
            letter-spacing: -0.4px;
        }
        .order-info {
            font-size: 1.4rem;
            letter-spacing: -0.56px;
        }
    }
`;

const OrderProductListBox = styled.div`
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `2px solid ${props.theme.secondary}`};
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
    width: 29%;
    display: flex;
    justify-content: space-around;
`;

const CartCountBox = styled.div`
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

const SheetOrderPriceWrapper = styled.div`
    height: fit-content;
    position: sticky;
    right: 0;
    top: 84px;
    width: 400px;
    ${media.custom(1280)} {
        width: 31.25%;
    }
    ${media.medium} {
        width: 100%;
        margin-top: 44px;
    }
`;

const PaymentButton = styled(PrimaryButton)`
    width: 100%;

    ${media.small} {
        position: fixed;
        bottom: 0;
        left: 0;
    }
`;

const Sheet = () => {
    const { orderSheetNo } = useParams() as { orderSheetNo: string };

    const { member } = useMember();
    const isLogin = useMemo(() => !!member, [member]);

    const [orderList, setOrderList] = useState<
        Array<
            OrderProductOption & {
                deliveryAmt: number;
                productName: string;
            }
        >
    >([]);
    const [ordererInformation, setOrdererInformation] = useState(false);
    const [orderPriceData, setOrderPriceData] = useState({
        totalStandardAmt: 0, // 총 상품금액
        totalDeliveryAmt: 0, // 총 배송비
        totalDiscountAmt: 0, // 총 할인금액
        totalCouponAmt: 0, // 쿠폰 할인
        usedAccumulationAmt: 0, // 적립금 결제
        paymentAmt: 0, // 총 결제금액
    });
    const [orderTerms, setOrderTerms] = useState<
        { id: string; url: ''; isChecked: boolean }[]
    >(
        isLogin
            ? [{ id: 'agreePurchase', url: '', isChecked: false }]
            : [
                  { id: 'agreeOrderService', url: '', isChecked: false },
                  { id: 'agreeOrderInformation', url: '', isChecked: false },
                  { id: 'agreePurchase', url: '', isChecked: false },
              ],
    );

    const [isShippingListModal, setIsShippingListModal] = useState(false);
    const [isSearchAddressModal, setIsSearchAddressModal] = useState(false);
    const [isCouponListModal, setIsCouponListModal] = useState(false);
    const [selectCoupon, setSelectCoupon] = useState<CouponRequest>();

    const { width } = useWindowSize();

    const { mallInfo } = useMall();

    const { t: sheet } = useTranslation('orderSheet');

    // TODO:해외배송상품여부에 따라 통관부호 받아야함
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm<PaymentReserve>({
        defaultValues: {
            orderSheetNo,
            orderTitle: '',
            pgType: PG_TYPE.INICIS,
            payType: PAY_TYPE.CREDIT_CARD,
            orderer: {
                ordererName: member?.memberName,
                ordererEmail: member?.email,
                ordererContact1: member?.mobileNo,
                ordererContact2: '',
            },
            shippingAddress: {
                addressNo: 0,
                receiverZipCd: '',
                receiverAddress: '',
                receiverJibunAddress: '',
                receiverDetailAddress: '',
                receiverName: '',
                addressName: '',
                requestShippingDate: '',
                receiverContact1: '',
                receiverContact2: '',
                customsIdNumber: '', // TODO: 해외배송 상품인 경우 처리 필요
                countryCd: COUNTRY_CD.KR,
                shippingInfoLaterInputContact: '',
            },
            // orderTitle:
            //     orderData?.data.deliveryGroups[0]?.orderProducts[0]
            //         ?.productName,
            useDefaultAddress: false,
            deliveryMemo: '',
            member: isLogin,
            // coupons: {
            //     productCoupons: null,
            //     cartCouponIssueNo: null,
            // },
            tempPassword: '', // TODO: 비회원용
            updateMember: false,
            subPayAmt: 0,
            inAppYn: 'N',
            // accumulationAmt: 0,  // TODO: schema 확인 필요
            // availableMaxAccumulationAmt: 0,  // TODO: schema 확인 필요
            // paymentAmt: 0, // TODO: schema 확인 필요
            // paymentAmt: orderData?.data.paymentInfo.paymentAmt,
            bankAccountToDeposit: {
                bankAccount: mallInfo?.bankAccountInfo.bankAccount,
                bankCode: mallInfo?.bankAccountInfo.bankName,
                bankDepositorName: mallInfo?.bankAccountInfo.bankDepositorName,
            },
        },
    });

    const { data: orderData, refetch: orderRefetch } = useQuery(
        ['orderData', { member: member?.memberName }],
        async () =>
            await orderSheet.getOrderSheet(orderSheetNo, {
                includeMemberAddress: false,
            }),
        {
            select: ({ data }) => data,
            onSuccess: (data) => {
                setOrderList(() => {
                    const newOrderList: Array<
                        OrderProductOption & {
                            deliveryAmt: number;
                            productName: string;
                        }
                    > = [];
                    data.deliveryGroups.forEach((deliveryGroup) => {
                        deliveryGroup.orderProducts.forEach((orderProduct) => {
                            orderProduct.orderProductOptions.forEach(
                                (productOption) => {
                                    newOrderList.push({
                                        ...productOption,
                                        deliveryAmt: deliveryGroup.deliveryAmt,
                                        productName: orderProduct.productName,
                                    });
                                },
                            );
                        });
                    });
                    return [...newOrderList];
                });

                setOrderPriceData({
                    totalStandardAmt: data.paymentInfo.totalStandardAmt,
                    totalDeliveryAmt:
                        data.paymentInfo.deliveryAmt +
                        data.paymentInfo.remoteDeliveryAmt,
                    totalDiscountAmt:
                        data.paymentInfo.totalImmediateDiscountAmt +
                        data.paymentInfo.totalAdditionalDiscountAmt,
                    usedAccumulationAmt: data.paymentInfo.usedAccumulationAmt,
                    totalCouponAmt:
                        data.paymentInfo.cartCouponAmt +
                        data.paymentInfo.productCouponAmt +
                        data.paymentInfo.deliveryCouponAmt,
                    paymentAmt: data.paymentInfo.paymentAmt,
                });
            },
        },
    );

    const { mutate: couponApplyMutate } = useMutation(
        async () =>
            await orderSheet.applyCoupon(orderSheetNo, {
                cartCouponIssueNo: selectCoupon?.cartCouponIssueNo,
                channelType: CHANNEL_TYPE.NAVER_EP,
                promotionCode: selectCoupon?.promotionCode,
                productCoupons: selectCoupon?.productCoupons,
            }),
        {
            onSuccess: () => {
                orderRefetch();
            },
        },
    );

    const isAllOrderTermsChecked = useMemo(
        () =>
            pipe(
                orderTerms,
                every((b) => b.isChecked),
            ),
        [orderTerms],
    );

    const agreeAllHandler = (checked: boolean) => {
        setOrderTerms((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isChecked: checked })),
                toArray,
            ),
        );
    };

    const agreeHandler = (term: string) => {
        setOrderTerms((prev) =>
            pipe(
                prev,
                map((a: any) =>
                    a.id === term ? { ...a, isChecked: !a.isChecked } : a,
                ),
                toArray,
            ),
        );
    };

    const onOrderFormSubmit = handleSubmit(async (data) => {
        if (isAllOrderTermsChecked) {
            await payment.setConfiguration();
            await payment.reservation(data);
        } else {
            alert('필수약관에 동의해주세요.');
            return;
        }
    });

    const onCouponModalClick = () => {
        setIsCouponListModal((prev) => !prev);
    };

    const onAccumulationButtonClick = () => {
        // TODO: 적립금 사용 버튼을 눌렀을 경우 getCalculatedOrderSheet API 호출 후 계산값을 다시 세팅해준다
    };

    return (
        <>
            <DevTool control={control} placement='top-right' />

            <SEOHelmet
                data={{
                    title: sheet('progress.now'),
                }}
            />

            {isShippingListModal && (
                <ShippingListModal
                    onClickToggleModal={() =>
                        setIsShippingListModal(!isShippingListModal)
                    }
                    width={'1080px'}
                    register={register}
                    setValue={setValue}
                    setIsShippingListModal={setIsShippingListModal}
                />
            )}
            {isSearchAddressModal && (
                <SearchAddressModal
                    onClickToggleModal={() =>
                        setIsSearchAddressModal((prev) => !prev)
                    }
                    width={'720px'}
                    height={'720px'}
                    register={register}
                    setValue={setValue}
                />
            )}
            {isCouponListModal && (
                <CouponListModal
                    onClickToggleModal={() =>
                        setIsCouponListModal((prev) => !prev)
                    }
                    width={'700px'}
                    height={'696px'}
                    setIsCouponListModal={setIsCouponListModal}
                    setSelectCoupon={setSelectCoupon}
                    orderSheetNo={orderSheetNo}
                    couponApplyMutate={couponApplyMutate}
                />
            )}

            {isDesktop(width) ? (
                <Header />
            ) : (
                <MobileHeader title={sheet('progress.now')} />
            )}

            <OrderSheetContainer onSubmit={onOrderFormSubmit}>
                {!isMobile(width) && (
                    <OrderProgress
                        type='progress'
                        style={{ marginBottom: '60px' }}
                    />
                )}
                <SheetMainContainer>
                    <SheetOrderWrapper>
                        {!isLogin && !isMobile(width) && (
                            <GuestLoginBox>
                                <p>{sheet('etc.inviteJoin')}</p>
                                <Link to={PATHS.JOIN_AGREEMENT}>
                                    {sheet('etc.joinMember')}
                                </Link>
                            </GuestLoginBox>
                        )}

                        <SheetTitle marginTop='30px'>
                            <h3>{sheet('orderProduct.title')}</h3>
                        </SheetTitle>

                        <OrderProductListBox>
                            {!isMobile(width) && (
                                <CartCategoryBox>
                                    <CartInformation>
                                        {sheet(
                                            'orderProduct.category.information',
                                        )}
                                    </CartInformation>
                                    <CartCountBox>
                                        {sheet('orderProduct.category.count')}
                                    </CartCountBox>
                                    <CartPrice>
                                        {sheet('orderProduct.category.price')}
                                    </CartPrice>
                                    <CartDelivery>
                                        {sheet(
                                            'orderProduct.category.deliveryPrice',
                                        )}
                                    </CartDelivery>
                                    <CartAmount>
                                        {sheet(
                                            'orderProduct.category.amountPrice',
                                        )}
                                    </CartAmount>
                                </CartCategoryBox>
                            )}
                            {orderList.map((orderData) => {
                                return (
                                    <CartList
                                        cartData={orderData}
                                        key={orderData.optionNo}
                                        isModifiable={false}
                                    />
                                );
                            })}
                        </OrderProductListBox>

                        <SheetTitle>
                            <h3>{sheet('ordererInformation.title')}</h3>
                        </SheetTitle>

                        <OrdererInformation
                            register={register}
                            errors={errors}
                        />

                        <SheetTitle>
                            <h3>{sheet('shippingAddress.title')}</h3>
                            {member && (
                                <div
                                    className='shipping-info'
                                    onClick={() => setIsShippingListModal(true)}
                                >
                                    {sheet(
                                        'shippingAddress.addressInformation',
                                    )}
                                </div>
                            )}
                            <div className='order-info'>
                                <input
                                    type='checkbox'
                                    id='orderInfo'
                                    onChange={() =>
                                        setOrdererInformation((prev) => !prev)
                                    }
                                    checked={ordererInformation}
                                />
                                <label htmlFor='orderInfo'>
                                    {ordererInformation ? (
                                        <Checked />
                                    ) : (
                                        <UnChecked />
                                    )}
                                    {sheet(
                                        'shippingAddress.sameOrderInformation',
                                    )}
                                </label>
                            </div>
                        </SheetTitle>

                        <ShippingAddress
                            register={register}
                            setValue={setValue}
                            getValues={getValues}
                            ordererInformation={
                                ordererInformation
                                    ? {
                                          receiverName: getValues(
                                              'orderer.ordererName',
                                          ),
                                          receiverContact1: getValues(
                                              'orderer.ordererContact1',
                                          ),
                                      }
                                    : undefined
                            }
                            setIsSearchAddressModal={setIsSearchAddressModal}
                            errors={errors}
                        />

                        <DiscountApply
                            paymentInfo={orderData?.paymentInfo}
                            setValue={setValue}
                            subPayAmt={watch('subPayAmt')}
                            onAccumulationButtonClick={
                                onAccumulationButtonClick
                            }
                            onCouponModalClick={onCouponModalClick}
                        />

                        {orderData?.availablePayTypes && (
                            <CommonPayment
                                setValue={setValue}
                                payType={watch('payType')}
                                availablePayTypes={orderData?.availablePayTypes}
                            />
                        )}

                        {!isLogin && (
                            <GuestOrderPassword
                                register={register}
                                errors={errors}
                            />
                        )}
                    </SheetOrderWrapper>

                    <SheetOrderPriceWrapper>
                        {orderData?.paymentInfo && (
                            <OrderSheetPrice
                                title={sheet('paymentInformation.title')}
                                totalStandardAmt={
                                    orderPriceData.totalStandardAmt
                                }
                                totalDeliveryAmt={
                                    orderPriceData.totalDeliveryAmt
                                }
                                totalDiscountAmt={
                                    orderPriceData.totalDiscountAmt
                                }
                                totalCouponAmt={orderPriceData.totalCouponAmt}
                                totalPaymentAmt={
                                    orderData.paymentInfo.paymentAmt
                                }
                            />
                        )}

                        <OrderTermsAgreement
                            isLogin={isLogin}
                            orderTerms={orderTerms}
                            isAllOrderTermsChecked={isAllOrderTermsChecked}
                            agreeHandler={agreeHandler}
                            agreeAllHandler={agreeAllHandler}
                        />

                        <PaymentButton type='submit'>
                            {isMobile(width)
                                ? `${KRW(
                                      orderPriceData.paymentAmt,
                                  ).format()} ${sheet('etc.payment')}`
                                : sheet('etc.payment')}
                        </PaymentButton>
                    </SheetOrderPriceWrapper>
                </SheetMainContainer>
            </OrderSheetContainer>
        </>
    );
};

export default Sheet;
