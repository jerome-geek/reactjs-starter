import { ComponentStory, ComponentMeta } from '@storybook/react';
import { COUPON_TARGET_TYPES, COUPON_TYPES, USABLE_PLATFORMS } from 'models';
import CouponSummary from './CouponSummary';
// import { Coupon as CouponInterface } from 'models/promotion';

export default {
    component: CouponSummary,
    argTypes: {
        coupons: { control: 'object' },
        // coupons: {control: CouponInterface[]},
    },
} as ComponentMeta<typeof CouponSummary>;

const Template: ComponentStory<typeof CouponSummary> = ({ coupons }) => (
    <CouponSummary coupons={coupons} />
);

export const NoCouponSummary = Template.bind({});
NoCouponSummary.args = {
    coupons: [],
};

export const OneCouponSummary = Template.bind({});
OneCouponSummary.args = {
    coupons: [
        {
            couponIssueNo: 4472534,
            couponName: '쿠폰지급 테스트',
            couponNo: 14042,
            couponType: COUPON_TYPES.PRODUCT,
            discountAmt: 0,
            discountRate: 10,
            fixedAmt: false,
            issueYmdt: new Date('2022-07-11 10:20:48'),
            maxDiscountAmt: 10000,
            maxSalePrice: 50000,
            minSalePrice: 10000,
            otherCouponUsable: true,
            cartCouponUsable: true,
            productCouponUsable: true,
            skipsAccumulation: false,
            usablePlatforms: [
                USABLE_PLATFORMS.PC,
                USABLE_PLATFORMS.MOBILE_WEB,
                USABLE_PLATFORMS.MOBILE_APP,
            ],
            limitPayType: null,
            limitPayTypes: null,
            useEndYmdt: new Date('2022-10-09 23:59:59'),
            useYmdt: null,
            used: false,
            couponTargetType: COUPON_TARGET_TYPES.ALL_PRODUCT,
            memberGradeNames: null,
            memberGroupNames: null,
            freeDelivery: false,
            minDeliveryAmt: null,
            fiexdAmt: false,
            reason: '',
        },
    ],
};

export const MoreTwoCouponsSummary = Template.bind({});
MoreTwoCouponsSummary.args = {
    coupons: [
        {
            couponIssueNo: 4472534,
            couponName: '쿠폰지급 테스트1',
            couponNo: 14042,
            couponType: COUPON_TYPES.PRODUCT,
            discountAmt: 0,
            discountRate: 10,
            fixedAmt: false,
            issueYmdt: new Date('2022-07-11 10:20:48'),
            maxDiscountAmt: 10000,
            maxSalePrice: 50000,
            minSalePrice: 10000,
            otherCouponUsable: true,
            cartCouponUsable: true,
            productCouponUsable: true,
            skipsAccumulation: false,
            usablePlatforms: [
                USABLE_PLATFORMS.PC,
                USABLE_PLATFORMS.MOBILE_WEB,
                USABLE_PLATFORMS.MOBILE_APP,
            ],
            limitPayType: null,
            limitPayTypes: null,
            useEndYmdt: new Date('2022-10-09 23:59:59'),
            useYmdt: null,
            used: false,
            couponTargetType: COUPON_TARGET_TYPES.ALL_PRODUCT,
            memberGradeNames: null,
            memberGroupNames: null,
            freeDelivery: false,
            minDeliveryAmt: null,
            fiexdAmt: false,
            reason: '',
        },
        {
            couponIssueNo: 4472534,
            couponName: '쿠폰지급 테스트2',
            couponNo: 14042,
            couponType: COUPON_TYPES.PRODUCT,
            discountAmt: 0,
            discountRate: 10,
            fixedAmt: false,
            issueYmdt: new Date('2022-07-11 10:20:48'),
            maxDiscountAmt: 10000,
            maxSalePrice: 50000,
            minSalePrice: 10000,
            otherCouponUsable: true,
            cartCouponUsable: true,
            productCouponUsable: true,
            skipsAccumulation: false,
            usablePlatforms: [
                USABLE_PLATFORMS.PC,
                USABLE_PLATFORMS.MOBILE_WEB,
                USABLE_PLATFORMS.MOBILE_APP,
            ],
            limitPayType: null,
            limitPayTypes: null,
            useEndYmdt: new Date('2022-10-09 23:59:59'),
            useYmdt: null,
            used: false,
            couponTargetType: COUPON_TARGET_TYPES.ALL_PRODUCT,
            memberGradeNames: null,
            memberGroupNames: null,
            freeDelivery: false,
            minDeliveryAmt: null,
            fiexdAmt: false,
            reason: '',
        },
    ],
};
