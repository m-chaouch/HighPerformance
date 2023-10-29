package exercise2;

import org.bson.Document;

public class EvaluationRecord {
    private EvaluationRecordEntry[] goals;
    private int year;

    public EvaluationRecord(EvaluationRecordEntry[] goals, int year){
        this.goals = goals;
        this.year = year;
    }

    public Document tDocument(){
        Document d = new Document();

        d.append("year", year);
        //d.append("goals", goals);
        for(EvaluationRecordEntry e: goals){
            d.append(e.getGoalDescription(), e.toDocument() );
        }
        return d;
    }


}






