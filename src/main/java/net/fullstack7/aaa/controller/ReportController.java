package net.fullstack7.aaa.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.fullstack7.aaa.common.annotation.Logging;
import net.fullstack7.aaa.dto.report.ExamResultDTO;
import net.fullstack7.aaa.service.report.ReportServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@Logging
@Log4j2
@RequestMapping("/report")
public class ReportController {
    private final ReportServiceImpl reportService;

    @GetMapping("/list/{memberId}/{examId}")
    public String list(@PathVariable("memberId") String memberId,
                       @PathVariable("examId") Long examId,
                       @RequestParam("subjectName") String subjectName,
                       Model model) {
        ExamResultDTO resultDTO = reportService.getExamResult(examId, memberId, subjectName);
        model.addAttribute("result", resultDTO);
        return "report/reportTest";
    }

    
    @GetMapping("/explanation/{itemId}")
    public String explanation(@PathVariable("itemId") Long itemId, Model model) {
        return "report/explanation";
    }

}
