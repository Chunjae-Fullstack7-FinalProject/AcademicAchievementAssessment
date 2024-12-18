package net.fullstack7.aaa.service.member;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.fullstack7.aaa.domain.Member;
import net.fullstack7.aaa.dto.member.MemberDTO;
import net.fullstack7.aaa.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Log4j2
@Service

public class MemberServiceImpl implements MemberServiceIf {
    private final MemberRepository memberRepository;

    //회원가입
    @Transactional
    public void signUp(MemberDTO memberDTO) {
        checkEmailDuplicate(memberDTO.getEmail());

        Member member = Member.builder()
                .memberId(memberDTO.getMemberId())
                .password(memberDTO.getPassword())
                .name(memberDTO.getName())
                .email(memberDTO.getEmail())
                .phone(memberDTO.getPhone())
                .schoolLevel(memberDTO.getSchoolLevel())
                .regDate(LocalDateTime.now())
                .modifyDate(LocalDateTime.now())
                .build();
        memberRepository.save(member);
    }

    //이메일 중복 체크
    private void checkEmailDuplicate(String email) {
        if(memberRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("이미 사용 중인 이메일입니다.");
        }
    }
}
