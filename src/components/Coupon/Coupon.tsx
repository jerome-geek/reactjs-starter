import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

interface CouponProps extends HTMLAttributes<HTMLDivElement> {
    discountAmt: number;
    discountRate: number;
    couponName: string;
    useEndYmdt: Date;
}

const CouponContainer = styled.div`
    border: 1px solid ${(props) => props.theme.line2};
    border-radius: 8px;
    width: 350px;
    height: 143px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 14px;
    margin-right: 10px;
    flex: 1 0;
`;

const CouponPrice = styled.span`
    text-align: left;
    letter-spacing: 0;
    color: #191919;
    font-size: 38px;
    padding-bottom: 10px;
    font-weight: bold;
`;

const CouponTitle = styled.span`
    font-size: 12px;
    color: #999999;
    text-align: left;
`;

const CouponLimit = styled.span`
    letter-spacing: 0;
    color: #999999;
    font-size: 10px;
    text-align: right;
`;

const Coupon: FC<CouponProps> = ({
    discountAmt,
    discountRate,
    couponName,
    useEndYmdt,
    ...args
}) => {
    return (
        <CouponContainer {...args}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <CouponPrice>
                    {discountRate > 0 ? (
                        <>
                            {discountRate}
                            <span style={{ fontSize: '20px' }}>%</span>
                        </>
                    ) : (
                        discountAmt
                    )}
                </CouponPrice>
                <CouponTitle>{couponName}</CouponTitle>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CouponLimit>{`${dayjs(useEndYmdt).format(
                    'YY-MM-DD',
                )} 까지 사용 가능`}</CouponLimit>
            </div>
        </CouponContainer>
    );
};

export default Coupon;
