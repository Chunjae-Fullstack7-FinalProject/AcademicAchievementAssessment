package net.fullstack7.aaa.dto.report;

import com.fasterxml.jackson.annotation.JsonProperty;
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


    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class ItemDTO {
        private Long itemId;
        private String answer;
    }
}
