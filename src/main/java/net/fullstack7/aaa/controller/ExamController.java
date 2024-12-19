package net.fullstack7.aaa.controller;

import lombok.RequiredArgsConstructor;
import net.fullstack7.aaa.dto.exam.ItemList;
import net.fullstack7.aaa.service.exam.ExamServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import groovy.util.logging.Log4j;
import net.fullstack7.aaa.common.annotation.Logging;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/exam")
@Logging(message = "시험 페이지 요청")
@Log4j2
@RequiredArgsConstructor
public class ExamController {
    private final ExamServiceImpl examService;
    
    @GetMapping("/{examId}")
    public String exam(@PathVariable Long examId, Model model) {
        ItemList itemList = examService.getItemList(examId);
        model.addAttribute("itemList", itemList);
        log.info("itemList: {}", itemList.toString());
        return "exam/exam";
    }
}
