package exercise2.Entity;

import org.bson.Document;

public class EvaluationRecord {
    EvaluationRecordEntry leadershipCompetence;
    EvaluationRecordEntry opennessToEmployee;
    EvaluationRecordEntry socialBehaviourToEmployee;
    EvaluationRecordEntry attitudeTowardsClient;
    EvaluationRecordEntry CommunicationSkills;
    EvaluationRecordEntry IntegrityToCompany;


    private int year;

    public EvaluationRecord(EvaluationRecordEntry leadershipCompetence, EvaluationRecordEntry opennessToEmployee,
                                 EvaluationRecordEntry socialBehaviourToEmployee, EvaluationRecordEntry attitudeTowardsClient,
                                 EvaluationRecordEntry CommunicationSkills, EvaluationRecordEntry IntegrityToCompany)
    {
        this.leadershipCompetence = leadershipCompetence;
        this.opennessToEmployee = opennessToEmployee;
        this.socialBehaviourToEmployee = socialBehaviourToEmployee;
        this.attitudeTowardsClient = attitudeTowardsClient;
        this.CommunicationSkills = CommunicationSkills;
        this.IntegrityToCompany = IntegrityToCompany;

    }

    public int getYear(){
        return year;
    }

    public Document toDocument(){
        return new Document().append("year", year)
        .append("leadershipCompetence", leadershipCompetence.toDocument())
        .append("opennessToEmployee", opennessToEmployee.toDocument())
        .append("socialBehaviourToEmployee", socialBehaviourToEmployee.toDocument())
        .append("attitudeTowardsClient", attitudeTowardsClient.toDocument())
        .append("CommunicationSkills", CommunicationSkills.toDocument())
        .append("IntegirtyToConpany", IntegrityToCompany.toDocument());
    }


}






