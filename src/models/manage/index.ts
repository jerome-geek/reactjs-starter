import { ORDER_DIRECTION, SEARCH_TYPE } from 'models';

export interface AddressParams {
    pageNumber?: number;
    pageSize?: number;
    keyword: string;
}

export interface ArticleParams {
    pageNumber?: number;
    pageSize?: number;
    hasTotalCount?: boolean;
    keyword?: string;
    searchType?: SEARCH_TYPE;
    categoryNo?: number;
    startYmd?: string; // default 3개월
    endYmd?: string; // default 오늘
    withReplied?: boolean;
    direction?: ORDER_DIRECTION;
    isMine?: boolean;
}

export interface ImagesType {
    originalFileName: string;
    uploadedFileName: string;
}

export interface PostArticleParams {
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

// export enum SEARCH_TYPE {
//     ALL = 'ALL',
//     TITLE = 'TITLE',
//     CONTENT = 'CONTENT',
//     WRITER = 'WRITER',
// }

// export enum DIRECTION {
//     DESC = 'DESC',
//     ASC = 'ASC',
// }
