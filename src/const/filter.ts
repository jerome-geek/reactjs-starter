import { ORDER_DIRECTION, PRODUCT_BY } from 'models';

export const filter = [
    {
        title: '최신순',
        orderBy: PRODUCT_BY.RECENT_PRODUCT,
        direction: ORDER_DIRECTION.DESC,
    },
    {
        title: '주문많은순',
        orderBy: PRODUCT_BY.POPULAR,
        direction: ORDER_DIRECTION.DESC,
    },
    {
        title: '가격낮은순',
        orderBy: PRODUCT_BY.DISCOUNTED_PRICE,
        direction: ORDER_DIRECTION.ASC,
    },
    {
        title: '가격 높은순',
        orderBy: PRODUCT_BY.DISCOUNTED_PRICE,
        direction: ORDER_DIRECTION.DESC,
    },
];
