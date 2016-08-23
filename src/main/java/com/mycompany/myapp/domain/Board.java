package com.mycompany.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Board.
 */
@Entity
@Table(name = "board")
public class Board implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "content")
    private String content;

    @Column(name = "todaydate")
    private LocalDate todaydate;

    @Column(name = "todaytime")
    private String todaytime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getTodaydate() {
        return todaydate;
    }

    public void setTodaydate(LocalDate todaydate) {
        this.todaydate = todaydate;
    }

    public String getTodaytime() {
        return todaytime;
    }

    public void setTodaytime(String todaytime) {
        this.todaytime = todaytime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Board board = (Board) o;
        if(board.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, board.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Board{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", content='" + content + "'" +
            ", todaydate='" + todaydate + "'" +
            ", todaytime='" + todaytime + "'" +
            '}';
    }
}
