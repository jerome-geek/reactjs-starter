import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { ReactComponent as CloseButton } from 'assets/icons/close_black.svg';

export interface MobileModalDefaultType {
    onClickToggleModal: () => void;
    title: string;
}

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    z-index: 10001;
`;

const DialogBox = styled.dialog`
    width: 100%;
    height: 100vh;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 10000;
    border: none;
`;

const CloseButtonContainer = styled.div`
    width: 100%;
    box-shadow: 0 3px 6px ${(props) => props.theme.line2};
    position: relative;
    > svg {
        position: absolute;
        right: 29px;
        top: 25px;
        cursor: pointer;
    }
`;

const Title = styled.h2`
    line-height: 24px;
    letter-spacing: -0.8px;
    font-size: 1.333rem;
    text-align: center;
    padding: 25px 0;
    font-weight: bold;
    color: ${(props) => props.theme.text1};
`;

const MobileModal = ({
    onClickToggleModal,
    children,
    title,
}: PropsWithChildren<MobileModalDefaultType>) => {
    return (
        <ModalContainer>
            <DialogBox>
                <CloseButtonContainer>
                    <Title>{title}</Title>
                    <CloseButton
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            if (onClickToggleModal) {
                                onClickToggleModal();
                            }
                        }}
                    />
                </CloseButtonContainer>
                {children}
            </DialogBox>
        </ModalContainer>
    );
};

export default MobileModal;
