package org.polytech.si5.betConqueror.models;

import java.util.Objects;

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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Unity unity = (Unity) o;
        return Objects.equals(tag, unity.tag);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tag);
    }

    @Override
    public String toString() {
        return "Unity{" +
                "tag='" + tag + '\'' +
                '}';
    }
}
