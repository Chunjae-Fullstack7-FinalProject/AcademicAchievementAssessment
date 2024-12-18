package net.fullstack7.aaa.dto.report;

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

    @Data
    public static class AnswerDTO {
        private Long questionId;
        private String answer;
        private int timeSpent;
    }
}
