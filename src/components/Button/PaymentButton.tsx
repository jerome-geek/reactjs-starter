import { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import media from 'utils/styles/media';
import PrimaryButton from 'components/Button/PrimaryButton';

interface PaymentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const StyledButton = styled(PrimaryButton)`
    width: 100%;

    ${media.small} {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 70px;
    }
`;
const PaymentButton: FC<PaymentButtonProps> = ({ children, ...props }) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

export default PaymentButton;
