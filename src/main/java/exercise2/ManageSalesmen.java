package exercise2;


import java.security.DomainCombiner;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Scanner;

import com.mongodb.ConnectionString;
import com.mongodb.client.*;
import org.bson.Document;
import org.bson.conversions.Bson;
import com.mongodb.client.model.Filters;

import static com.mongodb.client.model.Filters.eq;

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
    public  <T> void updateSalseMan(String attribute, String key, T e) {
        Document olddoc = general_salesmen_data.find(eq(attribute+"",key)).first();
        Document newdoc = new Document();
        newdoc.append(attribute+"",e);
        Document update = new Document();
        update.append("$set",newdoc);
        general_salesmen_data.updateOne(olddoc,update);
    }
    @Override
    public void deleteSalseMan(String attribute, String key) {
        Bson filter = Filters.eq(attribute, key); // create a filter to for the mongodb
        general_salesmen_data.deleteMany(filter);
    }
    @Override
    public void addPerformanceRecord(EvaluationRecord record, int sid) {
        //performance_records
        Document d = record.tDocument();
        d.append("sid", sid);
        performance_records.insertOne(d);


    }

    /**
     * returns the Evaluation record of the latest year
     */
    @Override
    public EvaluationRecord readEvaluationRecords(int sid) {
        FindIterable<Document> d =  performance_records.find(eq("sid", sid)); // contians all the evaluaitons records of the employee

        // Document evaluationrecord = getHighestYear(d);
        return new EvaluationRecord(getHighestYear(d), sid);

    }
    /**
     *
     * @param d
     * @return the goals of the latest Evaluation record of the all Evalution documetn
     */
    private EvaluationRecordEntry[] getHighestYear(Iterable<Document> d){

        Document highestYear ; // keeps the Evaluation record  wiht the highst year in during while loop
        Document tmp;// allows to iterate though the all Evaluations records like with a list


        Iterator<Document> i = d.iterator();
        if(!i.hasNext()) // if the employee has no Evaluaion records at all
            return null;

        highestYear = i.next();

        while(i.hasNext()){
            tmp = i.next();
            if(highestYear.getInteger("year") < tmp.getInteger("year")){
                highestYear = tmp;
            }
        }
        List<Document> list = highestYear.get("goals", List.class); // it has to be an list, becuase its not possible wihe an array
        return list.toArray(new EvaluationRecordEntry[list.size()]); //convert the evaluation list with hights year as an array
    }


}
