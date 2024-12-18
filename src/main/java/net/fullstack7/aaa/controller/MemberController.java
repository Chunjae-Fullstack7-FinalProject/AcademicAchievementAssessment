package net.fullstack7.aaa.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.fullstack7.aaa.dto.member.MemberDTO;
import net.fullstack7.aaa.service.member.MemberServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/sign")
@RequiredArgsConstructor
public class MemberController {
    private final MemberServiceImpl memberService;

    //회원가입
    @GetMapping("/signUp")
    public String signUp() { return "sign/signUp";}

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

    //로그인(대충 잡아둔거)
    @GetMapping("/signIn")
    public String signIn(){ return "sign/signIn";}

    @PostMapping("/sign-in")
    public ResponseEntity<String> signIn(@RequestBody MemberDTO memberDTO){
        try{
            return ResponseEntity.ok("로그인 완료");
        } catch (Exception e){
            log.error(e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
