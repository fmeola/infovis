import com.fasterxml.jackson.databind.ObjectMapper;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.jsoup.Jsoup;

import javax.ws.rs.core.Response;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

public class WordMap {

    private static final String URL = "http://www.infovis-wiki.net/index.php?title=Information_Visualization#Definitions";
    private static final String FILENAME = "wordMap.json";
    private static Logger logger = Logger.getAnonymousLogger();

    public static void main(String[] args) throws IOException {
        dataToJson(FILENAME, separateWords(getContentFromURL(URL)));
    }

    private static List<Word> separateWords(String content) throws IOException {
        logger.info("Mapping words");
        Map<String, Integer> wordMap = new HashMap<>();
        Scanner sc = new Scanner(content);
        while(sc.hasNext()){
            String word = sc.next().toLowerCase();
            if(!wordMap.containsKey(word)) {
                wordMap.put(word, 0);
            }
            wordMap.put(word, wordMap.get(word) + 1);
        }
        for(Iterator<Map.Entry<String, Integer>> it = wordMap.entrySet().iterator(); it.hasNext(); ) {
            Map.Entry<String, Integer> entry = it.next();
            if(entry.getValue() < 5) {
                it.remove();
            }
        }
        return wordMap.keySet().stream().map(word -> new Word(word, wordMap.get(word))).collect(Collectors.toList());
    }

    /**
     * http://jsoup.org/cookbook/extracting-data/attributes-text-html
     */
    private static String getContentFromURL(String url) {
        logger.info("GET Url...");
        Response response = new ResteasyClientBuilder().build().target(url).request().get();
        return Jsoup.parse(response.readEntity(String.class)).body().text();
    }

    /**
     * http://www.mkyong.com/java/how-to-convert-java-map-to-from-json-jackson/
     */
    private static void dataToJson(String filename, Collection data) throws IOException {
        logger.info("Data to JSON...");
        ObjectMapper mapper = new ObjectMapper();
        mapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);
        mapper.writeValue(new File(filename), data);
        logger.info("File " +  filename + " created OK!");
    }

    /**
     * JSON Model
     */
    private static class Word {

        private String word;
        private int count;

        public Word(String word, int count) {
            this.word = word;
            this.count = count;
        }

        public String getWord() {
            return word;
        }

        public int getCount() {
            return count;
        }

    }

}
