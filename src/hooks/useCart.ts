import { shallowEqual } from 'react-redux';
import { useQuery } from 'react-query';

import { useTypedSelector } from 'state/reducers';
import { cart } from 'api/order';

const useCart = () => {
    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const { data: cartInfo } = useQuery(
        ['cart', member?.memberId],
        async () => await cart.getCart(),
        {
            enabled: !!member,
            select: (response) => response.data,
        },
    );

    return { cartInfo };
};

export default useCart;
