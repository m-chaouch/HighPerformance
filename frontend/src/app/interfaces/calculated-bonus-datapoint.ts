import {SocialBonusDatapoint} from './social-bonus-datapoint';
import {TotalBonusDatapoint} from './total-bonus-datapoint';
import {SalesBonusDatapoint} from './sales-bonus-datapoint';



export interface CalculatedBonusDatapoint {
    socialBonus: SocialBonusDatapoint;
    salesBonus: SalesBonusDatapoint;
    totalBonus: TotalBonusDatapoint;
}
