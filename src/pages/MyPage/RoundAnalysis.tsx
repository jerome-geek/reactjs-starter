import React, { useState } from 'react';
import styled from 'styled-components';

import Header from 'components/shared/Header';
import media from 'utils/styles/media';

const RoundAnalysisContainer = styled.main`
    width: 840px;
    margin: 118px auto 168px;
    color: ${(props) => props.theme.text1};
    ${media.custom(888)} {
        width: 100%;
        margin: 50px 0 90px;
        padding: 0 24px;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    letter-spacing: -1.2px;
    font-weight: bold;
    margin-bottom: 20px;
    ${media.xlarge} {
        letter-spacing: -0.9px;
        margin-bottom: 25px;
    }
`;

const Description = styled.p`
    letter-spacing: 0;
    color: #767676;
    ${media.medium} {
        font-size: 1.1666rem;
    }
`;

const RoundAnalysisCategoryContainer = styled.ul`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const RoundAnalysisCategory = styled.li<{ isActive: boolean }>`
    flex: 1 1 0px;
    text-align: center;
    padding: 14px 0;
    margin-right: 10.5px;
    letter-spacing: 0;
    background: ${(props) => (props.isActive ? props.theme.secondary : '#fff')};
    color: ${(props) => (props.isActive ? '#fff' : props.theme.text3)};
    border: ${(props) =>
        props.isActive ? 'none' : `1px solid ${props.theme.line2}`};
    font-weight: ${(props) => (props.isActive ? '600' : '500')};
    cursor: pointer;
    &:last-child {
        margin-right: 0;
    }
    ${media.xlarge} {
        font-size: 1.141rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
        letter-spacing: -0.64px;
        margin-right: 4px;
        padding: 16px 0;
    }
`;

const RoundAnalysis = () => {
    const [activeCategory, setActiveCategory] = useState<number>(1);

    return (
        <>
            <Header />
            <RoundAnalysisContainer>
                <Title>라운드 분석</Title>
                <Description>
                    보이스캐디에 등록한 제품을 통해
                    <br />
                    다양한 라운드 분석 내용을 확인할 수 있습니다.
                </Description>
                <RoundAnalysisCategoryContainer>
                    <RoundAnalysisCategory
                        isActive={activeCategory === 1}
                        onClick={() => setActiveCategory(1)}
                    >
                        메인
                    </RoundAnalysisCategory>
                    <RoundAnalysisCategory
                        isActive={activeCategory === 2}
                        onClick={() => setActiveCategory(2)}
                    >
                        라운드 내역
                    </RoundAnalysisCategory>
                    <RoundAnalysisCategory
                        isActive={activeCategory === 3}
                        onClick={() => setActiveCategory(3)}
                    >
                        통계
                    </RoundAnalysisCategory>
                </RoundAnalysisCategoryContainer>
            </RoundAnalysisContainer>
        </>
    );
};

export default RoundAnalysis;
