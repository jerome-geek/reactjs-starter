import { useState, MouseEvent } from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as More } from 'assets/icons/select_more.svg';

const DropdownContainer = styled.div`
    width: 100%;
`;

const DropdownTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    cursor: pointer;
`;

const Title = styled.p<{ titleSize: string }>`
    font-size: ${(props) => (props.titleSize ? props.titleSize : '1.25rem')};
    font-weight: 500;
    color: ${(props) => props.theme.text1};
`;

const ToggleArrow = styled(More)`
    transition: 0.3s ease-in-out;
    ${(props: { $isVisible: boolean }) => (props.$isVisible ? openStyles : '')}
`;

const openStyles = css`
    transform: rotate(180deg);
`;

const DropdownContentsContainer = styled.div`
    display: block;
    font-size: 14px;
    color: #767676;
    line-height: 20px;
    text-align: left;
    transition: 0.3s;
    overflow: hidden;
    max-height: 0;
    height: auto;
    overflow: hidden;
    ${(props: { $isVisible: boolean }) =>
        props.$isVisible ? 'max-height: 999px' : 'max-height: 0'}
`;

const DropdownContents = styled.div`
    margin-top: 24px;
`;

const SectionDropdown = ({
    title,
    titleSize,
    children,
}: {
    title: string;
    titleSize: string;
    children: React.ReactNode;
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const handleDropdown = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsVisible((prev) => !prev);
    };

    return (
        <DropdownContainer>
            <DropdownTitleContainer onClick={handleDropdown}>
                <Title titleSize={titleSize}>{title}</Title>
                <ToggleArrow $isVisible={isVisible} />
            </DropdownTitleContainer>
            <DropdownContentsContainer $isVisible={isVisible}>
                <DropdownContents>{children}</DropdownContents>
            </DropdownContentsContainer>
        </DropdownContainer>
    );
};

export default SectionDropdown;
