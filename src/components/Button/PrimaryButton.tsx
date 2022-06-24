import styled from 'styled-components';

import Button, { ButtonProps } from 'components/Common/Button';

export interface PrimaryButtonProps extends ButtonProps {}

const PrimaryButton = styled(Button)<PrimaryButtonProps>`
    color: #fff;
    background-color: #000;
    border: 1px solid #000;
    width: 50%;
    padding: 10px;
`;

export default PrimaryButton;
