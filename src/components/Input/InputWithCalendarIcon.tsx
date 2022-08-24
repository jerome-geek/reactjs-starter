import { Ref, forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import StyledInput from './StyledInput';
import { ReactComponent as CalendarAfterIcon } from 'assets/icons/calendar_after.svg';
import { ReactComponent as CalendarBeforeIcon } from 'assets/icons/calendar_before.svg';

interface InputWithCalendarIconProps
    extends InputHTMLAttributes<HTMLInputElement> {
    type: 'before' | 'after';
}

const InputWithCalendarIconContainer = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.line2};
    display: flex;
    align-items: center;
    position: relative;

    &:focus-within {
        border-bottom: 1px solid ${(props) => props.theme.secondary};
    }
`;

const Input = styled(StyledInput)`
    border: none;
    outline: none;
    width: 100%;
    padding: 10px 20px;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.48px;

    &:focus {
        border: none;
        outline: none;
    }
`;

const InputWithCalendarIcon = forwardRef(
    (props: InputWithCalendarIconProps, ref: Ref<HTMLInputElement>) => {
        return (
            <InputWithCalendarIconContainer>
                <Input ref={ref} {...props} />
                {props.type === 'before' && <CalendarAfterIcon />}
                {props.type === 'after' && <CalendarBeforeIcon />}
            </InputWithCalendarIconContainer>
        );
    },
);

export default InputWithCalendarIcon;
