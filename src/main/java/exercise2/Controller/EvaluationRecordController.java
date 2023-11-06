package exercise2.Controller;

import exercise2.Entity.EvaluationRecord;
import exercise2.Entity.EvaluationRecordEntry;
import exercise2.Entity.SalesMan;
import exercise2.Implementaion.ManageSalesmen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/manage-evaluation-record")
public class EvaluationRecordController {
    @Autowired // connects the already exsisting ManageSalesman-Object
    private ManageSalesmen manageSalesman;



    public void createEvaluationRecord (@RequestBody(required = true) EvaluationRecord evaluationRecord){

    }
    @GetMapping
    public EvaluationRecord readEvaluationRecord(int sid, int year){
        return manageSalesman.readEvaluationRecords(sid, year);
    }
    @PutMapping("/{sid}")
    public void updateEvaluationRecord(@RequestBody(required = true) int sid,
                                       @RequestBody(required = true) int year,
                                       @RequestBody(required = true) String attribute,
                                       @RequestBody(required = true) EvaluationRecordEntry e)
    {
        manageSalesman.updateEvaluationRecord(sid, year,attribute, e);
    }


    @DeleteMapping("/id")
    public void deleteEvaluationRecord(@RequestBody(required = true) int sid, @RequestBody(required = true) int year){
        manageSalesman.deleteEvaluationRecord(sid, year);
    }

}
