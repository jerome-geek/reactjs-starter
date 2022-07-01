import { forwardRef, Ref, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import StyledInput from 'components/Input/StyledInput';

export interface InputWithIconProps
    extends InputHTMLAttributes<HTMLInputElement> {}

const InputWithIconContainer = styled.div`
    border: 1px solid ${(props) => props.theme.line2};
    display: flex;
    align-items: center;

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

const SearchIcon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.line2};
    padding: 0 1rem;
`;

const InputWithIcon = forwardRef(
    ({ ...props }: InputWithIconProps, ref: Ref<HTMLInputElement>) => {
        return (
            <InputWithIconContainer>
                <Input ref={ref} {...props} />
                <button>
                    <SearchIcon icon={faMagnifyingGlass} fontSize='16px' />
                </button>
            </InputWithIconContainer>
        );
    },
);

export default InputWithIcon;
