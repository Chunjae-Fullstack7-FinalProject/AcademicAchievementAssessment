package net.fullstack7.aaa.dto.report;

import lombok.*;

@Builder
@Data
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class ReportDTO {
    private String memberId;
    private String memberName;

}
