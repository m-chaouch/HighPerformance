package exercise2.Controller;

import exercise2.Entity.EvaluationRecord;
import exercise2.Entity.EvaluationRecordEntry;

import exercise2.Implementaion.ManageSalesmen;
import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/manage-evaluation-record")

public class EvaluationRecordController {
    @Autowired // connects the already exsisting ManageSalesman-Object
    private ManageSalesmen manageSalesman;

    @PostConstruct
    public void postContruct(){
        manageSalesman = new ManageSalesmen();
        manageSalesman.login();
    }

    @PostMapping
    public void createEvaluationRecord (@RequestBody(required = true) EvaluationRecord evaluationRecord,@RequestBody(required = true) int sid){
        manageSalesman.addPerformanceRecord(evaluationRecord, sid);
    }
    @GetMapping(value = "/get-record")
    public EvaluationRecord readEvaluationRecord(  @RequestParam(name = "sid") int sid,
                                                   @RequestParam(name = "year") int year){
        return manageSalesman.readEvaluationRecords(sid, year);
    }
    @PutMapping("/{sid}")
    public void updateEvaluationRecord(@PathVariable   int sid,
                                       @RequestParam  int year,
                                       @RequestBody(required = false) String attribute,
                                       @RequestBody(required = false) EvaluationRecordEntry e)
    {
        manageSalesman.updateEvaluationRecord(sid, year,attribute, e);
    }


    @GetMapping(value = "/get-all-record", produces = "application/json")
    public @ResponseBody List<EvaluationRecord> getAll() {
        return  manageSalesman.getAllPeformanceRecords();
    }

    @DeleteMapping("/{sid}")
    public void deleteEvaluationRecord(@PathVariable int sid, @RequestParam int year) {
        manageSalesman.deleteEvaluationRecord(sid, year);
    }

}
