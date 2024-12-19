package net.fullstack7.aaa.dto.exam;

import java.util.List;
import lombok.Data;

@Data
public class ExamRequestDTO {
    private Long examId;
    private String examName;
    private String subjectName;
    private String teacherId;
    private String teacherName;
    private List<Long> itemList;
}
