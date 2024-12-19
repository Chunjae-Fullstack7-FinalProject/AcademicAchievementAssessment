package net.fullstack7.aaa.repository;

import net.fullstack7.aaa.domain.QuestionStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionStatsRepository extends JpaRepository<QuestionStats, Long> {
}
