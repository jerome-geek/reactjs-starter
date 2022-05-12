import { AxiosResponse } from 'axios';

import request from 'api/core';
import { defaultHeaders } from 'api/core';

export enum SEARCH_TYPE {
    ALL = 'ALL',
    TITLE = 'TITLE',
    CONTENT = 'CONTENT',
    WRITER = 'WRITER',
}

export enum DIRECTION {
    DESC = 'DESC',
    ASC = 'ASC',
}

interface ArticleParams {
    pageNumber?: number;
    pageSize?: number;
    hasTotalCount?: boolean;
    keyword?: string;
    searchType?: SEARCH_TYPE;
    categoryNo?: number;
    startYmd?: string; // default 3개월
    endYmd?: string; // default 오늘
    withReplied?: boolean;
    direction?: DIRECTION;
    isMine?: boolean;
}

interface ImagesType {
    originalFileName: string;
    uploadedFileName: string;
}

interface PostArticleParams {
    images: ImagesType[];
    password: string;
    articleTitle: string;
    imageUrls: string[];
    parentBoardArticleNo: number;
    articleContent: string;
    boardCategoryNo: number;
    secreted: boolean;
    tags?: string[];
    guestName: string;
}

const board = {
    getConfigs: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/boards/configurations',
        }),

    // TODO boardNo 모름, 404 error 발생 추후 테스트 필요
    getArticlesByBoardId: (
        boardNo: string,
        {
            pageNumber,
            pageSize,
            hasTotalCount = false,
            keyword,
            searchType,
            categoryNo,
            startYmd,
            endYmd,
            withReplied = false,
            direction,
            isMine = false,
        }: ArticleParams,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/boards/${boardNo}/articles`,
            params: {
                pageNumber,
                pageSize,
                hasTotalCount,
                keyword,
                searchType,
                categoryNo,
                startYmd,
                endYmd,
                withReplied,
                direction,
                isMine,
            },
        }),

    // TODO 404 error (message: 존재하지 않는 게시판입니다.) boardNo를 모름
    postArticle: (
        boardNo: string,
        {
            images,
            password,
            articleTitle,
            imageUrls,
            parentBoardArticleNo,
            articleContent,
            boardCategoryNo,
            secreted,
            tags,
            guestName,
        }: PostArticleParams,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/boards/${boardNo}/articles`,
            data: {
                images,
                password,
                articleTitle,
                imageUrls,
                parentBoardArticleNo,
                articleContent,
                boardCategoryNo,
                secreted,
                tags,
                guestName,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
    // TODO 이후 함수들은 boardNo가 없어 전부 400번대 에러가 발생합니다. 테스트 필요함
    getCategories: (boardNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/boards/${boardNo}/categories`,
        }),

    getArticleDetail: (
        boardNo: string,
        articleNo: string,
        { password }: { password?: string },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `board/${boardNo}/articles/${articleNo}`,
            params: { password },
        }),

    updateArticle: (
        boardNo: string,
        articleNo: string,
        {
            images,
            password,
            articleTitle,
            imageUrls,
            articleContent,
            boardCategoryNo,
            secreted,
            tags,
            guestName,
        }: Omit<PostArticleParams, 'parentBoardArticleNo'>,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `board/${boardNo}/articles/${articleNo}`,
            data: {
                images,
                password,
                articleTitle,
                imageUrls,
                articleContent,
                boardCategoryNo,
                secreted,
                tags,
                guestName,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    deleteArticle: (
        boardNo: string,
        articleNo: string,
        { password }: { password?: string },
    ): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: `board/${boardNo}/articles/${articleNo}`,
            data: { password },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    checkEditableArticle: (
        boardNo: string,
        articleNo: string,
        { password }: { password?: string },
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `board/${boardNo}/articles/${articleNo}/editable`,
            data: { password },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    recommendArticle: (
        boardNo: string,
        articleNo: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `board/${boardNo}/articles/${articleNo}/recommend`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    cancelArticleRecommend: (
        boardNo: string,
        articleNo: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: `board/${boardNo}/articles/${articleNo}/recommend`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default board;
