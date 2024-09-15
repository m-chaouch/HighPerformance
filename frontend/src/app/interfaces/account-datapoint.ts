import { VcardDatapoint } from './vcard-datapoint';

export interface AccountDatapoint {
    UID: string;
    fullname: string;
    name: string;
    industry: number;
    numberOfEmployeesCategory: number;
    vcard: VcardDatapoint;
}
