import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { useTypedSelector } from 'state/reducers';
import SocialMedia from 'components/Footer/SocialMedia';
import DropDown from 'components/shared/DropDown';
import media from 'utils/styles/media';
import PATHS from 'const/paths';
import { ReactComponent as YoutubeIcon } from 'assets/icons/youtube.svg';
import { ReactComponent as FacebookIcon } from 'assets/icons/facebook.svg';
import { ReactComponent as InstagramIcon } from 'assets/icons/instagram.svg';
import { ReactComponent as BlogIcon } from 'assets/icons/blog.svg';
import { ReactComponent as PinIcon } from 'assets/icons/pin.svg';

const FooterWrapper = styled.footer``;

const FooterTop = styled.div`
    background-color: #212121;
    padding: 50px 0;
`;

const FooterBottom = styled.div`
    background-color: #191919;
    color: #fff;
    padding: 60px 50px 18px 50px;
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SocialMediaWrapper = styled(FlexContainer)`
    flex-direction: column;
`;

const LocationWrapper = styled(FlexContainer)`
    ${media.small} {
        flex-direction: column;
    }
`;

const Location = styled.p`
    font-size: 12px;
    line-height: 18px;

    & > span:not(:last-child) {
        color: #fff;
        margin-right: 20px;
    }
    & > span:last-child {
        color: #858585;
    }
`;
const MenuLink = styled(Link)`
    color: #fff;
`;

const CopyRight = styled.p`
    color: #858585;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0;
    text-align: right;
`;

const StyledLink = styled(Link)`
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 0;
    text-align: left;
    color: #fff;
    text-decoration: underline;
`;

const StyledAnchor = styled.a`
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 0;
    text-align: left;
    color: #fff;
    text-decoration: underline;
`;

const StyledPinIcon = styled(PinIcon)`
    margin-right: 20px;
`;

const FooterContents = styled.p`
    font-size: 12px;
    line-height: 24px;
    color: #858585;
`;

const Footer = () => {
    const { mallInfo } = useTypedSelector(
        ({ mall: mallInfo }) => ({
            mallInfo,
        }),
        shallowEqual,
    );

    const SocialMediaList = useMemo(
        () => [
            {
                name: 'youtube',
                url: '/',
                target: '_blank',
                icon: <YoutubeIcon />,
            },
            {
                name: 'facebook',
                url: '/',
                target: '_blank',
                icon: <FacebookIcon />,
            },
            {
                name: 'instagram',
                url: '/',
                target: '_blank',
                icon: <InstagramIcon />,
            },
            {
                name: 'blog',
                url: '/',
                target: '_blank',
                icon: <BlogIcon />,
            },
        ],
        [],
    );

    return (
        <FooterWrapper>
            <FooterTop>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '50px',
                        width: '840px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        color: '#fff',
                    }}
                >
                    <DropDown
                        title='서비스 이용약관'
                        menuList={[
                            { title: '위치정보 이용약관', url: '/' },
                            { title: 'VSE 서비스 이용약관', url: '/' },
                        ]}
                    />
                    <MenuLink to='/'>개인정보 처리방침</MenuLink>
                    <DropDown
                        title='ABOUT US'
                        menuList={[
                            { title: 'Brand Philosophy', url: '/' },
                            { title: '대리점 안내', url: '/' },
                        ]}
                    />
                    <MenuLink to='/'>전자공고</MenuLink>
                    <MenuLink to={PATHS.NOTICE}>공지사항</MenuLink>
                </div>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <DropDown
                        title='FAMILY SITE'
                        menuList={[
                            { title: 'Brand Philosophy', url: '/' },
                            { title: '대리점 안내', url: '/' },
                        ]}
                        style={{
                            border: '1px solid #DBDBDB',
                            width: '232px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            padding: '8px',
                            color: '#fff',
                        }}
                    />
                </div>
                <SocialMediaWrapper>
                    <SocialMedia socialMedia={SocialMediaList} />

                    <span
                        style={{
                            fontSize: '12px',
                            lineHeight: '14px',
                            color: '#858585',
                            textAlign: 'center',
                        }}
                    >
                        Follow us
                    </span>
                </SocialMediaWrapper>
            </FooterTop>
            <FooterBottom>
                <div style={{ width: '840px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <FooterContents>
                            상호 보이스캐디(주) 대표 김 준 오 | Tel 02-538-3100
                            FAX 02-538-3104,5
                        </FooterContents>
                        <FooterContents>
                            {`통신판매업신고 ${mallInfo.serviceBasicInfo.onlineMarketingBusinessDeclarationNo} | 사업자등록번호 ${mallInfo.serviceBasicInfo.businessRegistrationNo}`}
                            <StyledAnchor
                                href={`https://bizno.net/?query=${mallInfo.serviceBasicInfo.businessRegistrationNo}`}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                사업자 정보확인
                            </StyledAnchor>
                        </FooterContents>
                        <FooterContents>
                            VSE 고객센터 1344-4667&nbsp;
                            <StyledLink to='/'>고객센터 바로가기</StyledLink> |
                            보이스캐디 고객센터 1577-2862 (내선2번)
                        </FooterContents>
                    </div>
                    <div style={{ marginBottom: '60px' }}>
                        <FooterContents>
                            방문 및 택배접수 서울시 서초구 논현로 145 수냐빌딩
                            5층
                        </FooterContents>
                        <FooterContents>
                            제품 구매문의 1577-2862 (내선 3번) 기업특판
                            070-8290-5372
                        </FooterContents>
                        <StyledLink to={PATHS.FAQ}>FAQ 바로가기</StyledLink>
                    </div>
                </div>
                <LocationWrapper>
                    <Location>
                        <StyledPinIcon />
                        {/* TODO: countryCode가 KR이 아닐경우 처리 필요 */}
                        <span>
                            {mallInfo.mall.countryCode === 'KR' && '대한민국'}
                        </span>
                        <span>
                            {mallInfo.serviceBasicInfo.address +
                                mallInfo.serviceBasicInfo.addressDetail}
                        </span>
                    </Location>
                    <CopyRight>
                        COPYRIGHT © 2022. voicecaddie. ALL RIGHTS RESERVED.
                    </CopyRight>
                </LocationWrapper>
            </FooterBottom>
        </FooterWrapper>
    );
};

export default Footer;
