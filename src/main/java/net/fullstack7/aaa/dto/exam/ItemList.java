package net.fullstack7.aaa.dto.exam;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemList {
    private Long examId;
    private String examName;
    private String subjectName;
    private String teacherId;
    private String teacherName;
    private List<Long> itemIdList;
}
