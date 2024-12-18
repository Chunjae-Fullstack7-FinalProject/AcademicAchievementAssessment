package net.fullstack7.aaa.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
public class Member {
    @Id
    @Column(name = "memberId", nullable = false, length = 50)
    private String memberId; // 아이디

    @Column(nullable = false, length = 200)
    private String password; // 비밀번호

    @Column(nullable = false, length = 20)
    private String name; // 이름

    @Column(nullable = false, length = 100)
    private String email; // 이메일

    @Column(nullable = false, length = 11)
    private String phone; // 핸드폰 번호

    @Column(name ="schoolLevel" ,nullable = false, length = 1)
    private int schoolLevel; // 학교급 (0: 초등, 1: 중등, 2: 고등)

    @Column(name ="regDate", nullable = false)
    private LocalDateTime regDate; // 가입일

    @Column(name ="modifyDate")
    private LocalDateTime modifyDate; // 수정일

}
