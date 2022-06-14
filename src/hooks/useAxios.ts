import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

const useAxios = <T>(
    queryKey: string,
    apiFunction: Promise<AxiosResponse>,
): [
    data: AxiosResponse<T> | undefined,
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
] => {
    const { data, isLoading, isSuccess, isError } = useQuery<
        AxiosResponse,
        AxiosError
    >(queryKey, async () => await apiFunction, {
        onError: (error) => {
            if (error instanceof AxiosError) {
                alert(error.response?.data.message);
                return;
            }
            alert('알수 없는 에러가 발생했습니다.');
        },
    });

    return [data, isLoading, isSuccess, isError];
};

export default useAxios;
