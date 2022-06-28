import { useState, MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as More } from 'assets/icon-select-more.svg';

const DropdownContainer = styled.div`
    background-color: ${({ theme }) => theme.white};
    margin-bottom: 10px;
`;

const DropdownTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid ${(props) => props.theme.gray1};
`;

const Title = styled.p``;

const ToggleArrow = styled(More)`
    width: 30px;
    height: 30px;
    stroke: ${(props) => props.theme.black};
    transition: 0.5s ease-in-out;
    ${(props: { $isVisible: boolean }) => (props.$isVisible ? openStyles : '')}
`;

const openStyles = css`
    transform: rotate(180deg);
    stroke: ${(props) => props.theme.blue};
`;

const DropdownContentsContainer = styled.div`
    display: block;
    background: ${(props) => props.theme.gray1};
    font-size: 14px;
    color: #767676;
    line-height: 16px;
    text-align: left;
    transition: 0.5s;
    overflow: hidden;
    max-height: 0;
    height: auto;
    overflow: hidden;
    ${(props: { $isVisible: boolean }) =>
        props.$isVisible ? 'max-height: 999px' : 'max-height: 0'}
`;

const DropdownContents = styled.div`
    padding: 22px 45px;
`;

const SectionDropdown = ({
    title,
    children,
}: {
    title: string;
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
                <Title>{title}</Title>
                <ToggleArrow $isVisible={isVisible} />
            </DropdownTitleContainer>

            <DropdownContentsContainer $isVisible={isVisible}>
                <DropdownContents>{children}</DropdownContents>
            </DropdownContentsContainer>
        </DropdownContainer>
    );
};

export default SectionDropdown;
