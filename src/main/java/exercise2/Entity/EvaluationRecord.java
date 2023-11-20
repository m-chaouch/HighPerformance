package exercise2.Entity;

import org.bson.Document;
import java.time.Year;

public class EvaluationRecord {
    private EvaluationRecordEntry leadershipCompetence;
    private EvaluationRecordEntry opennessToEmployee;
    private EvaluationRecordEntry socialBehaviourToEmployee;
    private EvaluationRecordEntry attitudeTowardsClient;
    private EvaluationRecordEntry CommunicationSkills;
    private EvaluationRecordEntry IntegrityToCompany;

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
        year = Year.now().getValue();

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
        .append("IntegirtyToConpany", IntegrityToCompany.toDocument())
        .append("year", year);
    }


}






