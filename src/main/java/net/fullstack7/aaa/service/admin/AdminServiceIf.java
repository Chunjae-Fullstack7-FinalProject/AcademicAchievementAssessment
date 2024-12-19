package net.fullstack7.aaa.service.admin;


import net.fullstack7.aaa.dto.admin.AdminLoginDTO;
import net.fullstack7.aaa.dto.admin.NoticeDTO;

public interface AdminServiceIf {

    boolean existsAdmin(String id);

    String login(AdminLoginDTO adminLoginDTO);

    String modifyNotice(NoticeDTO dto);
    String deleteNotice(int noticeId, String adminId);
    String insertNotice(NoticeDTO dto);
}
