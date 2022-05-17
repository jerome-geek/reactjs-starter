export interface CouponsParams {
    endYmd?: string;
    pageNumber: number;
    pageSize: number;
    startYmd?: string;
    usable: boolean | null;
}

export type TargetParams = Pick<CouponsParams, 'pageNumber' | 'pageSize'>;
