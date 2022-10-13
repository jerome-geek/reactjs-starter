import styled from 'styled-components';

import Modal, { ModalDefaultType } from 'components/Modal/Modal';
import media from 'utils/styles/media';

const ModalContainer = styled.div`
    width: 100%;
    padding: 50px 66.5px;
    ${media.medium} {
        padding: 37px 20px;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -1.2px;
    color: ${(props) => props.theme.text1};
    width: 100%;
    margin-bottom: 32px;
    ${media.medium} {
        margin-bottom: 28px;
    }
`;

const Description = styled.p`
    font-size: 1rem;
    color: #8f8f8f;
    margin-bottom: 30px;
    ${media.medium} {
        margin-bottom: 11px;
    }
`;

const PersonalInformationModal = ({
    onClickToggleModal,
    width,
    height,
}: ModalDefaultType) => {
    return (
        <Modal
            onClickToggleModal={onClickToggleModal}
            width={width}
            height={height}
        >
            <ModalContainer>
                <Title>우편번호 검색</Title>
                <Description>
                    개인정보 수집에 동의하셔야 골프 코스를 요청 하실 수
                    있습니다.
                </Description>
            </ModalContainer>
        </Modal>
    );
};

export default PersonalInformationModal;
