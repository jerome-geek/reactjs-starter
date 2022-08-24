import { FC, HTMLAttributes, MouseEvent, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { map, pipe, toArray } from '@fxts/core';

import InputWithCalendarIcon from 'components/Input/InputWithCalendarIcon';

interface SearchPeriodProps extends HTMLAttributes<HTMLDivElement> {
    startYmd: string;
    endYmd: string;
    setSearchPeriod: any;
    onSearchClick: (startYmd: string, endYmd: string) => void;
}

interface PeriodTab {
    period: number;
    name: string;
    isActive: boolean;
}

const SearchPeriodWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 40px;
`;

const PeriodButton = styled.button<{ selected: boolean }>`
    background-color: ${(props) => (props.selected ? '#A8A8A8' : '#f0eff4')};
    color: ${(props) => (props.selected ? '#FFFFFF' : '#191919')};
    padding: 6px 18px;
    width: 64px;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.48px;
    margin-right: 8px;
`;

const PeriodWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const SearchButton = styled.button`
    background-color: #222943;
    color: #fff;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.48px;
    padding: 6px 32px;
`;

const SearchPeriod: FC<SearchPeriodProps> = ({
    startYmd,
    endYmd,
    setSearchPeriod,
    onSearchClick,
}) => {
    const [periodTab, setPeriodTab] = useState<PeriodTab[]>([
        { period: 0, name: '오늘', isActive: false },
        { period: 7, name: '7일', isActive: true },
        { period: 15, name: '15일', isActive: false },
        { period: 30, name: '1개월', isActive: false },
        { period: 90, name: '3개월', isActive: false },
        { period: 365, name: '1년', isActive: false },
    ]);

    // TODO: searchTab 클릭시 period에 따라 부모 component의 searchperiod를 계산해서 바꿔줘야한다
    const onPeriodTabClick = (
        e: React.MouseEvent<HTMLButtonElement>,
        period: number,
    ) => {
        setPeriodTab((prev: PeriodTab[]) =>
            pipe(
                prev,
                map((a: PeriodTab) => ({
                    ...a,
                    isActive: a.period === period,
                })),
                toArray,
            ),
        );
        setSearchPeriod({
            startYmd: dayjs().subtract(period, 'days').format('YYYY-MM-DD'),
            endYmd: dayjs().format('YYYY-MM-DD'),
        });
    };

    return (
        <SearchPeriodWrapper>
            <PeriodWrapper>
                {periodTab.map(({ period, name, isActive }) => (
                    <PeriodButton
                        key={period}
                        selected={isActive}
                        onClick={(e: MouseEvent<HTMLButtonElement>) =>
                            onPeriodTabClick(e, period)
                        }
                    >
                        {name}
                    </PeriodButton>
                ))}
            </PeriodWrapper>
            <PeriodWrapper>
                <InputWithCalendarIcon
                    type='before'
                    value={dayjs(startYmd).format('YYYY-MM-DD')}
                />
                ~
                <InputWithCalendarIcon
                    type='after'
                    value={dayjs(endYmd).format('YYYY-MM-DD')}
                />
                <SearchButton>
                    <span>조회</span>
                </SearchButton>
            </PeriodWrapper>
        </SearchPeriodWrapper>
    );
};

export default SearchPeriod;
