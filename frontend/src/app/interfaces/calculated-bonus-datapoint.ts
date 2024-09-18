import {SocialBonusDatapoint} from './social-bonus-datapoint';
import {TotalBonusDatapoint} from './total-bonus-datapoint';



export interface CalculatedBonusDatapoint {
    socialBonus: SocialBonusDatapoint;
    salesBonus: object;
    totalBonus: TotalBonusDatapoint;
}
