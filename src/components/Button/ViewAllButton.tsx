import { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ViewAllButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ViewAllButtonWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.bg2};
    border-radius: 8px;
    width: 120px;
    height: 143px;
    cursor: pointer;

    & > svg {
        font-size: 50px;
        color: ${(props) => props.theme.line2};
    }
`;

const ViewAllButton: FC<ViewAllButtonProps> = ({ ...args }) => {
    return (
        <ViewAllButtonWrapper {...args}>
            <FontAwesomeIcon icon={faAngleRight} />
        </ViewAllButtonWrapper>
    );
};

export default ViewAllButton;
