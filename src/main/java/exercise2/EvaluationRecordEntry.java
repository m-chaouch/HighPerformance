package exercise2;

public class EvaluationRecordEntry {
    private String goalDescription;
    private int targetValue, actualValue, year;

    public EvaluationRecordEntry( String goalDescription,  int targetValue,
                                  int actualValue, int year)
    {
        this.goalDescription = goalDescription;
        this.targetValue = targetValue;
        this.year = year;
        
    }
    //copies the object,so that integrity will not be lost
    public static EvaluationRecordEntry copy(EvaluationRecordEntry e){
        return new EvaluationRecordEntry(e.goalDescription, e.targetValue , e.actualValue, e.year);
    }


     
    
}
