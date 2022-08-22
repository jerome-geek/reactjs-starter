import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';

import ViewMoreButton from 'components/Button/ViewMoreButton';
import LayoutResponsive from 'components/shared/LayoutResponsive';
import { breakWord } from 'utils/html';
import media from 'utils/styles/media';

interface MainBannerProps extends HTMLAttributes<HTMLDivElement> {
    imgUrl?: string;
    title: string;
    desc: string;
    url: string;
}

const MainBannerWrapper = styled(LayoutResponsive)`
    margin-bottom: 156px;
    text-align: center;
    padding: 0;

    ${media.small} {
        width: auto;
        margin-left: 24px;
        margin-right: 24px;
        margin-bottom: 88px;
        text-align: left;
    }
`;

const MainBannerImageWrapper = styled.div`
    margin-bottom: 36px;

    ${media.small} {
        margin-bottom: 24px;
    }
`;

const MainBannerContentsWrapper = styled.div`
    ${media.small} {
        padding-left: 30px;
    }
`;

const MainBannerTitle = styled.h3`
    font-size: 54px;
    line-height: 80px;
    font-weight: bold;
    margin-bottom: 10px;

    ${media.small} {
        font-size: 30px;
        line-height: 38px;
    }
`;

const MainBannerDesc = styled.p`
    font-size: 20px;
    line-height: 29px;
    margin-bottom: 30px;

    ${media.small} {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 20px;
    }
`;

const StyledVieMoreButton = styled(ViewMoreButton)`
    ${media.small} {
        margin: 0;
    }
`;

const MainBanner: FC<MainBannerProps> = ({ imgUrl, title, desc, url }) => {
    const { width } = useWindowSize();

    return (
        <MainBannerWrapper type='large'>
            <MainBannerImageWrapper>
                <img src={imgUrl} width='100%' alt={title} />
            </MainBannerImageWrapper>
            <MainBannerContentsWrapper>
                <MainBannerTitle
                    dangerouslySetInnerHTML={{
                        __html: breakWord(title, width > 768 ? '' : '/'),
                    }}
                />
                <MainBannerDesc
                    dangerouslySetInnerHTML={{
                        __html: breakWord(desc, width > 768 ? '' : '/'),
                    }}
                />
                <StyledVieMoreButton to={url}>자세히 보기</StyledVieMoreButton>
            </MainBannerContentsWrapper>
        </MainBannerWrapper>
    );
};

export default MainBanner;
