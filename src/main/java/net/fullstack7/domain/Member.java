package net.fullstack7.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Member {
    public Member(String memberId){ this.memberId = memberId; };
    @Id
    private String memberId;
    private String password;
    private String name;
    private String email;
    private String phone;
    private int schoolLevel;
    private LocalDateTime regDate;
    private LocalDateTime modifyDate;
}
