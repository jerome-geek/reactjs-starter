import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { head } from '@fxts/core';
import styled from 'styled-components';

const ProductImageBox = styled.div`
    width: 50%;
`;

const ProductImage = styled.div`
    > img {
        display: block;
        margin: 0 auto;
    }
`;

const ProductSubImageList = styled.div`
    display: flex;
    overflow-x: auto;
    flex-wrap: nowrap;
    align-items: center;
    &::-webkit-scrollbar {
        display: block;
        background-color: #ddd;
        border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb {
        display: block;
        background-color: #fff;
        border: 1px solid #aaa;
        border-radius: 6px;
    }
`;

const ProductSubImage = styled.div`
    width: 20%;
    flex: 0 0 auto;
    > img {
        width: 100%;
        vertical-align: middle;
    }
`;

const ProductImageList = ({
    productImageData,
    setProductImageData,
    productImageAlt,
    currentOptionNo,
    productNo,
}: {
    productImageData?: {
        [id: number]: string[];
    };
    setProductImageData: Dispatch<SetStateAction<{ [id: number]: string[] }>>;
    productImageAlt?: string;
    currentOptionNo: number;
    productNo: string;
}) => {
    const [representImage, setRepresentImage] = useState('');

    useEffect(() => {
        setProductImageData({ 0: [] });
    }, [productNo]);

    useEffect(() => {
        setRepresentImage(head(productImageData?.[currentOptionNo]!)!);
    }, [productImageData?.[currentOptionNo]]);

    return (
        <ProductImageBox>
            <ProductImage>
                <img src={representImage} alt={productImageAlt} />
            </ProductImage>
            <ProductSubImageList>
                {productImageData &&
                    productImageData[currentOptionNo].map((productImage) => {
                        return (
                            <ProductSubImage
                                onClick={() => setRepresentImage(productImage)}
                                key={productImage}
                            >
                                <img src={productImage} alt={productImageAlt} />
                            </ProductSubImage>
                        );
                    })}
            </ProductSubImageList>
        </ProductImageBox>
    );
};

export default ProductImageList;
