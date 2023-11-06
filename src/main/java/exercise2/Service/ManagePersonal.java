package exercise2.Service;
import exercise2.Entity.EvaluationRecord;
import exercise2.Entity.EvaluationRecordEntry;
import exercise2.Entity.SalesMan;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * the interface that is our bussines lo
 */

public interface ManagePersonal {

     public void createSalesMan(SalesMan record );



     public SalesMan readSalesMan(int sid );

     public List<SalesMan> querySalesMan(String attribute , String key );


     /**
      * 
      * @param <T>
      * @param s is the id of the salsemen 
      * @param attribute  is the attribute i want to update
      * @param e is the value i want to update it with
      *  it is generic to so it can update any kind of data corresponding to the kind of attribute which was parsed
      */
     public <T> void updateSalesMan(String attribute, String key, T e );
     public <T> void deleteSalesMan(String attribute, T key);






     public void addPerformanceRecord(EvaluationRecord record , int sid ) throws Exception;

     public EvaluationRecord readEvaluationRecords(int sid );

     public void updateEvaluationRecord (int sid, int year, String attribute, EvaluationRecordEntry e);
     public void deleteEvaluationRecord (int sid, int year);





}
