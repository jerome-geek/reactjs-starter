import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { coupon } from 'api/promotion';
import { AxiosError, AxiosResponse } from 'axios';
import { SEX } from 'models';

interface SignUp {
    email: string;
    memberName: string;
    password: string;
    year: number;
    month: number;
    day: number;
    smsAgreed: boolean;
    directMailAgreed: boolean;
    sex: SEX;
}

interface CouponType {
    id: string;
    title: string;
    content: string;
}

const SignUpCompleted = () => {
    const [couponList, setCouponList] = useState<CouponType[]>([]);

    const location = useLocation();
    const state = location.state as SignUp;
    const { memberName } = state;
    const navigate = useNavigate();

    useEffect(() => {
        const getCouponList = async () => {
            try {
                const newCoupon = await coupon.getCoupons({
                    pageNumber: 1,
                    pageSize: 30,
                    usable: true,
                });
                setCouponList((prev: CouponType[]) => [
                    ...prev,
                    ...newCoupon.data.items,
                ]);
            } catch (error) {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                    return;
                } else if (error instanceof Error) {
                    return;
                } else {
                    alert('알수 없는 에러가 발생했습니다.');
                    return;
                }
            }
        };
        getCouponList();
    }, []);

    return (
        <>
            <header>
                <button onClick={() => navigate(-1)}>{'<'}</button>
                <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    회원 가입
                </h2>
            </header>
            <div style={{ width: '380px', margin: '30px auto' }}>
                {<p>{memberName}</p>}님, 환영합니다. <br />
                할인받고 구매해보세요!
                {/* TODO 쿠폰 있을 때와 없을 경우 처리 {couponList.length > 0 && .map(({ id, title, content }) => {
                return;
                })} */}
                <div
                    style={{
                        margin: '20px 0',
                        border: '1px solid #aaa',
                        padding: '30px 0',
                        textAlign: 'center',
                    }}
                >
                    <p>신규 회원 감사쿠폰</p>
                    <p style={{ fontSize: '1.3em', fontWeight: 'bold' }}>
                        3,000원
                    </p>
                </div>
                <div
                    style={{
                        fontWeight: 'bold',
                        color: '#fff',
                        background: '#000',
                        padding: '20px 0',
                        textAlign: 'center',
                    }}
                >
                    쿠폰 다운로드
                </div>
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