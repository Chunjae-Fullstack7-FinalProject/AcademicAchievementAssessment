package net.fullstack7.aaa.dto.report;

import lombok.*;

import java.util.List;

@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExamResultDTO {
    private String name;        // 사용자 이름
    private String subjectName; // 응시 과목
    private String submitAt;    // 제출 날짜
    private int totalItem;      // 총 갯수
    private int correctItem;     // 맞은 갯수
    private List<QuestionResultDTO> questionResults; // 각 문제 결과 리스트

    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class QuestionResultDTO {
        private boolean isCorrect;       // 정답 여부
        private String explanationUrl;   // 문제 해설 URL

    }
}
