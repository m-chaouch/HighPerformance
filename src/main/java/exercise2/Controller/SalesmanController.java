package exercise2.Controller;

import exercise2.Entity.SalesMan;
import exercise2.Implementaion.ManageSalesmen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/manageSalesman")
public class SalesmanController {
    @Autowired // connects the already exsisting ManageSalesman-Object
    private ManageSalesmen manageSalesmen;
    @GetMapping("/{sid}")
    public SalesMan getSalesMan(@PathVariable(required = true) Integer sid){
        return manageSalesmen.readSalesMan(sid);
    }

    @PostMapping
    public void createSalesman(@RequestBody(required = true) SalesMan s){
        manageSalesmen.createSalesMan(s);
    }

    /**
     *
     * @param s
     * @param attribute
     * @param key
     * @param e
     * @param <T>
     *
     *
     *     it upsates all salesman that have the coressponding key, if the
     *
     *     i do not now if generics woll work , because the body will be in json formant but T will be
     *     object in runtime
     *
     *     this method doesnot prevent to call with a person( will be used for the update) with a different value for id then "sid"
     *     therefor it reuns null if so
     */
    @PutMapping("/{sid}")
    public  void updateSalesman(@RequestBody(required = true) SalesMan s, @RequestBody(required = true) Integer sid) throws Exception {
        if(!s.getId().equals(sid)) //consistenscy check
            throw new Exception("sid  is not the same as the id of the person");


        SalesMan tmp = manageSalesmen.readSalesMan(sid);
        tmp.setFirstname(s.getFirstname());
        tmp.setLastname(s.getLastname());
        tmp.setId(s.getId());
        manageSalesmen.deleteSalesMan("id", sid +"");
        manageSalesmen.createSalesMan(tmp);
    }







}
