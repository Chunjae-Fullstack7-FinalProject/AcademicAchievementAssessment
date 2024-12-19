package net.fullstack7.aaa.service.exam;

import lombok.RequiredArgsConstructor;
import net.fullstack7.aaa.domain.Exam;
import net.fullstack7.aaa.domain.Item;
import net.fullstack7.aaa.dto.examReqRes.ExamRequestDTO;
import net.fullstack7.aaa.repository.ExamRepository;
import net.fullstack7.aaa.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamService {
    private final ExamRepository examRepository;
    private final ItemRepository itemRepository;

    @Transactional
    public void saveExamAndItems(ExamRequestDTO request) {
        Exam exam = Exam.builder()
                .examId(request.getExamId())
                .examName(request.getExamName())
                .subjectName(request.getSubjectName())
                .teacherId(request.getTeacherId())
                .teacherName(request.getTeacherName())
                .build();
        
        examRepository.save(exam);

        List<Item> items = new ArrayList<>();
        for (Long itemId : request.getItemList()) {
            if (!itemRepository.existsByExamAndItemId(exam, itemId)) {
                Item item = Item.builder()
                        .exam(exam)
                        .itemId(itemId)
                        .build();
                items.add(item);
            }
        }
        
        // 이러면 저기서 수정하고 보내도 ㄱㅊ을듯
        if (!items.isEmpty()) {
            itemRepository.saveAll(items);
        }
    }
}