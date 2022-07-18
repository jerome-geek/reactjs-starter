import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { AxiosResponse } from 'axios';

import { board } from 'api/manage';
import Button from 'components/Button/Button';
import Header from 'components/shared/Header';
import SEOHelmet from 'components/shared/SEOHelmet';
import { ORDER_DIRECTION } from 'models';
import { BoardList, BoardListItem } from 'models/manage';
import PATHS from 'const/paths';
import * as queryKeys from 'const/queryKeys';

const CategoryWrapper = styled.div`
    overflow-x: auto;
    white-space: nowrap;
    margin: 0 auto;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
`;

const NoticeCategoryList = styled.ul`
    display: flex;
`;
const NoticeCategoryListItem = styled.li`
    border: 1px solid blue;
    padding: 5px;
`;

const NoticeListItem = styled.li`
    border-bottom: 1px solid #999;
    padding: 10px;
`;

// TODO:검색 참고 https://www.zigae.com/react-query-key/
const Notice = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [filter, setFilter] = useState<number>(0);
    const [boardList, setBoardList] = useState<BoardListItem[]>([]);
    const [listItemCount, setListItemCount] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const { data } = useQuery(
        [queryKeys.BOARD_CATEGORY],
        async () => await board.getCategories('8064'),
        { refetchOnWindowFocus: false },
    );

    // TODO: useInfiniteQuery를 이용해 Refactor 필요
    const { isFetching } = useQuery<AxiosResponse<BoardList>>(
        [queryKeys.BOARD_LIST, { filter, pageNumber }],
        async () =>
            await board.getArticlesByBoardNo('8064', {
                pageNumber,
                hasTotalCount: true,
                direction: ORDER_DIRECTION.ASC,
                pageSize: 1,
                categoryNo: filter,
            }),
        {
            onSuccess: (response) => {
                if (pageNumber === 1) {
                    setBoardList(response.data.items);
                } else {
                    setBoardList((prev) => [...prev, ...response.data.items]);
                }

                setListItemCount(response.data.totalCount);

                if (response.data.items.length === 0) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            },
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        },
    );

    const onMoreButtonClick = () => setPageNumber((prev) => prev + 1);

    return (
        <>
            <SEOHelmet data={{ title: '공지사항' }} />
            <Header />
            <div>
                <h1>공지사항</h1>
                <CategoryWrapper>
                    <NoticeCategoryList>
                        <NoticeCategoryListItem
                            onClick={() => {
                                setFilter((prev) => {
                                    if (prev === 0) {
                                        return prev;
                                    } else {
                                        setPageNumber(1);
                                        return 0;
                                    }
                                });
                            }}
                        >
                            전체
                        </NoticeCategoryListItem>
                        {data?.data?.map(({ label, categoryNo }) => {
                            return (
                                <NoticeCategoryListItem
                                    key={categoryNo}
                                    onClick={() =>
                                        setFilter((prev) => {
                                            if (prev === categoryNo) {
                                                return prev;
                                            } else {
                                                setPageNumber(1);
                                                return categoryNo;
                                            }
                                        })
                                    }
                                >
                                    {label}
                                </NoticeCategoryListItem>
                            );
                        })}
                    </NoticeCategoryList>
                </CategoryWrapper>

                <div style={{ border: '1px solid red' }}>
                    {boardList.length > 0 ? (
                        <ul>
                            {boardList.map(
                                ({ articleNo, title, registerYmdt }) => {
                                    return (
                                        <NoticeListItem key={articleNo}>
                                            <Link
                                                to={`${PATHS.NOTICE}/${articleNo}`}
                                                state={{
                                                    articleNo,
                                                    boardNo: '8064',
                                                }}
                                            >
                                                <p>{articleNo}</p>
                                                <p
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {title}
                                                </p>
                                                <p>
                                                    {dayjs(registerYmdt).format(
                                                        'YY-MM-DD',
                                                    )}
                                                </p>
                                            </Link>
                                        </NoticeListItem>
                                    );
                                },
                            )}
                        </ul>
                    ) : (
                        <div>등록된 공지사항이 없습니다</div>
                    )}
                </div>

                {hasMore && (
                    <div>
                        <Button onClick={onMoreButtonClick}>{`더보기(${
                            listItemCount - boardList.length
                        })`}</Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Notice;
