import { Injectable } from '@angular/core';
import {SocialBonusDatapoint} from '../interfaces/social-bonus-datapoint';
import {SalesBonusDatapoint} from '../interfaces/sales-bonus-datapoint';
@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {
    /**
     * this function takes the social bosnus of a performance report and adjusts the data data formate to be displayed
     *
     * @return can be used easily for displaying
     *
     */
    adjustSocialBonusFormat(socialBonus: SocialBonusDatapoint): { chartSeries: number[]; label: string[] } {
        const label: string[] = [];
        const chartSeries: number[] = [];

        const copySocialBonus = Object.assign({}, socialBonus);
        // Handling social bonus entries
        delete (copySocialBonus as any).total;
        const entriesForSocialBonus = Object.entries(copySocialBonus);
        entriesForSocialBonus.forEach(([socialCriteria, bonus]) => {
            label.push(socialCriteria);
            chartSeries.push(Number(bonus));
        });

        return { chartSeries, label };
    }

    adjustSalesBonusFormat(salesBonus: SalesBonusDatapoint): { chartSeries: number[]; label: string[] } {
        const label: string[] = [];
        const chartSeries: number[] = [];

        const copySalesBonus = Object.assign({}, salesBonus);
        // Handling social bonus entries
        delete (copySalesBonus as any).total;
        // Handling sales bonus entries
        const entriesForSalesBonus = Object.entries(copySalesBonus);
        entriesForSalesBonus.forEach(([productName, sales]) => {
            const salesRecord = sales as Record<string, number>;
            // Calculate total product bonus
            const productBonus = Object.entries(salesRecord).reduce((acc, [, bonus]) => acc + bonus, 0);
            label.push(productName);
            chartSeries.push(productBonus);
        });
        return { chartSeries, label };
    }
  constructor() { }
}
