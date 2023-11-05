package exercise2;

import exercise2.Entity.EvaluationRecord;
import exercise2.Entity.EvaluationRecordEntry;
import exercise2.Entity.SalesMan;
import exercise2.Implementaion.ManageSalesmen;

public class solala {
    public static void main(String[] args) {
        ManageSalesmen control = new ManageSalesmen();
        control.login();
        SalesMan a = new SalesMan("null", "2n2ll2", 1);
        EvaluationRecord b = new EvaluationRecord(new EvaluationRecordEntry( 10, 3),
                                                  new EvaluationRecordEntry(10, 3),
                                                  new EvaluationRecordEntry(10, 3),
                                                  new EvaluationRecordEntry(10, 3),
                                                  new EvaluationRecordEntry(10, 3),
                                                  new EvaluationRecordEntry(10, 3));



        control.addPerformanceRecord(b, 1);
        System.out.println(control.readEvaluationRecords(1).toDocument());

    }

}
