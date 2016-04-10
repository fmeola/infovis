package web;

import model.Model;
import model.Sql2oModel;
import org.sql2o.Sql2o;

import static model.Sql2oModel.dataToJson;
import static spark.Spark.*;

public class App {

    public static void main(String[] args) {
        Sql2o sql2o = new Sql2o("jdbc:postgresql://" + "localhost" + ":" + "5432" + "/" + "infovis",
                "franco", "franco");

        Model model = new Sql2oModel(sql2o);

        get("/hello", (req, res) -> "Hello World");

        get("/states", (request, response) -> {
            response.status(200);
            response.type("application/json");
            return dataToJson(model.getAllStates());
        });

        get("/gender", (request, response) -> {
            response.status(200);
            response.type("application/json");
            return dataToJson(model.totalsByGender());
        });
    }

}