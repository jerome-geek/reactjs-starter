import { useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useQuery } from 'react-query';
import { flatMap, pipe, pluck, sum } from '@fxts/core';

import { useTypedSelector } from 'state/reducers';
import { cart } from 'api/order';

const useCart = () => {
    const [totalCount, setTotalCount] = useState(0);
    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const { cart: guestCartList } = useTypedSelector(
        ({ cart }) => ({
            cart: cart.data,
        }),
        shallowEqual,
    );

    const { data: cartInfo, refetch } = useQuery(
        ['cart', member?.memberId],
        async () => await cart.getCart(),
        {
            enabled: !!member,
            select: (response) => {
                return response.data;
            },
            onSuccess: (response) => {
                setTotalCount(
                    pipe(
                        response.deliveryGroups,
                        pluck('orderProducts'),
                        flatMap((a) => a),
                        flatMap((b) => b.orderProductOptions),
                        pluck('orderCnt'),
                        sum,
                    ),
                );
            },
        },
    );

    return {
        cartInfo,
        totalCount: member ? totalCount : guestCartList.length,
        refetch,
    };
};

export default useCart;
