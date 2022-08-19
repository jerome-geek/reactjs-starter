import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { sort } from '@fxts/core';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import media from 'utils/styles/media';
import { getLinkTarget } from 'utils/html';
import { BannerInfo } from 'models/display';

interface ETCSectionProps {
    iconWidth?: number;
    iconHeight?: number;
    banners: BannerInfo[];
}

const ETCSectionWrapper = styled(LayoutResponsive)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 150px 0;
    flex-wrap: wrap;

    ${media.medium} {
        width: 380px;
        padding: 90px 0;
    }
`;

const StyledLink = styled(Link)<{ width: number; height: number }>`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;

    ${media.medium} {
        margin-bottom: 10px;
    }
`;

const IconWrapper = styled.div`
    ${media.medium} {
        flex: 1 1 40%;
        margin-bottom: 50px;

        &:nth-child(3),
        &:nth-child(4) {
            margin-bottom: 0;
        }
    }
`;

const IconTitle = styled.p`
    font-size: 16px;
    line-height: 24px;
    color: #191919;

    ${media.medium} {
        font-size: 14px;
        line-height: 20px;
    }
`;

const ETCSection: FC<ETCSectionProps> = ({
    iconWidth = 50,
    iconHeight = 50,
    banners,
}) => {
    return (
        <ETCSectionWrapper type='medium'>
            {sort((a, b) => a.displayOrder > b.displayOrder, banners).map(
                ({
                    bannerNo,
                    landingUrl,
                    imageUrl,
                    name,
                    browerTargetType,
                }) => (
                    <IconWrapper key={bannerNo}>
                        <StyledLink
                            width={iconWidth}
                            height={iconHeight}
                            to={landingUrl}
                            target={getLinkTarget(browerTargetType)}
                        >
                            <img
                                src={imageUrl}
                                alt={name}
                                width={iconWidth}
                                height={iconHeight}
                            />
                        </StyledLink>
                        <IconTitle>{name}</IconTitle>
                    </IconWrapper>
                ),
            )}
        </ETCSectionWrapper>
    );
};

export default ETCSection;
