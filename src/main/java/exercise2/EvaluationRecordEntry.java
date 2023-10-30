package exercise2;

import org.bson.Document;

public final class EvaluationRecordEntry {

    private  int targetValue, actualValue;

    public EvaluationRecordEntry(  int targetValue, int actualValue) {

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



}
