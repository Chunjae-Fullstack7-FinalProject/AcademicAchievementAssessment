package net.fullstack7.aaa.repository;

import net.fullstack7.aaa.domain.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Long> {
}