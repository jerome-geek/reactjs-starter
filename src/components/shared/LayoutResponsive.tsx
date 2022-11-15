import { HTMLAttributes } from 'react';
import styled from 'styled-components';

import media from 'utils/styles/media';

// TODO: 추후 제거 예정
export interface LayoutResponsiveProps extends HTMLAttributes<HTMLDivElement> {
    type?: 'large' | 'medium' | 'small';
}

const Block = styled.main<LayoutResponsiveProps>`
    padding: 150px 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: calc(100% - 2rem);

    ${media.xxlarge} {
        max-width: 1280px;
    }

    ${media.large} {
        max-width: 840px;
    }

    ${media.medium} {
        width: calc(100% - 2rem);
    }

    ${media.small} {
        max-width: 440px;
        padding-top: 44px;
        padding-bottom: 88px;
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
