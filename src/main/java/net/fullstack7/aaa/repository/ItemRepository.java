package net.fullstack7.aaa.repository;

import net.fullstack7.aaa.domain.Item;
import net.fullstack7.aaa.domain.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    // examId와 itemId로 이미 존재하는지 확인
    boolean existsByExamAndItemId(Exam exam, Long itemId);
}