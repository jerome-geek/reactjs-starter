import styled from 'styled-components';
import useScript from 'react-script-hook';

import Modal, { ModalDefaultType } from 'components/Modal/Modal';
import { ReactComponent as Kakao } from 'assets/icons/sns_kakao.svg';
import { ReactComponent as Facebook } from 'assets/icons/sns_facebook.svg';
import { ReactComponent as Google } from 'assets/icons/sns_google.svg';
import CopyUrl from 'assets/icons/copy_url.png';
import media from 'utils/styles/media';
import {
    kakaoShare,
    KakaoShareParams,
    copyLink,
    CopyLinkParams,
} from 'utils/share';

const ModalContainer = styled.div`
    width: 100%;
    padding: 50px 52px;
    ${media.medium} {
        padding: 38px 20px;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -1.2px;
    color: ${(props) => props.theme.text1};
    width: 100%;
    margin-bottom: 40px;
    ${media.medium} {
        margin-bottom: 20px;
    }
`;

const ShareButtonContainer = styled.ul`
    display: flex;
    justify-content: center;
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
    padding: 70px 0;
`;

const ShareButton = styled.li`
    margin-right: 35px;
    > svg,
    img {
        width: 43.3px;
        height: 43.4px;
    }
`;

const ShareModal = ({
    onClickToggleModal,
    width,
    title,
    height,
    imageUrl,
    description,
    itemContent,
    mobileWebUrl,
    webUrl,
    copiedLink,
    copySuccessMessage,
}: ModalDefaultType & KakaoShareParams & CopyLinkParams) => {
    useScript({
        src: 'https://developers.kakao.com/sdk/js/kakao.js',
        checkForExisting: true,
    });

    return (
        <Modal
            onClickToggleModal={onClickToggleModal}
            width={width}
            height={height}
        >
            <ModalContainer>
                <Title>공유하기</Title>
                <ShareButtonContainer>
                    <ShareButton
                        id='kakaotalk-sharing-btn'
                        onClick={() =>
                            kakaoShare({
                                title,
                                imageUrl,
                                description,
                                itemContent,
                                mobileWebUrl,
                                webUrl,
                            })
                        }
                    >
                        <Kakao />
                    </ShareButton>
                    <ShareButton>
                        <Facebook />
                    </ShareButton>
                    <ShareButton>
                        <Google />
                    </ShareButton>
                    <ShareButton
                        onClick={() =>
                            copyLink({
                                copiedLink,
                                copySuccessMessage,
                            })
                        }
                    >
                        <img src={CopyUrl} alt='복사하기 버튼' />
                    </ShareButton>
                </ShareButtonContainer>
            </ModalContainer>
        </Modal>
    );
};

export default ShareModal;
