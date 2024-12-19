package net.fullstack7.aaa.controller.api;
import lombok.RequiredArgsConstructor;
import net.fullstack7.aaa.common.annotation.Logging;
import net.fullstack7.aaa.dto.report.SubmitExamDTO;
import net.fullstack7.aaa.service.report.ReportServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/report/")
@RequiredArgsConstructor
@Logging
public class ReportApiController {
    private final ReportServiceImpl reportService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitExam(@RequestBody SubmitExamDTO submitExamDTO) {
        String memberId = "member1";
        try {
            reportService.examSubmission(memberId, submitExamDTO);
            String redirectUrl = "/report/list/" + memberId + "/" + submitExamDTO.getExamId()+ "?subjectName=" + submitExamDTO.getSubjectName();

            return ResponseEntity.ok(Map.of("redirectUrl", redirectUrl));
            //return ResponseEntity.ok(Map.of("message", "시험 제출 완료"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
