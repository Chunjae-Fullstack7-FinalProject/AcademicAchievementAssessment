package net.fullstack7.aaa.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Solve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT 설정
    private int idx; // 고유 id

    @Column(name = "examId",nullable = false)
    private Long examId; // 시험지 id

    @Column(name = "itemId",nullable = false)
    private Long itemId; // 문제 id

    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;

    @Column(length = 250)
    private String answer; // 정답

    @Column(name = "isCorrect",nullable = false)
    private Boolean isCorrect; // true 정답 false 오답

    private int time; // 문제별 풀이시간

    @Column(name = "submittedAt", nullable = false)
    private LocalDateTime submittedAt; // 저장일

}
