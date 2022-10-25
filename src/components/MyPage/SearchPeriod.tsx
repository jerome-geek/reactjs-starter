import { FC, HTMLAttributes, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { map, pipe, toArray, filter, head } from '@fxts/core';

import InputWithCalendarIcon from 'components/Input/InputWithCalendarIcon';
import PrimaryButton from 'components/Button/PrimaryButton';

interface SearchPeriodProps extends HTMLAttributes<HTMLDivElement> {
    startYmd: string;
    endYmd: string;
    setSearchPeriod: any;
    setSearchCondition: Dispatch<
        SetStateAction<{
            hasTotalCount: boolean;
            pageNumber: number;
            pageSize: number;
            startYmd: string;
            endYmd: string;
        }>
    >;
}

interface PeriodTab {
    period: number;
    name: string;
    isSelected: boolean;
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

const SearchButton = styled(PrimaryButton)`
    max-height: 30px;
    line-height: 30px;
    padding: 0;
`;

const SearchPeriod: FC<SearchPeriodProps> = ({
    startYmd,
    endYmd,
    setSearchPeriod,

    setSearchCondition,
}) => {
    const [periodTab, setPeriodTab] = useState<PeriodTab[]>([
        { period: 0, name: '오늘', isSelected: false },
        { period: 7, name: '7일', isSelected: true },
        { period: 15, name: '15일', isSelected: false },
        { period: 30, name: '1개월', isSelected: false },
        { period: 90, name: '3개월', isSelected: false },
        { period: 365, name: '1년', isSelected: false },
    ]);

    const onPeriodTabClick = (period: number) => {
        setPeriodTab((prev) =>
            pipe(
                prev,
                map((a) => ({
                    ...a,
                    isSelected: a.period === period,
                })),
                toArray,
            ),
        );
        setSearchPeriod({
            startYmd: dayjs().subtract(period, 'days').format('YYYY-MM-DD'),
            endYmd: dayjs().format('YYYY-MM-DD'),
        });
    };

    const onSearchButtonClick = () => {
        const selectedTab = pipe(
            periodTab,
            filter((a) => a.isSelected),
            head,
        );

        if (selectedTab) {
            setSearchCondition((prev) => ({
                ...prev,
                startYmd: dayjs()
                    .subtract(selectedTab.period, 'days')
                    .format('YYYY-MM-DD'),
            }));
        }
    };

    return (
        <SearchPeriodWrapper>
            <PeriodWrapper>
                {periodTab.map(({ period, name, isSelected }) => (
                    <PeriodButton
                        key={period}
                        selected={isSelected}
                        onClick={() => onPeriodTabClick(period)}
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
                <SearchButton onClick={onSearchButtonClick}>조회</SearchButton>
            </PeriodWrapper>
        </SearchPeriodWrapper>
    );
};

export default SearchPeriod;
