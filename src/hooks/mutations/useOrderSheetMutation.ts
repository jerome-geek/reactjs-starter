import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';

import { orderSheet } from 'api/order';
import { OrderSheetBody } from 'models/order';
import PATHS from 'const/paths';

const useOrderSheetMutation = () => {
    const navigate = useNavigate();

    return useMutation<
        AxiosResponse<{ orderSheetNo: string }>,
        AxiosError<ShopByErrorResponse>,
        OrderSheetBody
    >(
        async (orderSheetList) =>
            await orderSheet.writeOrderSheet(orderSheetList),
        {
            onSuccess: (res) => {
                navigate(`${PATHS.ORDER}/${res.data.orderSheetNo}`);
            },
            onError: (error) => {
                alert(
                    error?.response?.data?.message ||
                        '주문서 생성에 실패하였습니다.',
                );
            },
        },
    );
};

export default useOrderSheetMutation;
