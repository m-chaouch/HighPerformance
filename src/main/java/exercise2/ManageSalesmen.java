package exercise2;


import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import com.mongodb.client.*;
import org.bson.Document;

import static com.mongodb.client.model.Filters.eq;

public class ManageSalesmen implements ManagePersonal {
    private String password;
    private MongoDatabase database;
    private MongoCollection<Document> general_salesmen_data;
    private MongoCollection<Document> performance_records;
    private MongoClient mongoClient;


    public void login(){
        Scanner scanner = new Scanner(System.in);
        password = scanner.next().toString();//q7Jibjcj4t2ORk7D
        String uri = "mongodb+srv://m-chaouch:" + password + "@cluster0.v8whdmg.mongodb.net/?retryWrites=true&w=majority";

        //try catch evtl. hinzufügen?
        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("Performance_Computation");
        general_salesmen_data = database.getCollection("general_salesmen_data");
        performance_records = database.getCollection("performance_records");
    }
    @Override
    public void createSalesMan(SalesMan record) {
        general_salesmen_data.insertOne(record.toDocument());
    }

//    @Override
//    public void addPerformanceRecord(EvaluationRecord record, int sid) {
//
//    }

    @Override
    public SalesMan readSalesMan(int sid) {
        Document doc = general_salesmen_data.find(eq("id",sid)).first();
        return querySalesMan("id",""+sid).get(0);
        /*
        eq ist die Abfragebedingung. Sie sucht nach Dokumenten, bei denen das Feld "id" den Wert sid hat.
        Die eq-Methode steht für "equals" und wird verwendet, um nach genauen Übereinstimmungen zu suchen.
        first() muss genutzt werden, sonst kriegen wir ein Iterable. Von diesem FindIterable nehmen wir
        mit first() das erste Element aus dem FindIterable.
         */
        /*
        Wichtig: wir können hier nicht die Methode querySalesMan nutzen,
        weil querySalesMan zwei Strings (String attribute, String key) als Parameter erwartet
        und man hier nach der id als int suchen muss, nicht als String.
        Als String wird die id niemals gefunden.
         */
    }

    @Override
    public List<SalesMan> querySalesMan(String attribute, String key) {
        FindIterable<Document> results = general_salesmen_data.find(eq(""+attribute,key));
        List<SalesMan> salesmanlist = new ArrayList<>();
        for(Document doc: results){ //das FindIterable "results" durchlaufen.
            SalesMan salesman = new SalesMan(doc.getString("firstname"), doc.getString("lastname"), doc.getInteger("id"));
            salesmanlist.add(salesman); //dabei Salesman in die salesmanlist hinzufügen.
        }
        return salesmanlist;
    }

//    @Override
//    public EvaluationRecord readEvaluationRecords(int sid) {
//        return null;
//    }
}
