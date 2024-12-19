package net.fullstack7.aaa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import net.fullstack7.aaa.common.annotation.Logging;

@Controller
@RequestMapping("/exam")
@Logging
@RequiredArgsConstructor
public class ExamController {
    private final ExamService examService;

    @GetMapping("/{examId}")
    public String exam(@PathVariable Long examId) {
        ItemList itemList = examService.getItemList(examId);
        return "exam/exam";
    }
}

