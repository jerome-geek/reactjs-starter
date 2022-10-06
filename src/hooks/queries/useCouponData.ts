import { useQuery, UseQueryOptions } from 'react-query';
import dayjs from 'dayjs';
import { AxiosError, AxiosResponse } from 'axios';

import { coupon } from 'api/promotion';
import { PROFILE_COUPONS } from 'const/queryKeys';
import { Coupon, CouponsParams } from 'models/promotion';

interface useCouponDataParams {
    memberNo?: number;
    params?: CouponsParams;
    options?: UseQueryOptions<
        AxiosResponse<{ totalCount: number; items: Coupon[] }>,
        AxiosError,
        { totalCount: number; items: Coupon[] },
        [string, number | undefined, CouponsParams]
    >;
}

const useCouponData = ({
    memberNo,
    params = {
        startYmd: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
        endYmd: dayjs().format('YYYY-MM-DD'),
        pageNumber: 1,
        pageSize: 30,
        usable: true,
    },
    options = {
        enabled: !!memberNo,
        select: ({ data }) => data,
    },
}: useCouponDataParams) => {
    return useQuery(
        [PROFILE_COUPONS, memberNo, { ...params }],
        async () => await coupon.getUserCoupons({ ...params }),
        { ...options },
    );
};

export default useCouponData;
