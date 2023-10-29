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
        EvaluationRecord b;
        EvaluationRecordEntry[] c = {new EvaluationRecordEntry("reding", 10, 3),
                new EvaluationRecordEntry("communication", 22, 3)};

        b = new EvaluationRecord(c, 2023);
        control.addPerformanceRecord(b, 1);

    }

}
