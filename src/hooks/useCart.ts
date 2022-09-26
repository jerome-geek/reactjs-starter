import { useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useQuery } from 'react-query';
import { flatMap, pipe, pluck, size } from '@fxts/core';

import { useTypedSelector } from 'state/reducers';
import { reset } from 'state/slices/memberSlice';
import { cart } from 'api/order';

const useCart = () => {
    const [totalCount, setTotalCount] = useState(0);
    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const { cart: guestCartInfo } = useTypedSelector(
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
                        size,
                    ),
                );
            },
            onError: (error) => {
                reset();
            },
        },
    );

    return {
        cartInfo,
        totalCount: member ? totalCount : guestCartInfo.length,
        refetch,
    };
};

export default useCart;
