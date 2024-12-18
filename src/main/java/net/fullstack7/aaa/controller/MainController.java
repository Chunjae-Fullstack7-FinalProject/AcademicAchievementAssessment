package net.fullstack7.aaa.controller;

import lombok.RequiredArgsConstructor;
import net.fullstack7.aaa.common.annotation.Logging;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/main")
@Logging
public class MainController {

  @GetMapping("/cbt-exam")
  public String cbtExam() {
    return "cbtExam/cbtExam";
  }

  @GetMapping("/cbt-real")
  public String cbtReal() {
    return "cbtReal/cbtReal";
  }

  @GetMapping("/report")
  public String report() {
    return "report/report";
  }
}
