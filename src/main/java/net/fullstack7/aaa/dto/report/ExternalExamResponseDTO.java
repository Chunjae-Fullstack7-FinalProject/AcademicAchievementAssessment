package net.fullstack7.aaa.dto.report;

import lombok.*;

import java.util.List;

@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExternalExamResponseDTO {
    private String successYn;
    private List<ItemDTO> itemList;

    @Data
    public static class ItemDTO {
        private Long questionId;
        private String answer;
    }
}
