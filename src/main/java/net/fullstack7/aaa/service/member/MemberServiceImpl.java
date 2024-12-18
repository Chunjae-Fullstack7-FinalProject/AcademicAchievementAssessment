package net.fullstack7.aaa.service.member;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.fullstack7.aaa.config.JwtTokenProvider;
import net.fullstack7.aaa.config.SecurityConfig;
import net.fullstack7.aaa.domain.Member;
import net.fullstack7.aaa.dto.member.MemberDTO;
import net.fullstack7.aaa.repository.MemberRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Log4j2
@Service
public class MemberServiceImpl implements MemberServiceIf {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;


    //회원가입
    @Transactional
    public void signUp(MemberDTO memberDTO) {
        checkEmailDuplicate(memberDTO.getEmail());

        String encodePassword = passwordEncoder.encode(memberDTO.getPassword());

        Member member = Member.builder()
                .memberId(memberDTO.getMemberId())
                .password(encodePassword)
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

    //로그인
    public String signIn(String memberId, String password) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
        if(!passwordEncoder.matches(password, member.getPassword())) {
            throw new BadCredentialsException("유효하지 않은 아이디 혹은 유효하지 않은 비밀번호입니다.");
        }
        return jwtTokenProvider.createToken(memberId);
    }
}
