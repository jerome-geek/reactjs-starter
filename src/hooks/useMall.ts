import { useEffect } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { setMall } from 'state/slices/mallSlice';
import { useTypedSelector } from 'state/reducers';
import { MallResponse } from 'models/mall';
import mall from 'api/mall';

// TODO: 당일 00시까지 캐시 처리 필요
const useMall = () => {
    const { mallInfo } = useTypedSelector((state) => ({
        mallInfo: state.mall,
    }));

    const { data, isLoading } = useQuery<
        AxiosResponse<MallResponse>,
        AxiosError
    >('mallInfo', async () => await mall.getMall(), {
        enabled: !mallInfo,
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
