import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'approval'
})
export class ApprovalPipe implements PipeTransform {

    transform(approvalByCEO: boolean, approvalByHR: boolean ): unknown {
        if (approvalByCEO && approvalByHR){
            return 'accepted';
        }
        if (approvalByCEO) {
            return 'HR approval needed';
        }
        else {
            return 'not approved';
        }
    }

}
