package exercise2;
public class EvaluationRecord {
    private EvaluationRecordEntry[] goals;
    private int salseManId;

    public EvaluationRecord(EvaluationRecordEntry[] goals, int salseManId){
        this.goals = goals;
        this.salseManId = salseManId;
    }
    //copies the goals so that integrity of the data is guranteed 
    private static  EvaluationRecord[] copy(EvaluationRecord[] e ){
         EvaluationRecord[] tmp = new EvaluationRecord[e.length];
         int i = 0;
         for(EvaluationRecord data: e){
            tmp[i++] = data;
         }
         return tmp;
        
    } 
    
}
