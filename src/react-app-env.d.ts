/// <reference types="react-scripts" />

type Nullable<T> = T | null;
interface Sort {
    orderBy: ORDER_BY;
    orderDirection: ORDER_DIRECTION;
}

interface Paging {
    pageNumber: Number;
    pageSize: Number;
    hasTotalCount: Boolean;
}

interface SearchDate {
    startYmd: string;
    endYmd: string;
}
