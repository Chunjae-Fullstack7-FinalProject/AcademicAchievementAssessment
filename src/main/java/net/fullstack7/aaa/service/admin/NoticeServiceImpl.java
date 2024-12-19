package net.fullstack7.aaa.service.admin;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.fullstack7.aaa.domain.Notice;
import net.fullstack7.aaa.dto.admin.NoticeDTO;
import net.fullstack7.aaa.dto.admin.PageDTO;
import net.fullstack7.aaa.repository.NoticeRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional
public class NoticeServiceImpl implements NoticeServiceIf {
    private final NoticeRepository noticeRepository;

    @Override
    public Notice view(int noticeId) {
        Optional<Notice> byNoticeId = noticeRepository.findById(noticeId);

        return byNoticeId.orElse(null);

    }

    @Override
    public List<NoticeDTO> getNewestNotices() {
        return noticeRepository.findTop5ByOrderByCreatedAtDesc().stream().map(entity ->
                NoticeDTO.builder()
                        .importance(entity.getImportance())
                        .title(entity.getTitle())
                        .adminId(entity.getAdmin().getAdminId())
                        .createdAt(entity.getCreatedAt())
                        .noticeId(entity.getNoticeId())
                        .build()
        ).collect(Collectors.toList());
    }

}
