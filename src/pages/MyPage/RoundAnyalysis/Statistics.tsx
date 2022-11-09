import { FC, useState, useLayoutEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { isEmpty, map, pipe, toArray } from '@fxts/core';

import media from 'utils/styles/media';
import { flex } from 'utils/styles/mixin';
import roundStats from 'mock/roundStats.json';

interface StatisticsProps {
    isMainTab?: boolean;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const StyledContainer = styled.section`
    margin-bottom: 20px;

    ${media.medium} {
        margin-bottom: 60px;
    }
`;

const Title = styled.h3`
    font-size: 18px;
    letter-spacing: 0;
    color: #000000;
    font-weight: normal;
    margin-bottom: 20px;

    span {
        font-size: 16px;
        margin-left: 10px;
        font-weight: 200;
        letter-spacing: -0.64px;
    }
`;

const StatisticContainer = styled.div`
    background-color: #f8f8fa;
    display: flex;

    ${media.medium} {
        flex-direction: column-reverse;
    }
`;

const StatisticSummary = styled.div`
    flex: 1 40%;
    ${flex}
    justify-content: space-between;
    padding: 100px 60px;
    text-align: center;

    ${media.medium} {
        padding: 24px 54px;
    }
`;

const Score = styled.p`
    font-weight: bold;
    font-size: 28px;
    line-height: 40px;
    letter-spacing: 0;
    color: #191919;
    margin-bottom: 20px;

    ${media.medium} {
        font-size: 24px;
        line-height: 36px;
    }
`;

const ScoreTitle = styled.p`
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0;
    color: #000000;
`;

const ChartContainer = styled.div`
    flex: 1 60%;
    max-height: 280px;
    position: relative;
`;

const Statistics: FC<StatisticsProps> = ({ isMainTab = true }) => {
    const [chartData, setChartData] = useState([
        { id: 'buddy', name: '버디', value: 100 },
        { id: 'par', name: '파', value: 0 },
        { id: 'bogey', name: '보기', value: 0 },
        { id: 'doubleBogey', name: '더블보기', value: 0 },
        { id: 'tripleBogey', name: '트리플보기', value: 0 },
    ]);

    const hasProduct = useMemo(() => !!isEmpty([]), []);

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

    const scores = useMemo(
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
        <StyledContainer>
            <Title>
                통계
                <span>{`(최근 ${roundStats.data.roundStatistics.gameCount}라운드)`}</span>
            </Title>
            <StatisticContainer>
                <StatisticSummary>
                    <div>
                        <Score>
                            {roundStats.data.roundStatistics.bestScore === 0
                                ? '-'
                                : roundStats.data.roundStatistics.bestScore}
                        </Score>
                        <ScoreTitle>베스트 스코어</ScoreTitle>
                    </div>
                    <div>
                        <Score>
                            {`${
                                roundStats.data.roundStatistics.bestScoreInfo
                                    .avgDrivingDst === 0
                                    ? '-'
                                    : roundStats.data.roundStatistics
                                          .bestScoreInfo.avgDrivingDst
                            } m`}
                        </Score>
                        <ScoreTitle>평균 드라이버 비거리</ScoreTitle>
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
                                        height / 2 + top / 2 + 12 + 26,
                                    );
                                    ctx.restore();
                                },
                            },
                        ]}
                        options={{
                            maintainAspectRatio: false,
                            layout: {
                                autoPadding: true,
                                // TODO: 모바일에서는 아래옵션으로 변경해주어야함
                                // padding: 10,
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
                                    label: 'Score Data',
                                    data: scores,
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
        </StyledContainer>
    );
};

export default Statistics;
