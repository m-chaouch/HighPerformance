export interface OrderDatapoint {
    SalesOrderID: string;
    contractNumber: string;
    name: string;
    customerID: string;
    clientName: string;
    totalAmount: number;
    totalAmountIncludingTax: number;
    priority: number;
    state: number;
    sellerID: string;
    sellerName: string;
}
