import { forwardRef, InputHTMLAttributes, Ref } from 'react';
import styled from 'styled-components';
import { ReactComponent as CircleChecked } from 'assets/icons/checkbox_circle_checked.svg';
import { ReactComponent as CircleUnChecked } from 'assets/icons/checkbox_circle_uhchecked.svg';
import { ReactComponent as SquareUnChecked } from 'assets/icons/checkbox_square_unchecked.svg';
import { ReactComponent as SquareChecked } from 'assets/icons/checkbox_square_checked.svg';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    shape: 'square' | 'circle';
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

const HiddenCheckbox = styled.input.attrs<CheckboxProps>((props) => ({
    type: 'checkbox',
    shape: props.shape,
}))`
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
        {
            shape = 'square',
            label,
            id,
            checked = false,
            ...props
        }: CheckboxProps,
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
                    {shape === 'circle' && checked && <CircleChecked />}
                    {shape === 'circle' && !checked && <CircleUnChecked />}

                    {shape === 'square' && checked && <SquareChecked />}
                    {shape === 'square' && !checked && <SquareUnChecked />}
                    <StyledP checked={checked}>{label}</StyledP>
                </CheckBoxLabel>
            </CheckboxContainer>
        );
    },
);

export default Checkbox;
