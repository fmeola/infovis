package model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.sql2o.Connection;
import org.sql2o.Sql2o;

import java.io.IOException;
import java.io.StringWriter;
import java.util.List;

/**
 * https://sparktutorials.github.io/2015/04/29/spark-and-sql2o.html
 */
public class Sql2oModel implements Model {

    private Sql2o sql2o;

    public Sql2oModel(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    public static String dataToJson(Object data) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            StringWriter sw = new StringWriter();
            mapper.writeValue(sw, data);
            return sw.toString();
        } catch (IOException e){
            throw new RuntimeException("IOException from a StringWriter?");
        }
    }

    @Override
    public List<Prov> getAllStates() {
        try (Connection conn = sql2o.open()) {
            List<Prov> posts = conn.createQuery("select * from \"PROV\"")
                    .throwOnMappingFailure(false)
                    .executeAndFetch(Prov.class);
            return posts;
        }
    }

    @Override
    public Gender totalsByGender() {
        try (Connection conn = sql2o.open()) {
            List<Integer> results = conn.createQuery("select COUNT(*) \n" +
                    "from \"PERSONA\"\n" +
                    "GROUP BY \"P02\"")
                    .executeAndFetch(Integer.class);
            return new Gender(results.get(1), results.get(0));
        }
    }

}
