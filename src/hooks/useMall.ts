import { useEffect } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import mall from 'api/mall';
import { IssueAccessTokenResponse } from 'models/auth';

const useMall = () => {
    const { data, isLoading } = useQuery<
        AxiosResponse<IssueAccessTokenResponse>,
        AxiosError
    >('mallInfo', async () => await mall.getMall(), {
        enabled: !localStorage.getItem('VC_MALL'),
    });

    useEffect(() => {
        if (data?.data) {
            localStorage.setItem('VC_MALL', JSON.stringify(data.data));
        }
    }, [data?.data]);

    return [data, isLoading];
};

export default useMall;
