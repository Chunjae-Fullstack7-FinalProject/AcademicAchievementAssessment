package net.fullstack7.aaa.repository;

import net.fullstack7.aaa.domain.Solve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolveRepository extends JpaRepository<Solve, Integer> {
}
