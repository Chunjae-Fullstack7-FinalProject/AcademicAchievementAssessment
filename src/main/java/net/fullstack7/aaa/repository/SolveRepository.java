package net.fullstack7.aaa.repository;

import net.fullstack7.aaa.domain.Member;
import net.fullstack7.aaa.domain.Solve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolveRepository extends JpaRepository<Solve, Integer> {
    List<Solve> findByExamIdAndMember_MemberId(Long examId, String memberId);
    Solve findByExamIdAndMember_MemberIdAndItemId(Long examId, String memberId, Long itemId);
}
