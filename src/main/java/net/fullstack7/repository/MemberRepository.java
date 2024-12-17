package net.fullstack7.repository;

import net.fullstack7.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    //이메일로 회원 찾기
    Optional<Member> findByEmail(String email);

}
