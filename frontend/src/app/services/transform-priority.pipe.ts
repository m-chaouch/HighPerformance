import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'transformPriority',
    standalone: true
})
export class TransformPriorityPipe implements PipeTransform {

    transform(value: number): string {
        switch (value) {
        case 0:
            return 'None';
        case 1:
            return 'Low';
        case 2:
            return 'Normal';
        case 3:
            return 'High';
        case 4:
            return 'Urgent';
        case 5:
            return 'Immediate';
        default:
            return 'Unknown';
        }
    }
}
