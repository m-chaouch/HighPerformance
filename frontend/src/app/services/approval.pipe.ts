import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'approval'
})
export class ApprovalPipe implements PipeTransform {

    transform(approvalByCEO: boolean, approvalByHR: boolean , isAcceptedBySalesman: number): string {
        /**
         * Falsy-Werte sind z.B. `null`, `undefined`, `0`, `''` (leerer String) oder `false`.
         * Wenn eine Bedingung nur mit `if (approvalByCEO)` geprüft wird, könnten diese falsy-Werte ebenfalls
         * als `false` interpretiert werden, obwohl der Wert in der Datenbank möglicherweise als `true` gespeichert ist.
         *
         * Durch die explizite Prüfung `=== true` bzw. `!== true` wird sichergestellt, dass der Wert tatsächlich
         * nur dann als `true` bewertet wird, wenn er wirklich `true` ist, und nicht durch einen falsy-Wert verfälscht wird.
         */
        if (approvalByCEO === true && approvalByHR === true && isAcceptedBySalesman === 1) {
            return '✅ approved';
        }
        if (approvalByCEO !== true) {
            return '❗ CEO approval needed';
        }
        if (approvalByHR !== true) {
            return '❗ HR approval needed';
        }
        if (isAcceptedBySalesman === 0 || !isAcceptedBySalesman) {
            return '❗ Salesman approval needed';
        }
        return '❌ not approved';
    }

}
