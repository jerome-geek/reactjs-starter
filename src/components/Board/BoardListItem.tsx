import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

interface BoardListItemProps extends HTMLAttributes<HTMLLIElement> {
    categoryLabel: string;
    title: string;
    registerYmdt: Date;
}

const BoardListItemContainer = styled.li`
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
`;

const BoardListItem: FC<BoardListItemProps> = ({
    categoryLabel,
    title,
    registerYmdt,
    ...props
}) => {
    return (
        <BoardListItemContainer {...props}>
            <div
                style={{
                    color: '#999999',
                    fontSize: '12px',
                    lineHeight: '18px',
                    textAlign: 'left',
                    width: '10%',
                }}
            >
                {categoryLabel}
            </div>
            <div
                style={{
                    textAlign: 'left',
                    fontSize: '16px',
                    color: '#191919',
                    width: '80%',
                }}
            >
                {title}
            </div>
            <div
                style={{
                    textAlign: 'center',
                    fontSize: '10px',
                    lineHeight: '15px',
                    color: '#191919',
                    width: '10%',
                }}
            >
                {dayjs(registerYmdt).format('YY-MM-DD')}
            </div>
        </BoardListItemContainer>
    );
};

export default BoardListItem;
