package net.fullstack7.aaa.dto.member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.extern.log4j.Log4j2;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Log4j2
@ToString
public class MemberDTO {
    @NotBlank(message = "아이디를 입력해주세요.")
    @Pattern(regexp = "^[a-z0-9]+$", message = "회원 ID는 영어 소문자와 숫자만 포함할 수 있습니다.")
    private String memberId;
    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{10,20}$", message = "비밀번호는 영어, 숫자, 특수문자를 포함해야 하며, 10~20자여야 합니다.")
    private String password;
    @NotBlank(message = "이름을 입력해주세요.")
    private String name;
    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "유효한 이메일 형식이 아닙니다.")
    private String email;
    @NotBlank(message = "전화번호를 입력해주세요.")
    @Pattern(regexp = "^\\d{11}$", message = "핸드폰 번호는 11자리 숫자여야 합니다.")
    private String phone;
    private String schoolLevel;
    private LocalDateTime regDate;
    private LocalDateTime modifyDate;
}
