import { useEffect } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { setMall } from 'state/slices/mallSlice';
import { useTypedSelector } from 'state/reducers';
import { MallResponse } from 'models/mall';
import mall from 'api/mall';
import { isEmptyObject } from 'utils';

const useMall = () => {
    const { mallInfo } = useTypedSelector((state) => ({
        mallInfo: state.mall,
    }));

    const { data, isLoading } = useQuery<
        AxiosResponse<MallResponse>,
        AxiosError
    >('mallInfo', async () => await mall.getMall(), {
        enabled: isEmptyObject(mallInfo),
        staleTime: 5000,
        cacheTime: 5000,
    });

    const dispatch = useDispatch();
    useEffect(() => {
        if (data?.data) {
            dispatch(setMall(data.data));
        }
    }, [data?.data, dispatch]);

    return [data, isLoading];
};

export default useMall;
