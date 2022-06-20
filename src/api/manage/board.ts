import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import {
    ArticleParams,
    BoardCategory,
    BoardList,
    PostArticleParams,
} from 'models/manage';

const board = {
    getConfigs: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/boards/configurations',
        }),

    getArticlesByBoardNo: (
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
    ): Promise<AxiosResponse<BoardList>> =>
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
    writeArticle: (
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

    getCategories: (boardNo: string): Promise<AxiosResponse<BoardCategory[]>> =>
        request({
            method: 'GET',
            url: `/boards/${boardNo}/categories`,
        }),

    getArticleDetail: (
        boardNo: string,
        articleNo: string,
        query?: {
            password?: string;
            withReplied?: boolean;
        },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `boards/${boardNo}/articles/${articleNo}`,
            params: {
                password: query?.password,
                withReplied: query?.withReplied,
            },
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
