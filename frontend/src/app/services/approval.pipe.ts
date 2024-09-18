import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'approval'
})
export class ApprovalPipe implements PipeTransform {

    transform(approvalByHR: boolean, approvalByCEO: boolean ): string {
        if (approvalByCEO && approvalByHR){
            return '✅ approved';
        }
        if (approvalByCEO) {
            return '❗ HR approval needed';
        }
        else {
            return '❌ not approved';
        }
    }

}
