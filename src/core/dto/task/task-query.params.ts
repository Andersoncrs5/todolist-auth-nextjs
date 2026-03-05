export interface TaskQueryParams {
    pageNumber?: number;
    pageSize?: number;
    title?: string;
    done?: boolean;
    priority?: 0 | 1 | 2 | 3;
    createAtBefore?: string;
    createAtAfter?: string;
}