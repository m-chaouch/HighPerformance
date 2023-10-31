package exercise2;
import java.util.List;

/**
 * Code lines are commented for suppressing compile errors.
 */
public interface ManagePersonal {

     public void createSalesMan(SalesMan record );

     public void addPerformanceRecord(EvaluationRecord record , int sid ) throws Exception;

     public SalesMan readSalesMan(int sid );

     public List<SalesMan> querySalesMan(String attribute , String key );

     public EvaluationRecord readEvaluationRecords(int sid );

     /**
      * 
      * @param <T>
      * @param s is the id of the salsemen 
      * @param attribute  is the attribute i want to update
      * @param e is the value i want to update it with
      */
     public <T> void updateSalesMan(String attribute, String key, T e );

     public void deleteSalesMan(String attribute, String key);


}
