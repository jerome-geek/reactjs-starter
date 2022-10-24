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
