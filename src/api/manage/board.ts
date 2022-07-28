import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

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
        params: ArticleParams = {
            pageNumber: 1,
            pageSize: 10,
            hasTotalCount: true,
            startYmd: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
            endYmd: dayjs().format('YYYY-MM-DD'),
            withReplied: false,
            isMine: false,
        },
    ): Promise<AxiosResponse<BoardList>> =>
        request({
            method: 'GET',
            url: `/boards/${boardNo}/articles`,
            params: {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                hasTotalCount: params.hasTotalCount,
                keyword: params.keyword,
                searchType: params.searchType,
                categoryNo: params.categoryNo,
                startYmd: params.startYmd,
                endYmd: params.endYmd,
                withReplied: params.withReplied,
                direction: params.direction,
                isMine: params.isMine,
            },
        }),

    // TODO 404 error (message: 존재하지 않는 게시판입니다.) boardNo를 모름
    writeArticle: (
        boardNo: string,
        data: PostArticleParams,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/boards/${boardNo}/articles`,
            data: {
                images: data.images,
                password: data.password,
                articleTitle: data.articleTitle,
                imageUrls: data.imageUrls,
                parentBoardArticleNo: data.parentBoardArticleNo,
                articleContent: data.articleContent,
                boardCategoryNo: data.boardCategoryNo,
                secreted: data.secreted,
                tags: data?.tags,
                guestName: data.guestName,
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
        data: Omit<PostArticleParams, 'parentBoardArticleNo'>,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `board/${boardNo}/articles/${articleNo}`,
            data: {
                images: data.images,
                password: data.password,
                articleTitle: data.articleTitle,
                imageUrls: data.imageUrls,
                articleContent: data.articleContent,
                boardCategoryNo: data.boardCategoryNo,
                secreted: data.secreted,
                tags: data?.tags,
                guestName: data.guestName,
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
