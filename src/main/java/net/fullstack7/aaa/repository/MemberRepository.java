package net.fullstack7.aaa.repository;

import net.fullstack7.aaa.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    //이메일로 회원 찾기
    Optional<Member> findByEmail(String email);

}