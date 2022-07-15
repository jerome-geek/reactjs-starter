import { forwardRef, InputHTMLAttributes, Ref } from 'react';
import styled from 'styled-components';
import { ReactComponent as Checked } from 'assets/icons/checked.svg';
import { ReactComponent as UnChecked } from 'assets/icons/unchecked.svg';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
`;

const CheckBoxLabel = styled.label`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HiddenCheckbox = styled.input<CheckboxProps>`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const StyledP = styled.p<{ checked: boolean }>`
    margin-left: 0.25rem;
    font-size: 12px;
    letter-spacing: 0;
    color: ${(props) => (props.checked ? '#222943' : '#8F8F8F')};
`;

const Checkbox = forwardRef(
    (
        { label, id, checked = false, ...props }: CheckboxProps,
        ref: Ref<HTMLInputElement>,
    ) => {
        return (
            <CheckboxContainer>
                <CheckBoxLabel htmlFor={props.name}>
                    <HiddenCheckbox
                        id={props.name}
                        type='checkbox'
                        ref={ref}
                        {...props}
                    />
                    {checked ? <Checked /> : <UnChecked />}
                    <StyledP checked={checked}>{label}</StyledP>
                </CheckBoxLabel>
            </CheckboxContainer>
        );
    },
);

export default Checkbox;
