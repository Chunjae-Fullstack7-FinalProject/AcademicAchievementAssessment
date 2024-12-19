package net.fullstack7.aaa.controller;

import lombok.RequiredArgsConstructor;
import net.fullstack7.aaa.common.annotation.Logging;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/dum")
@Logging
public class DummyController {

    @GetMapping("/exam")
    public String exam() {
        return "test/exam_page";
    }

    @GetMapping("/list")
    public String list() {
        return "test/list";
    }

    @GetMapping("/testlist")
    public String testlist() {
        return "test/testlist";
    }

    @GetMapping("/main")
    public String main() {
        return "test/main";
    }

    @GetMapping("/intro")
    public String intro() {
        return "test/intro";
    }

    @GetMapping("/inform")
    public String inform() {
        return "test/inform";
    }

    @GetMapping("/geongmin-exam")
    public String geongminExam() {
        return "dummy-templates/dummy_exam";
    }

    @GetMapping("/dummy1")
    public String dummy1() {
        return "dummy-templates/dummy1";
    }

    @GetMapping("/dummy_submit")
    public String dummySubmit() {
        return "dummy-templates/dummy_submit";
    }

    @GetMapping("/reportTest")
    public String repostTest() {
        return "report/reportTest";
    }
}
