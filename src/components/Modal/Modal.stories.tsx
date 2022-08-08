import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import useState from 'storybook-addon-state';
import styled from 'styled-components';

import Modal from 'components/Modal/Modal';

const Main = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ddd;
`;

const Title = styled.h3`
    text-align: center;
`;

const DialogButton = styled.button`
    width: 160px;
    height: 48px;
    background-color: blueviolet;
    color: white;
    font-size: 1.2rem;
    font-weight: 400;
    border-radius: 4px;
    border: none;
    cursor: pointer;

    &:hover {
        transform: translate(-1px, -1px);
        transition: all 0.2s;
        box-shadow: 2px 2px 10px #000;
    }
`;

const CloseButton = styled.div`
    padding: 10px 15px;
    background: blueviolet;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 400;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    &:hover {
        transform: translate(-1px, -1px);
        transition: all 0.2s;
        box-shadow: 2px 2px 10px #000;
    }
`;

export default {
    component: Modal,
    parameters: {
        componentSubtitle: '기본 모달 컴포넌트',
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = ({ children }) => {
    const [isOpenModal, setOpenModal] = useState('isOpenModal', false);
    const onClickToggleModal = () => setOpenModal(!isOpenModal);

    return (
        <Main>
            <Title>배경화면</Title>
            {isOpenModal && (
                <Modal width='1080px' onClickToggleModal={onClickToggleModal}>
                    {children}
                    <CloseButton onClick={onClickToggleModal}>
                        닫기 버튼
                    </CloseButton>
                </Modal>
            )}
            <DialogButton onClick={onClickToggleModal}>Modal 열기</DialogButton>
        </Main>
    );
};

export const DefaultModal = Template.bind({});
DefaultModal.args = {
    children: (
        <p>
            {' '}
            모달 만들기 나중에 여기에 아이콘도 추가해보고 <br /> 음 또 width도
            props로 받게끔 만들고 하자
        </p>
    ),
};
