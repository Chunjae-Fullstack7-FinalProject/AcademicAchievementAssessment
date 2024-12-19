package net.fullstack7.aaa.controller.api;

import lombok.RequiredArgsConstructor;
import net.fullstack7.aaa.dto.examReqRes.ExamRequestDTO;
import net.fullstack7.aaa.dto.examReqRes.ExamResponseDTO;
import net.fullstack7.aaa.service.exam.ExamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exam")
@RequiredArgsConstructor
public class ItemApiController {
    private final ExamService examService;

    @PostMapping
    public ResponseEntity<ExamResponseDTO> handleExamRequest(@RequestBody ExamRequestDTO request) {
        try {
            examService.saveExamAndItems(request);

            ExamResponseDTO response = ExamResponseDTO.builder()
                    .success(true)
                    .message("성공ㅋ")
                    .build();

            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            ExamResponseDTO errorResponse = ExamResponseDTO.builder()
                    .success(false)
                    .message("님들 실패함 ㅋ: " + e.getMessage())
                    .build();

            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
