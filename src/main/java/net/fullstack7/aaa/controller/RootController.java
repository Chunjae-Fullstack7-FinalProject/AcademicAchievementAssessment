package net.fullstack7.aaa.controller;

import lombok.RequiredArgsConstructor;
import net.fullstack7.aaa.common.annotation.Logging;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@Logging
public class RootController {
    @GetMapping("/")
    public String rootGet() {
        return "index";
    }
}
