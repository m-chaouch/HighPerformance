package exercise2;

import org.bson.Document;

public class EvaluationRecordEntry {
    private String goalDescription;
    private int targetValue, actualValue;

    public EvaluationRecordEntry( String goalDescription,  int targetValue,
                                  int actualValue)
    {
        this.goalDescription = goalDescription;
        this.targetValue = targetValue;
        this.actualValue = actualValue;


    }

    public Document toDocument(){
        return null;
    }





}
