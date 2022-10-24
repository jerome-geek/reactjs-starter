import { FC } from 'react';
import styled from 'styled-components';

import SearchResultLayout from 'components/Layout/SearchResultLayout';

interface GolfCourseSearchResultProps {
    golfCourseListTotalCount: number;
    golfCourseList: any[];
}

const GolfCourseListContainer = styled.section`
    margin: 40px 0;
    display: flex;
    flex-wrap: wrap;
    height: auto;
    overflow: auto;
    min-height: 400px;
`;

const GolfCourseSearchResult: FC<GolfCourseSearchResultProps> = ({
    golfCourseListTotalCount,
    golfCourseList,
}) => {
    return (
        <SearchResultLayout
            currentPage={1}
            totalPage={1}
            onFirstClick={() => console.log('onFirstClick')}
            onBeforeClick={() => console.log('onBeforeClick')}
            onNextClick={() => console.log('onNextClick')}
            onEndClick={() => console.log('onEndClick')}
        >
            <GolfCourseListContainer>
                {golfCourseList?.length > 0 ? (
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
            </GolfCourseListContainer>
        </SearchResultLayout>
    );
};

export default GolfCourseSearchResult;
