import { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SingleValue } from 'react-select';
import { useQuery } from 'react-query';

import { FlatOption, ProductOption } from 'models/product';
import { product } from 'api/product';
import SelectBox from 'components/Common/SelectBox';

const ProductOptionBox = styled.div`
    margin: 26px 0;
    border-bottom: 1px solid #000;
    padding-bottom: 26px;
    > p {
        font-size: 16px;
        color: #191919;
    }
    > select {
        margin: 22px 0;
        border: 2px solid #ababab;
        width: 100%;
        color: #ababab;
        font-size: 16px;
        padding: 15px 10px;
    }
`;

const ProductOptionCountBox = styled.div`
    background: #f9f7f7;
    padding: 10px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
    > div {
        display: flex;
        justify-content: space-between;
    }
    div:last-child {
        align-items: flex-end;
    }
`;

const ProductCountMinus = styled.div``;

const ProductCountPlus = styled.div``;

const ProductCount = styled.div`
    color: #191919;
`;

const ProductOptionTitle = styled.div`
    font-size: 16px;
    color: #191919;
`;

const ProductOptionClose = styled.div`
    cursor: pointer;
    color: #bdbdbd;
`;

const ProductCountBox = styled.div`
    color: #bdbdbd;
    background: #fff;
    display: flex;
    > div {
        padding: 10px;
    }
`;

const ProductOptionList = ({
    productNo,
    selectOptionProducts,
    setSelectOptionProducts,
    setCurrentOptionNo,
    setProductImageData,
}: {
    productNo: string;
    selectOptionProducts: Map<number, ProductOption>;
    setSelectOptionProducts: Dispatch<
        SetStateAction<Map<number, ProductOption>>
    >;
    setCurrentOptionNo: Dispatch<SetStateAction<number>>;
    setProductImageData: Dispatch<SetStateAction<{ [id: number]: string[] }>>;
}) => {
    const { t: productDetail } = useTranslation('productDetail');

    useEffect(() => {
        setSelectOptionProducts(new Map());
    }, [productNo]);

    const { data: productOptions } = useQuery(
        ['productOptionDetail', { productNo }],
        async () => await product.getProductOption(productNo),
        {
            select: ({ data }) => {
                return data?.flatOptions;
            },
            onSuccess: (res) => {
                setProductImageData((prev) => {
                    res.forEach(({ optionNo, images }) => {
                        prev[optionNo] = images.map(({ url }) => {
                            return url;
                        });
                    });
                    return { ...prev };
                });
            },
            refetchOnWindowFocus: false,
        },
    );

    const optionSelectHandler = (
        optionValue: SingleValue<Partial<FlatOption>>,
    ) => {
        if (selectOptionProducts.has(optionValue?.optionNo!)) {
            return;
        }
        setCurrentOptionNo(optionValue?.optionNo!);

        setSelectOptionProducts((prev) => {
            prev.set(optionValue?.optionNo!, {
                label: optionValue?.label,
                price: optionValue?.buyPrice,
                count: 1,
                optionNo: optionValue?.optionNo!,
                productNo,
                amountPrice: optionValue?.buyPrice,
            });
            return new Map(prev);
        });
    };

    const productCountHandler =
        (updateCount: number, optionNo: number) => () => {
            if (selectOptionProducts.get(optionNo)?.count! + updateCount <= 0) {
                alert(productDetail('countAlert'));
                return;
            }
            setSelectOptionProducts((prev) => {
                prev.set(optionNo, {
                    label: prev.get(optionNo)?.label!,
                    price: prev.get(optionNo)?.price!,
                    count: prev.get(optionNo)?.count! + updateCount,
                    optionNo,
                    productNo,
                    amountPrice:
                        prev.get(optionNo)?.price! *
                        (prev.get(optionNo)?.count! + updateCount),
                });
                return new Map(prev);
            });
        };

    return (
        <ProductOptionBox>
            <p>{productDetail('chooseOption')}</p>
            <SelectBox<FlatOption>
                options={productOptions}
                onChange={optionSelectHandler}
                placeHolder={'제품을 선택해주세요'}
            />
            <div>
                {Array.from(selectOptionProducts.values()).map(
                    ({ count, label, amountPrice, optionNo }) => {
                        return (
                            <ProductOptionCountBox key={optionNo}>
                                <div>
                                    <ProductOptionTitle>
                                        {label}
                                    </ProductOptionTitle>
                                    <ProductOptionClose
                                        onClick={() =>
                                            setSelectOptionProducts((prev) => {
                                                prev.delete(optionNo);
                                                return new Map(prev);
                                            })
                                        }
                                    >
                                        X
                                    </ProductOptionClose>
                                </div>
                                <div>
                                    <ProductCountBox>
                                        <ProductCountMinus
                                            onClick={productCountHandler(
                                                -1,
                                                optionNo,
                                            )}
                                        >
                                            -
                                        </ProductCountMinus>
                                        <ProductCount>{count}</ProductCount>
                                        <ProductCountPlus
                                            onClick={productCountHandler(
                                                1,
                                                optionNo,
                                            )}
                                        >
                                            +
                                        </ProductCountPlus>
                                    </ProductCountBox>
                                    <p>{amountPrice}</p>
                                </div>
                            </ProductOptionCountBox>
                        );
                    },
                )}
            </div>
        </ProductOptionBox>
    );
};

export default ProductOptionList;
