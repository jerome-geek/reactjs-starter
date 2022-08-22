import { FC, HTMLAttributes, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

interface DropDownProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    menuList: { title: string; url: string }[];
}

const DropDownContainer = styled.div`
    cursor: pointer;
`;

const DropDownHeader = styled.div`
    position: relative;
`;

const DropDownListContainer = styled.div`
    position: absolute;
    margin-top: 10px;
`;

const DropDownList = styled.ul`
    background-color: #fff;
    color: #191919;
`;

const ListItem = styled.li`
    font-size: 12px;
    line-height: 18px;
    list-style: none;
    letter-spacing: -0.48px;
    padding: 8px 10px;
    cursor: pointer;

    &:hover {
        background-color: #f0eff4;
    }
`;

const DropDown: FC<DropDownProps> = ({ title, menuList, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropDownContainer {...props}>
            <DropDownHeader onClick={() => setIsOpen((prev) => !prev)}>
                {title}{' '}
                <FontAwesomeIcon
                    icon={isOpen ? faAngleDown : faAngleUp}
                    style={{ marginLeft: '5px' }}
                />
            </DropDownHeader>

            {isOpen && (
                <DropDownListContainer>
                    <DropDownList>
                        {menuList.map(({ url, title }, index) => (
                            <ListItem key={index}>
                                <Link to={url}>{title}</Link>
                            </ListItem>
                        ))}
                    </DropDownList>
                </DropDownListContainer>
            )}
        </DropDownContainer>
    );
};

export default DropDown;
