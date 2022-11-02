import {
    append,
    findIndex,
    pipe,
    reduce,
    toArray,
    map,
} from '@fxts/core';
import { expect, test } from '@jest/globals';
import { ShoppingCartBody } from 'models/order';

interface initialState extends ShoppingCartBody {
    isChecked?: boolean;
}

const prevCartList = [
    {
        orderCnt: 1,
        channelType: 'NAVER_EP',
        optionInputs: [],
        optionNo: 38912024,
        productNo: 105356240,
    },
    {
        orderCnt: 2,
        channelType: 'NAVER_EP',
        optionInputs: [],
        optionNo: 38912024,
        productNo: 105356240,
    },
];

const nextCartList = [
    {
        orderCnt: 3,
        channelType: 'NAVER_EP',
        optionInputs: [],
        optionNo: 38912024,
        productNo: 105356240,
    },
    {
        orderCnt: 5,
        channelType: 'NAVER_EP',
        optionInputs: [],
        optionNo: 3891202411,
        productNo: 105356240,
    },
];

describe('장바구니 담기', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // test('george', () => {
    //     const combinedArray = [...prevCartList, ...nextCartList];

    //     const cartList1: initialState[] = combinedArray.reduce(
    //         (accumulatedCartList: initialState[], currentCartData) => {
    //             const overlapIndex = findIndex(
    //                 (a) => a.optionNo === currentCartData.optionNo,
    //                 accumulatedCartList,
    //             );

    //             if (overlapIndex === -1) {
    //                 accumulatedCartList.push(currentCartData);
    //             } else {
    //                 accumulatedCartList[overlapIndex].orderCnt +=
    //                     currentCartData.orderCnt;
    //             }
    //             return accumulatedCartList;
    //         },
    //         [],
    //     );

    //     expect(cartList1).toEqual([
    //         {
    //             orderCnt: 6,
    //             channelType: 'NAVER_EP',
    //             optionInputs: [],
    //             optionNo: 38912024,
    //             productNo: 105356240,
    //         },
    //         {
    //             orderCnt: 5,
    //             channelType: 'NAVER_EP',
    //             optionInputs: [],
    //             optionNo: 3891202411,
    //             productNo: 105356240,
    //         },
    //     ]);
    // });

    test('기존 장바구니에 상품이 있는 경우 장바구니 담기', () => {
        const combinedArray = [...prevCartList, ...nextCartList];

        const newCartList = reduce<ShoppingCartBody, ShoppingCartBody[]>(
            (acc, curr) => pipe(
                acc,
                findIndex((a) => a.optionNo === curr.optionNo, acc) === -1
                    ? append(curr)
                    : map((a) =>
                          a.optionNo === curr.optionNo
                              ? {
                                    ...a,
                                    orderCnt: a.orderCnt + curr.orderCnt,
                                }
                              : a,
                      ),
                toArray,
            ),
            [],
            combinedArray,
        );

        expect(newCartList).toEqual([
            {
                orderCnt: 6,
                channelType: 'NAVER_EP',
                optionInputs: [],
                optionNo: 38912024,
                productNo: 105356240,
            },
            {
                orderCnt: 5,
                channelType: 'NAVER_EP',
                optionInputs: [],
                optionNo: 3891202411,
                productNo: 105356240,
            },
        ]);
    });

    test('기존 장바구니에 상품이 없는 경우', () => {
        const cartList = [...prevCartList, ...nextCartList];
        expect(cartList).toEqual([
            {
                orderCnt: 1,
                channelType: 'NAVER_EP',
                optionInputs: [],
                optionNo: 38912024,
                productNo: 105356240,
            },
            {
                orderCnt: 2,
                channelType: 'NAVER_EP',
                optionInputs: [],
                optionNo: 38912024,
                productNo: 105356240,
            },
            {
                orderCnt: 3,
                channelType: 'NAVER_EP',
                optionInputs: [],
                optionNo: 38912024,
                productNo: 105356240,
            },
            {
                orderCnt: 5,
                channelType: 'NAVER_EP',
                optionInputs: [],
                optionNo: 3891202411,
                productNo: 105356240,
            },
        ]);
    });

    test('기존 장바구니에 상품이 있는 경우', () => {
        const cartList = [...prevCartList, ...nextCartList];

        const initialList: {
            orderCnt: number;
            channelType: string;
            optionInputs: string[];
            optionNo: number;
            productNo: number;
        }[] = [];

        const result = cartList.reduce((acc, curr) => {
            const idx = acc.findIndex(
                (obj) => obj['optionNo'] === curr['optionNo'],
            );

            // 해당 원소가 acc에 없다면 그냥 배열에 넣어준다
            if (idx === -1) {
                return [...acc, curr];

                // 해당 원소가 acc에 있다면 해당 element의 orderCnt와 curr의 orderCnt를 더해준다
            } else {
                // 해당 원소를 제외한 배열
                const filteredCartList = acc.filter(
                    (a) => a['optionNo'] !== curr['optionNo'],
                );

                // 해당 원소
                const newCartInfo = Object.assign({}, acc[idx], {
                    orderCnt: acc[idx]['orderCnt'] + curr['orderCnt'],
                });

                return [...filteredCartList, newCartInfo];
            }
        }, initialList);

        expect(result).toEqual([
            {
                orderCnt: 6,
                channelType: 'NAVER_EP',
                optionInputs: [],
                optionNo: 38912024,
                productNo: 105356240,
            },
            {
                orderCnt: 5,
                channelType: 'NAVER_EP',
                optionInputs: [],
                optionNo: 3891202411,
                productNo: 105356240,
            },
        ]);
    });
});
