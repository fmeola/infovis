package model;

import lombok.Data;

@Data
public class Gender {

    private int female;
    private int male;

    public Gender(int female, int male) {
        this.female = female;
        this.male = male;
    }

}
