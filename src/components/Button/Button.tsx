import { FC, ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType?: 'primary' | 'secondary';
    color?: string;
    fontSize?: string;
    backgroundColor?: string;
}

const ButtonBlock = styled.button<ButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    line-height: 24px;
    font-size: ${(props) => props.fontSize || '16px'};
    color: ${(props) => props.color};
    background-color: ${(props) => props.backgroundColor};
    width: 100%;
    padding: 10px;

    &:disabled {
        cursor: not-allowed;
        background-color: #dbdbdb;
        color: #fff;
    }

    ${(props) =>
        props.buttonType === 'primary' &&
        css`
            color: #fff;
            background-color: #222943;
            border: 1px solid #222943;
        `}
    ${(props) =>
        props.buttonType === 'secondary' &&
        css`
            color: #191919;
            background-color: #fff;
            border: 1px solid #dbdbdb;
        `}
`;

const Button: FC<ButtonProps> = ({
    buttonType,
    children,
    ...props
}: ButtonProps) => {
    return (
        <ButtonBlock buttonType={buttonType} {...props}>
            {children}
        </ButtonBlock>
    );
};

export default Button;
