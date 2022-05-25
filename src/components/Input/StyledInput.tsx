import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    border?: string;
    borderRadius?: string;
    padding?: string;
    fontSize?: string;
}

const StyledInput = styled.input<InputProps>`
    border: ${(props) => props.border || '1px solid black'};
    border-radius: ${(props) => props.borderRadius};
    outline: none;
    font-size: 20px;
    font-weight: 600;
    min-height: 50px;

    &::placeholder {
        font-size: ${(props) => props.fontSize || '16px'};
        color: ${(props) => props.theme.gray3};
    }

    &:focus {
        border: 1px solid red;
    }
`;

export default StyledInput;