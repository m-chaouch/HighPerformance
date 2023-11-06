package exercise2.Controller;

import exercise2.Entity.SalesMan;
import exercise2.Implementaion.ManageSalesmen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/manage-evaluation-record")
public class EvaluationRecordController {
    @Autowired // connects the already exsisting ManageSalesman-Object
    private ManageSalesmen manageSalesmen;
}
