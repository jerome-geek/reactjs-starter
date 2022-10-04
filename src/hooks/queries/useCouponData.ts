import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import { coupon } from 'api/promotion';
import { PROFILE_COUPONS } from 'const/queryKeys';
import { CouponsParams } from 'models/promotion';

const useCouponData = ({
    memNo,
    params,
}: {
    memNo?: number;
    params?: CouponsParams;
}) => {
    const couponParams = params ?? {
        startYmd: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
        endYmd: dayjs().format('YYYY-MM-DD'),
        pageNumber: 1,
        pageSize: 30,
        usable: true,
    };

    return useQuery(
        [PROFILE_COUPONS, memNo, { ...couponParams }],
        async () => await coupon.getUserCoupons({ ...couponParams }),
        {
            enabled: !!memNo,
            select: ({ data }) => data,
        },
    );
};

export default useCouponData;
