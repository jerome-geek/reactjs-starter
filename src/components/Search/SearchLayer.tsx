import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import InputWithIcon from 'components/Input/InputWithIcon';
import { product } from 'api/product';
import PATHS from 'const/paths';

const SearchContainer = styled.div`
    background: #f8f8fa 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    margin: 0 auto;
    position: absolute;
    width: 100%;
`;

const FavoriteKeywordTitle = styled.p`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.8px;
    color: #191919;
    margin-bottom: 10px;
`;

const FavoriteKeywordContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const FavoriteKeyword = styled(Link)`
    font-size: 16px;
    line-height: 24px;
    color: #858585;
    margin-right: 10px;
`;

const SearchLayer = () => {
    const { data: favoriteKeywords } = useQuery(
        ['favoriteKeywords'],
        async () => await product.getFavoriteKeywords(10),
        {
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 5,
            select: ({ data }) => {
                return data;
            },
        },
    );

    const [query, setQuery] = useState('');

    const onQueryChange = ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => setQuery(value);

    const navigate = useNavigate();
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate({
            pathname: '/search',
            search: `?query=${query}`,
        });
    };

    return (
        <SearchContainer>
            <div
                style={{ width: '533px', margin: '0 auto', padding: '60px 0' }}
            >
                <form onSubmit={onSubmit}>
                    <InputWithIcon
                        placeholder='검색어를 입력해주세요.'
                        containerProps={{
                            style: {
                                borderLeft: 0,
                                borderRight: 0,
                                borderTop: 0,
                            },
                        }}
                        onChange={onQueryChange}
                    />
                </form>
                <div style={{ paddingTop: '20px' }}>
                    <FavoriteKeywordTitle>인기 검색어</FavoriteKeywordTitle>
                    <FavoriteKeywordContainer>
                        {favoriteKeywords?.length > 0 &&
                            favoriteKeywords?.map((favoriteKeyword: string) => (
                                <FavoriteKeyword
                                    key={favoriteKeyword}
                                    to={`${PATHS.SEARCH}?query=${favoriteKeyword}`}
                                >
                                    {favoriteKeyword}
                                </FavoriteKeyword>
                            ))}
                    </FavoriteKeywordContainer>
                </div>
            </div>
        </SearchContainer>
    );
};

export default SearchLayer;
