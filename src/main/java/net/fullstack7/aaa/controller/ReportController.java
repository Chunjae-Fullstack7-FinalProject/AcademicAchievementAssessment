package net.fullstack7.aaa.controller;
import lombok.RequiredArgsConstructor;
import net.fullstack7.aaa.common.annotation.Logging;
import net.fullstack7.aaa.dto.report.SubmitExamDTO;
import net.fullstack7.aaa.service.report.ReportServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/repost")
@RequiredArgsConstructor
@Logging
public class ReportController {
    private final ReportServiceImpl reportService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitExam(@RequestBody SubmitExamDTO submitExamDTO) {
        String memberId = "member1";
        try {
            reportService.examSubmission(memberId, submitExamDTO);
            return ResponseEntity.ok(Map.of("message", "시험 제출 완료"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
