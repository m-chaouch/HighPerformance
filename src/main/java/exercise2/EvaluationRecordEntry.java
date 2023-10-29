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

    public String getGoalDescription() {
        return goalDescription;
    }
}
