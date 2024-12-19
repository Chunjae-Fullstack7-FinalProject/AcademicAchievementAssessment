package net.fullstack7.aaa.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.fullstack7.aaa.dto.member.MemberDTO;
import net.fullstack7.aaa.service.member.MemberServiceImpl;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@Log4j2
@RequestMapping("/sign")
@RequiredArgsConstructor
public class MemberController {
    private final MemberServiceImpl memberService;

    //회원가입
    @GetMapping("/signUp")
    public String signUp() { return "sign/signUp";}

    @PostMapping("/sign-up")
    public ModelAndView signUp(@ModelAttribute MemberDTO memberDTO, @Valid BindingResult bindingResult) {
        ModelAndView modelAndView = new ModelAndView();
        if(bindingResult.hasErrors()) {
            return new ModelAndView("sign/signUp");
        }
        try{
            memberService.signUp(memberDTO);
            log.info("회원가입성공"+memberDTO);
            modelAndView.setViewName("redirect:/sign/signIn");
        } catch (Exception e){
            log.error("회원가입 실패 memberId:{}, 원인:{}", memberDTO.getMemberId(), e.getMessage(), e);
            modelAndView.setViewName("sign/signUp");
            modelAndView.addObject("errorMessage", "회원가입 실패:" +  e.getMessage());
        }
        return modelAndView;
    }

    //로그인(대충 잡아둔거)
    @GetMapping("/signIn")
    public String signIn(){ return "sign/signIn";}

    @PostMapping("/sign-in")
    public ResponseEntity<String> signIn(@RequestBody MemberDTO memberDTO){
        try{
            String token = memberService.signIn(memberDTO.getMemberId(), memberDTO.getPassword());
            return ResponseEntity.ok().header("Authorization", "Bearer " + token).body("로그인 완료");
        } catch (Exception e){
            log.error("로그인 실패 memberId:{}, 원인:{}", memberDTO.getMemberId(),e.getMessage(), e);
            return ResponseEntity.badRequest().body("로그인 실패: "+e.getMessage());
        }
    }
}
