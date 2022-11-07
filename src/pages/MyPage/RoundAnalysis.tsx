import { useLayoutEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { isEmpty, map, pipe, toArray } from '@fxts/core';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import PrimaryButton from 'components/Button/PrimaryButton';
import media from 'utils/styles/media';
import { flex } from 'utils/styles/mixin';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const RoundAnalysisLayout = styled(LayoutResponsive)`
    max-width: 840px;
    text-align: left;
`;

const RoundAnalysisContainer = styled.section`
    color: ${(props) => props.theme.text1};

    ${media.custom(888)} {
        width: 100%;
        margin: 50px 0 90px;
        padding: 0 24px;
    }

    margin-bottom: 20px;
`;

const PageTitle = styled.h2`
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
    line-height: 24px;
    letter-spacing: 0;
    color: #767676;
    ${media.medium} {
        font-size: 1.1666rem;
    }
`;

const RoundAnalysisTabList = styled.ul`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const RoundAnalysisTabListItem = styled.li<{ isSelected: boolean }>`
    flex: 1;
    text-align: center;
    padding: 14px 0;
    margin-right: 10.5px;
    letter-spacing: 0;
    background: ${(props) =>
        props.isSelected ? props.theme.secondary : '#fff'};
    color: ${(props) => (props.isSelected ? '#fff' : props.theme.text3)};
    border: ${(props) =>
        props.isSelected ? 'none' : `1px solid ${props.theme.line2}`};
    font-weight: ${(props) => (props.isSelected ? '600' : '500')};

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

const SectionTitle = styled.h3`
    font-size: 18px;
    letter-spacing: 0;
    color: #000000;
    font-weight: normal;
    margin-bottom: 20px;

    span {
        font-weight: lighter;
        letter-spacing: -0.64px;
    }
`;

const StatisticContainer = styled.div`
    background-color: #f8f8fa;
    display: flex;
`;

const StatisticSummary = styled.div`
    flex: 1 40%;
    ${flex}
    justify-content: space-between;
    padding: 100px 60px;
    text-align: center;
`;

const ChartContainer = styled.div`
    flex: 1 60%;
    max-height: 280px;
    position: relative;
`;

const Score = styled.p`
    font-weight: bold;
    font-size: 28px;
    line-height: 40px;
    letter-spacing: 0;
    color: #191919;
    margin-bottom: 20px;
`;

const ScoreTitle = styled.p`
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0;
    color: #000000;
`;

const RoundList = styled.ul`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
    padding: 20px 0;
    min-height: 100px;
    ${flex}
    flex-wrap: wrap;
    justify-content: space-between;
`;

const RoundListItem = styled.li`
    background-color: #f8f8fa;
    box-shadow: 2px 2px 4px #0000001a;
    padding: 24px 45px;
    margin-bottom: 10px;
    width: 49%;
    height: 100%;

    &:nth-child(2n-1) {
        margin-right: 10px;
    }
`;

const NoRoundListItem = styled.li`
    font-size: 16px;
    letter-spacing: 0;
    line-height: 24px;
    color: #a8a8a8;
`;

const RoundTitle = styled.div`
    font-weight: bolder;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    color: #191919;

    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
`;

const RoundDescription = styled.div`
    display: flex;
    justify-content: space-between;

    &:first-child {
        color: #858585;
        font-size: 14px;
    }
    &:last-child {
        letter-spacing: 0px;
        color: #191919;
        font-size: 10px;
    }
`;

const Dimmed = styled.div`
    &:after {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        content: '';
        background-color: #191919;
        opacity: 0.2;
        z-index: 1000;
    }
`;

const ModalContainer = styled.div`
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    border-radius: 11px;
    padding: 65px 110px;
    ${flex}
    flex-direction: column;
    width: 500px;
`;

const RoundAnalysis = () => {
    const [roundAnalysisTab, setRoundAnalysisTab] = useState([
        {
            id: 'main',
            name: '메인',
            isSelected: true,
        },
        {
            id: 'round',
            name: '라운드 내역',
            isSelected: false,
        },
        {
            id: 'statistics',
            name: '통계',
            isSelected: false,
        },
    ]);

    const [roundList, setRoundList] = useState([
        {
            id: 1,
            hole: '18 Hole',
            score: '200 (+30)',
            clubName: '동원 로얄 CC',
            date: '20-10-12',
        },
        {
            id: 2,
            hole: '18 Hole',
            score: '200 (+30)',
            clubName: '동원 로얄 CC',
            date: '20-10-12',
        },
        {
            id: 3,
            hole: '18 Hole',
            score: '200 (+30)',
            clubName: '동원 로얄 CC',
            date: '20-10-12',
        },
    ]);

    const [chartData, setChartData] = useState([
        { id: 'buddy', name: '버디', value: 100 },
        { id: 'par', name: '파', value: 0 },
        { id: 'bogey', name: '보기', value: 0 },
        { id: 'doubleBogey', name: '더블보기', value: 0 },
        { id: 'tripleBogey', name: '트리플보기', value: 0 },
    ]);

    const onTabClick = (id: string) => {
        setRoundAnalysisTab((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isSelected: a.id === id })),
                toArray,
            ),
        );
    };

    const hasProduct = useMemo(() => !isEmpty([]), []);

    useLayoutEffect(() => {
        if (hasProduct) {
            setChartData([
                { id: 'buddy', name: '버디', value: 5 },
                { id: 'par', name: '파', value: 20 },
                { id: 'bogey', name: '보기', value: 20 },
                { id: 'doubleBogey', name: '더블보기', value: 30 },
                { id: 'tripleBogey', name: '트리플보기', value: 20 },
            ]);
        }

        return () => {
            setChartData([
                { id: 'buddy', name: '버디', value: 100 },
                { id: 'par', name: '파', value: 0 },
                { id: 'bogey', name: '보기', value: 0 },
                { id: 'doubleBogey', name: '더블보기', value: 0 },
                { id: 'tripleBogey', name: '트리플보기', value: 0 },
            ]);
        };
    }, [hasProduct]);

    const scoreData = useMemo(
        () =>
            pipe(
                chartData,
                map((a) => a.value),
                toArray,
            ),
        [chartData],
    );

    const labels = useMemo(
        () =>
            pipe(
                chartData,
                map((a) =>
                    hasProduct ? `${a.name} ${a.value} %` : `${a.name} - %`,
                ),
                toArray,
            ),
        [chartData, hasProduct],
    );

    return (
        <>
            <RoundAnalysisLayout>
                <RoundAnalysisContainer>
                    <PageTitle>라운드 분석</PageTitle>
                    <Description>
                        보이스캐디에 등록한 제품을 통해
                        <br />
                        다양한 라운드 분석 내용을 확인할 수 있습니다.
                    </Description>
                    <RoundAnalysisTabList>
                        {roundAnalysisTab.map((tab) => (
                            <RoundAnalysisTabListItem
                                key={tab.id}
                                isSelected={tab.isSelected}
                                onClick={() => onTabClick(tab.id)}
                            >
                                {tab.name}
                            </RoundAnalysisTabListItem>
                        ))}
                    </RoundAnalysisTabList>
                </RoundAnalysisContainer>

                <div style={{ position: 'relative' }}>
                    {!hasProduct && (
                        <>
                            <Dimmed>
                                <ModalContainer>
                                    <p
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                            lineHeight: '36px',
                                            letterSpacing: '-1.2px',
                                            color: '#191919',
                                            textAlign: 'center',
                                            marginBottom: '30px',
                                        }}
                                    >
                                        제품을 등록하고 다양한
                                        <br /> 통계 데이터를 확인해보세요 :)
                                    </p>
                                    <PrimaryButton style={{ width: '100%' }}>
                                        제품 등록하기
                                    </PrimaryButton>
                                </ModalContainer>
                            </Dimmed>
                        </>
                    )}

                    <section style={{ marginBottom: '20px' }}>
                        <SectionTitle>
                            통계 <span>(최근 9라운드)</span>
                        </SectionTitle>
                        <StatisticContainer>
                            <StatisticSummary>
                                <div>
                                    <Score>{hasProduct ? 72 : '-'}</Score>
                                    <ScoreTitle>베스트 스코어</ScoreTitle>
                                </div>
                                <div>
                                    <Score>{hasProduct ? '450.5m' : '-'}</Score>
                                    <ScoreTitle>
                                        평균 드라이버 비거리
                                    </ScoreTitle>
                                </div>
                            </StatisticSummary>
                            <ChartContainer>
                                <Doughnut
                                    style={{ margin: '4px' }}
                                    plugins={[
                                        {
                                            id: 'custom_canvas_background_color',
                                            beforeDraw: (chart) => {
                                                const { ctx } = chart;
                                                ctx.save();
                                                ctx.globalCompositeOperation =
                                                    'destination-over';
                                                ctx.fillStyle = '#fff';
                                                ctx.fillRect(
                                                    0,
                                                    0,
                                                    chart.width,
                                                    chart.height,
                                                );
                                                ctx.restore();
                                            },
                                        },
                                        {
                                            id: 'custom_title',
                                            beforeDraw: (chart) => {
                                                const {
                                                    ctx,
                                                    data,
                                                    chartArea: {
                                                        top,
                                                        bottom,
                                                        left,
                                                        right,
                                                        width,
                                                        height,
                                                    },
                                                } = chart;

                                                ctx.save();
                                                ctx.font = `normal 12px Arial`;
                                                ctx.textAlign = 'center';
                                                ctx.fillText(
                                                    'AVG',
                                                    width / 2,
                                                    height / 2 + top / 2,
                                                );
                                                ctx.restore();

                                                ctx.save();
                                                ctx.font = 'bold 26px Arial';
                                                ctx.textAlign = 'center';
                                                ctx.fillText(
                                                    '87',
                                                    width / 2,
                                                    height / 2 + top / 2 + 26,
                                                );
                                                ctx.restore();

                                                ctx.save();
                                                ctx.font = 'normal 12px Arial';
                                                ctx.textAlign = 'center';
                                                ctx.fillText(
                                                    '+15',
                                                    width / 2,
                                                    height / 2 +
                                                        top / 2 +
                                                        12 +
                                                        26,
                                                );
                                                ctx.restore();
                                            },
                                        },
                                    ]}
                                    options={{
                                        maintainAspectRatio: false,
                                        layout: {
                                            autoPadding: true,
                                        },
                                        plugins: {
                                            legend: {
                                                display: true,
                                                position: 'right',
                                                labels: {
                                                    usePointStyle: true,
                                                    pointStyle: 'circle',
                                                    color: '#8F8F8F',
                                                },
                                            },
                                        },
                                    }}
                                    data={{
                                        labels,
                                        datasets: [
                                            {
                                                label: 'My First Dataset',
                                                data: scoreData,
                                                backgroundColor: [
                                                    '#191919',
                                                    '#508CFE',
                                                    '#42B3AB',
                                                    '#FFA70F',
                                                    '#FE5050',
                                                ],
                                                hoverOffset: 4,
                                            },
                                        ],
                                    }}
                                />
                            </ChartContainer>
                        </StatisticContainer>
                    </section>

                    <section style={{ marginBottom: '20px' }}>
                        <SectionTitle>라운드 내역</SectionTitle>
                        <RoundList>
                            {roundList.length > 0 ? (
                                <>
                                    {roundList.map(
                                        ({
                                            id,
                                            hole,
                                            score,
                                            clubName,
                                            date,
                                        }) => (
                                            <RoundListItem key={id}>
                                                <RoundTitle>
                                                    <p>{hole}</p>
                                                    <p>{score}</p>
                                                </RoundTitle>
                                                <RoundDescription>
                                                    <p>{clubName}</p>
                                                    <p>{date}</p>
                                                </RoundDescription>
                                            </RoundListItem>
                                        ),
                                    )}
                                </>
                            ) : (
                                <NoRoundListItem>
                                    최근 라운드 내역이 없습니다.
                                </NoRoundListItem>
                            )}
                        </RoundList>
                    </section>
                </div>
            </RoundAnalysisLayout>
        </>
    );
};

export default RoundAnalysis;
