package net.fullstack7.aaa.controller.api;

import lombok.RequiredArgsConstructor;
import net.fullstack7.aaa.common.util.ApiResponseUtil;
import net.fullstack7.aaa.dto.exam.ExamRequestDTO;
import net.fullstack7.aaa.service.exam.ExamServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exam")
@RequiredArgsConstructor
public class ItemApiController {
    private final ExamServiceImpl examService;

    @PostMapping
    public ResponseEntity<ApiResponseUtil<?>> handleExamRequest(@RequestBody ExamRequestDTO request) {
        try {
            examService.saveExamAndItems(request);

            return ResponseEntity.ok(ApiResponseUtil.success("성공"));
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponseUtil.error("에러 : " + e.getMessage()));
        }
    }
}
