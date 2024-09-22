import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'approval'
})
export class ApprovalPipe implements PipeTransform {

    transform(approvalByCEO: boolean, approvalByHR: boolean ): string {
        if (approvalByCEO && approvalByHR){
            return '✅ approved';
        }
        if (approvalByCEO) {
            return '❗ HR approval needed';
        }
        if (approvalByHR) {
            return '❗ CEO approval needed';
        }
        else {
            return '❌ not approved';
        }
    }

}
