import { Axios, AxiosResponse } from 'axios';

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
    pageNumber?: Number;
    pageSize?: Number;
    hasTotalCount?: Boolean;
    keyword?: String;
    searchType?: SEARCH_TYPE;
    categoryNo?: Number;
    startYmd?: String; // default 3개월
    endYmd?: String; // default 오늘
    withReplied?: Boolean;
    direction?: DIRECTION;
    isMine?: Boolean;
}

interface ImagesType {
    originalFileName: String;
    uploadedFileName: String;
}

interface PostArticleParams {
    images: ImagesType[];
    password: String;
    articleTitle: String;
    imageUrls: String[];
    parentBoardArticleNo: Number;
    articleContent: String;
    boardCategoryNo: Number;
    secreted: Boolean;
    tags: Nullable<String[]>;
    guestName: String;
}

const board = {
    getConfigs: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/boards/configurations',
        }),

    // TODO boardNo 모름, 404 error 발생 추후 테스트 필요
    getArticlesByBoardId: (
        boardNo: String,
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
        boardNo: String,
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
                accessToken: localStorage.accessToken,
            }),
        }),
    // TODO 이후 함수들은 boardNo가 없어 전부 400번대 에러가 발생합니다. 테스트 필요함
    getCategories: (boardNo: String): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/boards/${boardNo}/categories`,
        }),

    getArticleDetail: (
        boardNo: String,
        articleNo: String,
        { password }: { password?: Nullable<String> },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `board/${boardNo}/articles/${articleNo}`,
            params: { password },
        }),

    updateArticle: (
        boardNo: String,
        articleNo: String,
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
                accessToken: localStorage.accessToken,
            }),
        }),

    deleteArticle: (
        boardNo: String,
        articleNo: String,
        { password }: { password?: Nullable<String> },
    ): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: `board/${boardNo}/articles/${articleNo}`,
            data: { password },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.accessToken,
            }),
        }),

    checkEditableArticle: (
        boardNo: String,
        articleNo: String,
        { password }: { password?: Nullable<String> },
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `board/${boardNo}/articles/${articleNo}/editable`,
            data: { password },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.accessToken,
            }),
        }),

    recommendArticle: (
        boardNo: String,
        articleNo: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `board/${boardNo}/articles/${articleNo}/recommend`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.accessToken,
            }),
        }),

    cancelArticleRecommend: (
        boardNo: String,
        articleNo: String,
    ): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: `board/${boardNo}/articles/${articleNo}/recommend`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.accessToken,
            }),
        }),
};

export default board;
