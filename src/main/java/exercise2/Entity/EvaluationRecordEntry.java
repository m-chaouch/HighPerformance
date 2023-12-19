package exercise2.Entity;

//import com.fasterxml.jackson.core.JsonGenerator;
//import com.fasterxml.jackson.databind.JsonSerializer;
//import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import org.bson.Document;


@Getter
@Setter
@JsonSerialize
public final class EvaluationRecordEntry {//extends JsonSerializer<EvaluationRecordEntry>{

    private  int targetValue, actualValue;

    public EvaluationRecordEntry(  int targetValue, int actualValue)

    {

        this.targetValue = targetValue;
        this.actualValue = actualValue;
    }

    /**
     *
     * @return the actual ans target value as document
     */
    public Document toDocument(){
        Document d = new Document();
        d.append("targetValue", targetValue);
        d.append("actualValue", actualValue);
        return d;
    }


    //@Override
   // public void serialize(EvaluationRecordEntry entry, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
   //     jsonGenerator.writeStartObject();
   //     jsonGenerator.writeNumberField("targetValue", entry.getTargetValue());
   //     jsonGenerator.writeNumberField("actualValue", entry.getActualValue());
   //     jsonGenerator.writeEndObject();
   // }
}
