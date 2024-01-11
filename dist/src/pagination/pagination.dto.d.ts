export declare class PaginationDto {
    page?: string;
    perPage?: string;
}
export declare class OrderByWithPagination extends PaginationDto {
    orderBy?: 'desc' | 'asc';
}
