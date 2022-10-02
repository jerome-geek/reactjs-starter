import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { setMall } from 'state/slices/mallSlice';
import { useTypedSelector } from 'state/reducers';
import mall from 'api/mall';

const useMall = () => {
    const { mallInfo } = useTypedSelector(({ mall }) => ({
        mallInfo: mall,
    }));

    const dispatch = useDispatch();
    const { isLoading } = useQuery(
        'mallInfo',
        async () => await mall.getMall(),
        // TODO: staleTime, cahceTime 설정
        {
            staleTime: 5000,
            cacheTime: 5000,
            select: ({ data }) => {
                return data;
            },
            onSuccess: (data) => {
                dispatch(setMall(data));
            },
        },
    );

    return { mallInfo, isLoading };
};

export default useMall;
