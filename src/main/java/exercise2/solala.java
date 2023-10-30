package exercise2;

import org.bson.BsonReader;
import org.bson.BsonType;
import org.bson.BsonWriter;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;
import org.bson.codecs.configuration.CodecRegistry;

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
