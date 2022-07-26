import { forwardRef, Ref, InputHTMLAttributes, HTMLAttributes } from 'react';
import styled from 'styled-components';

import StyledInput from 'components/Input/StyledInput';
import Button from 'components/Common/Button';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

export interface InputWithIconProps
    extends InputHTMLAttributes<HTMLInputElement> {
    containerProps?: HTMLAttributes<HTMLDivElement>;
}

const InputWithIconContainer = styled.div`
    border: 1px solid ${(props) => props.theme.line2};
    display: flex;
    align-items: center;
    position: relative;

    &:focus-within {
        border: 1px solid ${(props) => props.theme.secondary};
    }
`;

const Input = styled(StyledInput)`
    border: none;
    outline: none;
    width: 100%;
    padding: 10px 20px;

    &:focus {
        border: none;
        outline: none;
    }
`;

const StyledButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-content: center;
    cursor: pointer;
`;

const InputWithIcon = forwardRef(
    (
        { containerProps, ...props }: InputWithIconProps,
        ref: Ref<HTMLInputElement>,
    ) => {
        return (
            <InputWithIconContainer {...containerProps}>
                <Input ref={ref} {...props} />
                <StyledButton>
                    <SearchIcon />
                </StyledButton>
            </InputWithIconContainer>
        );
    },
);

export default InputWithIcon;
