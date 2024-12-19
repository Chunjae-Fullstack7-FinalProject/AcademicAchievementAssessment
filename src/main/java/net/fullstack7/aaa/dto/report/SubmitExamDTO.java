package net.fullstack7.aaa.dto.report;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SubmitExamDTO {
    private Long examId;
    private List<AnswerDTO> answers;
    private String subjectName;

    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class AnswerDTO {
        private Long itemId;
        private String answer;
        private int timeSpent;
    }
}
