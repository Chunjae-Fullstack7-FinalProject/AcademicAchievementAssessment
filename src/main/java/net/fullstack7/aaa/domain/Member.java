package net.fullstack7.aaa.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "Member")
public class Member {
    public Member(String memberId){ this.memberId = memberId; };
    @Id
    @Column(name = "memberId", nullable = false, length = 50) // 회원 id
    private String memberId;
    @Column(name = "password", nullable = false, length = 300) // 비밀번호
    private String password;
    @Column(name = "name", nullable = false, length = 20) // 이름
    private String name;
    @Column(name = "email", nullable = false, length = 100, unique = true) // 이메일
    private String email;
    @Column(name = "phone", nullable = false, length = 50, columnDefinition = "VARCHAR(11)") // 휴대폰번호(00000000000)
    private String phone;
    @Column(name = "schoolLevel", nullable = false, length = 1, columnDefinition = "CHAR(1) default 'M'") // 학교급(E:초등, M:중등, H:고등)
    private String schoolLevel;
    private LocalDateTime regDate; // 가입일
    private LocalDateTime modifyDate; // 수정일
}
