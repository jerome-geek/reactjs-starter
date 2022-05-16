/// <reference types="react-scripts" />

type Nullable<T> = T | null;

enum ORDER_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC',
}

enum ORDER_BY {
    RECOMMEND = 'RECOMMEND',
    REGISTER_YMDT = 'REGISTER_YMDT',
    RATING = 'RATING',
    BEST_REVIEW = 'BEST_REVIEW',
}

interface Paging {
    pageNumber: Number;
    pageSize: Number;
    hasTotalCount: Boolean;
}

interface Sort {
    orderBy: ORDER_BY;
    orderDirection: ORDER_DIRECTION;
}
