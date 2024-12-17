package net.fullstack7.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.fullstack7.dto.MemberDTO;
import net.fullstack7.service.MemberServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/sign")
@RequiredArgsConstructor
public class MemberController {
    private final MemberServiceImpl memberService;

    @GetMapping("/sign-up")
    public String signUp() { return "sign/sign-up";}

    @PostMapping("/sign-up")
    public ResponseEntity<String> signUp(@RequestBody MemberDTO memberDTO){
        try{
            memberService.signUp(memberDTO);
            return ResponseEntity.ok("회원가입 완료");
        } catch (Exception e){
            log.error("회원가입 실패 memberId:{}, 원인:{}", memberDTO.getMemberId(), e.getMessage(), e);
            return ResponseEntity.badRequest().body("회원가입 실패 : " + e.getMessage());
        }
    }
}
