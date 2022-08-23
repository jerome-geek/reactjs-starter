import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export interface LayoutResponsiveProps extends HTMLAttributes<HTMLDivElement> {
    type: 'large' | 'medium' | 'small';
}

const Block = styled.div<LayoutResponsiveProps>`
    ${({ type }) =>
        type === 'large' &&
        css`
            width: 1280px;
            padding: 150px 0;
        `};
    ${({ type }) =>
        type === 'medium' &&
        css`
            width: 840px;
            padding: 24px 0 88px 0;
        `};
    ${({ type }) =>
        type === 'small' &&
        css`
            width: 440px;
            padding: 24px 0 88px 0;
        `};

    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;

const LayoutResponsive = ({
    type,
    children,
    ...props
}: LayoutResponsiveProps) => {
    return (
        <Block type={type} {...props}>
            {children}
        </Block>
    );
};

export default LayoutResponsive;
