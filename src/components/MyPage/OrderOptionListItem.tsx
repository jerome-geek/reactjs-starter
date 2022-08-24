import { FC, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PATHS from 'const/paths';
import { KRW } from 'utils/currency';

interface OrderOptionListItemProps extends HTMLAttributes<HTMLLIElement> {
    productNo: string | number;
    imageUrl: string;
    orderStatusTypeLabel: string;
    productName: string;
    optionName: string;
    orderCnt: number;
    price: any;
    invoiceNo: number;
    deliveryCompanyTypeLabel: string;
}

const OrderOptionListItemWrapper = styled.li`
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #dbdbdb;
    padding: 20px;
`;

const OrderStatus = styled.p`
    font-size: 20px;
    color: #191919;
    letter-spacing: 0;
    font-weight: bold;
`;

const DeliveryInfo = styled.p`
    font-size: 12px;
    color: #a8a8a8;
`;

const InvoiceLink = styled.a`
    text-decoration: underline;
`;

const ProductName = styled.span`
    font-size: 16px;
    color: #191919;
    letter-spacing: 0;
`;

const OptionName = styled.span`
    font-size: 10px;
    color: #a8a8a8;
    letter-spacing: 0;
`;

const Price = styled.span`
    font-size: 16px;
    line-height: 24px;
`;

const OrderOptionListItem: FC<OrderOptionListItemProps> = ({
    productNo,
    imageUrl,
    orderStatusTypeLabel,
    productName,
    optionName,
    orderCnt,
    price,
    invoiceNo,
    deliveryCompanyTypeLabel,
}) => {
    return (
        <OrderOptionListItemWrapper>
            <div style={{ flex: '1 1 25%' }}>
                <Link to={`${PATHS.PRODUCT_DETAIL}/${productNo}`}>
                    <img src={imageUrl} alt={productName} width='95' />
                </Link>
            </div>

            <div style={{ flex: '1 1 75%', textAlign: 'left' }}>
                <div
                    style={{
                        borderBottom: '1px solid #DBDBDB',
                        padding: '14px 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <OrderStatus>{orderStatusTypeLabel}</OrderStatus>

                    {/* TODO: deliveryCompanyTypeLabel && InvoiceNo가 있을때만 보여주기 */}
                    {deliveryCompanyTypeLabel && invoiceNo && (
                        <DeliveryInfo>
                            {deliveryCompanyTypeLabel}&nbsp;
                            <InvoiceLink
                                href='/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {invoiceNo}
                            </InvoiceLink>
                        </DeliveryInfo>
                    )}
                </div>

                <div
                    style={{
                        padding: '10px 0',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '5px',
                        }}
                    >
                        <ProductName>{productName}</ProductName>
                        <OptionName>{`${optionName} ${orderCnt}개`}</OptionName>
                    </div>
                    <Price>
                        <b>{`${KRW(
                            price.immediateDiscountedPrice,
                        ).format()}`}</b>
                        &nbsp;원
                    </Price>
                </div>
            </div>
        </OrderOptionListItemWrapper>
    );
};

export default OrderOptionListItem;
