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
    private Long examId; // 시험id
    @Column(name="subjectId")
    private Long subjectId; // 과목 id
    @Column(name="teacherId", length = 20)
    private String teacherId; // 선생님 id든 이름이든 받아서 쓰셈
    @Column(name="teacherName",length = 10)
    private String teacherName; // 선생님 id든 이름이든 받아서 쓰셈

}
