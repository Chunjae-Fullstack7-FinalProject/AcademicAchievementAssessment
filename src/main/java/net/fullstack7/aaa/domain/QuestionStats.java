package net.fullstack7.aaa.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QuestionStats {
    @Id
    @Column(nullable = false)
    private Long itemId; // 문제id

    private int correctCount; // 정답자수

    private int wrongCount; // 오답자수

    private LocalDateTime updatedAt; // 업데이트날짜

    public void incrementCorrectCount() {
        this.correctCount += 1;
    }

    public void incrementWrongCount() {
        this.wrongCount += 1;
    }

    public void updateTimestamp() {
        this.updatedAt = LocalDateTime.now();
    }

}
