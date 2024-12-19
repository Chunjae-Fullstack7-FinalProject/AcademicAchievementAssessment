package net.fullstack7.aaa.repository;

import net.fullstack7.aaa.domain.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Integer>{
    @Modifying
    @Query("update Notice N set N.title = :title, N.content = :content, N.importance = :importance where N.noticeId = :noticeId")
    int updateNotice(int noticeId, String title, String content, int importance);

    List<Notice> findTop5ByOrderByCreatedAtDesc();
}
