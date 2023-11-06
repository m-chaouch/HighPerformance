package exercise2.Implementaion;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
;

import com.mongodb.client.*;
import exercise2.Entity.EvaluationRecord;
import exercise2.Entity.EvaluationRecordEntry;
import exercise2.Entity.SalesMan;
import exercise2.Service.ManagePersonal;
import org.bson.Document;
import org.bson.conversions.Bson;
import com.mongodb.client.model.Filters;
import org.springframework.stereotype.Service;


import static com.mongodb.client.model.Filters.eq;
@Service
public class ManageSalesmen implements ManagePersonal {
    private MongoDatabase database;
    private MongoCollection<Document> general_salesmen_data;
    private MongoCollection<Document> performance_records;
    private MongoClient mongoClient;    //muss offen bleiben. Darf nicht in einer Methode deklariert werden.



    public void login(){
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
        MongoDatabase database = mongoClient.getDatabase("HighPerformance");
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
        return new SalesMan(doc.getString("firstname"), doc.getString("lastname"), doc.getInteger("id"));
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
    @Override
    public  <T> void updateSalesMan(String attribute, String key, T e) {
        Document olddoc = general_salesmen_data.find(eq(attribute, key)).first();
        Document newdoc = new Document();
        newdoc.append(attribute,e);
        Document update = new Document();
        update.append("$set",newdoc);
        general_salesmen_data.updateOne(olddoc,update);
    }
    @Override
    public <T> void deleteSalesMan(String attribute, T key) {
        Bson filter = Filters.eq(attribute, key); // create a filter to for the mongodb
        general_salesmen_data.deleteMany(filter);
    }

    /**
     *
     * @param record  the Evaluation record that needs to be added
     * @param sid is the is of the corrsponding employee
     *            does not prevent duplicates
     */
    @Override
    public void addPerformanceRecord(EvaluationRecord record, int sid) {
        performance_records.insertOne(record.toDocument().append("sid", sid));
    }

    /**
     * returns the Evaluation record of the latest year
     *
     * if there is a duplicate (with same year) it is not predictable
     *
     */
    @Override
    public EvaluationRecord readEvaluationRecords(int sid) {
        Document d = getHighestYear(performance_records.find(eq("sid", sid)));
        return toEvaluationRecord(d);
    /*
        toEvaluationRecord(d.get("leadershipCompetence", Document.class),
                                    d.get("opennessToEmployee", Document.class),
                                    d.get("socialBehaviourToEmployee", Document.class),
                                    d.get("attitudeTowardsClient", Document.class),
                                    d.get("CommunicationSkills", Document.class),
                                    d.get("IntegirtyToConpany", Document.class));
    */
    }


    private Document getHighestYear(Iterable<Document> d){
        Iterator<Document> iterator = d.iterator();
        Document highest;
        Document tmp;
        if(!iterator.hasNext())
            return null;
        highest = iterator.next();
        while(iterator.hasNext()){

            tmp = iterator.next();
            if(highest.getInteger("year") <= tmp.getInteger("year"))
                highest = tmp;

        }
        return highest;
    }

    /**
     *
     * @param d is the document form of an Evaluation record
     * @return an EvaluationRecord-Object from the document
     */
    private EvaluationRecord toEvaluationRecord(Document d){
        return new EvaluationRecord(toEvaluationRecordEntry(d.get("leadershipCompetence", Document.class)),
                                    toEvaluationRecordEntry(d.get("opennessToEmployee", Document.class)),
                                    toEvaluationRecordEntry(d.get("socialBehaviourToEmployee", Document.class)),
                                    toEvaluationRecordEntry(d.get("attitudeTowardsClient", Document.class)),
                                    toEvaluationRecordEntry(d.get("CommunicationSkills", Document.class)),
                                    toEvaluationRecordEntry(d.get("IntegirtyToConpany", Document.class))
                                    );
    }

    /**
     *
     * @param d
     * @return a EvaluationRecordEntry-Object form the document
     */
    private EvaluationRecordEntry toEvaluationRecordEntry(Document d){
        return new EvaluationRecordEntry( d.getInteger("targetValue"), d.getInteger("actualValue"));
    }




    @Override
    public void updateEvaluationRecord(int sid, int year, String attribute, EvaluationRecordEntry e) {

    }

    @Override
    public void deleteEvaluationRecord(int sid, int year) { // in Evaluation recors ist ein attribut "year". du musst sid und year nutzenum ein perdormance record zu identifizieren

    }


}
