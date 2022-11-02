import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { setMall } from 'state/slices/mallSlice';
import { useTypedSelector } from 'state/reducers';
import mall from 'api/mall';

const useMall = () => {
    const { mallInfo } = useTypedSelector(({ mall }) => ({
        mallInfo: mall.data,
    }));

    const dispatch = useDispatch();
    const { isLoading } = useQuery(
        'mallInfo',
        async () => await mall.getMall(),
        {
            staleTime: 1000 * 60 * 10,
            cacheTime: 1000 * 60 * 10,
            select: ({ data }) => data,
            onSuccess: (data) => {
                dispatch(setMall(data));
            },
        },
    );

    return { mallInfo, isLoading };
};

export default useMall;
