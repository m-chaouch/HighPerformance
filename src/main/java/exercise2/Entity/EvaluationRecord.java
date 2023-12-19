package exercise2.Entity;

//import com.fasterxml.jackson.core.JsonGenerator;
//import com.fasterxml.jackson.databind.JsonSerializer;
//import com.fasterxml.jackson.databind.SerializerProvider;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;

import lombok.Setter;
import org.bson.Document;


import java.time.Year;
@Getter
@Setter
@JsonSerialize
public class EvaluationRecord {//extends JsonSerializer<EvaluationRecord> {

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
    public EvaluationRecord(EvaluationRecordEntry leadershipCompetence, EvaluationRecordEntry opennessToEmployee,
                            EvaluationRecordEntry socialBehaviourToEmployee, EvaluationRecordEntry attitudeTowardsClient,
                            EvaluationRecordEntry CommunicationSkills, EvaluationRecordEntry IntegrityToCompany, int year)
    {
        this.leadershipCompetence = leadershipCompetence;
        this.opennessToEmployee = opennessToEmployee;
        this.socialBehaviourToEmployee = socialBehaviourToEmployee;
        this.attitudeTowardsClient = attitudeTowardsClient;
        this.CommunicationSkills = CommunicationSkills;
        this.IntegrityToCompany = IntegrityToCompany;
        this.year = year;

    }

    public int getYear(){
        return year;
    }

    public Document toDocument() {
        return new Document()
                .append("year", year)
                .append("leadershipCompetence", leadershipCompetence.toDocument())
                .append("opennessToEmployee", opennessToEmployee.toDocument())
                .append("socialBehaviourToEmployee", socialBehaviourToEmployee.toDocument())
                .append("attitudeTowardsClient", attitudeTowardsClient.toDocument())
                .append("CommunicationSkills", CommunicationSkills.toDocument())
                .append("IntegrityToCompany", IntegrityToCompany.toDocument());
    }



   // public void serialize(EvaluationRecord evaluationRecord, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
   //    jsonGenerator.writeStartObject();
   //     jsonGenerator.writeObjectField("leadershipCompetence", evaluationRecord.getLeadershipCompetence());
   //     jsonGenerator.writeObjectField("opennessToEmployee", evaluationRecord.getOpennessToEmployee());
   //     jsonGenerator.writeObjectField("socialBehaviourToEmployee", evaluationRecord.getSocialBehaviourToEmployee());
   //     jsonGenerator.writeObjectField("attitudeTowardsClient", evaluationRecord.getAttitudeTowardsClient());
   //     jsonGenerator.writeObjectField("CommunicationSkills", evaluationRecord.getCommunicationSkills());
   //    jsonGenerator.writeObjectField("IntegrityToCompany", evaluationRecord.getIntegrityToCompany());
   //     jsonGenerator.writeNumberField("year", evaluationRecord.getYear());
   //    jsonGenerator.writeEndObject();
   // }
}






