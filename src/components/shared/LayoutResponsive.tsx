import { HTMLAttributes } from 'react';
import styled from 'styled-components';

export interface LayoutResponsiveProps extends HTMLAttributes<HTMLDivElement> {
    type: 'large' | 'medium' | 'small';
}

const Block = styled.div<LayoutResponsiveProps>`
    ${(props) => props.type === 'large' && `width: 1280px`};
    ${(props) => props.type === 'medium' && `width: 880px`};
    ${(props) => props.type === 'small' && `width: 440px`};

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
