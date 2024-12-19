package net.fullstack7.aaa.service.admin;

import net.fullstack7.aaa.domain.Notice;
import net.fullstack7.aaa.dto.admin.NoticeDTO;
import net.fullstack7.aaa.dto.admin.PageDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface NoticeServiceIf {

    Notice view(int noticeId);
    List<NoticeDTO> getNewestNotices();
}
