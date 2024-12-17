package net.fullstack7.aaa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/report")
public class QweController {
  @GetMapping("/report")
  public String dddd() {
    return "report/report";
  }
}
