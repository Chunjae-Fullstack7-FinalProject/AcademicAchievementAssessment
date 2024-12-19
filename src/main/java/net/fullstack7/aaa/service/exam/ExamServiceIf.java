package net.fullstack7.aaa.service.exam;

import net.fullstack7.aaa.dto.exam.ExamRequestDTO;
import net.fullstack7.aaa.dto.exam.ItemList;
public interface ExamServiceIf {
  public void saveExamAndItems(ExamRequestDTO request);
  public ItemList getItemList(Long examId);
}
