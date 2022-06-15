import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import { coupon } from 'api/promotion';
import { useTypedSelector } from 'state/reducers';
import { IssuableCouponResponse } from 'models/promotion';
import { CHANNEL_TYPE } from 'models';

const SignUpCompleted = () => {
    const { member } = useTypedSelector(({ member }) => ({
        member: member.data,
    }));
    const navigate = useNavigate();
    const [couponList, setCouponList] = useState<IssuableCouponResponse[]>([]);

    useQuery<AxiosResponse<IssuableCouponResponse[]>, AxiosError>(
        'couponList',
        async () => await coupon.getCouponsIssuable(),
        {
            onSuccess: (res) => {
                setCouponList([...res.data]);
            },
            onError: (error) => {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                    return;
                }
                alert('알수 없는 에러가 발생했습니다.');
                return;
            },
        },
    );

    const downloadCoupon = async (couponNo: number) => {
        try {
            await coupon.issueCoupon(couponNo, {
                channelType: CHANNEL_TYPE.NAVER_EP, // TODO 외부채널 타입
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data.message);
                return;
            } else {
                alert('알수 없는 에러가 발생했습니다.');
                return;
            }
        }
    };

    return (
        <>
            <header>
                <button onClick={() => navigate(-1)}>{'<'}</button>
                <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    회원 가입
                </h2>
            </header>
            <div style={{ width: '380px', margin: '30px auto' }}>
                {member?.memberName}님, 환영합니다. <br />
                <p>할인받고 구매해보세요!</p>
                {couponList.length > 0 ? (
                    couponList.map(
                        ({
                            couponName,
                            couponNo,
                            discountInfo,
                            useConstraint,
                            dateInfo,
                        }) => (
                            <React.Fragment key={couponNo}>
                                <div
                                    style={{
                                        margin: '20px 0',
                                        border: '1px solid #aaa',
                                        padding: '30px 0',
                                        textAlign: 'center',
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: '1.3em',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {couponName}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        fontSize: '1.3em',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {discountInfo.discountRate}%
                                </p>
                                <p
                                    style={{
                                        fontSize: '1.3em',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {`최대 ${discountInfo.maxDiscountAmt}원 할인 ${useConstraint.minSalePrice}원 이상 ~ ${useConstraint.maxSalePrice}원 이하 사용 가능`}
                                </p>
                                <p
                                    style={{
                                        fontSize: '1.3em',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {`${dayjs(dateInfo.issueEndYmdt).format(
                                        'YY.MM.DD',
                                    )}`}
                                    까지 발급 가능
                                </p>
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        background: '#000',
                                        padding: '20px 0',
                                        textAlign: 'center',
                                    }}
                                    onClick={() => downloadCoupon(couponNo)}
                                >
                                    쿠폰 다운로드
                                </div>
                            </React.Fragment>
                        ),
                    )
                ) : (
                    <p>다운로드 받을 쿠폰이 없습니다</p>
                )}
                <div style={{ marginBottom: '30px' }}>
                    <p
                        style={{
                            color: '#333',
                            marginTop: '15px',
                            textAlign: 'center',
                        }}
                    >
                        *발급일부터 180일이내 사용 가능
                    </p>
                </div>
                <div>
                    <p style={{ fontWeight: '600' }}>
                        정품 등록시,
                        <br />
                        추가 쿠폰을 받으실 수 있습니다.
                    </p>
                </div>
                <div
                    style={{
                        fontWeight: 'bold',
                        color: '#fff',
                        background: '#000',
                        padding: '20px 0',
                        textAlign: 'center',
                        marginTop: '25px',
                    }}
                >
                    정품 등록하러 가기
                </div>
            </div>
        </>
    );
};

export default SignUpCompleted;
