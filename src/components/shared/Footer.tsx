import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useTypedSelector } from 'state/reducers';

const FooterContainer = styled.div`
    width: 100%;
    height: 200px;
    border-top: 1px solid #ddd;
`;

const FooterTopBox = styled.div`
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FooterTopMenu = styled.ul`
    width: 70%;
    height: 100%;
    display: flex;
    > li {
        padding: 0 15px;
        height: 100%;
        text-align: center;
        line-height: 40px;
        white-space: nowrap;
        > a {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
`;

const FooterFamilySiteBox = styled.select`
    text-align: center;
    border: 1px solid #ddd;
    width: 120px;
    height: 30px;
    border-radius: 5px;
    margin-right: 15px;
`;

const FooterBottomBox = styled.div`
    width: 100%;
    height: 170px;
    padding: 30px 15px;
    display: flex;
    justify-content: space-between;
`;

const FooterBottomLeft = styled.div``;

const FooterSnsBox = styled.div`
    margin-top: 10px;
    display: flex;
`;

const FooterSns = styled.div`
    border: 1px solid #ddd;
    margin-right: 5px;
    display: flex;
    > a {
        display: block;
        padding: 10px 10px;
    }
`;

const FooterNoticeBox = styled.ul`
    display: flex;
    margin: 10px 0 30px 0;
    > li {
        margin-right: 20px;
        > a {
            text-decoration: underline;
        }
    }
`;

const FooterBottomRight = styled.div``;

const Footer = () => {
    const { mallInfo } = useTypedSelector((state) => ({
        mallInfo: state.mall,
    }));

    const handleLink = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value.length > 0) {
            window.open(event.target.value);
        }
    };

    const formatPhoneNumber = (str: string): string => {
        const cleaned = ('' + str).replace(/\D/g, '');
        let match;
        if (str.length === 9) {
            match = cleaned?.match(/^(\d{2})(\d{3})(\d{4})$/);
        } else if (str.length === 10) {
            match = cleaned?.match(/^(\d{3})(\d{2})(\d{5})$/);
        }

        if (match) {
            return match[1] + '-' + match[2] + '-' + match[3];
        }

        return '';
    };

    return (
        mallInfo.serviceBasicInfo && (
            <FooterContainer>
                <FooterTopBox>
                    <FooterTopMenu>
                        <li>
                            <Link to={'/'}>????????? ????????????</Link>
                        </li>
                        <li>
                            <Link to={'/'}>???????????? ????????????</Link>
                        </li>
                        <li>
                            <Link to={'/'}>???????????? ????????????</Link>
                        </li>
                        <li>
                            <Link to={'/'}>VSE ????????? ????????????</Link>
                        </li>
                        <li>
                            <Link to={'/'}>????????? ??????</Link>
                        </li>
                        <li>
                            <Link to={'/'}>????????????</Link>
                        </li>
                    </FooterTopMenu>
                    <FooterFamilySiteBox onChange={handleLink}>
                        <option value={''}>Family Site</option>
                        <option value={'https://www.vse.co.kr/index.vse'}>
                            VSE
                        </option>
                    </FooterFamilySiteBox>
                </FooterTopBox>
                <FooterBottomBox>
                    <FooterBottomLeft>
                        <p>Follow us</p>
                        <FooterSnsBox>
                            <FooterSns>
                                <a
                                    href='https://www.youtube.com/channel/UCmJ_7PzHjRJzxT24I4l2_HA'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    ?????????
                                </a>
                            </FooterSns>
                            <FooterSns>
                                <a
                                    href='https://www.facebook.com/vc.voicecaddie'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    ????????????
                                </a>
                            </FooterSns>
                            <FooterSns>
                                <a
                                    href='https://www.instagram.com/voicecaddie_kor'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    ?????????
                                </a>
                            </FooterSns>
                            <FooterSns>
                                <a
                                    href='https://blog.naver.com/voicecaddiek'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    ?????????
                                </a>
                            </FooterSns>
                        </FooterSnsBox>
                        <div>
                            <FooterNoticeBox>
                                <li>
                                    <Link to={'/'}>????????????</Link>
                                </li>
                                <li>
                                    <Link to={'/'}>??????&?????????</Link>
                                </li>
                                <li>
                                    <Link to={'/'}>????????? ???????????? ??????</Link>
                                </li>
                                <li>
                                    <Link to={'/'}>KC?????? ?????? ??????</Link>
                                </li>
                            </FooterNoticeBox>
                        </div>
                        <p>{mallInfo.serviceBasicInfo.companyName}</p>
                        <p>
                            ???????????? :{' '}
                            <span>
                                {' '}
                                {mallInfo.serviceBasicInfo.representativeName},
                                ?????? : {mallInfo.serviceBasicInfo.jibunAddress},
                                Tel :{' '}
                                {mallInfo.serviceBasicInfo.representPhoneNo} FAX
                                :{' '}
                                {formatPhoneNumber(
                                    mallInfo.serviceBasicInfo.faxNo,
                                )}
                            </span>
                        </p>
                        <p>
                            ????????????????????? :{' '}
                            {formatPhoneNumber(
                                mallInfo.serviceBasicInfo
                                    .businessRegistrationNo,
                            )}
                            , ??????????????? ?????? :{' '}
                            {
                                mallInfo.serviceBasicInfo
                                    .onlineMarketingBusinessDeclarationNo
                            }{' '}
                            <Link
                                to={
                                    '(https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2098139552'
                                }
                                style={{ textDecoration: 'underline' }}
                            >
                                {'????????? ?????? ?????? >'}
                            </Link>
                        </p>
                        <p>Copyright c 2022.voiceCaddie. ALL Right Reserved.</p>
                    </FooterBottomLeft>
                    <FooterBottomRight>
                        <p>
                            ??????????????? ???????????? <span>1577-2826</span>
                        </p>
                        <br />
                        <p>
                            ?????? ??? ???????????? : ????????? ????????? ????????? 1435
                            ???????????? 5???
                        </p>
                        <br />
                        <p>?????? ???????????? : 1577-2862 (?????? 3???)</p>
                        <p>???????????? : 070-8290-5372</p>
                        <br />
                        <div>
                            <Link to={'/'}>{'???????????? ???????????? >'}</Link>
                            <Link to={'/'}>{'FAQ ???????????? >'}</Link>
                        </div>
                        <p>VSE ???????????? 1544-4667</p>
                    </FooterBottomRight>
                </FooterBottomBox>
            </FooterContainer>
        )
    );
};

export default Footer;
