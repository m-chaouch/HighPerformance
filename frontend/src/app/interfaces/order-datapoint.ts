export interface OrderDatapoint {
    SalesOrderID: string;
    contractID: string;
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
