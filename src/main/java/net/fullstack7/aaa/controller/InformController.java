package net.fullstack7.aaa.controller;

import lombok.RequiredArgsConstructor;
import net.fullstack7.aaa.common.annotation.Logging;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/inform")
@Logging
public class InformController {

    @GetMapping("/inform")
    public String inform() {
        return "inform/inform";
    }

    @GetMapping("/intro")
    public String intro() {
        return "inform/intro";
    }

    @GetMapping("/list")
    public String list() {
        return "inform/list";
    }
}
