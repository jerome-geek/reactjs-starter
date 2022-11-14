import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { orderSheet } from 'api/order';
import { OrderSheetResponse } from 'models/order';

interface useOrderSheetParams<T = OrderSheetResponse> {
    orderSheetNo: string;
    options?: UseQueryOptions<
        AxiosResponse<T>,
        AxiosError,
        T,
        [string, { orderSheetNo: string }]
    >;
}

const useOrderSheet = ({ orderSheetNo, options }: useOrderSheetParams) => {
    return useQuery(
        ['orderSheetData', { orderSheetNo }],
        async () =>
            await orderSheet.getOrderSheet(orderSheetNo, {
                includeMemberAddress: false,
            }),
        {
            enabled: !!orderSheetNo,
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useOrderSheet;
