import { ProductDatapoint } from './product-datapoint';

export interface PositionDatapoint {
    positionID: number;
    positionNumber: number;
    productID: string;
    product: ProductDatapoint;
    productDescription: string;
    quantity: number;
    pricePerUnit: number;
    baseAmount: number;
    taxAmount: number;
    amount: number;
}
