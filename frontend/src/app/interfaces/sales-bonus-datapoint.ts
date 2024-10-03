

/**
 * This interface represents the overall sales bonus structure.
 * It includes product sales bonuses and a total bonus amount.
 */
export interface SalesBonusDatapoint {
    salesBonus: {
        [product: string]: Record<string, number>; // Product names map to company names with bonus values
    };
    total: number; // Total sales bonus
}
