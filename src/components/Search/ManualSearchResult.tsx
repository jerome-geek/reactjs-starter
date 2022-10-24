import { FC, Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';

import SearchResultLayout from 'components/Layout/SearchResultLayout';
import {
    ArticleParams,
    BoardListItem as BoardListItemModel,
} from 'models/manage';

interface ManualSearchResultProps {
    manualListTotalCount: number;
    manualList: BoardListItemModel[];
    manualListSearchCondition: ArticleParams;
    setManualListSearchCondition: Dispatch<SetStateAction<ArticleParams>>;
}

const ManualListContainer = styled.section`
    margin: 40px 0;
    display: flex;
    flex-wrap: wrap;
    height: auto;
    overflow: auto;
    min-height: 400px;
`;

const ManualSearchResult: FC<ManualSearchResultProps> = ({
    manualListTotalCount,
    manualList,
    manualListSearchCondition,
    setManualListSearchCondition,
}) => {
    const [totalPageNumber, setTotalPageNumber] = useState(0);

    useLayoutEffect(() => {
        if (manualListSearchCondition?.pageSize) {
            setTotalPageNumber(
                manualListTotalCount % manualListSearchCondition.pageSize === 0
                    ? manualListTotalCount / manualListSearchCondition.pageSize
                    : Math.floor(
                          manualListTotalCount /
                              manualListSearchCondition.pageSize,
                      ) + 1,
            );
        }
    }, [manualListTotalCount, manualListSearchCondition?.pageSize]);

    return (
        <SearchResultLayout
            currentPage={manualListSearchCondition.pageNumber}
            totalPage={totalPageNumber}
            onFirstClick={() =>
                setManualListSearchCondition((prev) => ({
                    ...prev,
                    pageNumber: 1,
                }))
            }
            onBeforeClick={() =>
                setManualListSearchCondition((prev) => ({
                    ...prev,
                    pageNumber: prev.pageNumber <= 1 ? 1 : prev.pageNumber--,
                }))
            }
            onNextClick={() =>
                setManualListSearchCondition((prev) => ({
                    ...prev,
                    pageNumber:
                        prev.pageNumber >= totalPageNumber
                            ? prev.pageNumber
                            : prev.pageNumber++,
                }))
            }
            onEndClick={() =>
                setManualListSearchCondition((prev) => ({
                    ...prev,
                    pageNumber: totalPageNumber,
                }))
            }
        >
            <ManualListContainer>
                {manualList?.length > 0 ? (
                    <div></div>
                ) : (
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            minHeight: '60px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <p>검색결과가 없습니다.</p>
                    </div>
                )}
            </ManualListContainer>
            ;
        </SearchResultLayout>
    );
};

export default ManualSearchResult;
