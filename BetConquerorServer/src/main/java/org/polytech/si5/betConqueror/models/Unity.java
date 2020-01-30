package org.polytech.si5.betConqueror.models;

public class Unity {

    private String tag;

    public Unity(String tag) {
        this.tag = tag;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    @Override
    public String toString() {
        return "Unity{" +
                "tag='" + tag + '\'' +
                '}';
    }
}
