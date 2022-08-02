import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { ReactComponent as CloseButton } from 'assets/icons/close_black.svg';

export interface ModalDefaultType {
    onClickToggleModal: () => void;
    width: string;
}

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 10001;
`;

const DialogBox = styled.dialog<{ width: string }>`
    width: ${(props) => props.width};
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 11px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 10000;
    > svg {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }
`;

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 9999;
    background: ${(props) => props.theme.bg1};
    opacity: 0.2;
`;

const Modal = ({
    onClickToggleModal,
    children,
    width,
}: PropsWithChildren<ModalDefaultType>) => {
    return (
        <ModalContainer>
            <DialogBox width={width}>
                <CloseButton
                    onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        if (onClickToggleModal) {
                            onClickToggleModal();
                        }
                    }}
                />
                {children}
            </DialogBox>
            <Backdrop
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    if (onClickToggleModal) {
                        onClickToggleModal();
                    }
                }}
            />
        </ModalContainer>
    );
};

export default Modal;
