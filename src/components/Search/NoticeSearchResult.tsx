import { Dispatch, FC, SetStateAction, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

import SearchResultLayout from 'components/Layout/SearchResultLayout';
import BOARD from 'const/board';
import PATHS from 'const/paths';
import {
    ArticleParams,
    BoardListItem as BoardListItemModel,
} from 'models/manage';

interface NoticeSearchResultProps {
    noticeListTotalCount: number;
    noticeList: BoardListItemModel[];
    noticeSearchListCondition: ArticleParams;
    setNoticeSearchListCondition: Dispatch<SetStateAction<ArticleParams>>;
}

const NoticeListItem = styled.li`
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;

    &:not(:last-of-type) {
        border-bottom: 1px solid #dbdbdb;
    }

    & > p:nth-child(1) {
        flex: 1;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0;
        color: #999999;
    }
    & > p:nth-child(2) {
        flex: 4;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.64px;
        color: #191919;
        text-align: left;
    }
    & > p:nth-child(3) {
        flex: 1;
        font-size: 10px;
        line-height: 16px;
        letter-spacing: 0;
        color: #191919;
    }
`;

const NoticeSearchResult: FC<NoticeSearchResultProps> = ({
    noticeListTotalCount,
    noticeList,
    noticeSearchListCondition,
    setNoticeSearchListCondition,
}) => {
    const navigate = useNavigate();

    const [totalPageNumber, setTotalPageNumber] = useState(0);

    useLayoutEffect(() => {
        setTotalPageNumber(
            noticeListTotalCount % noticeSearchListCondition.pageSize === 0
                ? noticeListTotalCount / noticeSearchListCondition.pageSize
                : Math.floor(
                      noticeListTotalCount / noticeSearchListCondition.pageSize,
                  ) + 1,
        );
    }, [noticeListTotalCount, noticeSearchListCondition.pageSize]);

    return (
        <SearchResultLayout
            currentPage={noticeSearchListCondition.pageNumber}
            totalPage={totalPageNumber}
            onFirstClick={() => {
                setNoticeSearchListCondition((prev) => ({
                    ...prev,
                    pageNumber: 1,
                }));
            }}
            onBeforeClick={() =>
                setNoticeSearchListCondition((prev) => ({
                    ...prev,
                    pageNumber: prev.pageNumber <= 1 ? 1 : prev.pageNumber--,
                }))
            }
            onNextClick={() => {
                setNoticeSearchListCondition((prev) => ({
                    ...prev,
                    pageNumber:
                        prev.pageNumber >= totalPageNumber
                            ? prev.pageNumber
                            : prev.pageNumber++,
                }));
            }}
            onEndClick={() =>
                setNoticeSearchListCondition((prev) => ({
                    ...prev,
                    pageNumber: totalPageNumber,
                }))
            }
        >
            <ul>
                {noticeList.length > 0 ? (
                    noticeList.map(
                        ({ categoryLabel, articleNo, title, registerYmdt }) => (
                            <NoticeListItem
                                key={articleNo}
                                onClick={() =>
                                    navigate(`${PATHS.NOTICE}/${articleNo}`, {
                                        state: {
                                            articleNo,
                                            boardNo: BOARD.NOTICE,
                                        },
                                    })
                                }
                            >
                                <p>{categoryLabel}</p>
                                <p>{title}</p>
                                <p>{dayjs(registerYmdt).format('YY-MM-DD')}</p>
                            </NoticeListItem>
                        ),
                    )
                ) : (
                    <li
                        style={{
                            textAlign: 'center',
                            minHeight: '400px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <p>검색결과가 없습니다.</p>
                    </li>
                )}
            </ul>
        </SearchResultLayout>
    );
};

export default NoticeSearchResult;
