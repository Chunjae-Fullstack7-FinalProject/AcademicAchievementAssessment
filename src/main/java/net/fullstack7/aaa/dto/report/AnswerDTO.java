package net.fullstack7.aaa.dto.report;

import lombok.*;
import org.springdoc.core.configuration.SpringDocGroovyConfiguration;

@Builder
@Data
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class AnswerDTO {
    private int itemId;
    private String answer;


}
