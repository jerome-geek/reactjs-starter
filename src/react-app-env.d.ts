/// <reference types="react-scripts" />

type Nullable<T> = T | null;

interface Sort {
    orderBy: ORDER_BY;
    orderDirection: ORDER_DIRECTION;
}

interface Paging {
    pageNumber: number;
    pageSize: number;
    hasTotalCount: boolean;
}

interface SearchDate {
    startYmd: string;
    endYmd: string;
}

interface ItemList<T> {
    totalCount: number;
    items: T[];
}

interface ShopByErrorResponse {
    code: string;
    detail: {
        time: string;
        extra: Nullable<string>;
    };
    error: string;
    message: string;
    path: string;
    status: number;
}

interface MemberIntegrationResponse {
    code: string;
    message: string;
}
