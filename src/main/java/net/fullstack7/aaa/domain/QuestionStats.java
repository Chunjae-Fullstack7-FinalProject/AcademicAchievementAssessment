package net.fullstack7.aaa.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class QuestionStats {
    @Id
    @Column(nullable = false)
    private Long itemId; // 문제id

    private int correctCount; // 정답자수

    private int wrongCount; // 오답자수

    private LocalDateTime updateDate; // 업데이트날짜

}
