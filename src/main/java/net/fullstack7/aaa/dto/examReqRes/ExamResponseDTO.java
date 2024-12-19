package net.fullstack7.aaa.dto.examReqRes;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class ExamResponseDTO {
    private boolean success;
    private String message;
}
