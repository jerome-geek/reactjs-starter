import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { CLAIM_TYPE } from 'models';
import { memberClaim } from 'api/claim';
import { GetOrderOptionDetailForClaimResponse } from 'models/claim';

interface useClaimOrderOptionDetailParams {
    orderOptionNo: number;
    params: {
        claimType: CLAIM_TYPE;
    };
    options?: UseQueryOptions<
        AxiosResponse<GetOrderOptionDetailForClaimResponse>,
        AxiosError,
        GetOrderOptionDetailForClaimResponse,
        [string, any]
    >;
}

const useClaimOrderOptionDetail = ({
    orderOptionNo,
    params,
    options,
}: useClaimOrderOptionDetailParams) => {
    return useQuery(
        ['claim_orderOptionDetail', orderOptionNo],
        async () =>
            await memberClaim.getOrderOptionDetailForClaim(
                orderOptionNo,
                params,
            ),
        {
            enabled: !!params && params.claimType !== CLAIM_TYPE.NONE,
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useClaimOrderOptionDetail;
