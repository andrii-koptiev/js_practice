export interface Order {
    clientId: number;
    amount: number;
    fruits: string[];
}

export interface OrdersFilters {
    clientId?: Order['clientId'];
    minAmount?: number;
    fruits?: Order['fruits'];
    merge?: boolean;
}