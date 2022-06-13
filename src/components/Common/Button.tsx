import { FC } from 'react';
import styled from 'styled-components';

const ButtonBlock = styled.button``;

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, ...args }) => {
    const htmlProps = args as any;

    return <ButtonBlock {...htmlProps}>{children}</ButtonBlock>;
};

export default Button;
