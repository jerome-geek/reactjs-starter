import styled from 'styled-components';
import currency from 'currency.js';
import { useWindowSize } from 'usehooks-ts';

import { OrderProductOption } from 'models/order';
import { ReactComponent as CloseButtonIcon } from 'assets/icons/gray_close_icon.svg';
import { ReactComponent as Checked } from 'assets/icons/checkbox_square_checked.svg';
import { ReactComponent as UnChecked } from 'assets/icons/checkbox_square_unchecked.svg';
import { ReactComponent as Plus } from 'assets/icons/plus_button.svg';
import { ReactComponent as Minus } from 'assets/icons/minus_button.svg';
import { isDesktop } from 'utils/styles/responsive';
import media from 'utils/styles/media';

const CartListBox = styled.div`
    display: flex;
    justify-content: space-between;
    height: 164px;
    border-bottom: 1px solid #dbdbdb;
    padding: 12px 0;
    &:last-child {
        border-bottom: none;
    }
    ${media.medium} {
        flex-wrap: wrap;
        height: auto;
        min-height: 229px;
        padding: 24px 0;
    }
`;

const CartInformation = styled.div`
    width: 29%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    ${media.medium} {
        width: 32.36;
        min-width: 123px;
        padding-left: 11px;
    }
`;

const CartImage = styled.div`
    background: #f8f8fa;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    > img {
        width: 63%;
        max-height: 90%;
    }
    ${media.medium} {
        width: 100%;
    }
`;

const CartSelect = styled.div`
    > input {
        display: none;
    }
    > label {
        position: absolute;
        top: 0;
        left: 0;
    }
`;

const CartName = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > p {
        font-size: 16px;
        color: ${(props) => props.theme.text1};
    }
    > p:last-child {
        font-size: 12px;
        color: #999;
        margin-top: 3px;
    }
    ${media.medium} {
        > p {
            font-size: 14px;
            font-weight: bold;
        }
        > p:last-child {
            color: ${(props) => props.theme.text3};
            font-weight: 400;
        }
    }
