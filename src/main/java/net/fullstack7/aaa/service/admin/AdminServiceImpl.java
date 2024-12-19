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

}
