package net.fullstack7.aaa.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.fullstack7.aaa.common.annotation.Logging;
import net.fullstack7.aaa.domain.Notice;
import net.fullstack7.aaa.dto.admin.AdminLoginDTO;
import net.fullstack7.aaa.dto.admin.NoticeDTO;
import net.fullstack7.aaa.dto.admin.PageDTO;
import net.fullstack7.aaa.service.admin.AdminServiceIf;
import net.fullstack7.aaa.service.admin.NoticeServiceIf;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
@Logging
@Log4j2
public class AdminController {
    private final AdminServiceIf adminService;
    private final NoticeServiceIf noticeService;

    @GetMapping("/login")
    public String login() {
        return "admin/login";
    }

    @PostMapping("/login")
    public String loginPost(@Valid AdminLoginDTO adminLoginDTO, BindingResult bindingResult, RedirectAttributes redirectAttributes
            , HttpSession session) {

        log.info("adminLoginDTO{}",adminLoginDTO);
        if (bindingResult.hasErrors()) {
            redirectAttributes.addFlashAttribute("loginerror", bindingResult.getAllErrors().get(0).getDefaultMessage());
            return "redirect:/admin/login";
        }
        String result = adminService.login(adminLoginDTO);
        if (result == null) {
            redirectAttributes.addFlashAttribute("loginerror", "비밀번호가 일치하지 않거나 존재하지 않는 회원입니다.");
            return "redirect:/admin/login";
        }
        session.setAttribute("loginAdminId", result);

        return "redirect:/admin/main";
    }

    @GetMapping("/main")
    public String main(Model model) {

        List<NoticeDTO> notices = noticeService.getNewestNotices();
        model.addAttribute("pageinfo", notices);

        return "admin/main";
    }

    @PostMapping("/regist")
    public String noticeRegistPost(@Valid NoticeDTO noticeDTO, BindingResult bindingResult, RedirectAttributes redirectAttributes
            , HttpSession session) {
        if (bindingResult.hasErrors()) {
            String message = bindingResult.getAllErrors().get(0).getDefaultMessage();
            if(message != null && message.startsWith("Failed")) {
                message = "필드 값 오류";
            }
            redirectAttributes.addFlashAttribute("errors", message);
            redirectAttributes.addFlashAttribute("item", noticeDTO);
            return "redirect:/admin/main";
        }
        noticeDTO.setAdminId(session.getAttribute("loginAdminId").toString());
        adminService.insertNotice(noticeDTO);
        return "redirect:/admin/main";
    }

    @GetMapping("/view/{noticeId}")
    public String noticeViewGet(Model model, @PathVariable String noticeId, RedirectAttributes redirectAttributes) {
        if (noticeId == null || noticeId.equals("0") || !noticeId.matches("^\\d+$")) {
            redirectAttributes.addFlashAttribute("errors", "조회할 수 없는 게시글입니다.");

            return "redirect:/admin/main";
        }

        int id = Integer.parseInt(noticeId);

        Notice view = noticeService.view(id);

        if (view == null) {
            redirectAttributes.addFlashAttribute("errors", "조회할 수 없는 게시글입니다.");
            return "redirect:/admin/main";
        }

        model.addAttribute("item", view);
        log.info(view);

        return "admin/view";
    }

    @GetMapping("/modify/{noticeId}")
    public String noticeModifyGet(Model model, @PathVariable String noticeId, RedirectAttributes redirectAttributes) {
        if (noticeId == null || noticeId.equals("0") || !noticeId.matches("^\\d+$")) {
            redirectAttributes.addFlashAttribute("errors", "조회할 수 없는 게시글입니다.");
            return "redirect:/admin/main";
        }

        int id = Integer.parseInt(noticeId);

        Notice view = noticeService.view(id);

        if (view == null) {
            redirectAttributes.addFlashAttribute("errors", "조회할 수 없는 게시글입니다.");
            return "redirect:/admin/main";
        }

        model.addAttribute("item", view);

        return "admin/modify";
    }

    @PostMapping("/modify/{noticeId}")
    public String noticeModifyPost(@Valid NoticeDTO noticeDTO, BindingResult bindingResult, RedirectAttributes redirectAttributes
            , @PathVariable String noticeId
            , HttpSession session) {
        if (noticeId == null || noticeId.equals("0") || !noticeId.matches("^\\d+$")) {
            redirectAttributes.addFlashAttribute("errors", "조회할 수 없는 게시글입니다.");
            return "redirect:/admin/main";
        }
        if (bindingResult.hasErrors()) {
            String message = bindingResult.getAllErrors().get(0).getDefaultMessage();
            if(message != null && message.startsWith("Failed")) {
                message = "필드 값 오류";
            }
            redirectAttributes.addFlashAttribute("errors", message);

            return "redirect:/admin/modify/"+noticeId;
        }
        noticeDTO.setAdminId((String) session.getAttribute("loginAdminId"));

        adminService.modifyNotice(noticeDTO);

        return "redirect:/admin/main";
    }

}
