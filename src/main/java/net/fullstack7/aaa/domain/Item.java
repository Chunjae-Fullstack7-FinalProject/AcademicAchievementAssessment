package net.fullstack7.aaa.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Item {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int itemIdx;

  @ManyToOne
  @JoinColumn(name = "examId", nullable = false)
  private Exam exam;

  @Column(name = "itemId", nullable = false)
  private Long itemId;
}