`;

const CartCountBox = styled.div<{ isModifiable: boolean }>`
    width: 18%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: ${(props) => (props.isModifiable ? '1px solid #dbdbdb' : '')};
        width: 52%;
        min-width: 52px;
        height: 30px;
        > div {
            width: 33.33%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    ${media.medium} {
        justify-content: flex-start;
        margin-bottom: 8px;
        height: 20px;
        > div {
            > div {
            }
        }
    }
`;

const CartCountMinus = styled.div`
    cursor: pointer;
`;

const CartCount = styled.div`
    color: ${(props) => props.theme.text1};
    font-weight: bold;
    font: 16px;
`;

const CartCountPlus = styled.div`
    cursor: pointer;
`;

const CartPrice = styled.div`
    width: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > p {
        font-size: 16px;
        color: ${(props) => props.theme.text1};
        position: relative;
        > span.standard_amount {
            display: block;
            position: absolute;
            bottom: 100%;
            text-decoration: line-through;
            font-size: 12px;
            color: #ababab;
        }
    }
    ${media.medium} {
        width: fit-content;
        font-size: 14px;
        > p {
            font-weight: bold;
            > span.unit {
                font-weight: 400;
            }
        }
    }
`;

const CartDelivery = styled.div`
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #191919;
    font: 16px;
`;

const CartAmount = styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    > span {
        font-weight: 400;
    }
`;

const CartCloseButton = styled.div`
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${media.medium} {
        align-items: flex-start;
        justify-content: end;
        position: absolute;
        top: -4px;
        right: -8px;
    }
`;

const MobileCartInformationBox = styled.div`
    width: 63.41%;
    padding-right: 6px;
    ${media.small} {
        width: 58%;
    }
`;

const MobileCartPriceBox = styled.div`
    width: 100%;
    border: ${(props) => `1px solid ${props.theme.line2}`};
    text-align: center;
    padding: 10px 0;
    font-size: 16px;
    color: ${(props) => props.theme.text3};
    margin-top: 24px;
    letter-spacing: 0;
`;

const MobileCartBoxTop = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 8px 0 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #dbdbdb;
    ${media.medium} {
        position: relative;
    }
`;

const MobileCartBoxBottom = styled.div``;

const CartList = ({
    cartData,
    checkList,
    agreeButton,
    productCountHandler,
    deleteCartHandler,
    isModifiable = true,
}: {
    cartData: OrderProductOption & {
        deliveryAmt: number;
        productName: string;
    };
    checkList?: number[];
    agreeButton?: (checked: boolean, cartNo: number) => void;
    productCountHandler?: (number: number, cartNo: number) => () => void;
    deleteCartHandler?: (cartNo: number) => () => void;
    isModifiable?: boolean;
}) => {
    const { width } = useWindowSize();

    return (
        <CartListBox>
            {isDesktop(width) ? (
                <CartInformation>
                    <CartImage>
                        {isModifiable && (
                            <CartSelect>
                                <input
                                    type='checkbox'
                                    onChange={(e) =>
                                        agreeButton &&
                                        agreeButton(
                                            e.target.checked,
                                            cartData.cartNo,
                                        )
                                    }
                                    checked={checkList?.includes(
                                        cartData.cartNo,
                                    )}
                                    id={cartData.cartNo.toString()}
                                />
                                <label htmlFor={cartData.cartNo.toString()}>
                                    {checkList?.includes(cartData.cartNo) ? (
                                        <Checked />
                                    ) : (
                                        <UnChecked />
                                    )}
                                </label>
                            </CartSelect>
                        )}
                        <img
                            src={cartData.imageUrl}
                            alt={cartData.optionName}
                        />
                    </CartImage>
                    <CartName>
                        <p>{cartData.productName}</p>
                        <p>{cartData.optionName}</p>
                    </CartName>
                </CartInformation>
            ) : (
                <CartInformation>
                    <CartImage>
                        {isModifiable && (
                            <CartSelect>
                                <input
                                    type='checkbox'
                                    onChange={(e) =>
                                        agreeButton &&
                                        agreeButton(
                                            e.target.checked,
                                            cartData.cartNo,
                                        )
                                    }
                                    checked={checkList?.includes(
                                        cartData.cartNo,
                                    )}
                                    id={cartData.cartNo.toString()}
                                />
                                <label htmlFor={cartData.cartNo.toString()}>
                                    {checkList?.includes(cartData.cartNo) ? (
                                        <Checked />
                                    ) : (
                                        <UnChecked />
                                    )}
                                </label>
                            </CartSelect>
                        )}
                        <img
                            src={cartData.imageUrl}
                            alt={cartData.optionName}
                        />
                    </CartImage>
                </CartInformation>
            )}
            {isDesktop(width) ? (
                <>
                    <CartCountBox isModifiable={isModifiable}>
                        <div>
                            {isModifiable && (
                                <CartCountMinus
                                    onClick={
                                        productCountHandler &&
                                        productCountHandler(-1, cartData.cartNo)
                                    }
                                >
                                    <Minus />
                                </CartCountMinus>
                            )}
                            <CartCount>{cartData.orderCnt}</CartCount>
                            {isModifiable && (
                                <CartCountPlus
                                    onClick={
                                        productCountHandler &&
                                        productCountHandler(+1, cartData.cartNo)
                                    }
                                >
                                    <Plus />
                                </CartCountPlus>
                            )}
                        </div>
                    </CartCountBox>
                    <CartPrice>
                        <p>
                            <span className='standard_amount'>
                                {currency(cartData.price.standardAmt, {
                                    symbol: '',
                                    precision: 0,
                                }).format()}
                            </span>
                            {currency(cartData.price.buyAmt, {
                                symbol: '',
                                precision: 0,
                            }).format()}{' '}
                            원
                        </p>
                    </CartPrice>
                    <CartDelivery>
                        {currency(cartData.deliveryAmt, {
                            symbol: '',
                            precision: 0,
                        }).format()}{' '}
                        원
                    </CartDelivery>
                    <CartAmount>
                        {currency(
                            cartData.price.buyAmt + cartData.deliveryAmt,
                            {
                                symbol: '',
                                precision: 0,
                            },
                        ).format()}
                        <span>&nbsp;원</span>
                    </CartAmount>
                    {isModifiable && (
                        <CartCloseButton
                            onClick={
                                deleteCartHandler &&
                                deleteCartHandler(cartData.cartNo)
                            }
                        >
                            <CloseButtonIcon />
                        </CartCloseButton>
                    )}
                </>
            ) : (
                <MobileCartInformationBox>
                    <MobileCartBoxTop>
                        <CartName>
                            <p>{cartData.productName}</p>
                            <p>{cartData.optionName}</p>
                        </CartName>
                        {isModifiable && (
                            <CartCloseButton
                                onClick={
                                    deleteCartHandler &&
                                    deleteCartHandler(cartData.cartNo)
                                }
                            >
                                <CloseButtonIcon />
                            </CartCloseButton>
                        )}
                    </MobileCartBoxTop>
                    <MobileCartBoxBottom>
                        <CartCountBox isModifiable={isModifiable}>
                            <div>
                                {isModifiable && (
                                    <CartCountMinus
                                        onClick={
                                            productCountHandler &&
                                            productCountHandler(
                                                -1,
                                                cartData.cartNo,
                                            )
                                        }
                                    >
                                        <Minus />
                                    </CartCountMinus>
                                )}
                                <CartCount>{cartData.orderCnt}</CartCount>
                                {isModifiable && (
                                    <CartCountPlus
                                        onClick={
                                            productCountHandler &&
                                            productCountHandler(
                                                +1,
                                                cartData.cartNo,
                                            )
                                        }
                                    >
                                        <Plus />
                                    </CartCountPlus>
                                )}
                            </div>
                        </CartCountBox>
                        <CartPrice>
                            <p>
                                {currency(cartData.price.buyAmt, {
                                    symbol: '',
                                    precision: 0,
                                }).format()}{' '}
                                <span className='unit'>원</span>
                            </p>
                        </CartPrice>
                    </MobileCartBoxBottom>
                </MobileCartInformationBox>
            )}
            {!isDesktop(width) && (
                <MobileCartPriceBox>
                    상품{' '}
                    {currency(cartData.price.buyAmt, {
                        symbol: '',
                        precision: 0,
                    }).format()}{' '}
                    + 배송비{' '}
                    {currency(cartData.deliveryAmt, {
                        symbol: '',
                        precision: 0,
                    }).format()}{' '}
                    ={' '}
                    {currency(cartData.price.buyAmt + cartData.deliveryAmt, {
                        symbol: '',
                        precision: 0,
                    }).format()}{' '}
                </MobileCartPriceBox>
            )}
        </CartListBox>
    );
};

export default CartList;
