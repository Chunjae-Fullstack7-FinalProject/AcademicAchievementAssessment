package net.fullstack7.aaa.domain;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Exam {
    @Id
    @Column(name="examId", nullable=false)
    private Long examId; // 시험 ID
    @Column(name="examName", length = 100)
    private String examName; // 시험 이름
    @Column(name="subjectName")
    private String subjectName; // 과목 이름
    @Column(name="teacherId", length = 20)
    private String teacherId; // 선생님 ID
    @Column(name="teacherName",length = 10)
    private String teacherName; // 선생님 이름
}
