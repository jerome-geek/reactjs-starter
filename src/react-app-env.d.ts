/// <reference types="react-scripts" />

type Nullable<T> = T | null;

interface Paging {
    pageNumber: Number;
    pageSize: Number;
    hasTotalCount: Boolean;
}

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

interface Sort {
    orderBy: ORDER_BY;
    orderDirection: ORDER_DIRECTION;
}
