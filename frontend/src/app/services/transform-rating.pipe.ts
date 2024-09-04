import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'transformRating'
})
export class TransformRatingPipe implements PipeTransform {

    transform(value: number): string {
        switch (value) {
        case 0:
            return 'None';
        case 1:
            return 'excellent';
        case 2:
            return 'very good';
        case 3:
            return 'good';
        default:
            return 'Unknown';
        }
    }

}
