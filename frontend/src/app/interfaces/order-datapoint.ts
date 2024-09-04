export interface OrderDatapoint {
    SalesOrderID: string;
    contractID: string;
    name: string;
    clientID: string;
    clientName: string;
    totalAmount: number;
    totalAmountIncludingTax: number;
    activeOn: string;
    expiresOn: string;
    contractCurrency: number;
    pricingRule: string;
    pricingState: string;
    calcRule: string;
    priority: number;
    state: string;
    sellerID: string;
    sellerName: string;
}
