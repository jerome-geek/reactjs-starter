import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

interface OrderInformationSectionProps extends HTMLAttributes<HTMLElement> {
    title?: string;
}

const OrderInformationContainer = styled.section`
    width: 100%;
    max-width: 840px;
    margin-bottom: 24px;
`;

const OrderInformationListTitle = styled.h3`
    font-size: 24px;
    line-height: 36px;
    font-weight: bold;
    letter-spacing: -1.2px;
    color: #191919;
    text-align: left;
    margin-bottom: 24px;
`;

const OrderInformationSection: FC<OrderInformationSectionProps> = ({
    title,
    children,
}) => {
    return (
        <OrderInformationContainer>
            {title && (
                <OrderInformationListTitle>{title}</OrderInformationListTitle>
            )}
            {children}
        </OrderInformationContainer>
    );
};

export default OrderInformationSection;
