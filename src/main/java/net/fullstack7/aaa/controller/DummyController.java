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

}