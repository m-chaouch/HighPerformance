import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'criteria'
})
export class CriteriaPipe implements PipeTransform {

    transform(value: string): unknown {
        switch (value){
        case('leadershipCompetence'):
            return 'Leadership Competence';
        case('opennessToEmployee'):
            return 'Openness to Employee';
        case('socialBehaviourToEmployee'):
            return 'Social Behaviour to Employee';
        case('attitudeTowardsClients'):
            return 'Attitude towards Client';
        case('communicationSkills'):
            return 'Communication Skills';
        case('integrityToCompany'):
            return 'Integrity to Company';
        }
    }
}
