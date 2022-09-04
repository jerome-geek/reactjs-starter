import { HTMLAttributes } from 'react';
import styled from 'styled-components';

import media, { mediaQuery } from 'utils/styles/media';

// TODO: 추후 제거 예정
export interface LayoutResponsiveProps extends HTMLAttributes<HTMLDivElement> {
    type?: 'large' | 'medium' | 'small';
}

const Block = styled.div<LayoutResponsiveProps>`
    width: 1280px;
    padding: 150px 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;

    ${media.large} {
        width: 840px;
    }
    /* ${media.medium} {
        width: calc(100% - 2rem);
    }
    } */

    ${media.small} {
        width: 440px;
        padding-top: 44px;
        padding-bottom: 88px;
    }

    ${mediaQuery(450)} {
        width: calc(100% - 2rem);
    }
    ${media.xsmall} {
        width: calc(100% - 2.4rem);
    }
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
