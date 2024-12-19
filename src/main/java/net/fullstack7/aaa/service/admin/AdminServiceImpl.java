package net.fullstack7.aaa.service.admin;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.fullstack7.aaa.domain.Admin;
import net.fullstack7.aaa.domain.Notice;
import net.fullstack7.aaa.dto.admin.AdminLoginDTO;
import net.fullstack7.aaa.dto.admin.NoticeDTO;
import net.fullstack7.aaa.repository.AdminRepository;
import net.fullstack7.aaa.repository.NoticeRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminServiceIf {
    private final AdminRepository adminRepository;
    private final NoticeRepository noticeRepository;

    public boolean existsAdmin(String id) {
        return adminRepository.existsById(id);
    }

    @Override
    public String login(AdminLoginDTO adminLoginDTO) {
        Admin byAdminIdAndPassword = adminRepository.findByAdminIdAndPassword(adminLoginDTO.getAdminId(), adminLoginDTO.getPassword()).orElse(null);

        if (byAdminIdAndPassword != null) {
            return adminLoginDTO.getAdminId();
        }

        return null;
    }

    @Override
    public String insertNotice(NoticeDTO dto) {
        Notice notice = Notice.builder()
                .admin(Admin.builder().adminId(dto.getAdminId()).build())
                .title(dto.getTitle())
                .content(dto.getContent())
                .createdAt(LocalDateTime.now())
                .importance(dto.getImportance())
                .build();
        noticeRepository.save(notice);

        if(notice.getNoticeId() != 0) {
            return "등록 완료";
        }

        return null;
    }

    @Override
    public String modifyNotice(NoticeDTO dto) {
        if(noticeRepository.findById(dto.getNoticeId()).orElse(null) == null) {
            return "존재하지 않는 게시글입니다.";
        }
        if(!adminRepository.existsById(dto.getAdminId())) {
            return "관리자 권한 계정만 수정 가능합니다.";
        }
        if(noticeRepository.updateNotice(dto.getNoticeId(), dto.getTitle(), dto.getContent(), dto.getImportance()) > 0) {
            return "수정 완료";
        }
        return "수정 실패. 다시 시도해주세요.";
    }

    @Override
    public String deleteNotice(int noticeId, String adminId) {
        if(!adminRepository.existsById(adminId))
            return "관리자 권한 계정만 삭제 가능합니다.";

        Notice notice = noticeRepository.findById(noticeId).orElse(null);
        if(notice != null) {
            noticeRepository.delete(notice);
            return "삭제 완료";
        }
        return "존재하지 않는 게시글입니다.";
    }

}
